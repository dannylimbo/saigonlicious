import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BrushLabelProps = {
  children: ReactNode;
  className?: string;
};

export function BrushLabel({ children, className }: BrushLabelProps) {
  return <span className={cn("brush-label", className)}>{children}</span>;
}

type SectionHeadingProps = {
  label?: string;
  accent?: boolean;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
  id?: string;
};

export function SectionHeading({
  label,
  accent = false,
  title,
  subtitle,
  className,
  align = "left",
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {label && (
        <div className={cn("mb-3", align === "center" && "flex justify-center")}>
          <BrushLabel>{label}</BrushLabel>
        </div>
      )}
      {accent && !label && (
        <span
          className={cn("section-accent", align === "center" && "mx-auto")}
          aria-hidden
        />
      )}
      <h2
        id={id}
        className="section-heading font-display tracking-wide text-white"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="prose-muted mt-4 text-lg text-muted">{subtitle}</p>
      )}
    </div>
  );
}
