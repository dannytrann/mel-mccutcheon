import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./Gallery.module.css";

export default function Gallery({ data }: { data: HomepageData }) {
  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.eyebrow}>Gallery</div>
        <h2 className={styles.heading}>On Stage &amp; Off</h2>
        <div className={styles.grid}>
          {data.gallery?.map((item, i) => (
            <div
              key={i}
              className={styles.item}
              style={{
                gridColumn: `span ${item?.spanCols ?? 1}`,
                gridRow: `span ${item?.spanRows ?? 1}`,
              }}
              data-tina-field={tinaField(item, "image")}
            >
              {item?.image && (
                <Image
                  src={item.image}
                  alt="Gallery photo"
                  fill
                  sizes="(max-width: 860px) 50vw, 320px"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
