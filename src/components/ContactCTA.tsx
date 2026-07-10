import Link from "next/link";
import { siteConfig } from "@/lib/site-data";
import { orderHref } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

export function ContactCTA() {
  return (
    <section
      id="kontakt"
      className="section-padding relative overflow-hidden bg-charcoal-light"
      aria-labelledby="cta-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-saigon-green/5 via-transparent to-orchid/5" />

      <div className="container-narrow relative text-center">
        <Reveal>
        <h2
          id="cta-heading"
          className="section-heading mx-auto max-w-3xl font-display tracking-wide text-white"
        >
          Lust auf asiatisches Essen?
        </h2>
        </Reveal>
        <Reveal delay={100}>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          Bestelle bei Saigonlicious und genieße frische asiatische Gerichte,
          Curry, Reis, Nudeln und Desserts – geliefert oder zum Mitnehmen.
        </p>
        </Reveal>

        <Reveal delay={180}>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={orderHref} className="btn-primary">
            Jetzt bestellen
          </a>
          <a href={siteConfig.phoneHref} className="btn-secondary">
            Anrufen
          </a>
          <Link href="#speisekarte" className="btn-secondary">
            Speisekarte ansehen
          </Link>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
