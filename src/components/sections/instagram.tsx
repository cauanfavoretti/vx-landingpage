"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Clapperboard } from "lucide-react";
import { SectionHead } from "@/components/ui/section-head";
import { useReveal } from "@/hooks/use-reveal";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const POSTS = ["https://www.instagram.com/p/DOZu3NXDvze/"];

export function Instagram() {
  const revealRef = useReveal<HTMLElement>();
  const sentinel = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setLoaded(true);
        if (window.instgrm) {
          window.instgrm.Embeds.process();
          return;
        }
        const s = document.createElement("script");
        s.src = "https://www.instagram.com/embed.js";
        s.async = true;
        s.onload = () => window.instgrm?.Embeds.process();
        document.body.appendChild(s);
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={revealRef} className="relative py-24 lg:py-32">
      <SectionHead
        center
        eyebrow="Na prática"
        title={
          <>
            Veja como a VX{" "}
            <span className="text-orange-vx-400">transforma resultados.</span>
          </>
        }
      />

      <div ref={sentinel} className="wrap mt-14 flex flex-col items-center">
        <div className="reveal relative w-full max-w-[420px] overflow-hidden rounded-[var(--radius-vx)] border border-white/8 bg-ink-900/60 p-3">
          <div className="pointer-events-none absolute -top-14 left-1/2 size-48 -translate-x-1/2 rounded-full bg-orange-vx-500/22 blur-3xl" />
          {loaded ? (
            POSTS.map((url) => (
              <blockquote
                key={url}
                className="instagram-media relative w-full"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                data-instgrm-captioned=""
                style={{
                  background: "#fff",
                  border: 0,
                  borderRadius: 14,
                  boxShadow: "none",
                  margin: 0,
                  padding: 0,
                  width: "100%",
                  minWidth: 300,
                }}
              />
            ))
          ) : (
            <div className="grid h-[520px] place-items-center rounded-xl bg-ink-850/70 text-mist-600">
              <Clapperboard className="size-8 animate-pulse" />
            </div>
          )}
        </div>

        <a
          href={POSTS[0]}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal mt-6 inline-flex items-center gap-2 font-display text-[14px] font-semibold text-orange-vx-400 transition-colors hover:text-orange-vx-400"
        >
          Ver no Instagram
          <ArrowUpRight className="size-4" />
        </a>
      </div>
    </section>
  );
}
