import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./Hero.module.css";

export default function Hero({ data }: { data: HomepageData }) {
  const hero = data.hero;
  const headingLines = (hero?.heading ?? "").split("\n");

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.photoWrap} data-tina-field={tinaField(hero, "photo")}>
        {hero?.photo && (
          <Image
            src={hero.photo}
            alt={data.siteMeta?.artistName ?? "Hero photo"}
            fill
            priority
            sizes="100vw"
          />
        )}
      </div>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.eyebrow} data-tina-field={tinaField(hero, "eyebrow")}>
          {hero?.eyebrow}
        </div>
        <h1 className={styles.heading} data-tina-field={tinaField(hero, "heading")}>
          {headingLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < headingLines.length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p className={styles.tagline} data-tina-field={tinaField(hero, "tagline")}>
          {hero?.tagline}
        </p>
        <div className={styles.ctaRow}>
          <a
            href={hero?.ctaHref ?? "#music"}
            className={styles.ctaButton}
            data-tina-field={tinaField(hero, "ctaLabel")}
          >
            {hero?.ctaLabel}
          </a>
          {data.socials?.map((s, i) => (
            <a
              key={i}
              href={s?.href ?? "#"}
              className={styles.socialLink}
              data-tina-field={tinaField(s, "name")}
            >
              {s?.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
