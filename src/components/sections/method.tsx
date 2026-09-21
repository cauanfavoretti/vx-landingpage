"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { SectionHead } from "@/components/ui/section-head";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    n: "01",
    h: "Clareza",
    p: "Mapeamos sua operação, identificamos gargalos e definimos metas reais com base nos seus números.",
  },
  {
    n: "02",
    h: "Processo",
    p: "Desenhamos o playbook comercial, estruturamos cadências e treinamos seu time para executar com consistência.",
  },
  {
    n: "03",
    h: "Acompanhamento Contínuo",
    p: "Monitoramos os resultados, ajustamos a rota e estamos ao lado do time até a meta virar rotina.",
  },
];

const ANGLES = [-90, 30, 150];
const DOT_R = 168;
const TEXT_R = [246, 262, 262];

function polar(deg: number, r: number) {
  const a = (deg * Math.PI) / 180;
  return { x: Math.cos(a) * r, y: Math.sin(a) * r };
}

function GearRings({ active }: { active: number }) {
  return (
    <>
      <svg
        viewBox="0 0 540 540"
        className="absolute inset-0 size-full animate-spin-slow"
        fill="none"
        aria-hidden
      >
        <circle
          cx="270"
          cy="270"
          r="155"
          stroke="rgba(255,138,61,0.28)"
          strokeWidth="1.5"
          strokeDasharray="8 12"
        />
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={270 + Math.cos(a) * 155}
              y1={270 + Math.sin(a) * 155}
              x2={270 + Math.cos(a) * 167}
              y2={270 + Math.sin(a) * 167}
              stroke={i % 4 === 0 ? "rgba(255,107,26,0.55)" : "rgba(255,138,61,0.4)"}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          );
        })}
        <circle
          cx="270"
          cy="270"
          r="114"
          stroke="rgba(255,138,61,0.14)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
      </svg>

      <svg
        viewBox="0 0 540 540"
        className="absolute inset-0 size-full animate-spin-reverse"
        fill="none"
        aria-hidden
      >
        <circle
          cx="270"
          cy="270"
          r="70"
          stroke="rgba(59,135,255,0.32)"
          strokeWidth="1"
          strokeDasharray="5 7"
        />
        {Array.from({ length: 14 }).map((_, i) => {
          const a = (i / 14) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={270 + Math.cos(a) * 70}
              y1={270 + Math.sin(a) * 70}
              x2={270 + Math.cos(a) * 78}
              y2={270 + Math.sin(a) * 78}
              stroke="rgba(59,135,255,0.42)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      <svg viewBox="0 0 540 540" className="absolute inset-0 size-full" fill="none" aria-hidden>
        {ANGLES.map((deg, i) => {
          const p = polar(deg, DOT_R);
          return (
            <line
              key={i}
              x1="270"
              y1="270"
              x2={270 + p.x}
              y2={270 + p.y}
              stroke={i === active ? "rgba(255,107,26,0.55)" : "rgba(255,138,61,0.18)"}
              strokeWidth="1"
              strokeDasharray="4 6"
              className="transition-all duration-500"
            />
          );
        })}
      </svg>
    </>
  );
}

export function Method() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(".reveal", {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 3600);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={root}
      id="metodo"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-vx-600/12 blur-[140px]" />

      <SectionHead
        center
        eyebrow="Método VX"
        title={
          <>
            3 etapas. <span className="text-orange-vx-400">Resultado mensurável.</span>
          </>
        }
      />

      {/* Roda — desktop */}
      <div className="wrap mt-16 hidden lg:block">
        <div className="reveal relative mx-auto h-[720px] w-[720px]">
          <div className="absolute top-1/2 left-1/2 size-[540px] -translate-x-1/2 -translate-y-1/2">
            <GearRings active={active} />

            <div className="absolute top-1/2 left-1/2 grid size-[104px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-orange-vx-500/30 bg-ink-900/90 font-display text-2xl font-bold tracking-tight text-white shadow-[0_0_60px_-10px_rgba(255,107,26,0.7)] backdrop-blur">
              VX
            </div>

            {ANGLES.map((deg, i) => {
              const p = polar(deg, DOT_R);
              return (
                <span
                  key={i}
                  style={{
                    left: `calc(50% + ${p.x}px)`,
                    top: `calc(50% + ${p.y}px)`,
                  }}
                  className={cn(
                    "absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500",
                    i === active
                      ? "scale-150 bg-orange-vx-500 shadow-[0_0_22px_rgba(255,107,26,0.9)]"
                      : "bg-orange-vx-400/60",
                  )}
                />
              );
            })}
          </div>

          {STEPS.map((s, i) => {
            const p = polar(ANGLES[i], TEXT_R[i]);
            const transform = [
              "translate(-50%,-100%)",
              "translate(0,-50%)",
              "translate(-100%,-50%)",
            ][i];
            const align = ["text-center", "text-left", "text-right"][i];
            return (
              <motion.div
                key={s.n}
                onMouseEnter={() => setActive(i)}
                animate={{ opacity: i === active ? 1 : 0.55 }}
                style={{
                  left: `calc(50% + ${p.x}px)`,
                  top: `calc(50% + ${p.y}px)`,
                  transform,
                }}
                className={cn("absolute w-[268px]", align)}
              >
                <div
                  className={cn(
                    "font-mono text-[12px] tracking-[0.3em] transition-colors duration-400",
                    i === active ? "text-orange-vx-400" : "text-mist-600",
                  )}
                >
                  {s.n}
                </div>
                <h4 className="mt-2.5 text-[24px] text-white">{s.h}</h4>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-mist-500">
                  {s.p}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Timeline — mobile/tablet */}
      <div className="wrap mt-14 lg:hidden">
        <div className="relative flex flex-col gap-8 pl-11">
          <span className="absolute top-2 bottom-2 left-[18px] w-px bg-[linear-gradient(180deg,var(--color-orange-vx-500),var(--color-orange-vx-500))]" />
          {STEPS.map((s) => (
            <div key={s.n} className="reveal relative">
              <span className="absolute top-1 -left-[38px] grid size-9 place-items-center rounded-full border border-orange-vx-500/35 bg-ink-900 font-mono text-[11px] text-orange-vx-200">
                {s.n}
              </span>
              <h4 className="text-[21px] text-white">{s.h}</h4>
              <p className="mt-2 text-[15px] leading-relaxed text-mist-500">
                {s.p}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
