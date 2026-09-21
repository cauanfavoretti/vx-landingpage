"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#problema", label: "Diagnóstico" },
  { href: "#metodo", label: "Método" },
  { href: "#servicos", label: "Serviços" },
  { href: "#resultados", label: "Resultados" },
  { href: "#contato", label: "Contato" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) =>
      document.querySelector(l.href),
    ).filter(Boolean) as Element[];
    if (!sections.length) return;
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        });
        if (window.scrollY < 240) {
          setActive("");
          return;
        }
        let best = "";
        let bestRatio = 0;
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        setActive(best ? `#${best}` : "");
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.9] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-80 transition-all duration-500",
          scrolled
            ? "border-b border-white/8 bg-ink-950/72 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div className="wrap flex h-[74px] items-center justify-between">
          <a href="#top" className="relative z-10 flex items-center gap-3">
            <Image
              src="/uploads/logo-vazada.png"
              alt="VX Consultoria"
              width={124}
              height={33}
              priority
              className="h-[30px] w-auto"
            />
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[14px] font-medium transition-colors duration-300",
                  active === l.href
                    ? "text-white"
                    : "text-mist-500 hover:text-mist-100",
                )}
              >
                {active === l.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-orange-vx-500/28 bg-orange-vx-500/12"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button asChild size="sm" className="pl-4">
              <a href="#contato">
                <CalendarCheck className="size-4" />
                Agendar diagnóstico
              </a>
            </Button>
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Abrir menu"
            className="grid size-10 cursor-pointer place-items-center rounded-xl border border-white/10 bg-white/5 text-mist-100 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-79 bg-ink-950/80 backdrop-blur-md lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              onClick={(e) => e.stopPropagation()}
              className="ml-auto flex h-full w-[min(84vw,340px)] flex-col gap-2 border-l border-white/10 bg-ink-900/95 px-6 pt-24 pb-10"
            >
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.055 }}
                  className="border-b border-white/6 py-4 font-display text-lg text-mist-300 transition-colors hover:text-orange-vx-400"
                >
                  {l.label}
                </motion.a>
              ))}
              <Button asChild size="lg" className="mt-8 w-full">
                <a href="#contato" onClick={() => setOpen(false)}>
                  Agendar diagnóstico
                </a>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
