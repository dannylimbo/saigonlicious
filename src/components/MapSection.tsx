import { siteConfig } from "@/lib/site-data";
import { collectionHref, deliveryHref, externalLinkProps } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/BrushLabel";
import { Reveal } from "@/components/ui/Reveal";

export function MapSection() {
  return (
    <section
      id="standort"
      className="section-padding bg-charcoal"
      aria-labelledby="location-heading"
    >
      <div className="container-narrow">
        <Reveal>
          <SectionHeading
            id="location-heading"
            accent
            title="Finde uns in Lüneburg"
            subtitle="Zeppelinstraße 1 – Abholung und Besuch vor Ort."
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal delay={80}>
            <div className="card-dark flex flex-col">
              <h3 className="font-script text-3xl text-white">{siteConfig.name}</h3>
              <p className="mt-1 text-sm text-muted">{siteConfig.tagline}</p>

              <address className="mt-6 not-italic text-white">
                <p>{siteConfig.address.street}</p>
                <p>{siteConfig.address.city}</p>
              </address>

              <p className="mt-6">
                <span className="text-sm text-muted">Telefon</span>
                <br />
                <a
                  href={siteConfig.phoneHref}
                  className="font-display text-2xl tracking-wide text-saigon-green hover:text-saigon-green-light"
                >
                  {siteConfig.phone}
                </a>
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Route öffnen
                </a>
                <a href={siteConfig.phoneHref} className="btn-secondary">
                  Anrufen
                </a>
                <a href={deliveryHref} {...externalLinkProps} className="btn-secondary">
                  Liefern lassen
                </a>
                <a href={collectionHref} {...externalLinkProps} className="btn-secondary">
                  Abholung
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <iframe
                title="Saigonlicious Standort auf Google Maps"
                src={siteConfig.mapsEmbed}
                className="h-80 w-full min-h-[320px] lg:h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
