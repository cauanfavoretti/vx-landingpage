"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/use-reveal";

const MAPS_URL =
  "https://www.google.com/maps/search/Rua+Rio+Javari,+361,+Nossa+Sra.+das+Gracas,+Manaus,+AM,+69053-110";

export function Location() {
  const ref = useReveal<HTMLElement>();
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        el.src = "/uploads/escritorio.mp4";
        el.load();
        el.play().catch(() => {});
      },
      { threshold: 0.2, rootMargin: "250px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative border-t border-white/6 py-24 lg:py-32">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="reveal">
            <Badge>
              <span className="size-1.5 rounded-full bg-current" />
              Onde estamos
            </Badge>
          </div>
          <h2 className="reveal mt-6 text-[clamp(30px,3.6vw,46px)]">
            Venha nos <span className="text-orange-vx-400">visitar.</span>
          </h2>

          <div className="reveal mt-8 flex gap-4 rounded-2xl border border-white/8 bg-ink-900/55 p-6">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-orange-vx-500/28 bg-orange-vx-500/10 text-orange-vx-400">
              <MapPin className="size-5" />
            </span>
            <div>
              <p className="font-display text-[19px] text-white">
                Rua Rio Javari, 361
              </p>
              <p className="mt-1.5 text-[15px] text-mist-300">
                Nossa Sra. das Graças · Manaus – AM
              </p>
              <p className="mt-1 font-mono text-[13px] text-mist-600">
                CEP 69053-110
              </p>
            </div>
          </div>

          <div className="reveal mt-7">
            <Button asChild variant="ghost" size="lg" className="group">
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                Abrir no Google Maps
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </div>
        </div>

        <div className="reveal relative overflow-hidden rounded-[var(--radius-vx)] border border-white/8 bg-ink-900">
          <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,transparent_55%,rgba(4,7,15,0.75))]" />
          <video
            ref={video}
            preload="none"
            muted
            loop
            playsInline
            poster="/uploads/mobile.png"
            className="aspect-[4/3] size-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
