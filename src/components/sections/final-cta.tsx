"use client";

import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/use-reveal";

export function FinalCta() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative overflow-hidden py-24 lg:py-32">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-[28px] border border-white/8 bg-[linear-gradient(150deg,rgba(15,86,209,0.22),rgba(6,11,24,0.9)_52%,rgba(255,107,26,0.16))] px-7 py-16 text-center sm:px-14 sm:py-20">
          <div className="grid-lines pointer-events-none absolute inset-0 opacity-45 [mask-image:radial-gradient(70%_70%_at_50%_40%,#000,transparent)]" />
          <div className="pointer-events-none absolute -top-24 left-1/2 size-[420px] -translate-x-1/2 rounded-full bg-orange-vx-500/20 blur-[120px]" />

          <div className="reveal relative flex justify-center">
            <Badge tone="orange">
              <span className="size-1.5 rounded-full bg-current" />
              Última chamada
            </Badge>
          </div>

          <h2 className="reveal relative mx-auto mt-7 max-w-[760px] text-[clamp(32px,4.6vw,58px)]">
            Sua próxima meta não vai bater{" "}
            <span className="text-orange-vx-400">sozinha</span>.
          </h2>

          <p className="reveal relative mx-auto mt-6 max-w-[520px] text-[17px] leading-relaxed text-mist-300">
            Pare de tentar resolver vendas com mais esforço. Resolva com método.
          </p>

          <div className="reveal relative mt-10 flex justify-center">
            <Button asChild size="lg" className="group">
              <a href="#contato">
                Agendar diagnóstico gratuito
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
