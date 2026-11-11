"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/use-reveal";
import { Badge } from "@/components/ui/badge";

type Logo =
  | { src: string; alt: string; width: number; height: number; box?: string }
  | { name: string; sub: string; box?: string };

const LOGOS: Logo[] = [
  { src: "/uploads/clients/pierre-cunha.png", alt: "Pierre & Cunha — Advogados Associados", width: 378, height: 88, box: "w-[230px]" },
  { src: "/uploads/clients/projecont.png", alt: "Grupo Projecont", width: 565, height: 250 },
  { name: "Dr. Fábio Castello", sub: "Advogado", box: "w-[210px]" },
  { src: "/uploads/clients/raissa-said.png", alt: "Dra. Raíssa Said — Otorrinolaringologista", width: 297, height: 150 },
  { src: "/uploads/clients/cemed.png", alt: "CEMED Imagem — Centro Médico e Diagnóstico por Imagem", width: 557, height: 291 },
  { src: "/uploads/clients/casa-resistencia.png", alt: "Casa da Resistência da Amazônia", width: 618, height: 549, box: "w-[110px]" },
  { src: "/uploads/clients/ts-clinic.png", alt: "TS Clinic", width: 320, height: 271, box: "w-[110px]" },
  { src: "/uploads/clients/nathalia-matos.png", alt: "Nathália Matos — Dermatologia", width: 842, height: 224, box: "w-[230px]" },
  { src: "/uploads/clients/yenly-gonzalez.png", alt: "Yenly Gonzalez — Otorrinolaringologia", width: 364, height: 126 },
];

export function Clients() {
  const ref = useReveal<HTMLElement>();
  const loop = [...LOGOS, ...LOGOS];

  return (
    <section ref={ref} className="relative border-y border-white/6 py-20">
      <div className="wrap mb-14 text-center">
        <div className="reveal flex justify-center">
          <Badge tone="neutral">
            <span className="size-1.5 rounded-full bg-orange-vx-500" />
            Quem confia
          </Badge>
        </div>
        <h2 className="reveal mx-auto mt-6 max-w-[860px] text-[clamp(24px,3.1vw,38px)] leading-[1.25] text-mist-500">
          Dezenas de empresas já{" "}
          <span className="text-white">escalaram seus resultados</span> e
          transformaram seus times comerciais com a{" "}
          <span className="text-orange-vx-400">VX</span>.
        </h2>
      </div>

      <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-16 group-hover:[animation-play-state:paused]">
          {loop.map((l, i) => (
            <div
              key={`${"src" in l ? l.alt : l.name}-${i}`}
              aria-hidden={i >= LOGOS.length || undefined}
              className={`grid h-16 shrink-0 place-items-center opacity-45 grayscale transition-all duration-400 hover:opacity-100 hover:grayscale-0 ${l.box ?? "w-[170px]"}`}
            >
              {"src" in l ? (
                <Image
                  src={l.src}
                  alt={l.alt}
                  width={l.width}
                  height={l.height}
                  className="max-h-16 w-auto max-w-full object-contain"
                />
              ) : (
                <span className="flex flex-col items-center gap-1.5 whitespace-nowrap text-center text-white">
                  <strong className="font-display text-[22px] leading-none font-semibold tracking-tight">{l.name}</strong>
                  <small className="text-[10px] tracking-[0.32em] uppercase">{l.sub}</small>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
