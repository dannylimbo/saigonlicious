import { unstable_cache, revalidateTag } from "next/cache";
import { loadMenuDocument, loadSettings } from "@/lib/store/menu-store";
import { formatEuro } from "@/lib/money";
import { LUNCH_CATEGORY_ID, type PublicMenu } from "@/lib/menu-types";

export const MENU_CACHE_TAG = "public-menu";

async function fetchMenuUncached(): Promise<PublicMenu> {
  const [menu, settings] = await Promise.all([loadMenuDocument(), loadSettings()]);
  return {
    ...menu,
    settings: {
      ...menu.settings,
      lunchPriceCents: settings.lunchPriceCents || menu.settings.lunchPriceCents,
      allergenNote: settings.allergenNote || menu.settings.allergenNote,
      setupComplete: settings.setupComplete,
      menuVersion: Math.max(menu.settings.menuVersion, settings.menuVersion),
    },
    popular: menu.categories
      .flatMap((category) => category.dishes)
      .filter((dish) => dish.popular && dish.visible),
    categories: menu.categories
      .map((category) => ({
        ...category,
        dishes: category.dishes
          .filter((dish) => dish.visible)
          .sort((a, b) => a.sortOrder - b.sortOrder),
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder),
  };
}

export async function getPublicMenu(): Promise<PublicMenu> {
  return unstable_cache(fetchMenuUncached, ["public-menu-v1"], {
    tags: [MENU_CACHE_TAG],
    revalidate: 60,
  })();
}

export function revalidatePublicMenu(): void {
  revalidateTag(MENU_CACHE_TAG);
}

export function lunchPriceLabel(menu: PublicMenu): string {
  const lunchCategory = menu.categories.find((category) => category.id === LUNCH_CATEGORY_ID);
  const dishPrices = lunchCategory?.dishes
    .flatMap((dish) =>
      dish.variants.length
        ? dish.variants.map((variant) => variant.priceCents)
        : dish.priceCents != null
          ? [dish.priceCents]
          : []
    )
    .filter((value): value is number => value != null);

  const cents =
    dishPrices && dishPrices.length > 0
      ? Math.min(...dishPrices)
      : menu.settings.lunchPriceCents;

  return formatEuro(cents, true);
}
