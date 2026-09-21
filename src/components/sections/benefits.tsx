"use client";

import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useReveal } from "@/hooks/use-reveal";

const ITEMS = [
  { h: "Previsibilidade de receita", p: "Forecast confiável e pipeline saudável mês a mês." },
  { h: "Time engajado e cobrado", p: "Rituais de gestão que mantêm o time em ritmo de meta." },
  { h: "Processo replicável", p: "Playbook documentado para escalar sem depender de ninguém." },
  { h: "Decisões baseadas em dado", p: "KPIs claros e dashboards que mostram onde agir." },
  { h: "CAC menor, LTV maior", p: "Vender melhor para quem já está dentro do funil." },
  { h: "Cultura de alta performance", p: "Time que se cobra, se ajuda e bate meta com método." },
];

export function Benefits() {
  const ref = useReveal<HTMLElement>({ stagger: 0.08 });

  return (
    <section ref={ref} className="relative py-24 lg:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="reveal">
            <Badge>
              <span className="size-1.5 rounded-full bg-current" />
              Benefícios
            </Badge>
          </div>
          <h2 className="reveal mt-6 text-[clamp(30px,3.6vw,46px)]">
            O que muda na sua empresa em{" "}
            <span className="text-orange-vx-400">90 dias</span>.
          </h2>
          <p className="reveal mt-6 text-[17px] leading-relaxed text-mist-300">
            Resultados que a maioria dos clientes percebe já no primeiro
            trimestre de método VX.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {ITEMS.map((it) => (
            <div
              key={it.h}
              className="reveal group flex gap-4 rounded-2xl border border-white/7 bg-ink-900/50 p-6 transition-all duration-400 hover:-translate-y-1 hover:border-orange-vx-500/40 hover:bg-ink-850"
            >
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--color-orange-vx-400),var(--color-orange-vx-600))] text-white shadow-[0_8px_20px_-8px_rgba(255,107,26,0.9)] transition-transform duration-400 group-hover:scale-110">
                <Check className="size-4" strokeWidth={3} />
              </span>
              <div>
                <h4 className="text-[17px] text-white">{it.h}</h4>
                <p className="mt-2 text-[14.5px] leading-relaxed text-mist-500">
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
