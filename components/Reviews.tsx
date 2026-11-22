import { tinaField } from "tinacms/dist/react";
import type { HomepageData } from "@/lib/tina-types";
import styles from "./Reviews.module.css";

type Reviews = NonNullable<HomepageData["reviews"]>;
type Review = NonNullable<NonNullable<Reviews["items"]>[number]>;

function Cite({ review }: { review: Review }) {
  if (!review.name && !review.context) return null;
  return (
    <cite className={styles.cite}>
      {review.name ? <span data-tina-field={tinaField(review, "name")}>{review.name}</span> : null}
      {review.context ? (
        <span className={styles.context} data-tina-field={tinaField(review, "context")}>
          {review.context}
        </span>
      ) : null}
    </cite>
  );
}

export default function Reviews({ data }: { data: HomepageData }) {
  const reviews = data.reviews;
  const items = (reviews?.items ?? []).filter((r): r is Review => !!r?.quote);
  if (!reviews || !items.length) return null;

  const [featured, ...rest] = items;
  const headingLines = (reviews.heading ?? "").split("\n");

  return (
    <section id="reviews" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.eyebrow} data-tina-field={tinaField(reviews, "eyebrow")}>
          {reviews.eyebrow}
        </div>
        <h2 className={styles.heading} data-tina-field={tinaField(reviews, "heading")}>
          {headingLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < headingLines.length - 1 && <br />}
            </span>
          ))}
        </h2>

        <blockquote className={styles.featured}>
          <p data-tina-field={tinaField(featured, "quote")}>“{featured.quote}”</p>
          <Cite review={featured} />
        </blockquote>

        {rest.length ? (
          <div className={styles.grid}>
            {rest.map((review, i) => (
              <blockquote key={i} className={styles.card}>
                <p data-tina-field={tinaField(review, "quote")}>“{review.quote}”</p>
                <Cite review={review} />
              </blockquote>
            ))}
          </div>
        ) : null}

        {reviews.linkHref && reviews.linkLabel ? (
          <p className={styles.more}>
            <a
              href={reviews.linkHref}
              target="_blank"
              rel="noopener noreferrer"
              data-tina-field={tinaField(reviews, "linkLabel")}
            >
              {reviews.linkLabel} →
            </a>
          </p>
        ) : null}
      </div>
    </section>
  );
}
