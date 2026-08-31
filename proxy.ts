import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// The TinaCMS admin bundle only has a working content API to talk to during
// local development (`npm run dev`). Until TinaCloud or a self-hosted
// content API is wired up for production, /admin is blocked by default —
// everywhere except where TINA_ADMIN_ENABLED=true is explicitly set (see
// .env, which is gitignored and not present on Vercel unless added there).
// Deliberately not keyed off NODE_ENV: that value isn't guaranteed to be
// exactly "production" in every environment this runs in.
//
// On top of that, when enabled, /admin requires an HTTP Basic Auth login
// (TINA_ADMIN_USER / TINA_ADMIN_PASSWORD) — this stands in for a real
// per-user login until TinaCloud (or a self-hosted content API) is wired up.
export function proxy(request: NextRequest) {
  if (process.env.TINA_ADMIN_ENABLED !== "true") {
    return new NextResponse("Not found", { status: 404 });
  }

  const expectedUser = process.env.TINA_ADMIN_USER;
  const expectedPassword = process.env.TINA_ADMIN_PASSWORD;

  if (expectedUser && expectedPassword) {
    const authHeader = request.headers.get("authorization");
    const [user, password] = decodeBasicAuth(authHeader);

    if (user !== expectedUser || password !== expectedPassword) {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Mel McCutcheon Admin"' },
      });
    }
  }

  return NextResponse.next();
}

function decodeBasicAuth(authHeader: string | null): [string?, string?] {
  if (!authHeader?.startsWith("Basic ")) {
    return [];
  }
  try {
    const decoded = atob(authHeader.slice("Basic ".length));
    const separatorIndex = decoded.indexOf(":");
    if (separatorIndex === -1) {
      return [];
    }
    return [decoded.slice(0, separatorIndex), decoded.slice(separatorIndex + 1)];
  } catch {
    return [];
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
