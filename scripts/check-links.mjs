#!/usr/bin/env node
// Internal link checker for the built site. No dependencies — Node built-ins only.
//
// Run AFTER `npm run build`. It reads dist/, builds the set of real routes and
// static files, then scans every page's href/src (and meta-refresh redirects)
// and reports:
//   • broken internal links     (href points at a route/file that doesn't exist) — ERROR
//   • broken internal anchors    (#id with no matching element on the target)     — ERROR
//   • orphan pages               (no inbound internal link from another page)      — warning
//   • inconsistent trailing slash (same route linked as /x and /x/)                — warning
//
// Exit code 1 if any ERROR is found (so it can gate `npm run validate`); warnings
// alone exit 0. External links (http, mailto, tel, etc.) are ignored by design.

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

if (!existsSync(DIST)) {
  console.error('✗ dist/ not found. Run `npm run build` first.');
  process.exit(2);
}

// --- collect every file in dist -------------------------------------------
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const files = walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));

// Map a dist file to its site path with a leading slash, posix-style.
const toUrlPath = (f) => '/' + relative(DIST, f).split(/[\\/]/).join('/');

// --- build the set of valid link targets ----------------------------------
// Every real file is a target (/favicon.svg, /_astro/x.css). Each index.html
// also yields its directory route, with and without a trailing slash.
const validTargets = new Set(['/']);
for (const f of files) {
  const url = toUrlPath(f);
  validTargets.add(url);
  if (url.endsWith('/index.html')) {
    const dir = url.slice(0, -'index.html'.length); // ".../"
    validTargets.add(dir); // /foo/
    if (dir !== '/') validTargets.add(dir.replace(/\/$/, '')); // /foo
  }
}

// Route key (no trailing slash, '/' for root) → the html file that serves it.
function routeKey(p) {
  const path = p.split(/[?#]/)[0] || '/';
  const noSlash = path !== '/' && path.endsWith('/') ? path.slice(0, -1) : path;
  return noSlash === '' ? '/' : noSlash;
}

// Map each page file to its canonical route key, and collect its element ids.
const pageIds = new Map(); // routeKey -> Set(ids)
const pageRoute = new Map(); // htmlFile -> routeKey
const ID_RE = /\bid="([^"]+)"/g;
for (const f of htmlFiles) {
  let url = toUrlPath(f);
  url = url.endsWith('/index.html') ? url.slice(0, -'index.html'.length) : url;
  const key = routeKey(url);
  pageRoute.set(f, key);
  const html = readFileSync(f, 'utf8');
  const ids = new Set();
  let m;
  while ((m = ID_RE.exec(html))) ids.add(m[1]);
  pageIds.set(key, ids);
}

// --- scan links ------------------------------------------------------------
const HREF_RE = /(?:href|src)="([^"]*)"/g;
const META_RE = /<meta[^>]+http-equiv="refresh"[^>]+content="[^"]*url=([^"]+)"/gi;

const isExternal = (h) =>
  /^(https?:|mailto:|tel:|data:|javascript:|#$)/i.test(h) || h.startsWith('//');

const errors = [];
const warnings = [];
const inbound = new Map(); // routeKey -> count of inbound links from OTHER pages
const slashStyles = new Map(); // routeKey -> Set of raw forms seen ('/x', '/x/')
for (const k of pageRoute.values()) inbound.set(k, 0);

function noteInbound(targetKey, fromKey) {
  if (validTargets.has('/') && pageIds.has(targetKey) && targetKey !== fromKey) {
    inbound.set(targetKey, (inbound.get(targetKey) || 0) + 1);
  }
}

function checkTarget(raw, fromFile, fromKey) {
  if (!raw || isExternal(raw)) return;
  // Same-page anchor.
  if (raw.startsWith('#')) {
    const id = raw.slice(1);
    if (!id || id === 'top') return;
    const ids = pageIds.get(fromKey) || new Set();
    if (!ids.has(id)) errors.push(`${fromKey}: anchor "#${id}" has no matching id on the same page`);
    return;
  }
  if (!raw.startsWith('/')) return; // ignore relative/odd; site is root-absolute

  const [pathPart, frag] = raw.split('#');
  const path = pathPart.split('?')[0];
  const key = routeKey(path);

  // Validate the path resolves to a real route or static file.
  const candidates = [path, path.replace(/\/$/, ''), path.endsWith('/') ? path : path + '/'];
  const ok = candidates.some((c) => validTargets.has(c)) || validTargets.has(key);
  if (!ok) {
    errors.push(`${fromKey}: broken link → "${raw}" (no route or file in dist)`);
    return;
  }

  // Track trailing-slash style for pages.
  if (pageIds.has(key)) {
    if (!slashStyles.has(key)) slashStyles.set(key, new Set());
    slashStyles.get(key).add(path.endsWith('/') && path !== '/' ? 'slash' : 'noslash');
    noteInbound(key, fromKey);
  }

  // Validate the anchor against the TARGET page's ids.
  if (frag && frag !== 'top') {
    const ids = pageIds.get(key);
    if (ids && !ids.has(frag)) {
      errors.push(`${fromKey}: broken anchor → "${raw}" (no id "${frag}" on ${key})`);
    }
  }
}

for (const f of htmlFiles) {
  const fromKey = pageRoute.get(f);
  const html = readFileSync(f, 'utf8');
  let m;
  HREF_RE.lastIndex = 0;
  while ((m = HREF_RE.exec(html))) checkTarget(m[1], f, fromKey);
  META_RE.lastIndex = 0;
  while ((m = META_RE.exec(html))) checkTarget(m[1].trim(), f, fromKey);
}

// --- orphans + slash consistency ------------------------------------------
for (const [key, count] of inbound) {
  if (key === '/') continue; // home is the entry point
  if (count === 0) warnings.push(`orphan page: ${key} has no inbound internal link`);
}
for (const [key, styles] of slashStyles) {
  if (styles.size > 1) warnings.push(`inconsistent trailing slash for ${key} (linked both as /x and /x/)`);
}

// --- report ----------------------------------------------------------------
const pageCount = pageRoute.size;
console.log(`\n  Link check — ${pageCount} pages, ${validTargets.size} targets in dist/\n`);

if (errors.length) {
  console.log(`  ✗ ${errors.length} error(s):`);
  for (const e of errors) console.log(`     - ${e}`);
} else {
  console.log('  ✓ no broken internal links or anchors');
}
if (warnings.length) {
  console.log(`\n  ⚠ ${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`     - ${w}`);
}
console.log('');

process.exit(errors.length ? 1 : 0);
