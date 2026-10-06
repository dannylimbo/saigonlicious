import { put, list } from "@vercel/blob";
import {
  FULFILLMENT_DINE_IN,
  FULFILLMENT_ORDERABLE,
  LUNCH_CATEGORY_ID,
  type MenuBadge,
  type MenuCategoryRecord,
  type MenuDish,
  type MenuSettings,
  type MenuVariant,
  type PublicMenu,
} from "@/lib/menu-types";
import {
  allergenNote,
  menuCategories,
  popularDishes,
  type MenuItem,
  type ProteinOption,
} from "@/lib/menu-data";
import { parseEuroInput } from "@/lib/money";

function cmsPrefix(): string {
  const ns = (process.env.CMS_NAMESPACE || "").trim().replace(/^\/+|\/+$/g, "");
  return ns ? `cms/${ns}` : "cms";
}

export function menuBlobPath(): string {
  return `${cmsPrefix()}/menu.json`;
}

export function settingsBlobPath(): string {
  return `${cmsPrefix()}/settings.json`;
}

export function loginAttemptsPath(): string {
  return `${cmsPrefix()}/login-attempts.json`;
}

/** @deprecated use menuBlobPath() – kept for imports that expect constants */
export const MENU_BLOB_PATH = "cms/menu.json";
export const SETTINGS_BLOB_PATH = "cms/settings.json";
export const LOGIN_ATTEMPTS_PATH = "cms/login-attempts.json";

const INITIAL_LUNCH_CENTS = 850;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function parsePriceSafe(raw?: string): { cents: number | null; from: boolean } {
  if (!raw) return { cents: null, from: false };
  try {
    const parsed = parseEuroInput(raw);
    return { cents: parsed.cents, from: parsed.from };
  } catch {
    return { cents: null, from: false };
  }
}

function mapVariants(options: ProteinOption[] | undefined, dishId: string): MenuVariant[] {
  if (!options?.length) return [];
  return options.map((option, index) => {
    const parsed = parsePriceSafe(option.price);
    return {
      id: `${dishId}-v${index + 1}`,
      label: option.label,
      priceCents: parsed.cents ?? 0,
      sortOrder: index,
    };
  });
}

function mapDish(
  item: MenuItem,
  categoryId: string,
  index: number,
  popularNames: Set<string>
): MenuDish {
  const id = `${categoryId}-${slugify(item.name)}-${index + 1}`;
  const variants = mapVariants(item.options, id);
  const parsed = parsePriceSafe(item.price);
  const popularMatch = popularDishes.find((dish) => dish.name === item.name);
  const priceFrom =
    parsed.from || variants.length > 1 || (variants.length > 0 && item.price == null);

  return {
    id,
    categoryId,
    name: item.name,
    description: item.description ?? null,
    priceCents: variants.length > 0 ? null : parsed.cents,
    priceFrom,
    visible: true,
    popular: popularNames.has(item.name),
    sortOrder: index,
    imageUrl: popularMatch?.image ?? null,
    imageAlt: popularMatch?.imageAlt ?? null,
    badge: (popularMatch?.badge as MenuBadge | undefined) ?? null,
    version: 1,
    variants,
  };
}

export function buildSeedMenu(): PublicMenu {
  const popularNames = new Set(popularDishes.map((dish) => dish.name));

  const categories: MenuCategoryRecord[] = menuCategories.map((category, categoryIndex) => {
    const isLunch = category.id === LUNCH_CATEGORY_ID;
    return {
      id: category.id,
      title: category.title,
      subtitle: category.subtitle ?? null,
      sortOrder: categoryIndex,
      fulfillment: isLunch ? FULFILLMENT_DINE_IN : FULFILLMENT_ORDERABLE,
      fulfillmentLocked: isLunch,
      dishes: category.items.map((item, itemIndex) =>
        mapDish(item, category.id, itemIndex, popularNames)
      ),
    };
  });

  // Attach popular dishes that only exist in popularDishes (not in categories)
  for (const popular of popularDishes) {
    const exists = categories.some((category) =>
      category.dishes.some((dish) => dish.name === popular.name)
    );
    if (exists) continue;

    const categoryId = "beliebt-extra";
    let category = categories.find((entry) => entry.id === categoryId);
    if (!category) {
      category = {
        id: categoryId,
        title: "Weitere Empfehlungen",
        subtitle: null,
        sortOrder: categories.length,
        fulfillment: FULFILLMENT_ORDERABLE,
        fulfillmentLocked: false,
        dishes: [],
      };
      categories.push(category);
    }

    const parsed = parsePriceSafe(popular.price);
    category.dishes.push({
      id: `${categoryId}-${slugify(popular.name)}`,
      categoryId,
      name: popular.name,
      description: popular.description,
      priceCents: parsed.cents,
      priceFrom: parsed.from,
      visible: true,
      popular: true,
      sortOrder: category.dishes.length,
      imageUrl: popular.image,
      imageAlt: popular.imageAlt,
      badge: popular.badge as MenuBadge,
      version: 1,
      variants: [],
    });
  }

  const popular = categories
    .flatMap((category) => category.dishes)
    .filter((dish) => dish.popular && dish.visible)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const settings: MenuSettings = {
    lunchPriceCents: INITIAL_LUNCH_CENTS,
    allergenNote,
    setupComplete: false,
    menuVersion: 1,
  };

  return { categories, popular, settings };
}

