import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./Ensembles.module.css";

export default function Ensembles({ data }: { data: HomepageData }) {
  const ensembles = data.ensembles;
  const headingLines = (ensembles?.heading ?? "").split("\n");

  return (
    <section id="ensembles" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.eyebrow} data-tina-field={tinaField(ensembles, "eyebrow")}>
          {ensembles?.eyebrow}
        </div>
        <h2 className={styles.heading} data-tina-field={tinaField(ensembles, "heading")}>
          {headingLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < headingLines.length - 1 && <br />}
            </span>
          ))}
        </h2>
        <div className={styles.grid}>
          {ensembles?.items?.map((item, i) => (
            <div key={i} className={styles.item}>
              <h3
                className={styles.name}
                data-tina-field={tinaField(item, "name")}
              >
                {item?.name}
              </h3>
              <p
                className={styles.description}
                data-tina-field={tinaField(item, "description")}
              >
                {item?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
