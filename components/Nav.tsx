"use client";

import { useEffect, useRef, useState } from "react";
import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import { BLACKBIRD_SECTIONS } from "@/lib/blackbird-sections";
import styles from "./Nav.module.css";

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
  tina?: unknown;
};

const BLACKBIRD_HREF = "/blackbird";

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

  // Desktop dropdown: opens on hover/focus (CSS) and also on click, which
  // toggles it instead of navigating. Outside click or Escape closes it.
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
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
    setMenuOpen(false);
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
        <div className={styles.end}>
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
          <a
            href="https://melmccutcheon.royallepage.ca/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.sneaky}
            aria-label="Mel's real estate website"
            title="Mel's real estate website"
          >
            ↗
          </a>
        </div>
        <div
          id="site-menu"
          className={`${styles.links} ${open ? styles.linksOpen : ""}`}
        >
          {links.map((link, i) => (
            <div
              key={i}
              ref={link.children ? menuRef : undefined}
              className={
                link.children
                  ? `${styles.hasMenu} ${menuOpen ? styles.menuOpen : ""}`
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
                aria-expanded={link.children ? menuOpen : undefined}
                onClick={(e) => {
                  if (link.children && isDesktop()) {
                    e.preventDefault();
                    setMenuOpen((o) => !o);
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
                    >
                      {c.label}
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
