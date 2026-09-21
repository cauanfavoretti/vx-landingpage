"use client";

import { Workflow, BrainCircuit, BarChart3, BookOpenCheck } from "lucide-react";
import { SectionHead } from "@/components/ui/section-head";
import { useReveal } from "@/hooks/use-reveal";

const ITEMS = [
  {
    icon: Workflow,
    h: "CRM & Automação",
    p: "Implantação e otimização de Pipedrive, RD, HubSpot e similares.",
  },
  {
    icon: BrainCircuit,
    h: "IA Aplicada a Vendas",
    p: "Qualificação de leads, scoring e respostas automatizadas com IA.",
  },
  {
    icon: BarChart3,
    h: "Dashboards & BI",
    p: "Painéis de performance comercial em tempo real para gestão.",
  },
  {
    icon: BookOpenCheck,
    h: "Playbook Digital",
    p: "Processos, scripts e cadências organizados em plataforma única.",
  },
];

export function Tech() {
  const ref = useReveal<HTMLElement>({ stagger: 0.09 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-white/6 bg-ink-900/35 py-24 lg:py-32"
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(60%_60%_at_50%_50%,#000,transparent)]" />

      <SectionHead
        center
        eyebrow="Tecnologia"
        title={
          <>
            Método humano. <span className="text-gradient-vx">Stack tecnológico.</span>
          </>
        }
        sub="Combinamos consultoria de gente com as melhores ferramentas do mercado para garantir escala."
        className="relative"
      />

      <div className="wrap relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(({ icon: Icon, ...it }) => (
          <div
            key={it.h}
            className="reveal group relative overflow-hidden rounded-[var(--radius-vx)] border border-white/8 bg-ink-950/70 p-7 backdrop-blur transition-all duration-400 hover:-translate-y-1.5 hover:border-orange-vx-500/35"
          >
            <div className="absolute inset-x-0 -bottom-20 h-32 bg-orange-vx-500/0 blur-3xl transition-all duration-500 group-hover:bg-orange-vx-500/22" />
            <span className="relative grid size-12 place-items-center rounded-2xl border border-orange-vx-500/25 bg-orange-vx-500/8 text-orange-vx-300 transition-all duration-400 group-hover:border-orange-vx-500/55 group-hover:bg-orange-vx-500/16 group-hover:text-orange-vx-400 group-hover:scale-105">
              <Icon className="size-5.5" />
            </span>
            <h4 className="relative mt-6 text-[18px] text-white">{it.h}</h4>
            <p className="relative mt-3 text-[14.5px] leading-relaxed text-mist-500">
              {it.p}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
