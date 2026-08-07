import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./Contact.module.css";

export default function Contact({ data }: { data: HomepageData }) {
  const contact = data.contact;

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.eyebrow} data-tina-field={tinaField(contact, "eyebrow")}>
          {contact?.eyebrow}
        </div>
        <h2 className={styles.heading} data-tina-field={tinaField(contact, "heading")}>
          {contact?.heading}
        </h2>
        <p className={styles.label} data-tina-field={tinaField(contact, "label")}>
          {contact?.label}
        </p>
        <a
          href={`mailto:${contact?.email ?? ""}`}
          className={styles.email}
          data-tina-field={tinaField(contact, "email")}
        >
          {contact?.email}
        </a>
        <div className={styles.socials}>
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
