"use server";

import { randomUUID } from "crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  clearSessionCookie,
  createSessionToken,
  requireAdminSession,
  setSessionCookie,
} from "@/lib/auth/session";
import { isAdminBootstrapAllowed } from "@/lib/auth/bootstrap";
import {
  SETUP_BOOTSTRAP_PASSWORD,
  hashPassword,
  validateNewPassword,
  verifyPassword,
} from "@/lib/auth/password";
import {
  assertNotLocked,
  clearLoginFailures,
  recordLoginFailure,
} from "@/lib/auth/rate-limit";
import {
  FULFILLMENT_DINE_IN,
  LUNCH_CATEGORY_ID,
  type MenuCategoryRecord,
  type MenuDish,
  type MenuVariant,
  type PublicMenu,
} from "@/lib/menu-types";
import { parseEuroInput } from "@/lib/money";
import { revalidatePublicMenu } from "@/lib/menu/public";
import {
  loadMenuDocument,
  loadSettings,
  saveMenuDocument,
  saveSettings,
} from "@/lib/store/menu-store";

function refreshPublicSite() {
  revalidatePublicMenu();
  revalidatePath("/");
}

export type ActionResult = {
  ok: boolean;
  message: string;
};

function clientKey(headerList: Headers): string {
  return (
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown"
  );
}

export async function loginAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const password = String(formData.get("password") ?? "");
  const headerList = await headers();
  const key = `login:${clientKey(headerList)}`;

  try {
    await assertNotLocked(key);
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Gesperrt." };
  }

  const settings = await loadSettings();

  let ok = false;
  let mustChangePassword = false;

  if (!settings.setupComplete || !settings.passwordHash) {
    if (!isAdminBootstrapAllowed()) {
      return {
        ok: false,
        message:
          "Die Verwaltung ist noch nicht freigeschaltet. Bitte zuerst die Einrichtung mit ALLOW_ADMIN_BOOTSTRAP abschließen.",
      };
    }
    if (password === SETUP_BOOTSTRAP_PASSWORD) {
      ok = true;
      mustChangePassword = true;
    }
  } else {
    ok = await verifyPassword(password, settings.passwordHash);
  }

  if (!ok) {
    await recordLoginFailure(key);
    return { ok: false, message: "Passwort ist falsch." };
  }

  await clearLoginFailures(key);
  const token = await createSessionToken({ mustChangePassword });
  await setSessionCookie(token);

  if (mustChangePassword) {
    redirect("/admin/einrichtung");
  }
  redirect("/admin/speisekarte");
}

export async function logoutAction(): Promise<void> {
  await clearSessionCookie();
  redirect("/admin/login");
}

export async function changePasswordAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdminSession({ allowSetup: true });
  } catch {
    return { ok: false, message: "Nicht angemeldet." };
  }

  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  const validationError = validateNewPassword(password);
  if (validationError) return { ok: false, message: validationError };
  if (password !== confirm) {
    return { ok: false, message: "Die Passwörter stimmen nicht überein." };
  }

  const settings = await loadSettings();
  settings.passwordHash = await hashPassword(password);
  settings.setupComplete = true;
  await saveSettings(settings);

  const token = await createSessionToken({ mustChangePassword: false });
  await setSessionCookie(token);
  refreshPublicSite();
  redirect("/admin/speisekarte");
}

