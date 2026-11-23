#!/usr/bin/env node
// Emails the "Show updates" subscribers about shows newly added to the
// homepage's Upcoming list. Run by .github/workflows/notify-new-shows.yml on
// every push to main that touches the homepage content.
//
//   node scripts/notify-new-shows.mjs <before-sha>
//
// A show counts as new when its date + venue wasn't in Upcoming at
// <before-sha>, so fixing a typo in a title doesn't resend it, moving a show
// to Past never sends anything, and several shows added at once go out in
// one email. Set DRY_RUN=1 to write the email to notify-preview.html instead
// of sending it.
//
// Env: RESEND_API_KEY, RESEND_FROM (optional), SITE_URL (optional),
//      MAILING_ADDRESS (optional; CASL requires a postal address).

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const CONTENT = "content/homepage/home.json";
const SEGMENT_NAME = "Show updates";
const SITE_URL = (process.env.SITE_URL || "https://www.melmccutcheon.ca").replace(/\/$/, "");
const FROM = process.env.RESEND_FROM || "Mel McCutcheon <onboarding@resend.dev>";
const REPLY_TO = "productionsbyblackbird@gmail.com";
const MAILING_ADDRESS = process.env.MAILING_ADDRESS || "1056 Cordero Cres, Campbell River, BC, Canada";
const DRY_RUN = !!process.env.DRY_RUN;

const before = process.argv[2];

const upcoming = (json) => (JSON.parse(json).shows?.upcoming ?? []).filter((ev) => ev && ev.day && ev.month);
const norm = (s) => String(s ?? "").trim().toLowerCase().replace(/\s+/g, " ");
const key = (ev) => `${norm(ev.month)}-${Number(ev.day)}-${norm(ev.venue)}`;

function previousUpcoming() {
  if (!before || /^0+$/.test(before)) return null;
  try {
    return upcoming(execFileSync("git", ["show", `${before}:${CONTENT}`], { encoding: "utf8" }));
  } catch {
    return null; // File didn't exist then, or the commit isn't available.
  }
}

const prev = previousUpcoming();
if (!prev) {
  console.log("No previous version to compare against; nothing to send.");
  process.exit(0);
}

const seen = new Set(prev.map(key));
const added = upcoming(readFileSync(CONTENT, "utf8")).filter((ev) => !seen.has(key(ev)));
if (!added.length) {
  console.log("No new upcoming shows.");
  process.exit(0);
}
console.log(`New shows: ${added.map((ev) => `${ev.month} ${ev.day} ${ev.title || ev.venue}`).join("; ")}`);

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const abs = (href) => (/^https?:\/\//.test(href) ? href : `${SITE_URL}${href.startsWith("/") ? "" : "/"}${href}`);
const link = (href) => !!href && href !== "#";

const button = (href, label) =>
  `<a href="${esc(abs(href))}" style="display:inline-block;margin:0 8px 8px 0;padding:10px 18px;border:1px solid #a97f3f;color:#a97f3f;text-decoration:none;font-size:13px;letter-spacing:.08em;text-transform:uppercase">${label}</a>`;

function showBlock(ev) {
  const where = [ev.venue, ev.detail].filter(Boolean).map(esc).join(", ");
  const meta = [ev.time, ev.price].filter(Boolean).map(esc).join(" · ");
  return `<tr><td style="padding:24px 0;border-top:1px solid #e3ddd2">
  ${ev.poster ? `<img src="${esc(abs(ev.poster))}" alt="" width="220" style="display:block;width:220px;max-width:100%;height:auto;margin:0 0 16px;border:1px solid #e3ddd2">` : ""}
  <p style="margin:0 0 6px;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:#a97f3f">${esc(ev.month)} ${esc(ev.day)}</p>
  ${ev.title ? `<p style="margin:0 0 6px;font-size:20px;font-weight:bold;line-height:1.25">${esc(ev.title)}</p>` : ""}
  <p style="margin:0 0 4px;font-size:16px">${where}</p>
  ${meta ? `<p style="margin:0 0 14px;font-size:15px;color:#6b6457">${meta}</p>` : ""}
  ${link(ev.ticketsHref) ? button(ev.ticketsHref, "Tickets") : ""}${link(ev.detailsHref) ? button(ev.detailsHref, "Details") : ""}
</td></tr>`;
}

const many = added.length > 1;
const subject = many
  ? `${added.length} new shows from Mel McCutcheon`
  : `New show: ${added[0].title || added[0].venue}, ${added[0].month} ${added[0].day}`;

const html = `<!doctype html><html><body style="margin:0;background:#f6f3ee;font-family:Helvetica,Arial,sans-serif;color:#1a1814">
<div style="max-width:560px;margin:0 auto;padding:40px 24px">
  <p style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#a97f3f;margin:0 0 12px">Mel McCutcheon</p>
  <h1 style="font-size:28px;margin:0 0 8px">${many ? "New shows just added" : "A new show just added"}</h1>
  <p style="font-size:16px;line-height:1.5;margin:0 0 8px">Come hear it live.</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${added.map(showBlock).join("")}</table>
  <p style="margin:12px 0 0;font-size:15px"><a href="${SITE_URL}/#shows" style="color:#a97f3f">See every upcoming show →</a></p>
  <p style="margin:40px 0 0;font-size:12px;line-height:1.6;color:#8a8273">
    You're getting this because you signed up for show updates at ${esc(SITE_URL.replace(/^https?:\/\//, ""))}.<br>
    Mel McCutcheon · ${esc(MAILING_ADDRESS)}<br>
    <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#8a8273">Unsubscribe</a>
  </p>
</div></body></html>`;

const text = [
  many ? "New shows just added:" : "A new show just added:",
  "",
  ...added.map((ev) =>
    [
      `${ev.month} ${ev.day}: ${ev.title || ev.venue}`,
      [ev.venue, ev.detail].filter(Boolean).join(", "),
      [ev.time, ev.price].filter(Boolean).join(" · "),
      link(ev.ticketsHref) ? `Tickets: ${abs(ev.ticketsHref)}` : "",
      link(ev.detailsHref) ? `Details: ${abs(ev.detailsHref)}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  ),
  "",
  `All upcoming shows: ${SITE_URL}/#shows`,
  "",
  `Mel McCutcheon · ${MAILING_ADDRESS}`,
  "Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}",
].join("\n\n");

if (DRY_RUN) {
  writeFileSync("notify-preview.html", html);
  console.log(`DRY_RUN: subject "${subject}"; wrote notify-preview.html`);
  process.exit(0);
}

const KEY = process.env.RESEND_API_KEY;
if (!KEY) {
  console.error("RESEND_API_KEY is not set");
  process.exit(1);
}

async function api(path, init = {}) {
  const res = await fetch(`https://api.resend.com${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json", ...init.headers },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${init.method || "GET"} ${path}: ${res.status} ${JSON.stringify(data)}`);
  return data;
}

const segments = await api("/segments");
const segment = segments.data?.find((s) => s.name === SEGMENT_NAME);
if (!segment) {
  console.log(`No "${SEGMENT_NAME}" segment yet (nobody has subscribed); nothing to send.`);
  process.exit(0);
}

const broadcast = await api("/broadcasts", {
  method: "POST",
  body: JSON.stringify({
    name: subject,
    segment_id: segment.id,
    from: FROM,
    reply_to: REPLY_TO,
    subject,
    html,
    text,
    send: true,
  }),
});
console.log(`Sent broadcast ${broadcast.id}`);
