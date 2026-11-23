"use client";

import { useEffect, useState } from "react";
import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import { BLACKBIRD_SECTIONS } from "@/lib/blackbird-sections";
import styles from "./Nav.module.css";

type NavChild = { label: string; href: string; external?: boolean };

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
  tina?: unknown;
};

const BLACKBIRD_HREF = "/blackbird";

// Code-defined entry (not in Tina) for Mel's other work, inserted before Contact.
const OTHER_VENTURES: NavItem = {
  label: "Other Ventures",
  href: "#",
  children: [
    {
      label: "Real Estate",
      href: "https://melmccutcheon.royallepage.ca/",
      external: true,
    },
    {
      label: "Blackbird Outpost (Etsy)",
      href: "https://www.etsy.com/ca/shop/BlackbirdOutpost",
      external: true,
    },
    {
      label: "Bare Hands Landscaping",
      href: "https://www.facebook.com/BareHandsLandscaping",
      external: true,
    },
  ],
};

// The homepage's Tina-managed links; the "Blackbird Productions" entry gets
// a dropdown of that page's sections. `base` lets other pages (e.g.
// /blackbird) reuse the same header: in-page "#x" links become "/#x".
export default function Nav({
  data,
  base = "",
}: {
  data: HomepageData;
  base?: string;
}) {
  const [open, setOpen] = useState(false);
  const resolve = (href: string) =>
    href.startsWith("#") ? `${base}${href}` : href;

  const links: NavItem[] = (data.navLinks ?? []).map((link) => {
    const href = link?.href ?? "#";
    return {
      label: link?.label ?? "",
      href: resolve(href),
      tina: link,
      children:
        href === BLACKBIRD_HREF
          ? [
              { label: "Overview", href: BLACKBIRD_HREF },
              ...BLACKBIRD_SECTIONS.map((s) => ({
                label: s.label,
                href: `${BLACKBIRD_HREF}#${s.id}`,
              })),
            ]
          : undefined,
    };
  });
  const contactAt = links.findIndex((l) => l.href.endsWith("#contact"));
  links.splice(contactAt === -1 ? links.length : contactAt, 0, OTHER_VENTURES);

  // Desktop dropdowns open on hover/focus (CSS) and also on click, which
  // toggles them instead of navigating. Outside click or Escape closes.
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  useEffect(() => {
    if (menuOpen === null) return;
    const onDown = (e: MouseEvent) => {
      if (!(e.target as Element).closest?.("[data-dropdown]"))
        setMenuOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(null);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const close = () => {
    setOpen(false);
    setMenuOpen(null);
  };
  const isDesktop = () => window.matchMedia("(min-width: 861px)").matches;

  return (
    <header className={styles.nav}>
      <nav className={styles.inner}>
        <a
          href={resolve("#home")}
          className={styles.logo}
          data-tina-field={tinaField(data.siteMeta, "logoText")}
          onClick={close}
        >
          {data.siteMeta?.logoText}
        </a>
        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <div
          id="site-menu"
          className={`${styles.links} ${open ? styles.linksOpen : ""}`}
        >
          {links.map((link, i) => (
            <div
              key={i}
              data-dropdown={link.children ? "" : undefined}
              className={
                link.children
                  ? `${styles.hasMenu} ${menuOpen === i ? styles.menuOpen : ""}`
                  : styles.item
              }
            >
              <a
                href={link.href}
                className={styles.link}
                data-tina-field={
                  link.tina ? tinaField(link.tina as never, "label") : undefined
                }
                aria-haspopup={link.children ? "true" : undefined}
                aria-expanded={link.children ? menuOpen === i : undefined}
                onClick={(e) => {
                  if (link.children && (isDesktop() || link.href === "#")) {
                    e.preventDefault();
                    if (isDesktop()) setMenuOpen((o) => (o === i ? null : i));
                    return;
                  }
                  close();
                }}
              >
                {link.label}
                {link.children ? (
                  <span className={styles.caret} aria-hidden="true" />
                ) : null}
              </a>
              {link.children ? (
                <div className={styles.menu}>
                  {link.children.map((c) => (
                    <a
                      key={c.href}
                      href={c.href}
                      className={styles.menuLink}
                      onClick={close}
                      {...(c.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {c.label}
                      {c.external ? <span aria-hidden="true"> ↗</span> : null}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
}
