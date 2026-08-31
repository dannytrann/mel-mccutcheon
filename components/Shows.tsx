import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./Shows.module.css";

export default function Shows({ data }: { data: HomepageData }) {
  const shows = data.shows;
  const headingLines = (shows?.heading ?? "").split("\n");

  return (
    <section id="shows" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.eyebrow} data-tina-field={tinaField(shows, "eyebrow")}>
          {shows?.eyebrow}
        </div>
        <h2 className={styles.heading} data-tina-field={tinaField(shows, "heading")}>
          {headingLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < headingLines.length - 1 && <br />}
            </span>
          ))}
        </h2>
        <div className={styles.list}>
          {shows?.items?.map((item, i) => (
            <div key={i} className={styles.row}>
              <div className={styles.venue}>
                <span
                  className={styles.venueName}
                  data-tina-field={tinaField(item, "venue")}
                >
                  {item?.venue}
                </span>
                <span data-tina-field={tinaField(item, "detail")}>{item?.detail}</span>
              </div>
              <div className={styles.tag} data-tina-field={tinaField(item, "tag")}>
                {item?.tag}
              </div>
            </div>
          ))}
        </div>
        <p className={styles.note}>
          <span data-tina-field={tinaField(shows, "noteText")}>{shows?.noteText}</span>
          <a
            href={shows?.noteLinkHref ?? "#"}
            data-tina-field={tinaField(shows, "noteLinkLabel")}
          >
            {shows?.noteLinkLabel}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
