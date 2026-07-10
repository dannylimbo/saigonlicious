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
      className="relative overflow-hidden bg-charcoal pt-24 lg:pt-28"
    >
      <div className="lg:grid lg:grid-cols-2 lg:items-center">
        <div className="container-narrow flex flex-col justify-center px-4 py-10 sm:px-6 lg:max-w-none lg:px-10 lg:py-16 xl:px-14">
          <Reveal immediate delay={0}>
            <div className="mb-5 flex flex-wrap items-center gap-2 sm:gap-3">
              <BrushLabel>Lieferung über Lieferando</BrushLabel>
              <span className="rounded-full border border-saigon-green/40 bg-saigon-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-saigon-green-light">
                Abholung möglich
              </span>
              <span className="stamp-badge text-xs sm:text-sm">
                Asia-Imbiss in Lüneburg
              </span>
            </div>
          </Reveal>

          <Reveal immediate delay={120}>
            <h1 className="display-heading max-w-3xl font-display text-white">
              Asiatisch genießen.
              <span className="block text-saigon-green">Liefern oder abholen.</span>
            </h1>
          </Reveal>

          <Reveal immediate delay={220}>
            <p className="prose-muted mt-6 max-w-xl text-lg text-white/88 sm:text-xl">
              Bestelle bequem über Lieferando – zur Lieferung oder Abholung.
              Aromatische Currys, Reis- und Nudelgerichte, Desserts und Mittagstisch
              ab {siteConfig.lunchPrice} in der Zeppelinstraße 1, Lüneburg.
            </p>
          </Reveal>

          <Reveal immediate delay={320}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={deliveryHref} {...externalLinkProps} className="btn-primary">
                Liefern lassen
              </a>
              <a href={collectionHref} {...externalLinkProps} className="btn-primary">
                Zur Abholung bestellen
              </a>
            </div>
          </Reveal>

          <Reveal immediate delay={420}>
            <div className="mt-4 flex flex-wrap gap-3">
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

        <div className="px-4 pb-10 sm:px-6 lg:px-6 lg:py-10 xl:px-8">
          <PhotoFrame
            src="/images/hero-noodles.png"
            alt="Knusprige Bratnudeln mit Hähnchen bei Saigonlicious"
            sizes="(max-width: 1024px) 100vw, 50vw"
            aspect="4/3"
            priority
            revealDelay={180}
            objectPosition="center center"
          />
        </div>
      </div>
    </section>
  );
}
