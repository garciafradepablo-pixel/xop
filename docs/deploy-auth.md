# MOONKEY LAB — Auth Deploy Guide

Checklist to go from "Acceso privado en activación" to a live magic-link system.

---

## 1. Supabase project setup

1. Open [supabase.com](https://supabase.com) → your project (moonkey-lab / `wuchsslgbqlhyxljsmxi`)
2. Settings → API → copy:
   - **Project URL** → `PUBLIC_SUPABASE_URL`
   - **anon public key** → `PUBLIC_SUPABASE_ANON_KEY`

---

## 2. Set env vars in your deployment platform

### Cloudflare Pages
Workers & Pages → moonkey-lab → Settings → Environment variables → Production

| Variable | Value |
|---|---|
| `PUBLIC_SUPABASE_URL` | `https://wuchsslgbqlhyxljsmxi.supabase.co` |
| `PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` (anon key) |

Add the same vars under **Preview** if you use preview deployments.

Trigger a redeploy after saving (the build reads env vars at build time — Vite tree-shakes the entire Supabase module when they're missing).

### Vercel / Netlify
Same variable names under Project Settings → Environment Variables.

---

## 3. Supabase Auth — Site URL and Redirect URLs

Authentication → URL Configuration:

| Setting | Value |
|---|---|
| **Site URL** | `https://moonkeylab.com` (your prod domain) |
| **Redirect URLs** | `https://moonkeylab.com/cuenta/` |
| | `https://moonkeylab.com/en/cuenta/` |
| | `http://localhost:4321/cuenta/` |
| | `http://localhost:4321/en/cuenta/` |

Without the redirect URLs listed here, Supabase will reject the magic-link callback.

---

## 4. Email templates

Authentication → Email Templates → **Magic Link**

Paste the contents of `supabase/emails/magic-link.html` (create this file if it doesn't exist — Supabase's default template is functional but unbranded).

Minimum required template:

```html
<h2>Tu enlace de acceso a MOONKEY LAB</h2>
<p>Haz clic en el enlace de abajo para entrar. Válido durante 1 hora.</p>
<p><a href="{{ .ConfirmationURL }}">Entrar a MOONKEY LAB →</a></p>
<p style="color:#94a3b8;font-size:12px">Si no solicitaste este enlace, ignora este email.</p>
```

For the **welcome email** (sent on first signup via `signInWithOtp`): Supabase uses the same Magic Link template for first-time and returning users. The welcome panel on `/cuenta` is triggered client-side by detecting `type=signup` in the URL hash — it does not depend on a separate email.

---

## 5. SMTP (avoid spam / rate limits)

Supabase's built-in email sender has a 3 emails/hour limit and deliverability issues.

For demos and early users: set up a custom SMTP provider.

Authentication → SMTP Settings → Enable custom SMTP:

| Provider | Free tier | Setup time |
|---|---|---|
| Resend | 3k emails/month | ~5 min |
| Brevo (Sendinblue) | 300/day | ~10 min |
| Postmark | 100/month | ~10 min |

Add your domain's SPF/DKIM records (the provider will show you exactly what to add in your DNS).

---

## 6. Supabase tables

The code expects these tables. Run migrations if they don't exist:

```sql
-- profiles: operator metadata
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  nickname text,
  operator_goal text,
  experience_level text,
  operator_rank text default 'monkey',
  founder_badge boolean default false,
  updated_at timestamptz default now()
);

-- progress: localStorage sync
create table if not exists progress (
  user_id uuid references auth.users on delete cascade primary key,
  level_1 jsonb default '{}',
  level_2 jsonb default '{}',
  level_3 jsonb default '{}',
  updated_at timestamptz default now()
);
```

RLS policies (open for now — tighten before scaling):

```sql
alter table profiles enable row level security;
create policy "Users manage own profile" on profiles
  for all using (auth.uid() = id);

alter table progress enable row level security;
create policy "Users manage own progress" on progress
  for all using (auth.uid() = user_id);
```

---

## 7. Test the magic-link flow

1. Trigger a redeploy with the env vars set
2. Go to `/login` — the form should appear (no "Acceso privado en activación" message)
3. Enter a real email → click "Enviar enlace de acceso →"
4. Check inbox → click the link → should land on `/cuenta/`
5. `/cuenta/` should show "SESIÓN ACTIVA" + your email
6. If it's a new account: welcome panel appears with invite link
7. Invite section should show your personal link with copy + share buttons
8. Progress counter should reflect any completed modules

---

## 8. Verifying the build includes auth JS

```bash
# Build with env vars present:
PUBLIC_SUPABASE_URL=https://... PUBLIC_SUPABASE_ANON_KEY=eyJ... npm run build

# Should produce JS files in dist/:
ls dist/_astro/*.js | wc -l
# Expect ~6 files (supabase bundle is ~120 KB)
# Without env vars: 0 files (tree-shaken away)
```
