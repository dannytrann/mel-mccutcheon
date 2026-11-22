"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const SCRIPT_ID = "instagram-embed-js";

// Instagram's official embed: a blockquote carrying the post URL, upgraded
// into an iframe by embed.js. The script only scans the DOM when it first
// loads, so later mounts ask it to re-process.
export default function InstagramEmbed({ url, caption }: { url: string; caption: string }) {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }
    if (document.getElementById(SCRIPT_ID)) return;
    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.async = true;
    s.src = "https://www.instagram.com/embed.js";
    document.body.appendChild(s);
  }, []);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{
        background: "#fff",
        border: 0,
        borderRadius: 12,
        margin: 0,
        maxWidth: 540,
        minWidth: 280,
        width: "100%",
        padding: 0,
      }}
    >
      <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "1.5rem", color: "#17A398" }}>
        {caption} (view on Instagram)
      </a>
    </blockquote>
  );
}
