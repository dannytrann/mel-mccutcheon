import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./Contact.module.css";

export default function Contact({ data }: { data: HomepageData }) {
  const contact = data.contact;

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.eyebrow} data-tina-field={tinaField(contact, "eyebrow")}>
          {contact?.eyebrow}
        </div>
        <div className={styles.inner}>
          <a
            href={`mailto:${contact?.email ?? ""}`}
            className={styles.email}
            data-tina-field={tinaField(contact, "email")}
          >
            {contact?.email}
          </a>
          <div className={styles.social}>
            <a
              href={contact?.socialHref ?? "#"}
              data-tina-field={tinaField(contact, "socialLabel")}
            >
              {contact?.socialLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
