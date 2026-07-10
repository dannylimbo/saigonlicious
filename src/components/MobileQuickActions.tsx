"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-data";
import { orderHref } from "@/lib/utils";

const actions = [
  { label: "Anrufen", href: siteConfig.phoneHref, icon: "phone" },
  { label: "Bestellen", href: orderHref, icon: "cart" },
  { label: "Menü", href: "#speisekarte", icon: "menu" },
  { label: "Route", href: siteConfig.mapsUrl, icon: "map", external: true },
] as const;

export function MobileQuickActions() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[var(--z-mobile-bar)] border-t border-white/10 bg-charcoal/95 backdrop-blur-md sm:hidden"
      aria-label="Mobile Schnellaktionen"
    >
      <div className="grid grid-cols-4">
        {actions.map((action) => {
          const inner = (
            <>
              <ActionIcon type={action.icon} />
              <span className="text-[10px] font-medium">{action.label}</span>
            </>
          );
          const className =
            "flex flex-col items-center gap-1 py-2.5 text-saigon-green transition-colors active:bg-white/5";

          if ("external" in action && action.external) {
            return (
              <a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {inner}
              </a>
            );
          }

          if (action.href.startsWith("#")) {
            return (
              <Link key={action.label} href={action.href} className={className}>
                {inner}
              </Link>
            );
          }

          return (
            <a key={action.label} href={action.href} className={className}>
              {inner}
            </a>
          );
        })}
      </div>
    </div>
  );
}

function ActionIcon({ type }: { type: string }) {
  const paths: Record<string, React.ReactNode> = {
    phone: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    ),
    cart: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    ),
    menu: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h7"
      />
    ),
    map: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
    ),
  };

  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      {paths[type]}
    </svg>
  );
}
