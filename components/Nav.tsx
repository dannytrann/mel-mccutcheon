import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./Nav.module.css";

export default function Nav({ data }: { data: HomepageData }) {
  return (
    <header className={styles.nav}>
      <nav className={styles.inner}>
        <a
          href="#home"
          className={styles.logo}
          data-tina-field={tinaField(data.siteMeta, "logoText")}
        >
          {data.siteMeta?.logoText}
        </a>
        <div className={styles.links}>
          {data.navLinks?.map((link, i) => (
            <a
              key={i}
              href={link?.href ?? "#"}
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
