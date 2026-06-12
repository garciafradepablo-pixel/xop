-- MOONKEY LAB — Supabase Schema
-- Run this in the Supabase SQL editor after creating your project.
-- All tables use UUID primary keys. Auth is handled by Supabase Auth (auth.users).

-- ─────────────────────────────────────────
-- profiles
-- One row per registered user.
-- ─────────────────────────────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  display_name text,
  role        text not null default 'student',  -- 'student' | 'admin'
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Auto-create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─────────────────────────────────────────
-- progress
-- One row per user — upserted on every sync.
-- ─────────────────────────────────────────
create table if not exists public.progress (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null unique references public.profiles(id) on delete cascade,
  level_1_completed  boolean not null default false,
  level_2_completed  boolean not null default false,
  level_3_completed  boolean not null default false,
  level_1_modules    jsonb not null default '{}'::jsonb,   -- { "0": true, "1": false, … }
  level_2_modules    jsonb not null default '{}'::jsonb,   -- { "1": true, … }
  level_3_sections   jsonb not null default '{}'::jsonb,   -- { "1": true, … }
  last_activity_at   timestamptz,
  updated_at         timestamptz not null default now()
);

-- ─────────────────────────────────────────
-- feedback
-- One row per feedback submission (multiple allowed per user).
-- user_id and email are both nullable — anonymous feedback accepted.
-- ─────────────────────────────────────────
create table if not exists public.feedback (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid references public.profiles(id) on delete set null,
  email                 text,
  level                 text not null default '1',
  most_useful           text,
  most_confusing        text,
  wants_advanced_access boolean not null default false,
  wants_collaboration   boolean not null default false,
  message               text,
  created_at            timestamptz not null default now()
);

-- ─────────────────────────────────────────
-- leads
-- Email capture from any form/source.
-- ─────────────────────────────────────────
create table if not exists public.leads (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  source     text,     -- 'login', 'feedback', 'planes', 'soporte', etc.
  interest   text,     -- 'advanced_access', 'collaboration', 'team', etc.
  language   text not null default 'es',
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────
-- RLS (Row Level Security)
-- Enable for all tables. Users can only read/write their own rows.
-- Admin role reads all — implement via service_role key server-side,
-- or via a custom check_admin() function if using the anon key.
-- ─────────────────────────────────────────

alter table public.profiles  enable row level security;
alter table public.progress  enable row level security;
alter table public.feedback  enable row level security;
alter table public.leads     enable row level security;

-- profiles: user sees and edits only their own row
create policy "profiles_self_read"   on public.profiles for select using (auth.uid() = id);
create policy "profiles_self_update" on public.profiles for update using (auth.uid() = id);

-- progress: user reads and upserts only their own row
create policy "progress_self_read"   on public.progress for select using (auth.uid() = user_id);
create policy "progress_self_upsert" on public.progress for insert with check (auth.uid() = user_id);
create policy "progress_self_update" on public.progress for update using (auth.uid() = user_id);

-- feedback: anyone can insert (anonymous ok); user reads own rows
create policy "feedback_insert_any"  on public.feedback for insert with check (true);
create policy "feedback_self_read"   on public.feedback for select using (auth.uid() = user_id);

-- leads: insert only (no user-facing read)
create policy "leads_insert_any"     on public.leads for insert with check (true);

-- ─────────────────────────────────────────
-- ADMIN NOTE
-- To query all rows from the admin panel use the service_role key
-- (never expose it to the browser). The /admin page currently uses
-- the anon key — replace with a server-side edge function or
-- Supabase Studio for real admin queries until proper auth is set up.
-- ─────────────────────────────────────────
