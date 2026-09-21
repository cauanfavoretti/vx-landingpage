"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Options = {
  y?: number;
  stagger?: number;
  duration?: number;
  selector?: string;
  start?: string;
  scale?: number;
};

/**
 * Revela `.reveal` (ou o seletor informado) dentro do container quando entra na viewport.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  y = 28,
  stagger = 0.09,
  duration = 0.85,
  selector = ".reveal",
  start = "top 82%",
  scale,
}: Options = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll(selector);
      if (!targets.length) return;
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        scale: scale ? 1 : undefined,
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [y, stagger, duration, selector, start, scale]);

  return ref;
}
