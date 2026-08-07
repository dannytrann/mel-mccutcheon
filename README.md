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
TinaCloud account is required — content is read from and saved directly to
`content/homepage/home.json` on your filesystem, and images upload to
`public/uploads/`. Click "Enter Edit Mode" in `/admin` to get the click-to-edit
overlay on the live site, or use the sidebar form.

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

## Production builds

`npm run build` runs `tinacms build` (in local/self-hosted mode) followed by
`next build`; the homepage route renders dynamically (`export const dynamic =
"force-dynamic"`) rather than being statically prerendered, since its content
comes from Tina's content API rather than being baked in at build time.

Local mode's GraphQL server (`tinacms dev` / `tinacms build`) is intended for
development, not for serving production traffic long-term. Before deploying
for real:

- **Recommended:** connect the project to [TinaCloud](https://tina.io) (free
  tier available) and set `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` — this
  gives you a persistent hosted content API and the same visual editor in
  production, with no extra infrastructure to run yourself.
- **Alternative:** self-host the content API with `@tinacms/datalayer` behind
  a Next.js route handler, so `next start` doesn't depend on a separate
  process. Not set up in this project yet — ask if you want it added.

## Files

- `tina/config.ts` — Tina schema (collections, fields).
- `content/homepage/home.json` — the actual page content.
- `app/page.tsx` / `app/page-client.tsx` — fetches content and wires up
  `useTina` for live visual editing.
- `components/` — one file per page section (`Nav`, `Hero`, `About`, `Music`,
  `Events`, `Gallery`, `Shop`, `Contact`, `Footer`), each reading its slice of
  the content data.