function ensureLunchLocks(menu: PublicMenu): PublicMenu {
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

async function loadEditableMenu(): Promise<PublicMenu> {
  await requireAdminSession();
  const menu = await loadMenuDocument();
  return ensureLunchLocks(menu);
}

export async function getAdminMenu(): Promise<PublicMenu> {
  return loadEditableMenu();
}

export async function saveDishAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const menu = await loadEditableMenu();
    const expectedVersion = Number(formData.get("menuVersion") ?? 0);
    if (expectedVersion && expectedVersion !== menu.settings.menuVersion) {
      return {
        ok: false,
        message:
          "Die Speisekarte wurde inzwischen geändert. Bitte Seite neu laden und erneut speichern.",
      };
    }

    const categoryId = String(formData.get("categoryId") ?? "");
    const dishId = String(formData.get("dishId") ?? "");
    const name = String(formData.get("name") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const priceRaw = String(formData.get("price") ?? "").trim();
    const visible = formData.get("visible") === "on" || formData.get("visible") === "true";
    const popular = formData.get("popular") === "on" || formData.get("popular") === "true";
    const imageUrl = String(formData.get("imageUrl") ?? "").trim() || null;
    const imageAlt = String(formData.get("imageAlt") ?? "").trim() || null;
    const badgeRaw = String(formData.get("badge") ?? "").trim();

    if (!name) return { ok: false, message: "Bitte einen Gerichtnamen eingeben." };

    const category = menu.categories.find((entry) => entry.id === categoryId);
    if (!category) return { ok: false, message: "Kategorie nicht gefunden." };

    const variantLabels = formData.getAll("variantLabel").map(String);
    const variantPrices = formData.getAll("variantPrice").map(String);
    const variants: MenuVariant[] = [];
    for (let index = 0; index < variantLabels.length; index += 1) {
      const label = variantLabels[index]?.trim();
      const price = variantPrices[index]?.trim();
      if (!label && !price) continue;
      if (!label || !price) {
        return {
          ok: false,
          message: "Jede Variante braucht einen Namen und einen Preis.",
        };
      }
      const parsed = parseEuroInput(price);
      variants.push({
        id: `${dishId || "new"}-v${index + 1}-${randomUUID().slice(0, 6)}`,
        label,
        priceCents: parsed.cents,
        sortOrder: index,
      });
    }

    let priceCents: number | null = null;
    let priceFrom = false;
    if (variants.length === 0) {
      if (!priceRaw) return { ok: false, message: "Bitte einen Preis eingeben." };
      const parsed = parseEuroInput(priceRaw);
      priceCents = parsed.cents;
      priceFrom = parsed.from;
    } else {
      priceFrom = true;
      priceCents = null;
    }

    const dishPayload: MenuDish = {
      id: dishId || `${categoryId}-${randomUUID()}`,
      categoryId,
      name,
      description: description || null,
      priceCents,
      priceFrom,
      visible,
      popular,
      sortOrder:
        category.dishes.find((dish) => dish.id === dishId)?.sortOrder ??
        category.dishes.length,
      imageUrl,
      imageAlt,
      badge: (badgeRaw || null) as MenuDish["badge"],
      version: (category.dishes.find((dish) => dish.id === dishId)?.version ?? 0) + 1,
      variants,
    };

    category.dishes = category.dishes.some((dish) => dish.id === dishId)
      ? category.dishes.map((dish) => (dish.id === dishId ? dishPayload : dish))
      : [...category.dishes, dishPayload];

    if (category.id === LUNCH_CATEGORY_ID) {
      const cents =
        variants[0]?.priceCents ??
        priceCents ??
        menu.settings.lunchPriceCents;
      menu.settings.lunchPriceCents = cents;
      const settings = await loadSettings();
      settings.lunchPriceCents = cents;
      await saveSettings(settings);
    }

    await saveMenuDocument(ensureLunchLocks(menu));
    refreshPublicSite();
    return { ok: true, message: "ÁEderungen gespeichert." };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Speichern fehlgeschlagen.",
    };
  }
}

export async function deleteDishAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const menu = await loadEditableMenu();
    const categoryId = String(formData.get("categoryId") ?? "");
    const dishId = String(formData.get("dishId") ?? "");
    const category = menu.categories.find((entry) => entry.id === categoryId);
    if (!category) return { ok: false, message: "Kategorie nicht gefunden." };
    category.dishes = category.dishes.filter((dish) => dish.id !== dishId);
    await saveMenuDocument(menu);
    refreshPublicSite();
    return { ok: true, message: "Gericht gelöscht." };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Löschen fehlgeschlagen.",
    };
  }
}

export async function duplicateDishAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const menu = await loadEditableMenu();
    const categoryId = String(formData.get("categoryId") ?? "");
    const dishId = String(formData.get("dishId") ?? "");
    const category = menu.categories.find((entry) => entry.id === categoryId);
    const dish = category?.dishes.find((entry) => entry.id === dishId);
    if (!category || !dish) return { ok: false, message: "Gericht nicht gefunden." };

    const copy: MenuDish = {
      ...structuredClone(dish),
      id: `${categoryId}-${randomUUID()}`,
      name: `${dish.name} (Kopie)`,
      popular: false,
      sortOrder: category.dishes.length,
      version: 1,
      variants: dish.variants.map((variant, index) => ({
        ...variant,
        id: `${categoryId}-copy-v${index + 1}-${randomUUID().slice(0, 6)}`,
      })),
    };
    category.dishes.push(copy);
    await saveMenuDocument(menu);
    refreshPublicSite();
    return { ok: true, message: "Gericht dupliziert." };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Duplizieren fehlgeschlagen.",
    };
  }
}

