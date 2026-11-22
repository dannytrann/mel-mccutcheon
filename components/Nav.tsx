"use client";

import { useState } from "react";
import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import { BLACKBIRD_SECTIONS } from "@/lib/blackbird-sections";
import styles from "./Nav.module.css";

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[]; tina?: unknown };

const BLACKBIRD_HREF = "/blackbird";

// By default the nav shows the homepage's Tina-managed links; the
// "Blackbird Productions" entry gets a dropdown of that page's sections.
// Other pages can pass their own `logo`/`items` (the Blackbird page does).
export default function Nav({
  data,
  logo,
  items,
}: {
  data: HomepageData;
  logo?: { label: string; href: string };
  items?: NavItem[];
}) {
  const [open, setOpen] = useState(false);

  const links: NavItem[] =
    items ??
    (data.navLinks ?? []).map((link) => {
      const href = link?.href ?? "#";
      return {
        label: link?.label ?? "",
        href,
        tina: link,
        children:
          href === BLACKBIRD_HREF
            ? BLACKBIRD_SECTIONS.map((s) => ({ label: s.label, href: `${BLACKBIRD_HREF}#${s.id}` }))
            : undefined,
      };
    });

  const close = () => setOpen(false);

  return (
    <header className={styles.nav}>
      <nav className={styles.inner}>
        {logo ? (
          <a href={logo.href} className={styles.logo} onClick={close}>
            {logo.label}
          </a>
        ) : (
          <a href="#home" className={styles.logo} data-tina-field={tinaField(data.siteMeta, "logoText")} onClick={close}>
            {data.siteMeta?.logoText}
          </a>
        )}
        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <div id="site-menu" className={`${styles.links} ${open ? styles.linksOpen : ""}`}>
          {links.map((link, i) => (
            <div key={i} className={link.children ? styles.hasMenu : styles.item}>
              <a
                href={link.href}
                className={styles.link}
                data-tina-field={link.tina ? tinaField(link.tina as never, "label") : undefined}
                onClick={close}
              >
                {link.label}
                {link.children ? <span className={styles.caret} aria-hidden="true" /> : null}
              </a>
              {link.children ? (
                <div className={styles.menu}>
                  {link.children.map((c) => (
                    <a key={c.href} href={c.href} className={styles.menuLink} onClick={close}>
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
