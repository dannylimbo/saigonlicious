import { deliveryHours } from "@/lib/site-data";
import { collectionHref, deliveryHref, externalLinkProps } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/BrushLabel";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    step: "1",
    title: "Gericht aussuchen",
    description: "Schau dir die Speisekarte an und wähle dein Lieblingsgericht.",
  },
  {
    step: "2",
    title: "Lieferung oder Abholung wählen",
    description:
      "Bestelle bequem über Lieferando – entweder zur Lieferung oder zur Abholung.",
  },
  {
    step: "3",
    title: "Genießen",
    description: "Frisch zubereitet und bereit für dich.",
  },
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
            subtitle="In drei einfachen Schritten zu deinem Lieblingsgericht."
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 70}>
              <div className="card-dark h-full">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-saigon-green font-display text-lg text-charcoal">
                  {step.step}
                </span>
                <h3 className="mt-4 font-display text-lg tracking-wide text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{step.description}</p>
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
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={deliveryHref} {...externalLinkProps} className="btn-primary">
              Lieferung starten
            </a>
            <a href={collectionHref} {...externalLinkProps} className="btn-primary">
              Abholung starten
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
