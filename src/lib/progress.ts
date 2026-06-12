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

// Syncs local progress to Supabase if user is logged in.
// Safe to call even if supabase is null — returns silently.
export async function syncProgressToCloud(
  supabaseClient: import('@supabase/supabase-js').SupabaseClient,
  userId: string
) {
  const data = readLocalProgress();
  const payload = toSupabasePayload(data, userId);
  await supabaseClient
    .from('progress')
    .upsert(payload, { onConflict: 'user_id' });
}
