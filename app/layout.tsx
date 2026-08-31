import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Mel McCutcheon | Jazz Vocalist",
  description:
    "Mel McCutcheon — jazz vocalist on Vancouver Island. Singing silky smooth, sweet, and sometimes a wee bit sticky.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={archivo.variable}>
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
