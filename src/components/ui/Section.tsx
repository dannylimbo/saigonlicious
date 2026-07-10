import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DecorativeLayer, type DecorItem } from "@/components/ui/DecorativeLayer";

export type SectionTone =
  | "charcoal"
  | "charcoal-light"
  | "warm-black"
  | "green-black"
  | "olive-dark";

export type SectionPattern = "none" | "dots" | "paper" | "diagonal" | "grain";

export type SectionGlow =
  | "none"
  | "top-left"
  | "top-right"
  | "center"
  | "bottom"
  | "headline";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: SectionTone;
  pattern?: SectionPattern;
  glow?: SectionGlow;
  divider?: boolean;
  decor?: DecorItem[];
  children: ReactNode;
};

export function Section({
  tone = "charcoal",
  pattern = "none",
  glow = "none",
  divider = false,
  decor,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "section-surface relative overflow-hidden",
        `section-tone-${tone}`,
        pattern !== "none" && `section-pattern-${pattern}`,
        glow !== "none" && `section-glow-${glow}`,
        divider && "section-divider-top",
        className
      )}
      {...props}
    >
      {decor && decor.length > 0 && <DecorativeLayer items={decor} />}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
