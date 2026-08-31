"use client";

import HomePage from "@/components/HomePage";
import type { HomepageData } from "@/lib/tina-types";

// Renders the bundled content file with no live-editing wiring. Used when
// no Tina content API is reachable (e.g. a plain production deploy with no
// TinaCloud/self-hosted backend configured yet). Still a client component,
// like page-client.tsx, because component internals call tinaField() from
// tinacms/dist/react, which isn't safe to evaluate in a server-only module
// graph (it calls React.createContext() at import time).
export default function PageStatic({ data }: { data: HomepageData }) {
  return <HomePage data={data} />;
}
