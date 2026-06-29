// Progress management — localStorage always, Supabase when user is logged in.
// Keys match the existing system; do not rename without migrating localStorage.

export interface ProgressData {
  level1Completed: boolean;
  level2Completed: boolean;
  level3Completed: boolean;
  level1Modules: Record<string, boolean>;  // keys: "0"–"7"
  level2Modules: Record<string, boolean>;  // keys: "1"–"10"
  level3Sections: Record<string, boolean>; // keys: "1"–"8"
}

function safeLs(key: string): boolean {
  try { return localStorage.getItem(key) === 'true'; } catch { return false; }
}

export function readLocalProgress(): ProgressData {
  const l1m: Record<string, boolean> = {};
  for (let i = 0; i <= 7; i++) l1m[i] = safeLs(`moonkey_level_1_module_${i}`);

  const l2m: Record<string, boolean> = {};
  for (let i = 1; i <= 10; i++) l2m[i] = safeLs(`moonkey_level_2_module_${i}`);

  const l3s: Record<string, boolean> = {};
  for (let i = 1; i <= 8; i++) l3s[i] = safeLs(`moonkey_level_3_section_${i}`);

  return {
    level1Completed: safeLs('moonkey_level_1_completed'),
    level2Completed: safeLs('moonkey_level_2_completed'),
    level3Completed: safeLs('moonkey_level_3_completed'),
    level1Modules: l1m,
    level2Modules: l2m,
    level3Sections: l3s,
  };
}

export function countCompleted(map: Record<string, boolean>): number {
  return Object.values(map).filter(Boolean).length;
}

// Shapes the payload for the `progress` table in Supabase.
export function toSupabasePayload(data: ProgressData, userId: string) {
  return {
    user_id: userId,
    level_1_completed: data.level1Completed,
    level_2_completed: data.level2Completed,
    level_3_completed: data.level3Completed,
    level_1_modules: data.level1Modules,
    level_2_modules: data.level2Modules,
    level_3_sections: data.level3Sections,
    last_activity_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

type SbClient = import('@supabase/supabase-js').SupabaseClient;

// Coerce a raw jsonb map (string→unknown) into a clean Record<string, boolean>.
function coerceMap(raw: unknown): Record<string, boolean> {
  const out: Record<string, boolean> = {};
  if (raw && typeof raw === 'object') {
    for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
      out[k] = v === true || v === 'true';
    }
  }
  return out;
}

function mergeMap(a: Record<string, boolean>, b: Record<string, boolean>): Record<string, boolean> {
  const out: Record<string, boolean> = { ...a };
  for (const [k, v] of Object.entries(b)) out[k] = out[k] || v;
  return out;
}

// Union-merge two snapshots: a unit is complete if complete in EITHER side.
// Completion never regresses — merging cloud and local can only ADD completions,
// never erase them. This is what makes a fresh device safe (it can't blank the cloud).
export function mergeProgress(a: ProgressData, b: ProgressData): ProgressData {
  return {
    level1Completed: a.level1Completed || b.level1Completed,
    level2Completed: a.level2Completed || b.level2Completed,
    level3Completed: a.level3Completed || b.level3Completed,
    level1Modules: mergeMap(a.level1Modules, b.level1Modules),
    level2Modules: mergeMap(a.level2Modules, b.level2Modules),
    level3Sections: mergeMap(a.level3Sections, b.level3Sections),
  };
}

// Write a snapshot back into localStorage (inverse of readLocalProgress).
export function applyProgressToLocal(data: ProgressData): void {
  const set = (k: string, v: boolean) => { try { localStorage.setItem(k, v ? 'true' : 'false'); } catch { /* ignore */ } };
  set('moonkey_level_1_completed', data.level1Completed);
  set('moonkey_level_2_completed', data.level2Completed);
  set('moonkey_level_3_completed', data.level3Completed);
  for (let i = 0; i <= 7; i++) set(`moonkey_level_1_module_${i}`, !!data.level1Modules[i]);
  for (let i = 1; i <= 10; i++) set(`moonkey_level_2_module_${i}`, !!data.level2Modules[i]);
  for (let i = 1; i <= 8; i++) set(`moonkey_level_3_section_${i}`, !!data.level3Sections[i]);
}

// Tracks which user's progress currently lives in this browser's localStorage, so a
// stale snapshot from a previous account isn't union-merged into the next user's cloud.
const SYNCED_UID_KEY = 'moonkey_synced_uid';
function getSyncedUid(): string | null { try { return localStorage.getItem(SYNCED_UID_KEY); } catch { return null; } }
function setSyncedUid(uid: string): void { try { localStorage.setItem(SYNCED_UID_KEY, uid); } catch { /* ignore */ } }

export function emptyProgress(): ProgressData {
  return { level1Completed: false, level2Completed: false, level3Completed: false, level1Modules: {}, level2Modules: {}, level3Sections: {} };
}

// Wipe all progress + proof keys from localStorage. Call on logout so the next account
// on this browser can't inherit (and union-merge into the cloud) this user's completions.
export function clearLocalProgress(): void {
  const keys: string[] = [
    'moonkey_level_1_completed', 'moonkey_level_2_completed', 'moonkey_level_3_completed',
    'moonkey_level_1_proof_repo', 'moonkey_level_1_proof_url', SYNCED_UID_KEY,
  ];
  for (let i = 0; i <= 7; i++) keys.push(`moonkey_level_1_module_${i}`);
  for (let i = 1; i <= 10; i++) keys.push(`moonkey_level_2_module_${i}`);
  for (let i = 1; i <= 8; i++) keys.push(`moonkey_level_3_section_${i}`);
  try { keys.forEach((k) => localStorage.removeItem(k)); } catch { /* ignore */ }
}

// Read the user's progress row. Returns { ok } so callers can tell a FAILED read
// (ok:false → must NOT overwrite the cloud) from a confirmed-empty one (ok:true, data:null).
export async function fetchCloudProgress(client: SbClient, userId: string): Promise<{ ok: boolean; data: ProgressData | null }> {
  const { data, error } = await client
    .from('progress')
    .select('level_1_completed, level_2_completed, level_3_completed, level_1_modules, level_2_modules, level_3_sections')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) return { ok: false, data: null };   // read failed — caller must not push
  if (!data) return { ok: true, data: null };     // confirmed: no row yet
  return {
    ok: true,
    data: {
      level1Completed: data.level_1_completed === true,
      level2Completed: data.level_2_completed === true,
      level3Completed: data.level_3_completed === true,
      level1Modules: coerceMap(data.level_1_modules),
      level2Modules: coerceMap(data.level_2_modules),
      level3Sections: coerceMap(data.level_3_sections),
    },
  };
}

