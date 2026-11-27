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

const TITLE = "Mel McCutcheon | Jazz Singer in the Comox Valley, Vancouver Island";
const DESCRIPTION =
  "Jazz vocalist in the Comox Valley, BC. See Mel McCutcheon live with The Sharp Seven in Courtenay and Campbell River, or book a jazz trio for your event.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "/",
    siteName: "Mel McCutcheon",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/uploads/og-mel-profile-bw.jpg",
        width: 1200,
        height: 630,
        alt: "Black and white side profile of Mel McCutcheon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/uploads/og-mel-profile-bw.jpg"],
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
