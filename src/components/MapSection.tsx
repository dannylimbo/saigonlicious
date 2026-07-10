import { siteConfig } from "@/lib/site-data";
import { collectionHref, deliveryHref, externalLinkProps } from "@/lib/utils";
import { BrushLabel, SectionHeading } from "@/components/ui/BrushLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function MapSection() {
  return (
    <Section
      id="standort"
      tone="charcoal"
      pattern="grain"
      glow="top-right"
      divider
      decor={[
        { icon: "curry-bowl", className: "decor-pos-tl", mobile: false },
        { icon: "peanut", className: "decor-pos-br" },
      ]}
      className="section-padding"
      aria-labelledby="location-heading"
    >
      <div className="container-narrow">
        <Reveal>
          <SectionHeading
            id="location-heading"
            accent
            brushStroke
            title="Finde uns in Lüneburg"
            subtitle="Zeppelinstraße 1 – Abholung und Besuch vor Ort."
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal delay={80}>
            <div className="card-dark-glow flex flex-col">
              <h3 className="font-script text-3xl text-white">{siteConfig.name}</h3>
              <p className="mt-1 text-sm text-muted">{siteConfig.tagline}</p>

              <address className="mt-6 not-italic text-white">
                <p>{siteConfig.address.street}</p>
                <p>{siteConfig.address.city}</p>
              </address>

              <p className="mt-6">
                <BrushLabel className="mb-2 text-[10px]">Kontakt</BrushLabel>
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
            <div className="photo-frame overflow-hidden">
              <div className="photo-frame-inner overflow-hidden">
                <iframe
                  title="Saigonlicious Standort auf Google Maps"
                  src={siteConfig.mapsEmbed}
                  className="h-80 w-full min-h-[320px] lg:h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