// Bidirectional sync for a logged-in user. Returns ok:false WITHOUT writing anything
// if the cloud read failed — a device that couldn't read the cloud must never overwrite
// it (this is what keeps the data-loss invariant airtight, even on a transient error).
// On a confirmed read: fetch cloud FIRST, then read THIS user's local (a snapshot left
// by a different account is discarded, not merged), union-merge (completion never
// regresses), and write the result back to BOTH local and cloud.
export async function syncProgress(client: SbClient, userId: string): Promise<{ ok: boolean; merged: ProgressData; error: unknown }> {
  const res = await fetchCloudProgress(client, userId);
  if (!res.ok) return { ok: false, merged: readLocalProgress(), error: new Error('cloud read failed') };

  const syncedUid = getSyncedUid();
  const local = syncedUid && syncedUid !== userId ? emptyProgress() : readLocalProgress();
  const merged = res.data ? mergeProgress(res.data, local) : local;
  applyProgressToLocal(merged);
  setSyncedUid(userId);
  const { error } = await client
    .from('progress')
    .upsert(toSupabasePayload(merged, userId), { onConflict: 'user_id' });
  return { ok: true, merged, error };
}

// Push the current local snapshot to the cloud — only safe AFTER a successful
// syncProgress (so local is a confirmed superset of the cloud for this user).
export async function pushLocalToCloud(client: SbClient, userId: string): Promise<{ error: unknown }> {
  const { error } = await client
    .from('progress')
    .upsert(toSupabasePayload(readLocalProgress(), userId), { onConflict: 'user_id' });
  return { error };
}

// Reset this user's cloud progress to empty — used by the "reset progress" action for
// logged-in users, otherwise the next syncProgress would re-pull and resurrect it.
export async function resetCloudProgress(client: SbClient, userId: string): Promise<{ error: unknown }> {
  const { error } = await client
    .from('progress')
    .upsert(toSupabasePayload(emptyProgress(), userId), { onConflict: 'user_id' });
  return { error };
}
