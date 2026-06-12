-- Operator rank extension: hierarchical ranks + founder badge.
-- Incremental — safe to re-run (ADD COLUMN IF NOT EXISTS, DROP POLICY IF EXISTS).
-- Run in Supabase → SQL Editor.

-- ── 1. Add new columns ────────────────────────────────────────────────────────

alter table public.profiles
  add column if not exists operator_rank            text        not null default 'monkey',
  add column if not exists operator_rank_updated_at timestamptz,
  add column if not exists operator_rank_notes      text,
  add column if not exists founder_badge            boolean     not null default false;

-- ── 2. Set the founder profile ───────────────────────────────────────────────

update public.profiles
set
  role                      = 'founder',
  founder_badge             = true,
  operator_rank             = 'eagle',
  operator_rank_notes       = 'Founder of XNLAB / MOONKEY LAB',
  operator_rank_updated_at  = now()
where email = 'garciafradepablo@gmail.com';

-- ── 3. SELECT policy: allow all authenticated users to read all profiles ──────
--    (pilot phase — small group; harden to role-based select in a later phase)

drop policy if exists "profiles_self_read"              on public.profiles;
drop policy if exists "profiles_authenticated_read"     on public.profiles;

create policy "profiles_authenticated_read" on public.profiles
  for select to authenticated using (true);

-- ── 4. RPC: admin-only rank update (SECURITY DEFINER) ────────────────────────
--    The function checks the caller's role server-side before writing.
--    Authenticated users can CALL it but will be rejected unless role is
--    'admin' or 'founder'. /admin/ uses this instead of a direct UPDATE.

create or replace function public.update_operator_rank(
  target_id  uuid,
  new_rank   text,
  new_notes  text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'founder')
  ) then
    raise exception 'Access denied: requires admin or founder role';
  end if;

  update public.profiles
  set
    operator_rank            = new_rank,
    operator_rank_notes      = new_notes,
    operator_rank_updated_at = now()
  where id = target_id;
end;
$$;

grant execute on function public.update_operator_rank(uuid, text, text) to authenticated;

-- ── 5. NOTE — phase 1 security limitation ────────────────────────────────────
--
--  The existing "profiles_self_update" policy allows an authenticated user to
--  UPDATE any column on their own row directly (not just the safe fields).
--  /cuenta/ never sends role/operator_rank/founder_badge, so it is safe from
--  the UI. A direct API call could still abuse it.
--
--  Future hardening: replace the direct profiles.update() in /cuenta/ with a
--  dedicated RPC:
--    create function update_own_profile(nickname text, operator_goal text, experience_level text)
--    security definer — only writes those three columns.
--  Then drop or tighten "profiles_self_update".
