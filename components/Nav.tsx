import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./Nav.module.css";

// `base` lets other pages (e.g. /blackbird) reuse the nav: in-page "#x"
// links become "/#x" so they lead back to the homepage sections.
export default function Nav({ data, base = "" }: { data: HomepageData; base?: string }) {
  const resolve = (href: string) => (href.startsWith("#") ? `${base}${href}` : href);
  return (
    <header className={styles.nav}>
      <nav className={styles.inner}>
        <a
          href={resolve("#home")}
          className={styles.logo}
          data-tina-field={tinaField(data.siteMeta, "logoText")}
        >
          {data.siteMeta?.logoText}
        </a>
        <div className={styles.links}>
          {data.navLinks?.map((link, i) => (
            <a
              key={i}
              href={resolve(link?.href ?? "#")}
              className={styles.link}
              data-tina-field={tinaField(link, "label")}
            >
              {link?.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
