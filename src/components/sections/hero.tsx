"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Sparkles, MousePointerClick } from "lucide-react";
import { Button } from "@/components/ui/button";

const METRICS = [
  { num: "+250", lbl: "Clientes" },
  { num: "3.4x", lbl: "Faturamento médio" },
  { num: "98%", lbl: "Recomendação" },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const SELECTORS =
      ".hero-pill, .hero-line, .hero-lead, .hero-cta > *, .hero-metric, .hero-portrait";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-pill",
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
      )
        .fromTo(
          ".hero-line",
          { yPercent: 118, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, stagger: 0.1 },
          "-=0.35",
        )
        .fromTo(
          ".hero-lead",
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.55",
        )
        .fromTo(
          ".hero-cta > *",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, clearProps: "opacity,transform" },
          "-=0.45",
        )
        .fromTo(
          ".hero-metric",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          "-=0.4",
        )
        .fromTo(
          ".hero-portrait",
          { scale: 1.06, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.4, ease: "power2.out" },
          "-=1.3",
        );
    }, root);

    // Rede de segurança: se algo quebrar no meio da timeline, o conteúdo do
    // hero não pode ficar preso em opacity: 0.
    const watchdog = window.setTimeout(() => {
      const el = root.current;
      if (!el) return;
      el.querySelectorAll<HTMLElement>(SELECTORS).forEach((n) => {
        if (n.style.opacity && Number(n.style.opacity) < 1) {
          n.style.opacity = "";
          n.style.transform = "";
        }
      });
    }, 6000);

    return () => {
      window.clearTimeout(watchdog);
      ctx.revert();
    };
  }, []);

  const reduced = useReducedMotion();

  return (
    <section
      ref={root}
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-black pt-[440px] pb-16 sm:pt-[520px] lg:pt-32 lg:pb-24"
    >
      {/* A foto ocupa a lateral direita e se dissolve no preto à esquerda. */}
      <div className="hero-portrait pointer-events-none absolute top-0 right-0 h-[540px] w-full sm:h-[620px] lg:h-full lg:w-[62%]">
        <Image
          src="/uploads/fabio-escritorio.png"
          alt="Fabio, da VX Consultoria, em seu escritório"
          fill
          preload
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="object-cover object-[58%_20%] lg:object-[50%_25%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0.65)_10%,rgba(0,0,0,0.15)_28%,transparent_46%)] lg:bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0.9)_8%,rgba(0,0,0,0.55)_22%,rgba(0,0,0,0.12)_40%,transparent_58%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15)_0%,transparent_50%,#000_100%)] lg:bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,transparent_65%,#000_100%)]" />
      </div>

      <div className="wrap relative z-10">
        <div className="relative max-w-[620px]">
          <div>
            <span className="hero-pill inline-flex items-center gap-2.5 rounded-full border border-orange-vx-500/28 bg-orange-vx-500/10 py-2 pr-4 pl-3 backdrop-blur-md">
              <span className="relative grid size-6 place-items-center rounded-full bg-orange-vx-500/18">
                <Sparkles className="size-3.5 text-orange-vx-400" />
                <span className="absolute inset-0 animate-pulse-ring rounded-full" />
              </span>
              <span className="font-mono text-[11px] tracking-[0.2em] text-orange-vx-100 uppercase">
                Consultoria Comercial
              </span>
              <span className="hidden h-3.5 w-px bg-white/15 sm:block" />
              <span className="hidden font-mono text-[11px] tracking-[0.2em] text-orange-vx-300 uppercase sm:inline">
                B2B &amp; B2C
              </span>
            </span>

            <h1 className="mt-7 text-[clamp(36px,5.4vw,68px)] leading-[1.03]">
              <span className="block overflow-hidden">
                <span className="hero-line block">Transforme sua operação</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line block">comercial em uma</span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="hero-line block text-gradient-vx">
                  máquina de vendas.
                </span>
              </span>
            </h1>

            <p className="hero-lead mt-6 max-w-[540px] text-[17px] leading-relaxed text-mist-300">
              Diagnóstico, método e execução para times comerciais que querem
              previsibilidade, controle e crescimento real — sem achismo, sem
              improviso.
            </p>

            <div className="hero-cta mt-9 flex flex-wrap items-center gap-3.5">
              <Button asChild size="lg" className="group">
                <a href="#contato">
                  Agendar diagnóstico
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <a href="#metodo">
                  <MousePointerClick className="size-4" />
                  Conhecer o método
                </a>
              </Button>
            </div>

            <div className="mt-12 grid max-w-[520px] grid-cols-3 gap-4 border-t border-white/8 pt-8">
              {METRICS.map((m) => (
                <div key={m.lbl} className="hero-metric">
                  <div className="font-display text-[30px] leading-none font-semibold text-white">
                    {m.num}
                  </div>
                  <div className="mt-2 font-mono text-[11px] tracking-[0.16em] text-mist-500 uppercase">
                    {m.lbl}
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>

      {!reduced && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden justify-center lg:flex"
        >
          <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/15 p-1.5">
            <motion.span
              animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
              className="block h-2 w-[3px] rounded-full bg-orange-vx-400"
            />
          </span>
        </motion.div>
      )}
    </section>
  );
}
