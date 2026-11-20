import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./Ensembles.module.css";

export default function Ensembles({ data }: { data: HomepageData }) {
  const ensembles = data.ensembles;
  const headingLines = (ensembles?.heading ?? "").split("\n");
  const anyPhotos = !!ensembles?.items?.some((item) => item?.photo);

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
              {item?.photo ? (
                <a
                  href={item.photo}
                  data-lightbox="ensembles"
                  className={styles.photo}
                  data-tina-field={tinaField(item, "photo")}
                  aria-label={`View photo of ${item.name ?? "the band"}`}
                >
                  <Image
                    src={item.photo}
                    alt={item.name ?? "Ensemble photo"}
                    fill
                    sizes="(max-width: 800px) 100vw, 380px"
                  />
                </a>
              ) : anyPhotos ? (
                <div className={styles.photoPlaceholder} aria-hidden="true">
                  {(item?.name ?? "")
                    .split(/\s+/)
                    .filter((w) => w && w[0] === w[0].toUpperCase())
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 3)}
                </div>
              ) : null}
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
