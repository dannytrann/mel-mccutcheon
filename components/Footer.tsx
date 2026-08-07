import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./Footer.module.css";

export default function Footer({ data }: { data: HomepageData }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logo} data-tina-field={tinaField(data.siteMeta, "logoText")}>
          {data.siteMeta?.logoText}
        </div>
        <div className={styles.links}>
          {data.navLinks?.map((link, i) => (
            <a key={i} href={link?.href ?? "#"} className={styles.link}>
              {link?.label}
            </a>
          ))}
        </div>
        <div
          className={styles.copyright}
          data-tina-field={tinaField(data.footer, "copyrightText")}
        >
          {data.footer?.copyrightText}
        </div>
      </div>
    </footer>
  );
}
