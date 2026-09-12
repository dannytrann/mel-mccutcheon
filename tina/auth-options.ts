import { TinaAuthJSOptions } from "tinacms-authjs";
import type { DefaultSession } from "next-auth";
import databaseClient from "./__generated__/databaseClient";

// TinaAuthJSOptions' jwt/session callbacks (tinacms-authjs/dist/index.js)
// add `role`/`passwordChangeRequired` to the session at runtime, but don't
// ship a type augmentation for it — declare it so `session.user.role`
// type-checks wherever a route reads it back out.
declare module "next-auth" {
  interface Session {
    user: {
      role?: "user" | "guest";
      passwordChangeRequired?: boolean;
    } & DefaultSession["user"];
  }
}

// Shared between pages/api/tina/[...routes].ts and any other route that
// needs to recognize the same Auth.js session (e.g. the Cloudinary media
// upload route) — both must construct NextAuth options identically or a
// session established by one won't be recognized by the other.
export const authOptions = TinaAuthJSOptions({
  databaseClient,
  secret: process.env.NEXTAUTH_SECRET!,
});
