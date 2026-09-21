"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ITEMS = [
  {
    h: "Time vendendo no improviso",
    p: "Sem script, sem método, cada vendedor faz do seu jeito — e o resultado é inconsistente.",
  },
  {
    h: "Pipeline furado",
    p: "Leads entram, mas ninguém sabe onde param. Oportunidades morrem por falta de follow-up.",
  },
  {
    h: "Faturamento em montanha-russa",
    p: "Mês bom, mês ruim. Sem previsibilidade você não consegue investir nem planejar.",
  },
  {
    h: "Gestor virou apagador de incêndio",
    p: "O dia inteiro resolvendo problema de venda em vez de liderar e treinar o time.",
  },
];

export function Problem() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(".problem-copy .reveal", {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });

      gsap.to(".strike-line", {
        scaleX: 1,
        duration: 0.7,
        ease: "power2.inOut",
        scrollTrigger: { trigger: ".strike-word", start: "top 76%", once: true },
      });

      gsap.to(".problem-row", {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".problem-list", start: "top 80%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="problema"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute top-1/3 -left-40 size-[460px] rounded-full bg-blue-vx-700/16 blur-[130px]" />
      <div className="wrap grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div className="problem-copy lg:sticky lg:top-28 lg:self-start">
          <div className="reveal">
            <Badge tone="blue">
              <span className="size-1.5 rounded-full bg-current" />
              O Diagnóstico
            </Badge>
          </div>
          <h2 className="reveal mt-6 text-[clamp(30px,4.2vw,54px)] leading-[1.1]">
            Você não tem um problema de{" "}
            <span className="strike-word relative inline-block whitespace-nowrap">
              vendas
              <span className="strike-line absolute top-1/2 left-0 h-[3px] w-full origin-left scale-x-0 rounded-full bg-orange-vx-500" />
            </span>
            .
            <br />
            Você tem um problema de{" "}
            <span className="text-gradient-vx">gestão comercial</span>.
          </h2>
          <p className="reveal mt-7 max-w-[460px] text-[17px] leading-relaxed text-mist-300">
            Vender mais não é trabalhar mais. É instalar processo, método e
            leitura de dados no time que você já tem.
          </p>
        </div>

        <div className="problem-list flex flex-col gap-3">
          {ITEMS.map((it) => (
            <div
              key={it.h}
              className="problem-row group flex translate-x-8 gap-4 rounded-2xl border border-white/7 bg-ink-900/55 p-6 opacity-0 transition-all duration-400 hover:border-orange-vx-500/45 hover:bg-ink-850"
            >
              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl border border-orange-vx-500/25 bg-orange-vx-500/10 text-orange-vx-400 transition-transform duration-400 group-hover:scale-110">
                <X className="size-4.5" strokeWidth={2.5} />
              </span>
              <div>
                <h4 className="text-[18px] text-white">{it.h}</h4>
                <p className="mt-2 text-[15px] leading-relaxed text-mist-500">
                  {it.p}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
