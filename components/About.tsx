import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./About.module.css";

export default function About({ data }: { data: HomepageData }) {
  const about = data.about;

  return (
    <section id="about" className={styles.section}>
      <div className={styles.textCol}>
        <div className={styles.eyebrow} data-tina-field={tinaField(about, "eyebrow")}>
          {about?.eyebrow}
        </div>
        <h2 className={styles.heading} data-tina-field={tinaField(about, "heading")}>
          {about?.heading}
        </h2>
        <p className={styles.body} data-tina-field={tinaField(about, "bodyText")}>
          {about?.bodyText}
        </p>
        <p
          className={styles.secondary}
          data-tina-field={tinaField(about, "secondaryText")}
        >
          {about?.secondaryText}
        </p>
      </div>
      <div className={styles.photoCol}>
        <div className={styles.photo1} data-tina-field={tinaField(about, "photo1")}>
          {about?.photo1 && (
            <Image src={about.photo1} alt="Portrait photo" fill sizes="(max-width: 860px) 50vw, 320px" />
          )}
        </div>
        <div className={styles.photo2} data-tina-field={tinaField(about, "photo2")}>
          {about?.photo2 && (
            <Image src={about.photo2} alt="Performance photo" fill sizes="(max-width: 860px) 50vw, 320px" />
          )}
        </div>
      </div>
    </section>
  );
}
