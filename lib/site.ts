// Canonical public URL. Set NEXT_PUBLIC_SITE_URL in Vercel if a custom
// domain is added later; everything (sitemap, robots, canonical tags,
// structured data) follows it.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.melmccutcheon.ca").replace(/\/$/, "");

export const MEL = {
  name: "Mel McCutcheon",
  instagram: "https://instagram.com/melmccutcheonmusic",
  realEstate: "https://melmccutcheon.royallepage.ca/",
  bookingEmail: "productionsbyblackbird@gmail.com",
};

export const BLACKBIRD = {
  name: "Blackbird Productions",
  facebook: "https://www.facebook.com/BlackbirdProductionsvanisle",
  instagram: "https://www.instagram.com/productionsbyblackbird/",
  email: "productionsbyblackbird@gmail.com",
  phone: "+1-236-508-2897",
};

// Serialize JSON-LD safely for a <script> tag (escape "<" per Next's guide).
export const jsonLd = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });
