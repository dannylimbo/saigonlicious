import Link from "next/link";
import { allergenNote, menuCategories } from "@/lib/site-data";
import { collectionHref, deliveryHref, externalLinkProps } from "@/lib/utils";
import { BrushLabel, SectionHeading } from "@/components/ui/BrushLabel";
import { Reveal } from "@/components/ui/Reveal";

export function MenuPreview() {
  return (
    <section
      id="speisekarte"
      className="section-padding bg-charcoal-light"
      aria-labelledby="menu-heading"
    >
      <div className="container-narrow">
        <Reveal>
          <SectionHeading
            id="menu-heading"
            label="Speisekarte"
            title="Aromatisch. Frisch. Vielfältig."
            subtitle="Von indischen Currys über Desserts bis zu Getränken."
          />
        </Reveal>

        <div className="space-y-10">
          {menuCategories.map((category, index) => (
            <Reveal key={category.id} delay={index * 60}>
            <div id={category.id === "mittagstisch" ? "mittagstisch" : undefined}>
              <div className="mb-5 flex flex-wrap items-end gap-3">
                <BrushLabel>{category.title}</BrushLabel>
                {category.subtitle && (
                  <span className="text-sm text-saigon-green-light">{category.subtitle}</span>
                )}
              </div>

              <div className="card-dark overflow-hidden p-0">
                <ul className="divide-y divide-white/5">
                  {category.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-start justify-between gap-4 px-5 py-4 transition-colors hover:bg-white/[0.02] sm:px-6"
                    >
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-white">{item.name}</h3>
                        {item.description && (
                          <p className="mt-1 text-sm text-muted">{item.description}</p>
                        )}
                      </div>
                      <span className="shrink-0 font-semibold text-saigon-green">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
        <p className="mt-8 text-xs leading-relaxed text-muted/80">{allergenNote}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="#speisekarte" className="btn-secondary">
            Komplette Speisekarte ansehen
          </Link>
          <a href={deliveryHref} {...externalLinkProps} className="btn-primary">
            Liefern lassen
          </a>
          <a href={collectionHref} {...externalLinkProps} className="btn-primary">
            Zur Abholung bestellen
          </a>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
