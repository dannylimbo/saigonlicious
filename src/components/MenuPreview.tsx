import Image from "next/image";
import Link from "next/link";
import {
  allergenNote,
  menuCategories,
  popularDishes,
  type MenuBadge,
  type MenuItem,
} from "@/lib/menu-data";
import { collectionHref, deliveryHref, externalLinkProps } from "@/lib/utils";
import { BrushLabel, SectionHeading } from "@/components/ui/BrushLabel";
import { Reveal } from "@/components/ui/Reveal";

const badgeStyles: Record<MenuBadge, string> = {
  Beliebt: "bg-saigon-green text-charcoal",
  Curry: "bg-orchid/30 text-white",
  Bowl: "bg-saigon-green/20 text-saigon-green-light",
  Mittag: "border border-saigon-green/50 text-saigon-green",
  Vorspeise: "bg-white/10 text-white",
  Nudeln: "bg-saigon-green/15 text-saigon-green-light",
};

function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <li className="border-b border-white/5 px-4 py-4 last:border-0 sm:px-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h4 className="font-medium text-white">{item.name}</h4>
          {item.description && (
            <p className="mt-1 text-sm text-muted">{item.description}</p>
          )}
        </div>
        {item.price && (
          <span className="shrink-0 font-semibold text-saigon-green">{item.price}</span>
        )}
      </div>
      {item.options && (
        <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
          {item.options.map((option) => (
            <li
              key={option.label}
              className="flex items-start justify-between gap-2 rounded-lg bg-white/[0.03] px-3 py-2 text-sm"
            >
              <span className="min-w-0 text-muted">{option.label}</span>
              <span className="shrink-0 font-medium text-saigon-green-light">
                {option.price}
              </span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function PopularDishCard({
  dish,
  index,
}: {
  dish: (typeof popularDishes)[number];
  index: number;
}) {
  return (
    <Reveal delay={index * 60}>
      <article className="card-dark flex h-full flex-col overflow-hidden p-0">
        {dish.image && (
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={dish.image}
              alt={dish.imageAlt ?? dish.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {dish.badge && (
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${badgeStyles[dish.badge]}`}
              >
                {dish.badge}
              </span>
            )}
          </div>
          <h3 className="font-display text-lg tracking-wide text-white sm:text-xl">
            {dish.name}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
            {dish.description}
          </p>
          <p className="mt-3 font-semibold text-saigon-green">{dish.price}</p>
        </div>
      </article>
    </Reveal>
  );
}

function MenuCategoryBlock({
  category,
  index,
}: {
  category: (typeof menuCategories)[number];
  index: number;
}) {
  const sectionId = category.id === "mittagstisch" ? "mittagstisch" : undefined;
  const itemList = (
    <ul className="border-t border-white/5 lg:border-t-0">
      {category.items.map((item, itemIndex) => (
        <MenuItemRow key={`${item.name}-${itemIndex}`} item={item} />
      ))}
    </ul>
  );

  return (
    <Reveal delay={index * 50}>
      <div id={sectionId}>
      <details
        className="group card-dark overflow-hidden p-0 lg:hidden"
        open={index < 2}
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 sm:px-5 [&::-webkit-details-marker]:hidden">
          <div className="min-w-0">
            <BrushLabel className="text-xs sm:text-sm">{category.title}</BrushLabel>
            {category.subtitle && (
              <p className="mt-2 text-xs text-saigon-green-light sm:text-sm">
                {category.subtitle}
              </p>
            )}
          </div>
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-saigon-green transition-transform group-open:rotate-180"
            aria-hidden
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </summary>
        {itemList}
      </details>

      <div className="card-dark hidden overflow-hidden p-0 lg:block">
        <div className="border-b border-white/5 px-5 py-4">
          <BrushLabel>{category.title}</BrushLabel>
          {category.subtitle && (
            <p className="mt-2 text-sm text-saigon-green-light">{category.subtitle}</p>
          )}
        </div>
        {itemList}
      </div>
      </div>
    </Reveal>
  );
}

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
            subtitle="Von Suppen und Bowls über Currys bis zu Bratnudeln – wie in unserem Laden."
          />
        </Reveal>

        <Reveal delay={60}>
          <div className="mb-10">
            <div className="mb-5 flex flex-wrap items-end gap-3">
              <BrushLabel>Beliebte Gerichte</BrushLabel>
              <span className="text-sm text-muted">Unsere Empfehlungen</span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {popularDishes.map((dish, index) => (
                <PopularDishCard key={dish.name} dish={dish} index={index} />
              ))}
            </div>
          </div>
        </Reveal>

        <div className="space-y-4">
          {menuCategories.map((category, index) => (
            <MenuCategoryBlock key={category.id} category={category} index={index} />
          ))}
        </div>

        <Reveal delay={100}>
          <p className="mt-8 text-xs leading-relaxed text-muted/80">{allergenNote}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={deliveryHref} {...externalLinkProps} className="btn-primary">
              Liefern lassen
            </a>
            <a href={collectionHref} {...externalLinkProps} className="btn-primary">
              Zur Abholung bestellen
            </a>
            <Link href="#bestellen" className="btn-secondary">
              Bestelloptionen
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
