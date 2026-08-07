import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  // Local-mode credentials. Unset in local dev (self-hosted, no TinaCloud
  // account needed). Set these env vars if/when this is connected to
  // TinaCloud for production editing.
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },

  schema: {
    collections: [
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
              { type: "string", name: "logoText", label: "Logo Text" },
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
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "heading", label: "Heading (use a line break for the second line)" },
              {
                type: "string",
                name: "tagline",
                label: "Tagline",
                ui: { component: "textarea" },
              },
              { type: "string", name: "ctaLabel", label: "CTA Label" },
              { type: "string", name: "ctaHref", label: "CTA Href" },
            ],
          },
          {
            type: "object",
            name: "socials",
            label: "Socials",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name }),
              defaultItem: { name: "New Social", href: "#" },
            },
            fields: [
              { type: "string", name: "name", label: "Name" },
              { type: "string", name: "href", label: "Href" },
            ],
          },
          {
            type: "object",
            name: "about",
            label: "About",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "bodyText",
                label: "Body Text",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "secondaryText",
                label: "Secondary Text",
                ui: { component: "textarea" },
              },
              { type: "image", name: "photo1", label: "Photo 1 (top)" },
              { type: "image", name: "photo2", label: "Photo 2 (bottom)" },
            ],
          },
          {
            type: "object",
            name: "music",
            label: "Music",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "heading", label: "Heading" },
              { type: "image", name: "albumArt", label: "Album / Single Artwork" },
              { type: "string", name: "songTitle", label: "Song Title" },
              { type: "string", name: "caption", label: "Caption" },
              {
                type: "object",
                name: "platforms",
                label: "Platforms",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.name }),
                  defaultItem: { name: "New Platform", href: "#" },
                },
                fields: [
                  { type: "string", name: "name", label: "Name" },
                  { type: "string", name: "href", label: "Href" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "events",
            label: "Events",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.venue ? `${item.venue} — ${item.day} ${item.month}` : "New Event",
              }),
              defaultItem: {
                day: "TBA",
                month: "2026",
                venue: "Venue name",
                city: "City, Province",
                rsvpHref: "#",
                ticketsHref: "#",
              },
            },
            fields: [
              { type: "string", name: "day", label: "Day" },
              { type: "string", name: "month", label: "Month / Year" },
              { type: "string", name: "venue", label: "Venue" },
              { type: "string", name: "city", label: "City, Province" },
              { type: "string", name: "rsvpHref", label: "RSVP Link" },
              { type: "string", name: "ticketsHref", label: "Tickets Link" },
            ],
          },
          {
            type: "object",
            name: "gallery",
            label: "Gallery",
            list: true,
            ui: {
              itemProps: () => ({ label: "Gallery Photo" }),
              defaultItem: { spanCols: 1, spanRows: 1 },
            },
            fields: [
              { type: "image", name: "image", label: "Image" },
              { type: "number", name: "spanCols", label: "Column Span (1 or 2)" },
              { type: "number", name: "spanRows", label: "Row Span (1 or 2)" },
            ],
          },
          {
            type: "object",
            name: "shop",
            label: "Shop",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "bodyText",
                label: "Body Text",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "contact",
            label: "Contact",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "email", label: "Email" },
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
