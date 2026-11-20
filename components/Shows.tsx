import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./Shows.module.css";

const hasLink = (href?: string | null): href is string => !!href && href !== "#";

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
        {shows?.upcoming?.length ? (
          <>
            {shows.upcomingHeading ? (
              <h3 className={styles.subheading} data-tina-field={tinaField(shows, "upcomingHeading")}>
                {shows.upcomingHeading}
              </h3>
            ) : null}
            <div className={styles.upcomingList}>
              {shows.upcoming.map((ev, i) => (
                <article key={i} className={styles.upcomingRow}>
                  {ev?.poster ? (
                    <a
                      href={ev.poster}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.poster}
                      data-tina-field={tinaField(ev, "poster")}
                      aria-label={`View poster for ${ev.title ?? ev.venue ?? "this show"}`}
                    >
                      <Image
                        src={ev.poster}
                        alt={`Poster: ${ev.title ?? ev.venue ?? "show"}`}
                        fill
                        sizes="112px"
                      />
                    </a>
                  ) : null}
                  <div className={styles.date}>
                    <span className={styles.day} data-tina-field={tinaField(ev, "day")}>
                      {ev?.day}
                    </span>
                    <span className={styles.month} data-tina-field={tinaField(ev, "month")}>
                      {ev?.month}
                    </span>
                  </div>
                  <div className={styles.info}>
                    {ev?.title ? (
                      <div className={styles.showTitle} data-tina-field={tinaField(ev, "title")}>
                        {ev.title}
                      </div>
                    ) : null}
                    <div className={styles.venue}>
                      <span className={styles.venueName} data-tina-field={tinaField(ev, "venue")}>
                        {ev?.venue}
                      </span>
                      {ev?.detail ? (
                        <span data-tina-field={tinaField(ev, "detail")}>, {ev.detail}</span>
                      ) : null}
                    </div>
                    {ev?.time || ev?.price ? (
                      <div className={styles.meta}>
                        {ev?.time ? <span data-tina-field={tinaField(ev, "time")}>{ev.time}</span> : null}
                        {ev?.time && ev?.price ? " · " : null}
                        {ev?.price ? <span data-tina-field={tinaField(ev, "price")}>{ev.price}</span> : null}
                      </div>
                    ) : null}
                  </div>
                  <div className={styles.actions}>
                    {hasLink(ev?.detailsHref) ? (
                      <a href={ev.detailsHref} target="_blank" rel="noopener noreferrer" className={styles.pill}>
                        Details
                      </a>
                    ) : null}
                    {hasLink(ev?.ticketsHref) ? (
                      <a href={ev.ticketsHref} target="_blank" rel="noopener noreferrer" className={styles.pill}>
                        Tickets
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
            {shows.recentHeading ? (
              <h3 className={styles.subheading} data-tina-field={tinaField(shows, "recentHeading")}>
                {shows.recentHeading}
              </h3>
            ) : null}
          </>
        ) : null}
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
