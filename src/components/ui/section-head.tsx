import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SectionHead({
  eyebrow,
  title,
  sub,
  center,
  tone = "orange",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  center?: boolean;
  tone?: "orange" | "blue" | "neutral";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[720px]",
        center && "mx-auto text-center",
        className,
      )}
    >
      <div className="reveal">
        <Badge tone={tone}>
          <span className="size-1.5 rounded-full bg-current" />
          {eyebrow}
        </Badge>
      </div>
      <h2 className="reveal mt-5 text-[clamp(30px,4vw,50px)]">{title}</h2>
      {sub && (
        <p className="reveal mt-5 text-[17px] leading-relaxed text-mist-300">
          {sub}
        </p>
      )}
    </div>
  );
}
