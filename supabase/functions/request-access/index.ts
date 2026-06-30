// Edge Function: request-access
// Automatic self-serve invitation + Cloudflare Access Group management.
// Deploy: supabase functions deploy request-access --project-ref wuchsslgbqlhyxljsmxi --no-verify-jwt

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

// Optional Cloudflare Access integration
const CF_API_TOKEN = Deno.env.get("CF_API_TOKEN");
const CF_ACCOUNT_ID = Deno.env.get("CF_ACCOUNT_ID");
const CF_ACCESS_GROUP_ID = Deno.env.get("CF_ACCESS_GROUP_ID");

interface RequestBody {
  email?: string;
  locale?: string;
}

interface CloudflareGroup {
  id: string;
  include: Array<{ email: string }>;
}

// Rate limit: 5 requests per IP per hour
async function checkRateLimit(ip: string, supabase: any): Promise<boolean> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("access_requests")
    .select("id", { count: "exact" })
    .eq("ip", ip)
    .gte("created_at", oneHourAgo);

  return (count ?? 0) < 5;
}

// Dedupe: same email can't request twice in 24h
async function checkDedupe(email: string, supabase: any): Promise<any | null> {
  const twentyFourHoursAgo = new Date(
    Date.now() - 24 * 60 * 60 * 1000
  ).toISOString();
  const { data } = await supabase
    .from("access_requests")
    .select("*")
    .eq("email", email)
    .gte("created_at", twentyFourHoursAgo)
    .single();

  return data ?? null;
}

// Validate email format
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.trim() ?? "");
}

// Add email to Cloudflare Access Group
async function addToCFAccessGroup(email: string): Promise<string | null> {
  if (!CF_API_TOKEN || !CF_ACCOUNT_ID || !CF_ACCESS_GROUP_ID) {
    return "cf_skipped";
  }

  try {
    const baseUrl = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/access/groups/${CF_ACCESS_GROUP_ID}`;

    const getResp = await fetch(baseUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${CF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!getResp.ok) {
      console.error(`CF GET failed: ${getResp.status}`);
      return "cf_get_failed";
    }

    const { result } = (await getResp.json()) as { result: CloudflareGroup };
    const group = result;

    if (group.include?.some((i) => i.email === email)) {
      return "cf_already_member";
    }

    const updated = {
      include: [...(group.include ?? []), { email }],
    };

    const putResp = await fetch(baseUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${CF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    });

    if (!putResp.ok) {
      console.error(`CF PUT failed: ${putResp.status}`);
      return "cf_put_failed";
    }

    return "cf_added";
  } catch (err) {
    console.error("CF Access error:", err);
    return "cf_error";
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }

  try {
    const body: RequestBody = await req.json();
    const email = body.email?.trim().toLowerCase();
    const locale = body.locale ?? "es";

    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({
          ok: true,
          message: "Si el email es válido, recibirás una invitación.",
        }),
        {
          status: 200,
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );
    }

    const ip = req.headers.get("CF-Connecting-IP") ?? "unknown";
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const passedRateLimit = await checkRateLimit(ip, supabase);
    if (!passedRateLimit) {
      return new Response(
        JSON.stringify({
          ok: true,
          message: "Si el email es válido, recibirás una invitación.",
        }),
        {
          status: 200,
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );
    }

    const existing = await checkDedupe(email, supabase);
    if (existing) {
      await supabase.from("access_requests").insert({
        email,
        ip,
        locale,
        status: "deduplicated",
      });

      return new Response(
        JSON.stringify({
          ok: true,
          message: "Si el email es válido, recibirás una invitación.",
        }),
        {
          status: 200,
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );
    }

    let invited = false;
    try {
      await supabase.auth.admin.inviteUserByEmail(email, {
        redirectTo: `${Deno.env.get("SITE_URL") ?? "https://xop-50a.pages.dev"}/login`,
      });
      invited = true;
    } catch (err: any) {
      const inviteError = err.message ?? String(err);
      if (inviteError.toLowerCase().includes("already")) {
        invited = true;
      }
    }

    const cfResult = await addToCFAccessGroup(email);
    const finalStatus = [
      invited ? "invited" : "invite_failed",
      cfResult,
    ]
      .filter(Boolean)
      .join(",");

    await supabase.from("access_requests").insert({
      email,
      ip,
      locale,
      status: finalStatus,
    });

    return new Response(
      JSON.stringify({
        ok: true,
        message: "Si el email es válido, recibirás una invitación.",
      }),
      {
        status: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
  } catch (err) {
    console.error("Unhandled error:", err);
    return new Response(
      JSON.stringify({
        ok: true,
        message: "Si el email es válido, recibirás una invitación.",
      }),
      {
        status: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
  }
});
