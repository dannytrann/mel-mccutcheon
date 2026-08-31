import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./Footer.module.css";

export default function Footer({ data }: { data: HomepageData }) {
  return (
    <footer
      className={styles.footer}
      data-tina-field={tinaField(data.footer, "copyrightText")}
    >
      {data.footer?.copyrightText}
    </footer>
  );
}
