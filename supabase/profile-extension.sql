-- Profile extension: personal fields for Monkey profile.
-- Safe to run multiple times — ADD COLUMN IF NOT EXISTS.
-- Run in Supabase → SQL Editor.

alter table public.profiles
  add column if not exists nickname text,
  add column if not exists operator_goal text,
  add column if not exists experience_level text,
  add column if not exists updated_at timestamptz default now();

-- RLS: authenticated users can update their own row
do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'profiles'
      and policyname = 'profiles_self_update'
  ) then
    execute 'create policy "profiles_self_update" on public.profiles
      for update using (auth.uid() = id) with check (auth.uid() = id)';
  end if;
end $$;

-- RLS: fallback insert (in case trigger didn't fire)
do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'profiles'
      and policyname = 'profiles_self_insert'
  ) then
    execute 'create policy "profiles_self_insert" on public.profiles
      for insert with check (auth.uid() = id)';
  end if;
end $$;
