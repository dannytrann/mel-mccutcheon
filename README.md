# Mel McCutcheon — Music Site

Next.js (App Router, TypeScript) implementation of the design in
`design_handoff_mel_mccutcheon_site/`, wired up to TinaCMS for visual,
click-to-edit content editing.

## Getting started

```bash
npm install
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Visual editor: [http://localhost:3000/admin](http://localhost:3000/admin)

`npm run dev` runs Tina's local content server alongside `next dev`. No
TinaCloud account is required for local editing — content is read from and
saved directly to `content/homepage/home.json` on your filesystem, and images
upload to `public/uploads/`. Click "Enter Edit Mode" in `/admin` to get the
click-to-edit overlay on the live site, or use the sidebar form. After
editing, commit and push the changed `content/homepage/home.json` (and any
new files under `public/uploads/`) so the deployed site picks up the change.

## Content model

All editable copy and images live in `content/homepage/home.json`, shaped by
the schema in `tina/config.ts` (one `homepage` collection, one document). This
covers nav, hero, about, music, events, gallery, shop, and contact/footer —
matching the sections in the original design handoff.

## Photos

The hero, about, and gallery images currently use band/performance photos
found in the project folder (none are final promotional photography). Swap
them any time via the visual editor's image fields, or by replacing files in
`public/uploads/`.

## How content is served

`app/page.tsx` tries Tina's content API first (so a running local `npm run
dev` gets live, click-to-edit content); if no content API is reachable — the
case for any plain deploy with no Tina backend configured — it falls back to
`content/homepage/home.json` bundled at build time. This means the public
site always renders correctly, with or without a live content API behind it,
and `next build` produces a fully static `/` page with no runtime
dependencies.

## `/admin` in production

`proxy.ts` blocks `/admin` (returns 404) unless the environment variable
`TINA_ADMIN_ENABLED=true` is set. It's on by default locally via `.env`
(gitignored) so `npm run dev` keeps working; it is **not** set for
production deploys, so the editor stays unreachable there until a real
content API backs it (see below) — otherwise it would show a "Log in" screen
with nothing behind it to authenticate against.

## Deploying (e.g. Vercel)

The public site deploys as-is with zero extra setup — it's a static page with
no runtime content-API dependency. `npm run build` (`tinacms build --local
--skip-cloud-checks && next build`) is safe to use as the build command on
any host, including Vercel.

To get the visual editor working in production too, you need a real content
API for it to talk to:

- **Recommended: [TinaCloud](https://tina.io)** (free tier available).
  Connect the project's GitHub repo in the TinaCloud dashboard, then set
  `NEXT_PUBLIC_TINA_CLIENT_ID`, `TINA_TOKEN`, and `TINA_ADMIN_ENABLED=true` as
  environment variables on your host, and switch the build script's Tina step
  from `tinacms build --local --skip-cloud-checks` to plain `tinacms build`.
  This was attempted for this project but blocked by a TinaCloud dashboard
  error ("Could not load the project") — worth retrying, or filing with Tina
  support, before trying the self-hosted route below.
- **Alternative: self-host the content API** with `@tinacms/datalayer` behind
  a Next.js route handler. This needs its own infrastructure — a GitHub token
  so the API can write content back to the repo, and a small persistent
  key-value store (e.g. Upstash Redis) since serverless functions can't hold
  local state between requests — plus hand-rolled auth for `/admin` (no
  TinaCloud login to lean on). Not set up in this project yet; ask if you
  want it added.

## Files

- `tina/config.ts` — Tina schema (collections, fields).
- `content/homepage/home.json` — the actual page content.
- `app/page.tsx` — fetches live content when available, falls back to the
  bundled content file otherwise.
- `app/page-client.tsx` — wires up `useTina` for live visual editing (used
  when a content API responded).
- `app/page-static.tsx` — renders the bundled content with no live-editing
  wiring (used for the fallback path).
- `proxy.ts` — blocks `/admin` unless `TINA_ADMIN_ENABLED=true`.
- `components/` — one file per page section (`Nav`, `Hero`, `About`, `Music`,
  `Events`, `Gallery`, `Shop`, `Contact`, `Footer`), each reading its slice of
  the content data.
