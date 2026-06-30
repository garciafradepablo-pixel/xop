-- access_requests: self-serve invitation tracking (rate-limit + dedupe + CF logging)
create table access_requests (
  id bigint primary key generated always as identity,
  created_at timestamp with time zone not null default now(),
  email text not null,
  ip text,
  locale text default 'es',
  status text default 'pending'
);

-- RLS: admin read-only, service_role full, anon/authenticated have no access
alter table access_requests enable row level security;

create policy "service_role_all" on access_requests
  for all using (auth.role() = 'service_role');

create policy "admin_read" on access_requests
  for select using (
    auth.role() = 'authenticated' 
    and (select is_admin(auth.uid()))
  );

-- Index for rate-limit queries (IP + recent timestamp)
create index access_requests_ip_created on access_requests(ip, created_at desc);
create index access_requests_email_created on access_requests(email, created_at desc);
