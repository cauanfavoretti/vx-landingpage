import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "glass-card relative overflow-hidden rounded-[var(--radius-vx)]",
        className,
      )}
      {...props}
    />
  );
}
