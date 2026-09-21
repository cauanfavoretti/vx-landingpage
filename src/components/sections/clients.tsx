"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/use-reveal";
import { Badge } from "@/components/ui/badge";

const LOGOS = [
  { src: "/uploads/pasted-1777072466716-0.png", alt: "PneuForte" },
  { src: "/uploads/pasted-1777072420243-0.png", alt: "Nathália Matos — Dermatologia" },
  { src: "/uploads/pasted-1777072483877-0.png", alt: "Doctor Saúde" },
  { src: "/uploads/pasted-1777072476436-0.png", alt: "Grupo Médico Santa Clara" },
  { src: "/uploads/pasted-1777072454736-0.png", alt: "Yenly Gonzalez — Otorrinolaringologia" },
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
              key={`${l.alt}-${i}`}
              className="grid h-16 w-[170px] shrink-0 place-items-center opacity-45 grayscale transition-all duration-400 hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={l.src}
                alt={l.alt}
                width={220}
                height={80}
                className="max-h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
