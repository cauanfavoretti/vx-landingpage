"use client";

import { UserRound, Building2, GraduationCap, ArrowUpRight } from "lucide-react";
import { SectionHead } from "@/components/ui/section-head";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    n: "/01",
    icon: UserRound,
    h: "Mentoria Individual",
    p: "Acompanhamento 1:1 para gestores e fundadores que querem destravar a operação comercial.",
    b: "Para gestores e founders",
  },
  {
    n: "/02",
    icon: Building2,
    h: "Consultoria Comercial",
    p: "Implementação completa de processos, métricas, playbook e gestão do time de vendas.",
    b: "Para empresas em crescimento",
    featured: true,
    tag: "Mais procurado",
  },
  {
    n: "/03",
    icon: GraduationCap,
    h: "Treinamento In Company",
    p: "Formação intensiva do seu time em prospecção, qualificação, negociação e fechamento.",
    b: "Para times de vendas",
  },
];

export function Services() {
  const ref = useReveal<HTMLElement>({ stagger: 0.11 });

  return (
    <section
      ref={ref}
      id="servicos"
      className="relative border-y border-white/6 bg-ink-900/35 py-24 lg:py-32"
    >
      <SectionHead
        eyebrow="Serviços"
        title={
          <>
            Três frentes. Um único objetivo:{" "}
            <span className="text-gradient-vx">vender mais.</span>
          </>
        }
        sub="Escolha o formato que se encaixa no momento da sua empresa — ou combine os três."
        className="wrap !max-w-none"
      />

      <div className="wrap mt-14 grid gap-5 md:grid-cols-3">
        {SERVICES.map(({ icon: Icon, ...s }) => (
          <article
            key={s.n}
            className={cn(
              "reveal group relative flex flex-col overflow-hidden rounded-[var(--radius-vx)] border p-8 transition-all duration-400",
              s.featured
                ? "border-orange-vx-500/35 bg-[linear-gradient(165deg,rgba(255,107,26,0.09),rgba(11,22,40,0.85))] shadow-[0_30px_80px_-40px_rgba(255,107,26,0.6)] md:-translate-y-3"
                : "border-white/8 bg-ink-900/60 hover:-translate-y-2 hover:border-orange-vx-500/45",
            )}
          >
            {s.tag && (
              <span className="absolute top-0 right-6 rounded-b-lg bg-orange-vx-500 px-3 py-1.5 font-mono text-[10px] font-semibold tracking-[0.14em] text-white uppercase">
                {s.tag}
              </span>
            )}

            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "grid size-12 place-items-center rounded-2xl border transition-colors duration-400",
                  s.featured
                    ? "border-orange-vx-500/40 bg-orange-vx-500/12 text-orange-vx-400"
                    : "border-orange-vx-500/25 bg-orange-vx-500/8 text-orange-vx-300 group-hover:border-orange-vx-500/55 group-hover:bg-orange-vx-500/16 group-hover:text-orange-vx-400",
                )}
              >
                <Icon className="size-5.5" />
              </span>
              <span className="font-mono text-[12px] tracking-[0.2em] text-mist-600">
                {s.n}
              </span>
            </div>

            <h3 className="mt-7 text-[24px] text-white">{s.h}</h3>
            <p className="mt-3.5 flex-1 text-[15px] leading-relaxed text-mist-500">
              {s.p}
            </p>

            <div className="mt-7 flex items-center gap-2.5 border-t border-white/8 pt-5 font-mono text-[11px] tracking-[0.14em] text-mist-500 uppercase">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-orange-vx-500/70" />
                <span className="relative inline-flex size-2 rounded-full bg-orange-vx-500" />
              </span>
              {s.b}
            </div>

            <a
              href="#contato"
              className={cn(
                "mt-6 inline-flex items-center gap-2 font-display text-[14px] font-semibold transition-colors",
                s.featured
                  ? "text-orange-vx-400 hover:text-orange-vx-300"
                  : "text-orange-vx-400 hover:text-orange-vx-400",
              )}
            >
              Falar sobre esse formato
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
