import Image from "next/image";
import Link from "next/link";
import {
  FULFILLMENT_DINE_IN,
  LUNCH_CATEGORY_ID,
  LUNCH_NOTICE,
  type MenuBadge,
  type MenuDish,
  type PublicMenu,
} from "@/lib/menu-types";
import { displayPrice, formatEuro } from "@/lib/money";
import { siteConfig } from "@/lib/site-data";
import { deliveryHref, externalLinkProps } from "@/lib/utils";
import { BrushLabel, SectionHeading } from "@/components/ui/BrushLabel";
import { MenuAccordion } from "@/components/ui/MenuAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const badgeStyles: Record<MenuBadge, string> = {
  Beliebt: "",
  Curry: "bg-orchid/30 text-white",
  Bowl: "bg-saigon-green/20 text-saigon-green-light",
  Mittag: "border border-saigon-green/50 text-saigon-green",
  Vorspeise: "bg-white/10 text-white",
  Nudeln: "bg-saigon-green/15 text-saigon-green-light",
};

const brushBadges: MenuBadge[] = ["Beliebt", "Mittag"];

function MenuBadgePill({ badge }: { badge: MenuBadge }) {
  if (brushBadges.includes(badge)) {
    return (
      <BrushLabel variant="stamp" className="!rotate-0 scale-[0.85] text-[9px]">
        {badge}
      </BrushLabel>
    );
  }
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${badgeStyles[badge]}`}
    >
      {badge}
    </span>
  );
}

function MenuItemRow({ item }: { item: MenuDish }) {
  return (
    <li className="border-b border-white/5 px-4 py-4 last:border-0 sm:px-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h4 className="font-medium text-white">{item.name}</h4>
          {item.description && (
            <p className="mt-1 text-sm text-muted">{item.description}</p>
          )}
        </div>
        {displayPrice(item) && (
          <span className="shrink-0 font-semibold text-saigon-green">
            {displayPrice(item)}
          </span>
        )}
      </div>
      {item.variants.length > 0 && (
        <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
          {item.variants.map((option) => (
            <li
              key={option.id}
              className="flex items-start justify-between gap-2 rounded-lg bg-white/[0.03] px-3 py-2 text-sm"
            >
              <span className="min-w-0 text-muted">{option.label}</span>
              <span className="shrink-0 font-medium text-saigon-green-light">
                {formatEuro(option.priceCents)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function PopularDishCard({ dish, index }: { dish: MenuDish; index: number }) {
  return (
    <Reveal delay={index * 60} className="h-full">
      <article className="card-dark-glow flex h-full flex-col overflow-hidden p-0">
        {dish.imageUrl ? (
          <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-charcoal-light">
            <Image
              src={dish.imageUrl}
              alt={dish.imageAlt || dish.name}
              fill
              className="object-cover transition-transform duration-500 hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent"
              aria-hidden
            />
          </div>
        ) : (
          <div className="aspect-[16/10] w-full bg-charcoal-light" />
        )}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {dish.badge && <MenuBadgePill badge={dish.badge} />}
          </div>
          <h3 className="font-display text-lg leading-tight tracking-wide text-white sm:text-xl">
            {dish.name}
          </h3>
          {dish.description && (
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {dish.description}
            </p>
          )}
          <p className="mt-3 font-semibold text-saigon-green">
            {displayPrice(dish)}
          </p>
        </div>
      </article>
    </Reveal>
  );
}

function MenuCategoryBlock({
  category,
  index,
}: {
  category: PublicMenu["categories"][number];
  index: number;
}) {
  const isLunch =
    category.id === LUNCH_CATEGORY_ID || category.fulfillment === FULFILLMENT_DINE_IN;
  const sectionId = category.id === LUNCH_CATEGORY_ID ? "mittagstisch" : undefined;
  const itemList = (
    <ul className="border-t border-white/5 lg:border-t-0">
      {category.dishes.map((item) => (
        <MenuItemRow key={item.id} item={item} />
      ))}
    </ul>
  );

  return (
    <Reveal delay={index * 50}>
      <div id={sectionId}>
        <MenuAccordion
          categoryId={category.id}
          title={category.title}
          subtitle={
            isLunch
              ? `${category.subtitle ? `${category.subtitle} · ` : ""}${siteConfig.lunchOnlyOnSiteLabel}`
              : category.subtitle ?? undefined
          }
          defaultOpen={index < 2 || category.id === LUNCH_CATEGORY_ID}
        >
          {isLunch && (
            <p className="border-b border-white/5 px-4 py-3 text-sm text-saigon-green-light sm:px-5">
              {LUNCH_NOTICE}
            </p>
          )}
          {itemList}
          {isLunch && (
            <div className="border-t border-white/5 px-4 py-4 sm:px-5">
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Route zum Restaurant
              </a>
            </div>
          )}
        </MenuAccordion>

        <div className="card-dark-glow hidden overflow-hidden p-0 lg:block">
          <div className="border-b border-white/5 px-5 py-4">
            <BrushLabel>{category.title}</BrushLabel>
            {(category.subtitle || isLunch) && (
              <p className="mt-2 text-sm text-saigon-green-light">
                {isLunch
                  ? `${category.subtitle ? `${category.subtitle} · ` : ""}${siteConfig.lunchOnlyOnSiteLabel}`
                  : category.subtitle}
              </p>
            )}
            {isLunch && (
              <p className="mt-2 text-sm text-muted">{LUNCH_NOTICE}</p>
            )}
          </div>
          {itemList}
          {isLunch && (
            <div className="border-t border-white/5 px-5 py-4">
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Route zum Restaurant
              </a>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export function MenuPreview({ menu }: { menu: PublicMenu }) {
  return (
    <Section
      id="speisekarte"
      tone="charcoal-light"
      pattern="paper"
      glow="top-right"
      divider
      decor={[
        { icon: "cilantro", className: "decor-pos-tl", mobile: false },
        { icon: "curry-bowl", className: "decor-pos-br" },
        { icon: "peanut", className: "decor-pos-mid", mobile: false },
      ]}
      className="section-padding"
      aria-labelledby="menu-heading"
    >
      <div className="container-narrow">
        <Reveal>
          <SectionHeading
            id="menu-heading"
            label="Speisekarte"
            brushStroke
            title="Aromatisch. Frisch. Vielfältig."
            subtitle="Von Suppen und Bowls über Currys bis zu Bratnudeln – wie in unserem Laden."
            foodCrop={{
              src: "/images/popular-red-curry.png",
            }}
          />
        </Reveal>

        {menu.popular.length > 0 && (
          <Reveal delay={60}>
            <div className="mb-10">
              <div className="mb-5 flex flex-wrap items-end gap-3">
                <BrushLabel>Beliebte Gerichte</BrushLabel>
                <span className="text-sm text-muted">Unsere Empfehlungen</span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {menu.popular.map((dish, index) => (
                  <PopularDishCard key={dish.id} dish={dish} index={index} />
                ))}
              </div>
            </div>
          </Reveal>
        )}

        <div className="space-y-4">
          {menu.categories.map((category, index) => (
            <MenuCategoryBlock key={category.id} category={category} index={index} />
          ))}
        </div>

        <Reveal delay={100}>
          <p className="mt-8 text-xs leading-relaxed text-muted/80">
            {menu.settings.allergenNote}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={siteConfig.phoneHref} className="btn-primary">
              Jetzt telefonisch bestellen
            </a>
            <Link href="#bestellen" className="btn-secondary">
              Bestelloptionen
            </Link>
            <a href={deliveryHref} {...externalLinkProps} className="btn-secondary">
              Alternativ über Lieferando bestellen
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
