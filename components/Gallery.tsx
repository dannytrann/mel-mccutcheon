import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./Gallery.module.css";

export default function Gallery({ data }: { data: HomepageData }) {
  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>Gallery</div>
        <h2 className={styles.heading}>On Stage &amp; Off</h2>
        <div className={styles.grid}>
          {data.gallery?.map((item, i) => (
            <div
              key={i}
              className={`${styles.item} ${item?.big ? styles.big : ""}`}
              data-tina-field={tinaField(item, "image")}
            >
              {item?.image && (
                <Image
                  src={item.image}
                  alt="Gallery photo"
                  fill
                  sizes="(max-width: 800px) 50vw, 25vw"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
