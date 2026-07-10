import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type DecorIcon =
  | "lime"
  | "chili"
  | "cilantro"
  | "rice"
  | "noodles"
  | "peanut"
  | "mango"
  | "curry-bowl"
  | "orchid";

export type DecorItem = {
  icon: DecorIcon;
  className?: string;
  mobile?: boolean;
};

const iconPaths: Record<DecorIcon, ReactNode> = {
  lime: (
    <>
      <circle cx="12" cy="12" r="9" strokeWidth="1.2" />
      <path d="M12 3v18M3 12h18" strokeWidth="0.8" />
      <path d="M6 6l12 12M18 6L6 18" strokeWidth="0.6" opacity="0.5" />
    </>
  ),
  chili: (
    <path
      strokeWidth="1.2"
      d="M8 20c-2-4-1-10 4-14 1 3 3 5 6 6-3 2-5 5-6 8-1-2-2-3-4-3z"
    />
  ),
  cilantro: (
    <path
      strokeWidth="1"
      d="M12 20V8M8 12c-2-4-1-8 4-6M16 12c2-4 1-8-4-6M10 16c-1-2 0-4 2-5M14 16c1-2 0-4-2-5"
    />
  ),
  rice: (
    <>
      <ellipse cx="8" cy="14" rx="2" ry="3" strokeWidth="1" />
      <ellipse cx="12" cy="12" rx="2" ry="3" strokeWidth="1" />
      <ellipse cx="16" cy="14" rx="2" ry="3" strokeWidth="1" />
      <ellipse cx="10" cy="17" rx="1.5" ry="2" strokeWidth="0.8" />
      <ellipse cx="14" cy="17" rx="1.5" ry="2" strokeWidth="0.8" />
    </>
  ),
  noodles: (
    <path
      strokeWidth="1"
      d="M5 8c3 2 6 2 9 0M5 12c3 2 6 2 9 0M5 16c3 2 6 2 9 0M7 20c2 1 4 1 6 0"
    />
  ),
  peanut: (
    <path
      strokeWidth="1.2"
      d="M8 14c-2-3-1-7 4-8 3 1 5 4 4 7-1 3-4 5-7 4-2-1-2-2-1-3z"
    />
  ),
  mango: (
    <path
      strokeWidth="1.2"
      d="M8 18c-3-4-2-10 4-12 2 4 2 8 0 12-2 2-3 2-4 0z"
    />
  ),
  "curry-bowl": (
    <>
      <path strokeWidth="1.2" d="M4 14h16l-2 6H6l-2-6z" />
      <path strokeWidth="1" d="M6 14c0-4 2-7 6-7s6 3 6 7" />
      <path strokeWidth="0.8" d="M10 10c1-1 3-1 4 0" opacity="0.6" />
    </>
  ),
  orchid: (
    <>
      <ellipse cx="12" cy="10" rx="3" ry="5" strokeWidth="1" />
      <ellipse cx="8" cy="14" rx="2.5" ry="4" strokeWidth="0.9" transform="rotate(-30 8 14)" />
      <ellipse cx="16" cy="14" rx="2.5" ry="4" strokeWidth="0.9" transform="rotate(30 16 14)" />
      <path strokeWidth="0.8" d="M12 15v5" />
    </>
  ),
};

function DecorIconSvg({ icon }: { icon: DecorIcon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="h-full w-full"
      aria-hidden
    >
      {iconPaths[icon]}
    </svg>
  );
}

type DecorativeLayerProps = {
  items: DecorItem[];
};

export function DecorativeLayer({ items }: DecorativeLayerProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((item, index) => (
        <div
          key={`${item.icon}-${index}`}
          className={cn(
            "decor-icon text-saigon-green",
            item.mobile === false && "hidden sm:block",
            item.className
          )}
        >
          <DecorIconSvg icon={item.icon} />
        </div>
      ))}
    </div>
  );
}
