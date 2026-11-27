// Structured data and plain-text summaries built from the homepage content,
// so every show added to home.json (by commit or in Tina) automatically gets
// Google event markup and shows up in /llms.txt for AI answer engines.
import { SITE_URL } from "@/lib/site";

export type ShowLike = {
  day?: string | null;
  month?: string | null;
  title?: string | null;
  venue?: string | null;
  detail?: string | null;
  time?: string | null;
  price?: string | null;
  poster?: string | null;
  detailsHref?: string | null;
  ticketsHref?: string | null;
};

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const TZ = "America/Vancouver";
const pad = (n: number) => String(n).padStart(2, "0");
const abs = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

// "Today" as a YYYY-MM-DD string in Pacific time.
function todayPacific(now: Date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(now);
}

// UTC offset like "-08:00" for a Pacific wall-clock date (handles DST).
// Computed from BC's DST rule (second Sunday of March to first Sunday of
// November) rather than Intl, whose timezone data on Vercel gave -07:00 in
// December.
function pacificOffset(y: number, m: number, d: number) {
  const nthSunday = (month: number, n: number) => {
    const first = new Date(Date.UTC(y, month - 1, 1)).getUTCDay();
    return 1 + ((7 - first) % 7) + 7 * (n - 1);
  };
  const key = m * 100 + d;
  const dst = key >= 300 + nthSunday(3, 2) && key < 1100 + nthSunday(11, 1);
  return dst ? "-07:00" : "-08:00";
}

// Start time from free text like "Sunday, 2:00 PM", "Thursday, 6–8 PM" or
// "Doors 5:30 PM, dinner 6:30 PM". Returns [hours, minutes] or null.
function startTime(text: string): [number, number] | null {
  const m = text.match(/(\d{1,2})(?::(\d{2}))?\s*(?:[–-]\s*\d{1,2}(?::\d{2})?\s*)?(AM|PM)/i);
  if (!m) return null;
  let h = Number(m[1]) % 12;
  if (m[3].toUpperCase() === "PM") h += 12;
  return [h, Number(m[2] ?? 0)];
}

// Resolve a show's date. Listings only carry day + month, so the year is the
// current one unless that month is well behind us (then it's next year's).
export function showDate(show: ShowLike, now = new Date()) {
  const mi = MONTHS.indexOf((show.month ?? "").slice(0, 3).toLowerCase());
  const day = Number(show.day);
  if (mi < 0 || !day) return null;
  const [ty, tm] = todayPacific(now).split("-").map(Number);
  const year = mi + 1 < tm - 2 ? ty + 1 : ty;
  const date = `${year}-${pad(mi + 1)}-${pad(day)}`;
  const t = startTime(show.time ?? "");
  const startDate = t ? `${date}T${pad(t[0])}:${pad(t[1])}:00${pacificOffset(year, mi + 1, day)}` : date;
  return { date, startDate };
}

const firstPrice = (text: string) => text.match(/\$\s*(\d+(?:\.\d{2})?)/)?.[1];

function location(show: ShowLike) {
  const detail = (show.detail ?? "").trim();
  const hasStreet = /\d/.test(detail);
  const [street, city] = hasStreet ? detail.split(/,\s*/) : ["", detail];
  return {
    "@type": "Place",
    name: show.venue || detail || "Vancouver Island",
    address: {
      "@type": "PostalAddress",
      ...(street ? { streetAddress: street } : {}),
      ...(city ? { addressLocality: city } : {}),
      addressRegion: "BC",
      addressCountry: "CA",
    },
  };
}

// Upcoming shows (today or later) as schema.org MusicEvents.
export function showEvents(shows: ShowLike[], now = new Date()) {
  const today = todayPacific(now);
  return shows.flatMap((show) => {
    const when = showDate(show, now);
    if (!when || when.date < today || !show.title) return [];
    const price = firstPrice(show.price ?? "");
    const ticketUrl = show.ticketsHref || show.detailsHref;
    const performers: object[] = [{ "@id": `${SITE_URL}/#mel` }];
    if (/sharp\s*(seven|7)/i.test(show.title)) performers.push({ "@id": `${SITE_URL}/#sharp-seven` });
    return [
      {
        "@type": "MusicEvent",
        name: show.title,
        startDate: when.startDate,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: location(show),
        performer: performers,
        description: [show.title, show.venue && `at ${show.venue}`, show.time, show.price].filter(Boolean).join(" · "),
        ...(show.poster ? { image: abs(show.poster) } : {}),
        url: show.detailsHref || `${SITE_URL}/#shows`,
        ...(ticketUrl || price
          ? {
              offers: {
                "@type": "Offer",
                ...(ticketUrl ? { url: ticketUrl } : {}),
                ...(price ? { price, priceCurrency: "CAD" } : {}),
                availability: "https://schema.org/InStock",
              },
            }
          : {}),
      },
    ];
  });
}

export const PERSON_DESCRIPTION =
  "Mel McCutcheon is a jazz vocalist in the Comox Valley on Vancouver Island, British Columbia. She fronts The Sharp Seven, leads the Mel McCutcheon Ensembles (duo, trio and quartet) for private events, and performs throughout Courtenay, Comox, Campbell River and Vancouver Island.";
