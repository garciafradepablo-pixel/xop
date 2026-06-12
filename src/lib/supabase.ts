import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

// Baked in at build time — false if env vars are not set when building
export const isConfigured = !!(url && key);

export const supabase = isConfigured ? createClient(url!, key!) : null;
