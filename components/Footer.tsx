import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import SiteCredit from "./SiteCredit";
import styles from "./Footer.module.css";

export default function Footer({ data }: { data: HomepageData }) {
  return (
    <footer className={styles.footer}>
      <div data-tina-field={tinaField(data.footer, "copyrightText")}>{data.footer?.copyrightText}</div>
      <SiteCredit />
    </footer>
  );
}
