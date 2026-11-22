import styles from "./Footer.module.css";

export default function SiteCredit() {
  return (
    <div className={styles.credit}>
      Site built by{" "}
      <a href="https://www.dannyhaitran.ca" target="_blank" rel="noopener noreferrer">
        Danny Tran
      </a>
    </div>
  );
}
