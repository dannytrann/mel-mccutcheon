"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Lightbox.module.css";

// Opens images in an on-page modal instead of a new tab.
//
// Any link marked `data-lightbox="<group>"` opens its href in the modal;
// arrows/keys/swipe step through the other links in the same group (in page
// order). The links still work as plain links without JS. Inside the Tina
// visual editor (which renders the site in an iframe) clicks are left for
// Tina to handle, so click-to-edit keeps working.
type Item = { src: string; alt: string };

export default function Lightbox() {
  const [items, setItems] = useState<Item[]>([]);
  const [index, setIndex] = useState(-1);
  const touchX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index >= 0 && items.length > 0;

  const close = useCallback(() => setIndex(-1), []);
  const step = useCallback(
    (dir: number) => setIndex((i) => (items.length ? (i + dir + items.length) % items.length : -1)),
    [items.length],
  );

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[data-lightbox]");
      if (!link) return;
      e.preventDefault();
      if (window.self !== window.top) return; // Tina editor iframe

      const group = link.dataset.lightbox;
      const links = Array.from(
        document.querySelectorAll<HTMLAnchorElement>(`a[data-lightbox="${CSS.escape(group ?? "")}"]`),
      );
      setItems(
        links.map((a) => ({
          src: a.href,
          alt: a.querySelector("img")?.alt || a.getAttribute("aria-label") || "",
        })),
      );
      setIndex(Math.max(0, links.indexOf(link)));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    const prevOverflow = document.body.style.overflow;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      prevFocus?.focus?.();
    };
  }, [open, close, step]);

  if (!open) return null;
  const item = items[index];
  const multiple = items.length > 1;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt || "Image viewer"}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null || !multiple) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- full-size original, any host */}
      <img key={item.src} src={item.src} alt={item.alt} className={styles.image} />

      <button ref={closeRef} type="button" className={`${styles.btn} ${styles.close}`} onClick={close} aria-label="Close">
        ×
      </button>
      {multiple ? (
        <>
          <button type="button" className={`${styles.btn} ${styles.prev}`} onClick={() => step(-1)} aria-label="Previous image">
            ‹
          </button>
          <button type="button" className={`${styles.btn} ${styles.next}`} onClick={() => step(1)} aria-label="Next image">
            ›
          </button>
          <div className={styles.counter}>
            {index + 1} / {items.length}
          </div>
        </>
      ) : null}
    </div>
  );
}
