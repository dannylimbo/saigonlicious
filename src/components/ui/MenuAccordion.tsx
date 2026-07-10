"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { BrushLabel } from "@/components/ui/BrushLabel";

type MenuAccordionProps = {
  categoryId: string;
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

export function MenuAccordion({
  categoryId,
  title,
  subtitle,
  defaultOpen = false,
  children,
}: MenuAccordionProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === categoryId && detailsRef.current) {
        detailsRef.current.open = true;
        detailsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [categoryId]);

  return (
    <details
      ref={detailsRef}
      className="group card-dark overflow-hidden p-0 lg:hidden"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 sm:px-5 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          <BrushLabel className="text-xs sm:text-sm">{title}</BrushLabel>
          {subtitle && (
            <p className="mt-2 text-xs text-saigon-green-light sm:text-sm">{subtitle}</p>
          )}
        </div>
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-saigon-green transition-transform group-open:rotate-180"
          aria-hidden
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </summary>
      {children}
    </details>
  );
}
