"use client";

import { ArrowUpRight } from "lucide-react";
import { SectionHead } from "@/components/ui/section-head";
import { useReveal } from "@/hooks/use-reveal";

const POSTS = ["DbeE73yR9AQ", "DOZu3NXDvze"];

// The Instagram embed is a fixed 54px header followed by a 4:5 media block,
// then likes/caption. We clip the iframe to the media block only.
const IG_HEADER = 54;

export function Instagram() {
  const revealRef = useReveal<HTMLElement>();

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

      <div className="wrap mt-14 flex flex-col items-center">
        <div className="relative grid w-full max-w-[860px] gap-6 sm:grid-cols-2">
          <div className="pointer-events-none absolute -top-14 left-1/2 size-48 -translate-x-1/2 rounded-full bg-orange-vx-500/22 blur-3xl" />
          {POSTS.map((id) => (
            <div
              key={id}
              className="reveal relative mx-auto aspect-[400/495] w-full max-w-[420px] overflow-hidden rounded-[var(--radius-vx)] bg-ink-850/70"
            >
              <iframe
                src={`https://www.instagram.com/p/${id}/embed/`}
                title="Vídeo da VX no Instagram"
                loading="lazy"
                scrolling="no"
                allow="autoplay; encrypted-media; picture-in-picture"
                className="absolute left-0 h-[calc(100%+454px)] w-full border-0"
                style={{ top: -(IG_HEADER + 2) }}
              />
            </div>
          ))}
        </div>

        <a
          href={`https://www.instagram.com/p/${POSTS[0]}/`}
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