export async function moveDishAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const menu = await loadEditableMenu();
    const categoryId = String(formData.get("categoryId") ?? "");
    const dishId = String(formData.get("dishId") ?? "");
    const direction = String(formData.get("direction") ?? "");
    const category = menu.categories.find((entry) => entry.id === categoryId);
    if (!category) return { ok: false, message: "Kategorie nicht gefunden." };

    const sorted = [...category.dishes].sort((a, b) => a.sortOrder - b.sortOrder);
    const index = sorted.findIndex((dish) => dish.id === dishId);
    if (index < 0) return { ok: false, message: "Gericht nicht gefunden." };
    const swapWith = direction === "up" ? index - 1 : index + 1;
    if (swapWith < 0 || swapWith >= sorted.length) {
      return { ok: false, message: "Weiter verschieben ist nicht möglich." };
    }
    const current = sorted[index];
    const other = sorted[swapWith];
    const currentOrder = current.sortOrder;
    current.sortOrder = other.sortOrder;
    other.sortOrder = currentOrder;
    category.dishes = sorted;
    await saveMenuDocument(menu);
    refreshPublicSite();
    return { ok: true, message: "Reihenfolge gespeichert." };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Sortieren fehlgeschlagen.",
    };
  }
}

export async function saveCategoryAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const menu = await loadEditableMenu();
    const categoryId = String(formData.get("categoryId") ?? "");
    const title = String(formData.get("title") ?? "").trim();
    const subtitle = String(formData.get("subtitle") ?? "").trim();
    if (!title) return { ok: false, message: "Bitte einen Kategorienamen eingeben." };

    if (!categoryId) {
      const id = `kat-${randomUUID().slice(0, 8)}`;
      const category: MenuCategoryRecord = {
        id,
        title,
        subtitle: subtitle || null,
        sortOrder: menu.categories.length,
        fulfillment: FULFILLMENT_DINE_IN === id ? FULFILLMENT_DINE_IN : "orderable",
        fulfillmentLocked: false,
        dishes: [],
      };
      // fix fulfillment type
      category.fulfillment = "orderable";
      menu.categories.push(category);
    } else {
      const category = menu.categories.find((entry) => entry.id === categoryId);
      if (!category) return { ok: false, message: "Kategorie nicht gefunden." };
      category.title = title;
      category.subtitle = subtitle || null;
      if (category.fulfillmentLocked) {
        category.fulfillment = FULFILLMENT_DINE_IN;
      }
    }

    await saveMenuDocument(ensureLunchLocks(menu));
    refreshPublicSite();
    return { ok: true, message: "ÁEderungen gespeichert." };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Speichern fehlgeschlagen.",
    };
  }
}

export async function deleteCategoryAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const menu = await loadEditableMenu();
    const categoryId = String(formData.get("categoryId") ?? "");
    const mode = String(formData.get("mode") ?? "abort");
    const category = menu.categories.find((entry) => entry.id === categoryId);
    if (!category) return { ok: false, message: "Kategorie nicht gefunden." };
    if (category.fulfillmentLocked || category.id === LUNCH_CATEGORY_ID) {
      return {
        ok: false,
        message: "Die Mittagstisch-Kategorie kann nicht gelöscht werden.",
      };
    }
    if (category.dishes.length > 0 && mode !== "delete-all") {
      return {
        ok: false,
        message:
          "Diese Kategorie enthält noch Gerichte. Zum Löschen aller Gerichte bitte ausdrücklich bestätigen.",
      };
    }
    menu.categories = menu.categories.filter((entry) => entry.id !== categoryId);
    await saveMenuDocument(menu);
    refreshPublicSite();
    return { ok: true, message: "Kategorie gelöscht." };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Löschen fehlgeschlagen.",
    };
  }
}

export async function moveCategoryAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const menu = await loadEditableMenu();
    const categoryId = String(formData.get("categoryId") ?? "");
    const direction = String(formData.get("direction") ?? "");
    const sorted = [...menu.categories].sort((a, b) => a.sortOrder - b.sortOrder);
    const index = sorted.findIndex((category) => category.id === categoryId);
    if (index < 0) return { ok: false, message: "Kategorie nicht gefunden." };
    const swapWith = direction === "up" ? index - 1 : index + 1;
    if (swapWith < 0 || swapWith >= sorted.length) {
      return { ok: false, message: "Weiter verschieben ist nicht möglich." };
    }
    const currentOrder = sorted[index].sortOrder;
    sorted[index].sortOrder = sorted[swapWith].sortOrder;
    sorted[swapWith].sortOrder = currentOrder;
    menu.categories = sorted;
    await saveMenuDocument(menu);
    refreshPublicSite();
    return { ok: true, message: "Reihenfolge gespeichert." };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Sortieren fehlgeschlagen.",
    };
  }
}

export async function saveAllergenNoteAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdminSession();
    const note = String(formData.get("allergenNote") ?? "").trim();
    const menu = await loadMenuDocument();
    menu.settings.allergenNote = note;
    await saveMenuDocument(menu);
    const settings = await loadSettings();
    settings.allergenNote = note;
    await saveSettings(settings);
    refreshPublicSite();
    return { ok: true, message: "ÁEderungen gespeichert." };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Speichern fehlgeschlagen.",
    };
  }
}

