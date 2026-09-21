"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-90 h-[3px] origin-left bg-[linear-gradient(90deg,var(--color-orange-vx-600),var(--color-orange-vx-400),var(--color-orange-vx-200))] shadow-[0_0_18px_rgba(255,138,61,0.6)]"
    />
  );
}
