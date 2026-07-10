import { siteConfig } from "@/lib/site-data";
import { collectionHref, deliveryHref, externalLinkProps } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/BrushLabel";
import { Reveal } from "@/components/ui/Reveal";

const orderOptions = [
  {
    title: "Liefern lassen",
    description: "Bestelle deine Lieblingsgerichte bequem zu dir nach Hause.",
    button: "Lieferung starten",
    href: deliveryHref,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10m10 0h4m-4 0a2 2 0 01-2 2H5a2 2 0 01-2-2m10 0V9a2 2 0 012-2h2.5M13 16h4m0 0v2a1 1 0 01-1 1h-1m-4-3h4"
      />
    ),
  },
  {
    title: "Zur Abholung bestellen",
    description: "Bestelle online und hole dein Essen direkt bei Saigonlicious ab.",
    button: "Abholung starten",
    href: collectionHref,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    ),
  },
] as const;

export function OrderSection() {
  return (
    <section
      id="bestellen"
      className="section-padding bg-charcoal"
      aria-labelledby="order-heading"
    >
      <div className="container-narrow">
        <Reveal>
          <SectionHeading
            id="order-heading"
            accent
            title="Bestellen bei Saigonlicious"
            subtitle="Liefern lassen oder abholen – bequem über Lieferando."
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {orderOptions.map((option, index) => (
            <Reveal key={option.title} delay={index * 80}>
              <article className="card-dark flex h-full flex-col">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-saigon-green/15 text-saigon-green">
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden
                  >
                    {option.icon}
                  </svg>
                </div>
                <h3 className="font-display text-2xl tracking-wide text-white">
                  {option.title}
                </h3>
                <p className="mt-3 flex-1 text-muted">{option.description}</p>
                <a
                  href={option.href}
                  {...externalLinkProps}
                  className="btn-primary mt-6 w-full sm:w-auto"
                >
                  {option.button}
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <div className="mt-8 flex flex-col gap-4 rounded-xl border border-white/10 bg-charcoal-card p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted">Telefonische Bestellung</p>
              <a
                href={siteConfig.phoneHref}
                className="mt-1 inline-block font-display text-xl tracking-wide text-saigon-green hover:text-saigon-green-light"
              >
                {siteConfig.phone}
              </a>
            </div>
            <div className="text-sm text-muted">
              <p className="text-white">{siteConfig.address.street}</p>
              <p>{siteConfig.address.city}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
