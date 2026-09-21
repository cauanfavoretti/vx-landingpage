"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;
const DialogClose = DialogPrimitive.Close;

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-100 bg-ink-950/85 backdrop-blur-md data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in" />
      <DialogPrimitive.Content
        className={cn(
          "fixed top-1/2 left-1/2 z-101 w-[min(94vw,560px)] -translate-x-1/2 -translate-y-1/2",
          "glass-card rounded-[22px] p-0 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] outline-none",
          "data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-95",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute top-3.5 right-3.5 z-10 grid size-9 cursor-pointer place-items-center rounded-full border border-white/12 bg-ink-900/80 text-mist-300 transition hover:border-orange-vx-500/60 hover:text-orange-vx-400">
          <X className="size-4" />
          <span className="sr-only">Fechar</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
