import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./Hero.module.css";
import HeroSlideshow, { type Slide } from "./HeroSlideshow";

// The last line of the heading (the surname) renders in the brass accent color.
function renderAccentLine(line: string) {
  return <span className={styles.titleAccent}>{line}</span>;
}

export default function Hero({ data }: { data: HomepageData }) {
  const hero = data.hero;
  const headingLines = (hero?.heading ?? "").split("\n");
  // Slideshow photos if any are set, otherwise the single hero photo.
  const slides: Slide[] = (hero?.slides ?? [])
    .filter((s): s is NonNullable<typeof s> & { image: string } => !!s?.image)
    .map((s) => ({ src: s.image, position: s.position }));
  if (!slides.length && hero?.photo) slides.push({ src: hero.photo });

  return (
    <section id="home" className={styles.hero}>
      <div
        className={styles.photoWrap}
        data-tina-field={slides.length > 1 ? tinaField(hero, "slides") : tinaField(hero, "photo")}
      >
        {slides.length ? (
          <HeroSlideshow slides={slides} alt={data.siteMeta?.artistName ?? "Hero photo"} />
        ) : null}
      </div>
      <div className={styles.copy}>
        <div className={styles.kicker} data-tina-field={tinaField(hero, "kicker")}>
          {hero?.kicker}
        </div>
        <h1 className={styles.title} data-tina-field={tinaField(hero, "heading")}>
          {headingLines.map((line, i) => (
            <span key={i}>
              {i === headingLines.length - 1 ? renderAccentLine(line) : line}
              {i < headingLines.length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p className={styles.tagline} data-tina-field={tinaField(hero, "tagline")}>
          {hero?.tagline}
        </p>
        <div className={styles.ctaRow}>
          <a
            href={hero?.ctaPrimaryHref ?? "#"}
            className={`${styles.btn} ${styles.btnSolid}`}
            data-tina-field={tinaField(hero, "ctaPrimaryLabel")}
          >
            {hero?.ctaPrimaryLabel}
          </a>
          <a
            href={hero?.ctaSecondaryHref ?? "#"}
            className={`${styles.btn} ${styles.btnOutline}`}
            data-tina-field={tinaField(hero, "ctaSecondaryLabel")}
          >
            {hero?.ctaSecondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
