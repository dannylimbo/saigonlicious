import { siteConfig } from "@/lib/site-data";
import { collectionHref, deliveryHref, externalLinkProps } from "@/lib/utils";
import { BrushLabel, SectionHeading } from "@/components/ui/BrushLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function OrderSection() {
  return (
    <Section
      id="bestellen"
      tone="green-black"
      pattern="paper"
      glow="headline"
      divider
      decor={[
        { icon: "lime", className: "decor-pos-tr", mobile: false },
        { icon: "chili", className: "decor-pos-bl", mobile: false },
      ]}
      className="section-padding"
      aria-labelledby="order-heading"
    >
      <div className="container-narrow">
        <Reveal>
          <SectionHeading
            id="order-heading"
            label="Bestellen"
            brushStroke
            title="Am besten direkt anrufen"
            subtitle="Gericht aussuchen → Direkt anrufen und bestellen → Essen genießen."
          />
        </Reveal>

        <Reveal delay={60}>
          <article className="card-dark-glow flex flex-col gap-5 p-6 sm:p-8">
            <BrushLabel className="w-fit text-[10px]">Hauptweg</BrushLabel>
            <h3 className="font-display text-3xl tracking-wide text-white">
              Telefonisch bei Saigonlicious bestellen
            </h3>
            <p className="max-w-2xl text-muted">
              Ruf uns an, nenne dein Gericht – wir nehmen die Bestellung direkt
              entgegen. So kommst du am schnellsten an dein Essen.
            </p>
            <a
              href={siteConfig.phoneHref}
              className="font-display text-[clamp(1.75rem,4vw,2.75rem)] tracking-wide text-saigon-green hover:text-saigon-green-light"
            >
              {siteConfig.phone}
            </a>
            <div>
              <a href={siteConfig.phoneHref} className="btn-primary">
                Jetzt telefonisch bestellen
              </a>
            </div>
          </article>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <p className="text-sm font-medium text-white">
              Alternativ über Lieferando bestellen
            </p>
            <p className="mt-2 text-sm text-muted">
              Lieferung oder Abholung über Lieferando – als zweite Möglichkeit neben
              dem Telefon.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={deliveryHref} {...externalLinkProps} className="btn-secondary">
                Lieferando – Lieferung
              </a>
              <a href={collectionHref} {...externalLinkProps} className="btn-secondary">
                Lieferando – Abholung
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
