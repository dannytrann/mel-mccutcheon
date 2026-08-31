import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./About.module.css";

export default function About({ data }: { data: HomepageData }) {
  const about = data.about;
  const headingLines = (about?.heading ?? "").split("\n");

  return (
    <section id="about" className={styles.section}>
      <div className={styles.wrap}>
        <div>
          <div className={styles.eyebrow} data-tina-field={tinaField(about, "eyebrow")}>
            {about?.eyebrow}
          </div>
          <h2 className={styles.heading} data-tina-field={tinaField(about, "heading")}>
            {headingLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < headingLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className={styles.lead} data-tina-field={tinaField(about, "leadText")}>
            {about?.leadText}
          </p>
          {about?.paragraphs?.map((paragraph, i) => (
            <p
              key={i}
              className={styles.paragraph}
              data-tina-field={tinaField(about, "paragraphs", i)}
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className={styles.photo} data-tina-field={tinaField(about, "photo")}>
          {about?.photo && (
            <Image
              src={about.photo}
              alt="Mel McCutcheon"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
          )}
        </div>
      </div>
    </section>
  );
}
