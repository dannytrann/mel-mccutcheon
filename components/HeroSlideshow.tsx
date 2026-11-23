"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

export type Slide = { src: string; position?: string | null };

const INTERVAL_MS = 6500;

// Crossfades through the hero photos. The first photo renders immediately
// (and is the only one shown for reduced-motion users); the rest fade in
// one after another with a slow zoom. Pauses while the tab is hidden.
export default function HeroSlideshow({ slides, alt }: { slides: Slide[]; alt: string }) {
  // `leaving` is the slide fading out. It keeps its zoom running until it's
  // invisible; dropping the animation mid-fade would snap it back to scale 1.
  const [{ active, leaving }, setState] = useState({ active: 0, leaving: -1 });

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setInterval> | undefined;
    const start = () => {
      timer ??= setInterval(
        () => setState(({ active: i }) => ({ active: (i + 1) % slides.length, leaving: i })),
        INTERVAL_MS,
      );
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = undefined;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [slides.length]);

  return (
    <>
      {slides.map((slide, i) => (
        <div
          key={slide.src + i}
          className={`${styles.slide} ${i === active ? styles.slideActive : ""} ${i === leaving ? styles.slideLeaving : ""}`}
          aria-hidden={i !== active}
        >
          <Image
            src={slide.src}
            alt={i === 0 ? alt : ""}
            fill
            priority={i === 0}
            sizes="(max-width: 900px) 100vw, 60vw"
            style={slide.position ? { objectPosition: slide.position } : undefined}
          />
        </div>
      ))}
    </>
  );
}
