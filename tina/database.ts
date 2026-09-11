import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
import { GitHubProvider } from "tinacms-gitprovider-github";
import { RedisLevel } from "upstash-redis-level";
import type { AbstractLevel } from "abstract-level";

// RedisLevel's declared type only supports a `string` storage format, but
// @tinacms/datalayer's `Level` type also allows Buffer/Uint8Array — a real
// gap in upstash-redis-level's own type declarations, not a version
// mismatch. Runtime behavior is unaffected (this exact code already ran
// successfully via `tinacms build`); this cast just satisfies `next build`'s
// stricter type check.
type TinaLevel = AbstractLevel<Buffer | Uint8Array | string, string, Record<string, unknown>>;

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider: new GitHubProvider({
        branch,
        owner: process.env.GITHUB_OWNER!,
        repo: process.env.GITHUB_REPO!,
        token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN!,
      }),
      databaseAdapter: new RedisLevel({
        redis: {
          // Named "Mel_" by Vercel's Upstash marketplace integration (that's
          // the integration's name, injected as an env var prefix).
          url: process.env.Mel_KV_REST_API_URL || "http://localhost:8079",
          token: process.env.Mel_KV_REST_API_TOKEN || "example_token",
        },
        debug: process.env.DEBUG === "true" || false,
      }) as unknown as TinaLevel,
      namespace: branch,
    });
