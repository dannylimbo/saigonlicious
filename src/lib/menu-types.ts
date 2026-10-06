export const FULFILLMENT_DINE_IN = "dine_in_only" as const;
export const FULFILLMENT_ORDERABLE = "orderable" as const;

export type Fulfillment = typeof FULFILLMENT_DINE_IN | typeof FULFILLMENT_ORDERABLE;

export type MenuBadge =
  | "Beliebt"
  | "Curry"
  | "Bowl"
  | "Mittag"
  | "Vorspeise"
  | "Nudeln";

export type MenuVariant = {
  id: string;
  label: string;
  priceCents: number;
  sortOrder: number;
};

export type MenuDish = {
  id: string;
  categoryId: string;
  name: string;
  description: string | null;
  priceCents: number | null;
  priceFrom: boolean;
  visible: boolean;
  popular: boolean;
  sortOrder: number;
  imageUrl: string | null;
  imageAlt: string | null;
  badge: MenuBadge | null;
  version: number;
  variants: MenuVariant[];
};

export type MenuCategoryRecord = {
  id: string;
  title: string;
  subtitle: string | null;
  sortOrder: number;
  fulfillment: Fulfillment;
  fulfillmentLocked: boolean;
  dishes: MenuDish[];
};

export type MenuSettings = {
  lunchPriceCents: number;
  allergenNote: string;
  setupComplete: boolean;
  menuVersion: number;
};

export type PublicMenu = {
  categories: MenuCategoryRecord[];
  popular: MenuDish[];
  settings: MenuSettings;
};

export const LUNCH_CATEGORY_ID = "mittagstisch";
export const LUNCH_NOTICE =
  "Unser Mittagsangebot gilt ausschließlich zum Verzehr im Restaurant. Keine telefonische Bestellung, keine Abholung und keine Lieferung.";
