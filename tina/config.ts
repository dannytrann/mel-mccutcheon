import { defineConfig, LocalAuthProvider } from "tinacms";
import { UsernamePasswordAuthJSProvider, TinaUserCollection } from "tinacms-authjs/dist/tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

// Self-hosted, not TinaCloud: `npm run dev` sets TINA_PUBLIC_IS_LOCAL=true,
// which routes around the real content API (tina/database.ts) and around
// real auth (Auth.js) entirely, matching how local mode always worked.
// Everywhere else, /api/tina/[...routes] (backed by tina/database.ts) is
// the content API, and login goes through a real per-user Auth.js account
// (see content/users/) rather than a shared password.
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

export default defineConfig({
  contentApiUrlOverride: "/api/tina/gql",
  authProvider: isLocal ? new LocalAuthProvider() : new UsernamePasswordAuthJSProvider(),
  branch,

  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  // Local mode still writes uploads straight to the filesystem (fine —
  // there's a real, persistent local repo checkout to write into). Every
  // other environment needs an external media store instead: Vercel's
  // serverless functions have no persistent/writable filesystem for
  // self-hosted Tina to commit uploaded media into the way TinaCloud can.
  media: isLocal
    ? {
        tina: {
          publicFolder: "public",
          mediaRoot: "uploads",
        },
      }
    : {
        loadCustomStore: async () => {
          const pack = await import("next-tinacms-cloudinary");
          return pack.TinaCloudCloudinaryMediaStore;
        },
      },

  schema: {
    collections: [
      TinaUserCollection,
      {
        name: "homepage",
        label: "Home Page",
        path: "content/homepage",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/",
        },
        fields: [
          {
            type: "object",
            name: "siteMeta",
            label: "Site Meta",
            fields: [
              { type: "string", name: "artistName", label: "Artist Name" },
              { type: "string", name: "logoText", label: "Nav Logo Text" },
            ],
          },
          {
            type: "object",
            name: "navLinks",
            label: "Nav Links",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.label }),
              defaultItem: { label: "New Link", href: "#" },
            },
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "href", label: "Href" },
            ],
          },
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              { type: "image", name: "photo", label: "Photo" },
              { type: "string", name: "kicker", label: "Kicker (small line above title)" },
              {
                type: "string",
                name: "heading",
                label: "Heading (two lines — first name / last name)",
              },
              {
                type: "string",
                name: "tagline",
                label: "Tagline",
                ui: { component: "textarea" },
              },
              { type: "string", name: "ctaPrimaryLabel", label: "Primary CTA Label" },
              { type: "string", name: "ctaPrimaryHref", label: "Primary CTA Href" },
              { type: "string", name: "ctaSecondaryLabel", label: "Secondary CTA Label" },
              { type: "string", name: "ctaSecondaryHref", label: "Secondary CTA Href" },
            ],
          },
          {
            type: "object",
            name: "about",
            label: "About",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              {
                type: "string",
                name: "heading",
                label: "Heading (use a line break for the second line)",
              },
              { type: "string", name: "leadText", label: "Lead Sentence" },
              {
                type: "string",
                name: "paragraphs",
                label: "Body Paragraphs",
                list: true,
                ui: { component: "textarea" },
              },
              { type: "image", name: "photo", label: "Photo" },
            ],
          },
          {
            type: "object",
            name: "sound",
            label: "Sound & Style",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              {
                type: "string",
                name: "heading",
                label: "Heading (use a line break for the second line)",
              },
              {
                type: "string",
                name: "bodyText",
                label: "Body Text",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "influences",
                label: "Influences",
                list: true,
              },
              { type: "string", name: "quoteText", label: "Quote" },
              { type: "string", name: "quoteCite", label: "Quote Attribution" },
            ],
          },
          {
            type: "object",
            name: "ensembles",
            label: "Ensembles",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              {
                type: "string",
                name: "heading",
                label: "Heading (use a line break for the second line)",
              },
              {
                type: "object",
                name: "items",
                label: "Ensembles",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.name }),
                  defaultItem: { name: "New Ensemble", description: "" },
                },
                fields: [
                  { type: "string", name: "name", label: "Name" },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "shows",
            label: "Shows",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              {
                type: "string",
                name: "heading",
                label: "Heading (use a line break for the second line)",
              },
              {
                type: "object",
                name: "items",
                label: "Recent Shows",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.venue }),
                  defaultItem: { venue: "Venue name", detail: "", tag: "" },
                },
                fields: [
                  { type: "string", name: "venue", label: "Venue (bold text)" },
                  {
                    type: "string",
                    name: "detail",
                    label: "Detail (e.g. \"— with The Sharp Seven\")",
                  },
                  { type: "string", name: "tag", label: "Tag (right-aligned label)" },
                ],
              },
              {
                type: "string",
                name: "noteText",
                label: "Note text (before the Instagram link)",
              },
              { type: "string", name: "noteLinkLabel", label: "Note link label" },
              { type: "string", name: "noteLinkHref", label: "Note link href" },
            ],
          },
          {
            type: "object",
            name: "gallery",
            label: "Gallery",
            list: true,
            ui: {
              itemProps: () => ({ label: "Gallery Photo" }),
              defaultItem: { big: false },
            },
            fields: [
              { type: "image", name: "image", label: "Image" },
              { type: "boolean", name: "big", label: "Large (2x2) tile" },
            ],
          },
          {
            type: "object",
            name: "contact",
            label: "Contact / Booking",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "email", label: "Booking Email" },
              { type: "string", name: "socialLabel", label: "Social Link Label" },
              { type: "string", name: "socialHref", label: "Social Link Href" },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              { type: "string", name: "copyrightText", label: "Copyright Text" },
            ],
          },
        ],
      },
    ],
  },
});
