"use client";

import { useEffect } from "react";

// Fades content up into place as it scrolls into view.
//
// Targets are picked structurally so sections don't need per-element markup:
// within each <section> (except the hero, which animates in pure CSS on
// load), every child of the section's inner wrapper is revealed — and when a
// child is a list/grid (3+ children), its items are revealed one by one with
// a short stagger instead.
//
// Content is only hidden once JS has marked it, and anything already on
// screen when the page loads is left alone, so there's no flash and no
// hidden content without JS or for reduced-motion users.
export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const targets: HTMLElement[] = [];
    document.querySelectorAll<HTMLElement>("section:not(#home)").forEach((section) => {
      Array.from(section.children).forEach((wrap) => {
        Array.from(wrap.children).forEach((child) => {
          const kids = Array.from(child.children) as HTMLElement[];
          if (kids.length >= 3) targets.push(...kids);
          else targets.push(child as HTMLElement);
        });
      });
    });

    const viewportBottom = window.innerHeight;
    const pending = targets.filter((el) => el.getBoundingClientRect().top > viewportBottom * 0.92);
    pending.forEach((el) => el.setAttribute("data-reveal", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries.filter((e) => e.isIntersecting);
        entering.forEach((entry, i) => {
          const el = entry.target as HTMLElement;
          el.style.transitionDelay = `${Math.min(i, 5) * 90}ms`;
          el.setAttribute("data-reveal", "in");
          observer.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    pending.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
