// /llms.txt: a plain-text summary for AI answer engines (llmstxt.org),
// built from the homepage content so upcoming shows are always current.
import home from "@/content/homepage/home.json";
import { BLACKBIRD, MEL, SITE_URL } from "@/lib/site";
import { PERSON_DESCRIPTION, showDate, type ShowLike } from "@/lib/seo";

const line = (s: ShowLike) => {
  const when = showDate(s);
  const bits = [s.venue, s.detail, s.time, s.price].filter(Boolean).join(", ");
  const link = s.ticketsHref || s.detailsHref;
  return `- ${when?.date ?? `${s.month} ${s.day}`}: ${s.title}${bits ? `. ${bits}` : ""}${link ? ` (${link})` : ""}`;
};

export function GET() {
  const upcoming = (home.shows.upcoming as ShowLike[]).map(line).join("\n");
  const bands = home.ensembles.items
    .map((b) => `### ${b.name}\n\n${b.description.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")}`)
    .join("\n\n");
  const body = `# ${MEL.name}

> ${PERSON_DESCRIPTION}

Bookings (private events, receptions, dinners, celebrations): ${MEL.bookingEmail}

## About

${home.about.paragraphs.join("\n\n")}

## Bands and ensembles

${bands}

## Upcoming shows

${upcoming || "No shows announced right now. Follow Instagram for new dates."}

Full listings with posters and tickets: ${SITE_URL}/#shows

## Pages

- [Mel McCutcheon, jazz vocalist](${SITE_URL}/): about Mel, her bands, upcoming and past shows, audience reviews, photos and booking contact.
- [Blackbird Productions](${SITE_URL}/blackbird): live jazz on Vancouver Island. Sunday matinees at 40 Knots Winery (Comox) and Rivercity Players (Campbell River), Jazz Nights and open Jazz Jams at The Mex Pub (Courtenay).

## Links

- [Instagram, Mel McCutcheon](${MEL.instagram})
- [Facebook, Blackbird Productions](${BLACKBIRD.facebook})
- [Instagram, Blackbird Productions](${BLACKBIRD.instagram})
- [Sitemap](${SITE_URL}/sitemap.xml)
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
