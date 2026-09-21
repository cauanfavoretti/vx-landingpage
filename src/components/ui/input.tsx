import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-xl border border-white/10 bg-ink-900/70 px-4 text-[15px] text-mist-100 outline-none transition-all duration-200 placeholder:text-mist-600",
        "focus:border-orange-vx-400/70 focus:bg-ink-850 focus:ring-4 focus:ring-orange-vx-500/12",
        className,
      )}
      {...props}
    />
  );
}

export function Select({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "h-12 w-full appearance-none rounded-xl border border-white/10 bg-ink-900/70 px-4 text-[15px] text-mist-100 outline-none transition-all duration-200",
        "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238ea0bd%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-[length:18px] bg-[position:right_14px_center] bg-no-repeat pr-11",
        "focus:border-orange-vx-400/70 focus:ring-4 focus:ring-orange-vx-500/12",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "mb-2 block font-mono text-[11px] tracking-[0.16em] text-mist-500 uppercase",
        className,
      )}
      {...props}
    />
  );
}
