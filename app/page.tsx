import client from "@/tina/__generated__/client";
import PageClient from "./page-client";

// Content is served by Tina's local content API (see README) rather than
// baked in at build time, so this route renders per-request.
export const dynamic = "force-dynamic";

export default async function Page() {
  const result = await client.queries.homepage({ relativePath: "home.json" });

  return (
    <PageClient
      query={result.query}
      variables={result.variables}
      data={result.data}
    />
  );
}
