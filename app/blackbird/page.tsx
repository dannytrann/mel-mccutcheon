import type { Metadata } from "next";
import homeData from "@/content/homepage/home.json";
import type { HomepageData } from "@/lib/tina-types";
import { BLACKBIRD, SITE_URL, jsonLd } from "@/lib/site";
import BlackbirdContent from "./BlackbirdContent";

const TITLE = "Blackbird Productions | Live Jazz in Campbell River and Comox, BC";
const DESCRIPTION =
  "Blackbird Productions brings people together through music, art and community on Vancouver Island. Sunday jazz matinees at 40 Knots Winery and Rivercity Players, Jazz Nights and Jams at The Mex Pub.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blackbird" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "/blackbird",
    siteName: "Blackbird Productions",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/blackbird/40knots-sunset.jpg", alt: "The 40 Knots Winery vineyard at sunset" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/blackbird/40knots-sunset.jpg"],
  },
};

const ORG_ID = `${SITE_URL}/blackbird#org`;

const place = (name: string, street: string, city: string) => ({
  "@type": "Place",
  name,
  address: { "@type": "PostalAddress", streetAddress: street, addressLocality: city, addressRegion: "BC", addressCountry: "CA" },
});

const MEX = place("The Mex Pub", "1001 Ryan Road", "Courtenay");

const event = (name: string, startDate: string, endDate: string, location: object, url: string, offers?: object) => ({
  "@type": "MusicEvent",
  name,
  startDate,
  endDate,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location,
  organizer: { "@id": ORG_ID },
  url,
  ...(offers ? { offers } : {}),
});

const blackbirdJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: BLACKBIRD.name,
      url: `${SITE_URL}/blackbird`,
      description: DESCRIPTION,
      email: `mailto:${BLACKBIRD.email}`,
      telephone: BLACKBIRD.phone,
      foundingDate: "2025-11-22",
      areaServed: ["Campbell River, BC", "Comox, BC", "Courtenay, BC", "Vancouver Island"],
      sameAs: [BLACKBIRD.facebook, BLACKBIRD.instagram],
    },
    event(
      "Jazz Jam",
      "2026-11-26T18:00:00-08:00",
      "2026-11-26T20:00:00-08:00",
      MEX,
      BLACKBIRD.facebook,
    ),
    event(
      "Jazz Night, Swingin’ Christmas",
      "2026-12-10T18:00:00-08:00",
      "2026-12-10T20:00:00-08:00",
      MEX,
      "https://www.facebook.com/events/1065221926539062/",
    ),
    event(
      "The Sarah Stevenson Trio, Christmas Matinee",
      "2026-12-20T13:30:00-08:00",
      "2026-12-20T15:30:00-08:00",
      place("40 Knots Winery", "2400 Anderton Road", "Comox"),
      "https://www.facebook.com/events/1733905401011973/",
      {
        "@type": "Offer",
        url: "https://admitone.com/events/comox/community/music/the-sarah-stevenson-trio-aegean/P36NYF",
        availability: "https://schema.org/InStock",
      },
    ),
  ],
};

export default function BlackbirdPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(blackbirdJsonLd)} />
      <BlackbirdContent data={homeData as unknown as HomepageData} />
    </>
  );
}
