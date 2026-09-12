import { getServerSession } from "next-auth/next";
import { createMediaHandler } from "next-tinacms-cloudinary/dist/handlers";

import { authOptions } from "../../../tina/auth-options";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

// Inlined rather than imported (next-tinacms-cloudinary's own
// `mediaHandlerConfig` value) — Turbopack requires this export to be a
// statically-analyzable literal, not a re-exported reference.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default createMediaHandler({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  authorized: async (req, res) => {
    if (isLocal) return true;

    // Mirrors AuthJsBackendAuthProvider's own isAuthorized check exactly
    // (tinacms-authjs/dist/index.js) rather than TinaCloud's @tinacms/auth
    // isAuthorized, which verifies a different (TinaCloud-issued) token
    // shape our self-hosted sessions don't have.
    const session = await getServerSession(req, res, authOptions);
    return session?.user?.role === "user";
  },
});
