import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./Music.module.css";

export default function Music({ data }: { data: HomepageData }) {
  const music = data.music;

  return (
    <section id="music" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.eyebrow} data-tina-field={tinaField(music, "eyebrow")}>
          {music?.eyebrow}
        </div>
        <h2 className={styles.heading} data-tina-field={tinaField(music, "heading")}>
          {music?.heading}
        </h2>
        <div className={styles.grid}>
          <div className={styles.albumArt} data-tina-field={tinaField(music, "albumArt")}>
            {music?.albumArt ? (
              <Image
                src={music.albumArt}
                alt={music?.songTitle ?? "Album artwork"}
                fill
                sizes="340px"
              />
            ) : (
              <span className={styles.albumPlaceholder}>Album / single artwork</span>
            )}
          </div>
          <div>
            <h3
              className={styles.songTitle}
              data-tina-field={tinaField(music, "songTitle")}
            >
              {music?.songTitle}
            </h3>
            <p className={styles.caption} data-tina-field={tinaField(music, "caption")}>
              {music?.caption}
            </p>
            <div className={styles.platforms}>
              {music?.platforms?.map((p, i) => (
                <a
                  key={i}
                  href={p?.href ?? "#"}
                  className={styles.platformLink}
                  data-tina-field={tinaField(p, "name")}
                >
                  {p?.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
