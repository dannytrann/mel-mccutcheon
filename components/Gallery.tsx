import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./Gallery.module.css";

export default function Gallery({ data }: { data: HomepageData }) {
  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>Photos</div>
        <h2 className={styles.heading}>Gallery</h2>
        <div className={styles.grid}>
          {data.gallery?.map((item, i) => (
            <a
              key={i}
              href={item?.image ?? undefined}
              data-lightbox="gallery"
              className={`${styles.item} ${item?.big ? styles.big : ""}`}
              data-tina-field={tinaField(item, "image")}
              aria-label="View photo"
            >
              {item?.image && (
                <Image
                  src={item.image}
                  alt="Gallery photo"
                  fill
                  sizes="(max-width: 800px) 50vw, 25vw"
                />
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
