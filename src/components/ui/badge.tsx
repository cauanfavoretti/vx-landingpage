import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "orange",
  ...props
}: React.ComponentProps<"span"> & { tone?: "orange" | "blue" | "neutral" }) {
  const tones = {
    blue: "border-blue-vx-400/30 bg-blue-vx-500/10 text-blue-vx-200",
    orange: "border-orange-vx-500/40 bg-orange-vx-500/12 text-orange-vx-300",
    neutral: "border-white/12 bg-white/5 text-mist-300",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] font-medium tracking-[0.18em] uppercase",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
