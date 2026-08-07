import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./Shop.module.css";

export default function Shop({ data }: { data: HomepageData }) {
  const shop = data.shop;

  return (
    <section id="shop" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.eyebrow} data-tina-field={tinaField(shop, "eyebrow")}>
          {shop?.eyebrow}
        </div>
        <h2 className={styles.heading} data-tina-field={tinaField(shop, "heading")}>
          {shop?.heading}
        </h2>
        <p className={styles.body} data-tina-field={tinaField(shop, "bodyText")}>
          {shop?.bodyText}
        </p>
      </div>
    </section>
  );
}
