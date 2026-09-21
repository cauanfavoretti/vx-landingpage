"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-display font-semibold tracking-tight transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-orange-vx-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 disabled:pointer-events-none disabled:opacity-55 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "text-white rounded-full bg-[linear-gradient(100deg,var(--color-orange-vx-500),var(--color-orange-vx-400))] shadow-[0_14px_38px_-14px_rgba(255,107,26,0.85)] hover:shadow-[0_18px_50px_-12px_rgba(255,107,26,0.95)] hover:-translate-y-0.5",
        ghost:
          "rounded-full border border-white/12 bg-white/[0.03] text-mist-100 backdrop-blur-md hover:border-orange-vx-400/60 hover:bg-orange-vx-500/10 hover:text-white",
        link: "text-orange-vx-400 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-[13px]",
        md: "h-11 px-6 text-[14px]",
        lg: "h-[54px] px-8 text-[15px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
