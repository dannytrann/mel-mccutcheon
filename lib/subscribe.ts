import { createHmac, timingSafeEqual } from "node:crypto";
import { Resend } from "resend";

// Show-update subscriptions, backed by Resend (provisioned through the Vercel
// Marketplace; RESEND_API_KEY comes from the integration).
//
// Flow: the form POSTs an email to /api/subscribe, which emails a signed
// confirmation link. Only when that link is opened (/api/subscribe/confirm)
// is the address added to the "Show updates" segment. New shows are then
// announced to that segment by scripts/notify-new-shows.mjs.

export const SEGMENT_NAME = "Show updates";

// Until a sending domain is verified in Resend, only onboarding@resend.dev
// works (and it only delivers to the Resend account owner). Set RESEND_FROM
// once the domain is verified, e.g. "Mel McCutcheon <shows@example.com>".
export const FROM = process.env.RESEND_FROM || "Mel McCutcheon <onboarding@resend.dev>";
export const REPLY_TO = "productionsbyblackbird@gmail.com";

let client: Resend | undefined;
export function resend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  return (client ??= new Resend(key));
}

let segmentId: string | undefined;
// Finds the "Show updates" segment, creating it the first time.
export async function getSegmentId() {
  if (segmentId) return segmentId;
  const list = await resend().segments.list();
  if (list.error) throw new Error(list.error.message);
  const found = list.data?.data.find((s) => s.name === SEGMENT_NAME);
  if (found) return (segmentId = found.id);
  const created = await resend().segments.create({ name: SEGMENT_NAME });
  if (created.error || !created.data) throw new Error(created.error?.message ?? "Could not create segment");
  return (segmentId = created.data.id);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export function normalizeEmail(input: unknown) {
  if (typeof input !== "string") return null;
  const email = input.trim().toLowerCase();
  return email.length <= 254 && EMAIL_RE.test(email) ? email : null;
}

// Signed, expiring confirmation tokens, so no database is needed to hold
// pending sign-ups.
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function secret() {
  const s = process.env.SUBSCRIBE_SECRET;
  if (!s) throw new Error("SUBSCRIBE_SECRET is not set");
  return s;
}

const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("base64url");

export function makeToken(email: string, now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({ e: email, t: now })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function readToken(token: string | null, now = Date.now()): string | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const { e, t } = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof e !== "string" || typeof t !== "number" || now - t > TOKEN_TTL_MS) return null;
    return normalizeEmail(e);
  } catch {
    return null;
  }
}

// Adds (or re-subscribes) a confirmed address to the segment.
export async function addSubscriber(email: string) {
  const id = await getSegmentId();
  const created = await resend().contacts.create({ email, unsubscribed: false, segments: [{ id }] });
  if (!created.error) return;
  // Already a contact: make sure they're subscribed and in the segment.
  const updated = await resend().contacts.update({ email, unsubscribed: false });
  if (updated.error) throw new Error(updated.error.message);
  const added = await resend().contacts.segments.add({ email, segmentId: id });
  if (added.error && !/already/i.test(added.error.message)) throw new Error(added.error.message);
}
