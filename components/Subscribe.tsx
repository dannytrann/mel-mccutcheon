"use client";

import { useEffect, useState, type FormEvent } from "react";
import styles from "./Subscribe.module.css";

type Status = "idle" | "sending" | "sent" | "error";

// Messages for the ?subscribed= value the confirmation link redirects with.
const RETURN_MESSAGES: Record<string, [Status, string]> = {
  yes: ["sent", "You're on the list. You'll get an email whenever a new show is added."],
  expired: ["error", "That confirmation link has expired. Enter your email again for a fresh one."],
  error: ["error", "Something went wrong confirming your email. Please try again."],
};

export default function Subscribe() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("subscribed");
    const known = value ? RETURN_MESSAGES[value] : undefined;
    if (!known) return;
    // Reflect the result of the emailed confirmation link, then tidy the URL.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus(known[0]);
    setMessage(known[1]);
    window.history.replaceState(null, "", window.location.pathname + window.location.hash);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), company: form.get("company") }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("sent");
      setMessage("Almost done: check your inbox and tap the link to confirm.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div id="updates" className={styles.box}>
      <div className={styles.copy}>
        <h3 className={styles.title}>Never miss a show</h3>
        <p className={styles.text}>Get an email whenever Mel adds a new date. No spam, unsubscribe anytime.</p>
      </div>
      {status === "sent" ? (
        <p className={styles.success} role="status">
          {message}
        </p>
      ) : (
        <form className={styles.form} onSubmit={onSubmit} noValidate={false}>
          <label htmlFor="subscribe-email" className={styles.srOnly}>
            Email address
          </label>
          <input
            id="subscribe-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={styles.input}
          />
          {/* Honeypot, hidden from people and screen readers. */}
          <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className={styles.honeypot} />
          <button type="submit" className={styles.button} disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Keep me posted"}
          </button>
          {status === "error" && message ? (
            <p className={styles.error} role="alert">
              {message}
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
