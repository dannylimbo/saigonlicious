import { deliveryHours, siteConfig } from "@/lib/site-data";
import { orderHref } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/BrushLabel";
import { Reveal } from "@/components/ui/Reveal";

const features = [
  { title: "Lieferservice", description: "Bequem nach Hause geliefert" },
  { title: "Abholung", description: "Schnell an der Theke abholen" },
  { title: "Telefonisch bestellen", description: siteConfig.phone },
  { title: "PayPal möglich", description: "Scannen, zahlen, fertig" },
] as const;

export function DeliveryInfo() {
  return (
    <section
      id="lieferung"
      className="section-padding bg-charcoal-light"
      aria-labelledby="delivery-heading"
    >
      <div className="container-narrow">
        <Reveal>
          <SectionHeading
            accent
            title="So bestellst du bei uns"
            subtitle="Lieferservice, Abholung und telefonische Bestellung."
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 70}>
            <div className="card-dark h-full">
              <div className="mb-3 h-1 w-8 bg-saigon-green" />
              <h3 className="font-display text-lg tracking-wide text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{feature.description}</p>
            </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
        <div className="card-dark mt-8">
          <h3 className="font-display text-xl tracking-wide text-saigon-green">
            Lieferzeiten
          </h3>
          <ul className="mt-4 space-y-2">
            {deliveryHours.map((row) => (
              <li
                key={row.days}
                className="flex flex-wrap justify-between gap-2 border-b border-white/5 py-2 last:border-0"
              >
                <span className="text-white">{row.days}</span>
                <span className="font-medium text-muted">{row.hours}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted/70">
            Lieferzeiten vor Veröffentlichung prüfen.
          </p>
        </div>
        </Reveal>

        <Reveal delay={140}>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={orderHref} className="btn-primary">
            Jetzt bestellen
          </a>
          <a href={siteConfig.phoneHref} className="btn-secondary">
            Telefonisch bestellen
          </a>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
