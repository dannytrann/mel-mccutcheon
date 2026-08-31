import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./Sound.module.css";

export default function Sound({ data }: { data: HomepageData }) {
  const sound = data.sound;
  const headingLines = (sound?.heading ?? "").split("\n");

  return (
    <section id="sound" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.inner}>
          <div className={styles.eyebrow} data-tina-field={tinaField(sound, "eyebrow")}>
            {sound?.eyebrow}
          </div>
          <h2 className={styles.heading} data-tina-field={tinaField(sound, "heading")}>
            {headingLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < headingLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className={styles.body} data-tina-field={tinaField(sound, "bodyText")}>
            {sound?.bodyText}
          </p>
          <div className={styles.influenceRow}>
            {sound?.influences?.map((influence, i) => (
              <span key={i} style={{ display: "contents" }}>
                {i > 0 && <span className={styles.influenceDivider}>&amp;</span>}
                <span
                  className={styles.influence}
                  data-tina-field={tinaField(sound, "influences", i)}
                >
                  {influence}
                </span>
              </span>
            ))}
          </div>
          <div className={styles.quote}>
            <span data-tina-field={tinaField(sound, "quoteText")}>{sound?.quoteText}</span>
            <cite className={styles.quoteCite} data-tina-field={tinaField(sound, "quoteCite")}>
              {sound?.quoteCite}
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
}
