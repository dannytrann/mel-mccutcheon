import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const DESCRIPTION =
  "Mel McCutcheon, jazz vocalist on Vancouver Island, BC. Fronting The Sharp Seven, the Mel McCutcheon Ensembles and Vintage Velvet. Shows, bands and bookings.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Mel McCutcheon | Jazz Vocalist on Vancouver Island",
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "/",
    siteName: "Mel McCutcheon",
    title: "Mel McCutcheon | Jazz Vocalist on Vancouver Island",
    description: DESCRIPTION,
    images: [
      {
        url: "/uploads/og-mel-arms-outstretched.jpg",
        width: 1200,
        height: 630,
        alt: "Mel McCutcheon singing with her arms outstretched",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mel McCutcheon | Jazz Vocalist on Vancouver Island",
    description: DESCRIPTION,
    images: ["/uploads/og-mel-arms-outstretched.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-CA" className={archivo.variable}>
      <head>
        {/* Big Shoulders Display/Text aren't in next/font/google's bundled
            metadata yet, so they're loaded the same way the design
            reference does: a direct Google Fonts stylesheet link. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- this
            is the App Router root layout, not a Pages Router page, so this
            does apply site-wide despite the rule's Pages Router wording */}
        <link
          href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;800&family=Big+Shoulders+Text:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
