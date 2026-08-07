import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./Events.module.css";

export default function Events({ data }: { data: HomepageData }) {
  return (
    <section id="events" className={styles.section}>
      <div className={styles.eyebrow}>Events</div>
      <h2 className={styles.heading}>Upcoming Shows</h2>
      <div className={styles.list}>
        {data.events?.map((ev, i) => (
          <div key={i} className={styles.row}>
            <div className={styles.dateBlock}>
              <div className={styles.day} data-tina-field={tinaField(ev, "day")}>
                {ev?.day}
              </div>
              <div className={styles.month} data-tina-field={tinaField(ev, "month")}>
                {ev?.month}
              </div>
            </div>
            <div className={styles.venueBlock}>
              <div className={styles.venue} data-tina-field={tinaField(ev, "venue")}>
                {ev?.venue}
              </div>
              <div className={styles.city} data-tina-field={tinaField(ev, "city")}>
                {ev?.city}
              </div>
            </div>
            <div className={styles.actions}>
              <a href={ev?.rsvpHref ?? "#"} className={styles.actionPill}>
                RSVP
              </a>
              <a href={ev?.ticketsHref ?? "#"} className={styles.actionPill}>
                Tickets
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
