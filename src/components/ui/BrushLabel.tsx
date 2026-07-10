import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BrushLabelProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "stamp";
};

export function BrushLabel({ children, className, variant = "default" }: BrushLabelProps) {
  if (variant === "stamp") {
    return <span className={cn("stamp-badge", className)}>{children}</span>;
  }
  return <span className={cn("brush-label", className)}>{children}</span>;
}

type SectionHeadingProps = {
  label?: string;
  accent?: boolean;
  brushStroke?: boolean;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
  id?: string;
  foodCrop?: { src: string };
};

export function SectionHeading({
  label,
  accent = false,
  brushStroke = false,
  title,
  subtitle,
  className,
  align = "left",
  id,
  foodCrop,
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
      <div
        className={cn(
          "flex items-start gap-4",
          align === "center" && "flex-col items-center"
        )}
      >
        {foodCrop && (
          <div className="food-crop-circle hidden h-14 w-14 sm:block lg:h-16 lg:w-16" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={foodCrop.src}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className={cn(align === "center" && "text-center")}>
          <h2
            id={id}
            className={cn(
              "section-heading font-display tracking-wide text-white",
              brushStroke && "brush-stroke"
            )}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="prose-muted mt-4 text-lg text-muted">{subtitle}</p>
          )}
        </div>
      </div>
      {brushStroke && align === "center" && (
        <div className="brush-divider mt-6" aria-hidden />
      )}
    </div>
  );
}
