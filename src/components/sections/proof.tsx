"use client";

import { useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Quote, ZoomIn } from "lucide-react";
import { Counter } from "@/components/ui/counter";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const STATS = [
  { prefix: "+", value: 250, suffix: "", decimals: 0, label: "Empresas atendidas" },
  { prefix: "+R$", value: 48, suffix: "mi", decimals: 0, label: "Gerados em vendas" },
  { prefix: "+", value: 1800, suffix: "", decimals: 0, label: "Vendedores treinados" },
  { prefix: "", value: 4.9, suffix: "/5", decimals: 1, label: "Nota média NPS" },
];

const PRINTS = [
  { src: "/uploads/proof1.jpeg", tag: "Meta batida", cap: "Mês passado batemos a meta" },
  { src: "/uploads/proof2.jpeg", tag: "+R$104k", cap: "104k até ontem · metade do mês" },
  { src: "/uploads/proof3.webp", tag: "R$100.520", cap: "Saí da prefeitura · 100% consultório" },
  { src: "/uploads/proof4.jpeg", tag: "Feedback", cap: "Tu é demais, obrigada pelos resultados" },
  { src: "/uploads/proof5.jpeg", tag: "+R$150k", cap: "Passamos os 150k — equipe maraaa de milhões!" },
];

export function Proof() {
  const ref = useReveal<HTMLElement>({ stagger: 0.1 });
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: true,
  });
  const [zoom, setZoom] = useState<(typeof PRINTS)[number] | null>(null);

  return (
    <section ref={ref} id="resultados" className="relative py-24 lg:py-32">
      <div className="wrap">
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-vx)] border border-white/8 bg-white/6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="reveal group relative bg-ink-900/90 px-7 py-10 text-center transition-colors duration-400 hover:bg-ink-850"
            >
              <div className="absolute inset-x-0 top-0 h-px scale-x-0 bg-[linear-gradient(90deg,transparent,var(--color-orange-vx-500),transparent)] transition-transform duration-500 group-hover:scale-x-100" />
              <div className="font-display text-[clamp(30px,3.4vw,44px)] leading-none font-semibold text-white">
                <Counter {...s} />
              </div>
              <div className="mt-3 font-mono text-[11px] tracking-[0.16em] text-mist-500 uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="reveal">
              <Badge tone="orange">
                <span className="size-1.5 rounded-full bg-current" />
                Prova social · 2024–2025
              </Badge>
            </div>
            <h3 className="reveal mt-5 text-[clamp(26px,3.4vw,42px)]">
              Resultados reais, <span className="text-orange-vx-400">conversas reais</span>.
            </h3>
          </div>
          <div className="reveal flex gap-2.5">
            <button
              onClick={() => embla?.scrollPrev()}
              aria-label="Anterior"
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-white/12 bg-white/4 text-mist-300 transition hover:border-orange-vx-400/60 hover:text-white"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              onClick={() => embla?.scrollNext()}
              aria-label="Próximo"
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-white/12 bg-white/4 text-mist-300 transition hover:border-orange-vx-400/60 hover:text-white"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="reveal mt-8 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {PRINTS.map((p) => (
              <button
                key={p.src}
                onClick={() => setZoom(p)}
                className={cn(
                  "group relative w-[76vw] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/8 bg-ink-900 text-left transition-all duration-400",
                  "hover:-translate-y-1.5 hover:border-orange-vx-500/45 hover:shadow-[0_28px_60px_-28px_rgba(255,107,26,0.6)]",
                  "sm:w-[340px]",
                )}
              >
                <span className="absolute top-3.5 left-3.5 z-10 rounded-full border border-orange-vx-500/40 bg-ink-950/85 px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-orange-vx-300 uppercase backdrop-blur">
                  {p.tag}
                </span>
                <span className="absolute top-3.5 right-3.5 z-10 grid size-8 place-items-center rounded-full bg-ink-950/75 text-mist-300 opacity-0 backdrop-blur transition group-hover:opacity-100">
                  <ZoomIn className="size-4" />
                </span>
                <span className="block h-[260px] w-full overflow-hidden bg-ink-850">
                  <Image
                    src={p.src}
                    alt={p.cap}
                    width={640}
                    height={800}
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                </span>
                <span className="flex items-start gap-2.5 border-t border-white/6 px-4 py-4 text-[13.5px] leading-snug text-mist-300">
                  <Quote className="mt-0.5 size-3.5 shrink-0 text-orange-vx-400/70" />
                  {p.cap}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!zoom} onOpenChange={(o) => !o && setZoom(null)}>
        <DialogContent className="w-[min(94vw,440px)] p-3">
          <DialogTitle className="sr-only">{zoom?.cap ?? "Prova"}</DialogTitle>
          {zoom && (
            <Image
              src={zoom.src}
              alt={zoom.cap}
              width={900}
              height={1400}
              className="h-auto w-full rounded-xl"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
