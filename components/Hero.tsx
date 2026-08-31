import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./Hero.module.css";

// The design treats the surname's "Mc" prefix as plain text and the rest
// as the brass accent color (e.g. "Mc" + "Cutcheon"). Falls back to
// rendering the line plain if it doesn't fit that "Mc"-prefixed shape.
function renderAccentLine(line: string) {
  if (line.startsWith("Mc") && line.length > 2) {
    return (
      <>
        Mc<span className={styles.titleAccent}>{line.slice(2)}</span>
      </>
    );
  }
  return line;
}

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
            sizes="(max-width: 900px) 100vw, 60vw"
          />
        )}
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
