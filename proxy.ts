import { NextResponse } from "next/server";

// The TinaCMS admin bundle only has a working content API to talk to during
// local development (`npm run dev`). Until TinaCloud or a self-hosted
// content API is wired up for production, /admin is blocked by default —
// everywhere except where TINA_ADMIN_ENABLED=true is explicitly set (see
// .env, which is gitignored and not present on Vercel unless added there).
// Deliberately not keyed off NODE_ENV: that value isn't guaranteed to be
// exactly "production" in every environment this runs in.
export function proxy() {
  if (process.env.TINA_ADMIN_ENABLED !== "true") {
    return new NextResponse("Not found", { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
