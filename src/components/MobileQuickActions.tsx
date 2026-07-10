"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-data";
import { collectionHref, deliveryHref, externalLinkProps } from "@/lib/utils";

const actions = [
  { label: "Anrufen", href: siteConfig.phoneHref, icon: "phone" },
  { label: "Liefern", href: deliveryHref, icon: "delivery", external: true },
  { label: "Abholen", href: collectionHref, icon: "cart", external: true },
  { label: "Menü", href: "#speisekarte", icon: "menu" },
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
                {...externalLinkProps}
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
    delivery: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10m10 0h4m-4 0a2 2 0 01-2 2H5a2 2 0 01-2-2m10 0V9a2 2 0 012-2h2.5M13 16h4m0 0v2a1 1 0 01-1 1h-1m-4-3h4"
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
  };

  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      {paths[type]}
    </svg>
  );
}
