"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/site-data";
import { collectionHref, deliveryHref, externalLinkProps } from "@/lib/utils";
import { cn } from "@/lib/utils";

const compactNav = navLinks.filter((link) =>
  ["#start", "#speisekarte", "#bestellen", "#lieferung", "#kontakt"].includes(link.href)
);

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[var(--z-header)] w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-charcoal/95 shadow-lg shadow-black/20 backdrop-blur-md"
          : "bg-charcoal/80 backdrop-blur-sm"
      )}
    >
      <div className="container-narrow flex items-center justify-between gap-2 px-4 py-3 sm:gap-3 sm:px-6 lg:px-8">
        <Link href="#start" className="group min-w-0 shrink">
          <span className="block truncate font-script text-xl text-white transition-colors group-hover:text-saigon-green sm:text-2xl xl:text-3xl">
            {siteConfig.name}
          </span>
          <span className="mt-0.5 block truncate text-[10px] font-medium uppercase tracking-[0.15em] text-muted sm:text-xs">
            {siteConfig.tagline}
          </span>
        </Link>

        <nav
          className="hidden min-w-0 items-center gap-3 xl:flex xl:gap-4"
          aria-label="Hauptnavigation"
        >
          {compactNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-medium text-white/80 transition-colors hover:text-saigon-green"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href={deliveryHref}
            {...externalLinkProps}
            className="btn-primary btn-compact hidden sm:inline-flex"
          >
            Liefern
          </a>
          <a
            href={collectionHref}
            {...externalLinkProps}
            className="btn-primary btn-compact hidden sm:inline-flex"
          >
            Abholung
          </a>

          <button
            type="button"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/20 text-white xl:hidden sm:h-10 sm:w-10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-charcoal xl:hidden">
          <nav className="flex max-h-[70vh] flex-col overflow-y-auto px-4 py-4" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-white/5 py-3 text-base font-medium text-white/90 hover:text-saigon-green"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={deliveryHref}
                {...externalLinkProps}
                className="btn-primary w-full"
                onClick={() => setMenuOpen(false)}
              >
                Liefern lassen
              </a>
              <a
                href={collectionHref}
                {...externalLinkProps}
                className="btn-primary w-full"
                onClick={() => setMenuOpen(false)}
              >
                Zur Abholung bestellen
              </a>
              <a
                href={siteConfig.phoneHref}
                className="btn-secondary w-full"
                onClick={() => setMenuOpen(false)}
              >
                Anrufen
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
