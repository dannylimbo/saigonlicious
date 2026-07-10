import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site-data";
import { collectionHref, deliveryHref, externalLinkProps } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

const actions = [
  {
    label: "Anrufen",
    href: siteConfig.phoneHref,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    ),
  },
  {
    label: "Liefern lassen",
    href: deliveryHref,
    external: true,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10m10 0h4m-4 0a2 2 0 01-2 2H5a2 2 0 01-2-2m10 0V9a2 2 0 012-2h2.5M13 16h4m0 0v2a1 1 0 01-1 1h-1m-4-3h4"
      />
    ),
  },
  {
    label: "Abholung",
    href: collectionHref,
    external: true,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    ),
  },
  {
    label: "Speisekarte",
    href: "#speisekarte",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      />
    ),
  },
  {
    label: "Route",
    href: siteConfig.mapsUrl,
    external: true,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
    ),
  },
] as const;

export function QuickActions() {
  return (
    <section className="section-padding border-b border-white/5 bg-charcoal-light" aria-label="Schnellaktionen">
      <div className="container-narrow">
        <div className="hidden grid-cols-5 gap-4 sm:grid">
          {actions.map((action, index) => {
            const className =
              "card-dark group flex flex-col items-center gap-3 py-5 text-center hover:bg-charcoal-card/80";
            const content = (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-saigon-green/15 text-saigon-green transition-colors group-hover:bg-saigon-green group-hover:text-charcoal">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    {action.icon}
                  </svg>
                </span>
                <span className="text-sm font-semibold text-white">{action.label}</span>
              </>
            );

            const wrapped = (node: ReactNode) => (
              <Reveal key={action.label} delay={index * 70}>
                {node}
              </Reveal>
            );

            if ("external" in action && action.external) {
              return wrapped(
                <a href={action.href} {...externalLinkProps} className={className}>
                  {content}
                </a>
              );
            }

            if (action.href.startsWith("#")) {
              return wrapped(
                <Link href={action.href} className={className}>
                  {content}
                </Link>
              );
            }

            return wrapped(
              <a href={action.href} className={className}>
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
