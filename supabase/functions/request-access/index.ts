// Automatic self-serve invitation endpoint for MOONKEY LAB.
// A prospect POSTs { email } from the public /acceso form. We:
//   1. validate + rate-limit (per-IP 5/h) + dedupe (per-email 24h) via access_requests
//   2. send a Supabase invite (admin) so they get an account
//   3. if CF_* secrets are set, add their email to the course's Cloudflare Access group
// Always returns the SAME generic success (no email enumeration). Deploy with
// --no-verify-jwt (public form endpoint; protection is the rate-limit, not a JWT).
import { createClient } from 'npm:@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://xop-50a.pages.dev';
const CF_API_TOKEN = Deno.env.get('CF_API_TOKEN');
const CF_ACCOUNT_ID = Deno.env.get('CF_ACCOUNT_ID');
const CF_ACCESS_GROUP_ID = Deno.env.get('CF_ACCESS_GROUP_ID');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GENERIC = { ok: true, message: 'Si tu email es válido, recibirás una invitación en breve. / If eligible, you will receive an invitation shortly.' };
const reply = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, 'content-type': 'application/json' } });

async function addToCloudflareAccess(email: string): Promise<string> {
  if (!CF_API_TOKEN || !CF_ACCOUNT_ID || !CF_ACCESS_GROUP_ID) return 'cf_skipped';
  try {
    const base = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/access/groups/${CF_ACCESS_GROUP_ID}`;
    const headers = { Authorization: `Bearer ${CF_API_TOKEN}`, 'content-type': 'application/json' };
    const grp = (await (await fetch(base, { headers })).json())?.result;
    if (!grp) return 'cf_error';
    const include: Array<Record<string, unknown>> = Array.isArray(grp.include) ? grp.include : [];
    const has = include.some((r: any) => r?.email?.email?.toLowerCase?.() === email);
    if (!has) {
      include.push({ email: { email } });
      const put = await fetch(base, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ name: grp.name, include, exclude: grp.exclude ?? [], require: grp.require ?? [] }),
      });
      if (!put.ok) return 'cf_error';
    }
    return 'cf_added';
  } catch (_e) {
    return 'cf_error';
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return reply(405, { ok: false });

  let email = '';
  let locale = 'es';
  try {
    const body = await req.json();
    email = String(body?.email ?? '').trim().toLowerCase();
    locale = String(body?.locale ?? 'es').slice(0, 5);
  } catch {
    return reply(400, { ok: false, message: 'Bad request.' });
  }
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return reply(400, { ok: false, message: 'Invalid email.' });
  }

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  const admin = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

  // Per-IP rate limit (5/hour) — silently treated as success so the cap isn't revealed.
  const hourAgo = new Date(Date.now() - 3_600_000).toISOString();
  const { count: ipCount } = await admin
    .from('access_requests').select('id', { count: 'exact', head: true })
    .eq('ip', ip).gte('created_at', hourAgo);
  if ((ipCount ?? 0) >= 5) return reply(200, GENERIC);

  // Dedupe: same email within 24h -> don't re-invite (anti-spam), generic success.
  const dayAgo = new Date(Date.now() - 86_400_000).toISOString();
  const { data: recent } = await admin
    .from('access_requests').select('id').eq('email', email).gte('created_at', dayAgo).limit(1);
  if (recent && recent.length > 0) return reply(200, GENERIC);

  // Send the Supabase invite. Existing user -> inviteUserByEmail errors; swallow (no enumeration).
  let status = 'invited';
  const { error } = await admin.auth.admin.inviteUserByEmail(email, { redirectTo: `${SITE_URL}/cuenta/` });
  if (error) status = 'invite_skipped';

  const cf = await addToCloudflareAccess(email);
  await admin.from('access_requests').insert({ email, ip, locale, status: `${status}:${cf}` });

  return reply(200, GENERIC);
});
