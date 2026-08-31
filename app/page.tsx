import client from "@/tina/__generated__/client";
import PageClient from "./page-client";
import PageStatic from "./page-static";
import fallbackData from "@/content/homepage/home.json";
import type { HomepageData } from "@/lib/tina-types";

type HomepageResult = Awaited<ReturnType<typeof client.queries.homepage>>;

// Prefer live content from Tina's content API (local dev server, or
// TinaCloud/self-hosted in production once configured) so editors get
// real-time visual editing. If no content API is reachable — e.g. a plain
// Vercel deploy with no Tina backend wired up yet — fall back to the
// content file bundled at build time, so the public site always renders.
async function fetchHomepage(): Promise<HomepageResult | null> {
  try {
    return await client.queries.homepage(
      { relativePath: "home.json" },
      { fetchOptions: { signal: AbortSignal.timeout(3000) } }
    );
  } catch {
    return null;
  }
}

export default async function Page() {
  const result = await fetchHomepage();

  if (!result) {
    return <PageStatic data={fallbackData as unknown as HomepageData} />;
  }

  return (
    <PageClient
      query={result.query}
      variables={result.variables}
      data={result.data}
    />
  );
}
