import { FROM, REPLY_TO, makeToken, normalizeEmail, resend } from "@/lib/subscribe";
import { SITE_URL } from "@/lib/site";

// Best-effort per-instance rate limit (instances are reused under Fluid
// Compute). Together with the honeypot field this keeps casual bots out;
// unconfirmed addresses never reach the list anyway.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(ip: string, now = Date.now()) {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function confirmEmail(link: string) {
  return `<!doctype html><html><body style="margin:0;background:#f6f3ee;font-family:Helvetica,Arial,sans-serif;color:#1a1814">
<div style="max-width:520px;margin:0 auto;padding:40px 24px">
  <p style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#a97f3f;margin:0 0 12px">Mel McCutcheon</p>
  <h1 style="font-size:26px;margin:0 0 16px">Confirm your show updates</h1>
  <p style="font-size:16px;line-height:1.55;margin:0 0 28px">Tap the button below and you'll get an email whenever Mel adds a new show. That's it, nothing else.</p>
  <a href="${link}" style="display:inline-block;background:#a97f3f;color:#fff;text-decoration:none;padding:14px 26px;font-size:14px;letter-spacing:.08em;text-transform:uppercase">Yes, keep me posted</a>
  <p style="font-size:13px;line-height:1.5;color:#6b6457;margin:28px 0 0">If you didn't ask for this, ignore this email and you won't hear from us.</p>
</div></body></html>`;
}

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (body.company) return Response.json({ ok: true });

  const email = normalizeEmail(body.email);
  if (!email) return Response.json({ error: "Please enter a valid email address." }, { status: 400 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return Response.json({ error: "Too many attempts. Try again in a few minutes." }, { status: 429 });

  const link = `${SITE_URL}/api/subscribe/confirm?token=${encodeURIComponent(makeToken(email))}`;
  const { error } = await resend().emails.send({
    from: FROM,
    to: email,
    replyTo: REPLY_TO,
    subject: "Confirm your show updates from Mel McCutcheon",
    html: confirmEmail(link),
    text: `Confirm you'd like an email whenever Mel McCutcheon adds a new show:\n\n${link}\n\nIf you didn't ask for this, ignore this email.`,
  });
  if (error) {
    console.error("subscribe: confirmation email failed", error);
    return Response.json({ error: "Something went wrong. Please try again later." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
