"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/site-data";
import { collectionHref, deliveryHref, externalLinkProps } from "@/lib/utils";
import { cn } from "@/lib/utils";

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
        "fixed inset-x-0 top-0 z-[var(--z-header)] transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-charcoal/95 shadow-lg shadow-black/20 backdrop-blur-md"
          : "bg-charcoal/80 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="#start" className="group shrink-0">
          <span className="font-script text-2xl text-white transition-colors group-hover:text-saigon-green sm:text-3xl">
            {siteConfig.name}
          </span>
          <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.2em] text-muted sm:text-xs">
            {siteConfig.tagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Hauptnavigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-saigon-green"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex lg:gap-3">
          <a
            href={deliveryHref}
            {...externalLinkProps}
            className="btn-primary hidden text-xs lg:inline-flex sm:text-sm"
          >
            Liefern lassen
          </a>
          <a
            href={collectionHref}
            {...externalLinkProps}
            className="btn-primary hidden text-xs lg:inline-flex sm:text-sm"
          >
            Abholung
          </a>
          <Link href="#bestellen" className="btn-primary text-xs lg:hidden sm:text-sm">
            Bestellen
          </Link>
          <a
            href={siteConfig.phoneHref}
            className="btn-secondary hidden text-xs md:inline-flex sm:text-sm"
          >
            Anrufen
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white lg:hidden"
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

      {menuOpen && (
        <div className="border-t border-white/10 bg-charcoal lg:hidden">
          <nav className="flex flex-col px-4 py-4" aria-label="Mobile Navigation">
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
