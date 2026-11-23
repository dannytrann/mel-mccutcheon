import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./Gallery.module.css";

// Gallery items have no caption field, so describe each photo from its
// (descriptive) filename, e.g. "mel-dancing-on-stage.jpg" becomes
// "Mel dancing on stage". Keeps alt text meaningful for search and screen readers.
function altFromFile(src: string) {
  const words = (src.split("/").pop() ?? "")
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/^gallery-/, "")
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => (w === "bw" ? "black and white" : w));
  const text = words.join(" ");
  const named = /\bmel\b/i.test(text) ? text.replace(/\bmel\b/i, "Mel") : `Mel McCutcheon, ${text}`;
  return named.charAt(0).toUpperCase() + named.slice(1);
}

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
              className={`${styles.item} ${item?.big ? styles.big : ""} ${item?.wide ? styles.wide : ""}`}
              data-tina-field={tinaField(item, "image")}
              aria-label="View photo"
            >
              {item?.image && (
                <Image
                  src={item.image}
                  alt={altFromFile(item.image)}
                  fill
                  sizes={item.big || item.wide ? "(max-width: 800px) 100vw, 50vw" : "(max-width: 800px) 50vw, 25vw"}
                />
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
