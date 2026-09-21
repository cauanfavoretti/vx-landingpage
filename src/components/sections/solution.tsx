"use client";

import { Search, FileText, Target } from "lucide-react";
import { SectionHead } from "@/components/ui/section-head";
import { useReveal } from "@/hooks/use-reveal";

const POINTS = [
  {
    n: "01",
    icon: Search,
    h: "Diagnóstico 360° da operação",
    p: "Mapeamos funil, processos, KPIs e gargalos do seu time em até 7 dias.",
  },
  {
    n: "02",
    icon: FileText,
    h: "Playbook comercial sob medida",
    p: "Scripts, cadências e processos desenhados para o seu produto e ticket.",
  },
  {
    n: "03",
    icon: Target,
    h: "Time treinado e cobrado por métrica",
    p: "Implementamos rituais de gestão e treino que sustentam o resultado.",
  },
];

export function Solution() {
  const ref = useReveal<HTMLElement>({ stagger: 0.11 });

  return (
    <section ref={ref} className="relative py-24 lg:py-32">
      <SectionHead
        center
        eyebrow="A Solução"
        title={
          <>
            Consultoria que entra na operação.{" "}
            <span className="text-orange-vx-400">De verdade.</span>
          </>
        }
        sub="A VX não entrega slides bonitos. A gente coloca a mão na massa com o seu time, instala o método e fica até o resultado aparecer no extrato."
      />

      <div className="wrap mt-16 grid gap-5 md:grid-cols-3">
        {POINTS.map(({ icon: Icon, ...pt }) => (
          <div
            key={pt.n}
            className="reveal group relative overflow-hidden rounded-[var(--radius-vx)] border border-white/8 bg-ink-900/60 p-8 text-center transition-all duration-400 hover:-translate-y-1.5 hover:border-orange-vx-500/40 hover:shadow-[0_30px_70px_-34px_rgba(255,107,26,0.75)]"
          >
            <div className="absolute -top-16 left-1/2 size-40 -translate-x-1/2 rounded-full bg-orange-vx-500/0 blur-3xl transition-all duration-500 group-hover:bg-orange-vx-500/25" />
            <div className="relative mx-auto grid size-14 place-items-center rounded-2xl border border-orange-vx-500/25 bg-orange-vx-500/8 text-orange-vx-300 transition-all duration-400 group-hover:border-orange-vx-500/55 group-hover:bg-orange-vx-500/16 group-hover:text-orange-vx-400 group-hover:scale-105">
              <Icon className="size-6" />
            </div>
            <div className="relative mt-6 font-mono text-[11px] tracking-[0.24em] text-mist-600">
              {pt.n}
            </div>
            <h4 className="relative mt-3 text-[19px] text-white">{pt.h}</h4>
            <p className="relative mt-3 text-[15px] leading-relaxed text-mist-500">
              {pt.p}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
