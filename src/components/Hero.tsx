import Link from "next/link";
import { siteConfig } from "@/lib/site-data";
import { collectionHref, deliveryHref, externalLinkProps } from "@/lib/utils";
import { BrushLabel } from "@/components/ui/BrushLabel";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section
      id="start"
      className="section-surface section-tone-warm-black relative overflow-hidden pt-24 lg:pt-28"
    >
      <div className="hero-opener-bg" aria-hidden />
      <div className="hero-opener-overlay" aria-hidden />
      <div className="section-glow-top-left pointer-events-none absolute inset-0" aria-hidden />
      <div className="section-pattern-grain pointer-events-none absolute inset-0" aria-hidden />

      <div className="container-narrow relative z-10">
        <div className="grid grid-cols-1 lg:landscape:grid-cols-2 lg:items-center">
          <div className="min-w-0 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
            <Reveal immediate delay={0}>
              <div className="mb-5 flex max-w-full flex-wrap items-center gap-2">
                <BrushLabel>Lieferung über Lieferando</BrushLabel>
                <BrushLabel variant="stamp" className="!rotate-0 scale-90 border-saigon-green/60 bg-charcoal/80 text-[10px] sm:text-xs">
                  Abholung möglich
                </BrushLabel>
              </div>
            </Reveal>

            <Reveal immediate delay={120}>
              <h1 className="display-heading brush-stroke max-w-xl font-display text-white">
                Asiatisch genießen.
                <span className="block text-saigon-green">Liefern oder abholen.</span>
              </h1>
            </Reveal>

            <Reveal immediate delay={220}>
              <p className="prose-muted mt-8 max-w-lg text-base text-white/88 sm:text-lg">
                Bestelle bequem über Lieferando – zur Lieferung oder Abholung.
                Aromatische Currys, Reis- und Nudelgerichte, Desserts und Mittagstisch
                ab {siteConfig.lunchPrice} in der Zeppelinstraße 1, Lüneburg.
              </p>
            </Reveal>

            <Reveal immediate delay={320}>
              <div className="mt-8 flex max-w-full flex-wrap gap-2.5 sm:gap-3">
                <a href={deliveryHref} {...externalLinkProps} className="btn-primary">
                  Liefern lassen
                </a>
                <a href={collectionHref} {...externalLinkProps} className="btn-primary">
                  Zur Abholung bestellen
                </a>
              </div>
            </Reveal>

            <Reveal immediate delay={420}>
              <div className="mt-4 flex max-w-full flex-wrap gap-2.5 sm:gap-3">
                <Link href="#speisekarte" className="btn-secondary">
                  Speisekarte ansehen
                </Link>
                <a href={siteConfig.phoneHref} className="btn-secondary">
                  Anrufen
                </a>
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Route öffnen
                </a>
              </div>
            </Reveal>
          </div>

          <div className="hero-food-col relative hidden min-w-0 px-4 pb-10 sm:px-6 lg:px-8 lg:py-10">
            <div className="hero-food-glow" aria-hidden />
            <PhotoFrame
              src="/images/hero-noodles.png"
              alt="Knusprige Bratnudeln mit Hähnchen bei Saigonlicious"
              sizes="50vw"
              aspect="4/3"
              priority
              revealDelay={180}
              objectPosition="center center"
              className="photo-frame-lift relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