export type AdminSettings = MenuSettings & {
  passwordHash: string | null;
  updatedAt: string;
};

export function buildSeedSettings(): AdminSettings {
  return {
    ...buildSeedMenu().settings,
    passwordHash: null,
    updatedAt: new Date().toISOString(),
  };
}

function blobToken(): string | undefined {
  return process.env.BLOB_READ_WRITE_TOKEN;
}

export function isBlobConfigured(): boolean {
  return Boolean(blobToken() || process.env.BLOB_STORE_ID || process.env.VERCEL);
}

async function readJsonBlob<T>(pathname: string): Promise<T | null> {
  const token = blobToken();
  const listed = await list({
    prefix: pathname,
    limit: 10,
    token,
  });

  const match = listed.blobs.find((blob) => blob.pathname === pathname);
  if (!match) return null;

  const response = await fetch(match.url, { cache: "no-store" });
  if (!response.ok) return null;
  return (await response.json()) as T;
}

async function writeJsonBlob(pathname: string, data: unknown): Promise<string> {
  const result = await put(pathname, JSON.stringify(data, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    token: blobToken(),
  });
  return result.url;
}

function ensureLunchLocksLocal(menu: PublicMenu): PublicMenu {
  return {
    ...menu,
    categories: menu.categories.map((category) => {
      if (category.id !== LUNCH_CATEGORY_ID) return category;
      return {
        ...category,
        fulfillment: FULFILLMENT_DINE_IN,
        fulfillmentLocked: true,
        subtitle: category.subtitle ?? "nur vor Ort",
      };
    }),
  };
}

export async function loadMenuDocument(): Promise<PublicMenu> {
  try {
    const existing = await readJsonBlob<PublicMenu>(menuBlobPath());
    if (existing?.categories?.length) {
      return ensureLunchLocksLocal(existing);
    }
  } catch {
    // Blob temporarily unavailable – fall back to seed for public reads only.
  }

  const seed = ensureLunchLocksLocal(buildSeedMenu());
  // Seed only when nothing exists yet. Never overwrite CMS data on deploy.
  if (blobToken()) {
    try {
      const listed = await list({
        prefix: menuBlobPath(),
        limit: 1,
        token: blobToken(),
      });
      const exists = listed.blobs.some((blob) => blob.pathname === menuBlobPath());
      if (!exists) {
        await writeJsonBlob(menuBlobPath(), seed);
      }
    } catch {
      // Seed write can fail locally without token; still return seed for public site.
    }
  }
  return seed;
}

export async function saveMenuDocument(menu: PublicMenu): Promise<PublicMenu> {
  const locked = ensureLunchLocksLocal(menu);
  const next: PublicMenu = {
    ...locked,
    settings: {
      ...locked.settings,
      menuVersion: locked.settings.menuVersion + 1,
    },
    popular: locked.categories
      .flatMap((category) => category.dishes)
      .filter((dish) => dish.popular && dish.visible)
      .sort((a, b) => a.name.localeCompare(b.name, "de")),
  };
  await writeJsonBlob(menuBlobPath(), next);
  return next;
}

export async function loadSettings(): Promise<AdminSettings> {
  try {
    const existing = await readJsonBlob<AdminSettings>(settingsBlobPath());
    if (existing) return existing;
  } catch {
    // fall through
  }

  const seed = buildSeedSettings();
  if (blobToken()) {
    try {
      const listed = await list({
        prefix: settingsBlobPath(),
        limit: 1,
        token: blobToken(),
      });
      const exists = listed.blobs.some((blob) => blob.pathname === settingsBlobPath());
      if (!exists) {
        await writeJsonBlob(settingsBlobPath(), seed);
      }
    } catch {
      // ignore
    }
  }
  return seed;
}

export async function saveSettings(settings: AdminSettings): Promise<AdminSettings> {
  const next = { ...settings, updatedAt: new Date().toISOString() };
  await writeJsonBlob(settingsBlobPath(), next);
  return next;
}

export type LoginAttemptState = {
  failures: number;
  lockedUntil: number | null;
};

export async function loadLoginAttempts(key: string): Promise<LoginAttemptState> {
  const all =
    (await readJsonBlob<Record<string, LoginAttemptState>>(loginAttemptsPath())) ?? {};
  return all[key] ?? { failures: 0, lockedUntil: null };
}

export async function saveLoginAttempts(
  key: string,
  state: LoginAttemptState
): Promise<void> {
  const all =
    (await readJsonBlob<Record<string, LoginAttemptState>>(loginAttemptsPath())) ?? {};
  all[key] = state;
  await writeJsonBlob(loginAttemptsPath(), all);
}
