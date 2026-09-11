import client from "@/tina/__generated__/databaseClient";
import PageClient from "./page-client";
import PageStatic from "./page-static";
import fallbackData from "@/content/homepage/home.json";
import type { HomepageData } from "@/lib/tina-types";

type HomepageResult = Awaited<ReturnType<typeof client.queries.homepage>>;

// Render per-request rather than pre-rendering at build time. The query
// itself is fast (~500ms, verified directly) but Next's build-time static
// generation wraps fetch() with its own caching/dedup machinery that
// resolve()'s many underlying Upstash REST calls don't play well with —
// reliably times out after 60s during `next build`, even though the exact
// same call completes quickly as a live request outside that code path.
export const dynamic = "force-dynamic";

// databaseClient resolves directly against tina/database.ts (in-process,
// no network round trip) rather than an HTTP content API, so this succeeds
// or throws immediately — no fetch timeout needed. Still wrapped in a
// try/catch: if the self-hosted backend is misconfigured or a dependency
// (GitHub, Redis) is briefly unavailable, the public site should still
// render from the content bundled at build time rather than 500.
async function fetchHomepage(): Promise<HomepageResult | null> {
  try {
    return await client.queries.homepage({ relativePath: "home.json" });
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
      // databaseClient resolves in-process (unlike the old HTTP client,
      // which implicitly flattened everything to plain JSON via
      // Response.json()), so its result can carry non-plain values a
      // Server → Client Component boundary rejects. Round-tripping through
      // JSON strips those, same as an HTTP response would have.
      data={JSON.parse(JSON.stringify(result.data))}
    />
  );
}
