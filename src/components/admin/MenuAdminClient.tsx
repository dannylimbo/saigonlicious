"use client";

import { useActionState, useState } from "react";
import { DishEditor, DishRowActions } from "@/components/admin/DishEditor";
import {
  deleteCategoryAction,
  moveCategoryAction,
  saveCategoryAction,
  type ActionResult,
} from "@/app/admin/actions";
import { displayPrice } from "@/lib/money";
import { LUNCH_CATEGORY_ID, LUNCH_NOTICE, type PublicMenu } from "@/lib/menu-types";

const initial: ActionResult | null = null;

export function MenuAdminClient({
  menu,
  lunchOnly = false,
}: {
  menu: PublicMenu;
  lunchOnly?: boolean;
}) {
  const categories = menu.categories
    .filter((category) =>
      lunchOnly ? category.id === LUNCH_CATEGORY_ID : category.id !== LUNCH_CATEGORY_ID
    )
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const [editing, setEditing] = useState<{
    categoryId: string;
    dishId: string | null;
  } | null>(null);
  const [addingCategory, setAddingCategory] = useState(false);
  const [renamingId, setRenamingId] = useState<string | null>(null);

  const [categoryState, categoryAction, categoryPending] = useActionState(
    saveCategoryAction,
    initial
  );
  const [, deleteCategory, deletingCategory] = useActionState(deleteCategoryAction, initial);
  const [, moveCategory] = useActionState(moveCategoryAction, initial);

  const activeCategory = editing
    ? categories.find((category) => category.id === editing.categoryId)
    : null;
  const activeDish =
    activeCategory && editing?.dishId
      ? activeCategory.dishes.find((dish) => dish.id === editing.dishId) ?? null
      : null;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-saigon-green/30 bg-saigon-green/10 p-4 text-sm text-saigon-green-light">
        Hier kannst du deine Speisekarte bearbeiten. Gespeicherte Änderungen erscheinen
        auf der Website.
        {lunchOnly && (
          <p className="mt-2 text-white/90">
            <strong>Mittagstisch – nur vor Ort.</strong> {LUNCH_NOTICE}
          </p>
        )}
      </div>

      {!lunchOnly && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="btn-secondary !py-2 !text-sm"
            onClick={() => setAddingCategory(true)}
          >
            Kategorie hinzufügen
          </button>
        </div>
      )}

      {addingCategory && (
        <form action={categoryAction} className="card-dark space-y-3">
          <h3 className="font-medium">Neue Kategorie</h3>
          <input type="hidden" name="categoryId" value="" />
          <label className="block text-sm">
            Name
            <input
              name="title"
              required
              className="mt-2 w-full rounded-lg border border-white/15 bg-charcoal px-3 py-3 outline-none focus:border-saigon-green"
            />
          </label>
          <label className="block text-sm">
            Untertitel (optional)
            <input
              name="subtitle"
              className="mt-2 w-full rounded-lg border border-white/15 bg-charcoal px-3 py-3 outline-none focus:border-saigon-green"
            />
          </label>
          {categoryState && (
            <p
              className={`text-sm ${categoryState.ok ? "text-saigon-green-light" : "text-red-200"}`}
            >
              {categoryState.message}
            </p>
          )}
          <div className="flex gap-2">
            <button type="submit" className="btn-primary !py-2 !text-sm" disabled={categoryPending}>
              Speichern
            </button>
            <button
              type="button"
              className="btn-secondary !py-2 !text-sm"
              onClick={() => setAddingCategory(false)}
            >
              Abbrechen
            </button>
          </div>
        </form>
      )}

      {categories.map((category) => (
        <section key={category.id} className="card-dark space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              {renamingId === category.id ? (
                <form action={categoryAction} className="space-y-2">
                  <input type="hidden" name="categoryId" value={category.id} />
                  <input
                    name="title"
                    required
                    defaultValue={category.title}
                    className="w-full rounded-lg border border-white/15 bg-charcoal px-3 py-2 outline-none focus:border-saigon-green"
                  />
                  <input
                    name="subtitle"
                    defaultValue={category.subtitle ?? ""}
                    placeholder="Untertitel"
                    className="w-full rounded-lg border border-white/15 bg-charcoal px-3 py-2 outline-none focus:border-saigon-green"
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="btn-primary !py-1.5 !text-xs">
                      Speichern
                    </button>
                    <button
                      type="button"
                      className="btn-secondary !py-1.5 !text-xs"
                      onClick={() => setRenamingId(null)}
                    >
                      Abbrechen
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h2 className="font-display text-2xl tracking-wide">{category.title}</h2>
                  {category.subtitle && (
                    <p className="text-sm text-muted">{category.subtitle}</p>
                  )}
                  {category.fulfillmentLocked && (
                    <p className="mt-1 text-xs text-saigon-green">
                      Nur vor Ort – diese Einstellung ist fest hinterlegt.
                    </p>
                  )}
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {!lunchOnly && (
                <>
                  <form action={moveCategory}>
                    <input type="hidden" name="categoryId" value={category.id} />
                    <input type="hidden" name="direction" value="up" />
                    <button type="submit" className="rounded border border-white/15 px-2 py-1 text-xs">
                      Kategorie hoch
                    </button>
                  </form>
                  <form action={moveCategory}>
                    <input type="hidden" name="categoryId" value={category.id} />
                    <input type="hidden" name="direction" value="down" />
                    <button type="submit" className="rounded border border-white/15 px-2 py-1 text-xs">
                      Kategorie runter
                    </button>
                  </form>
                  <button
                    type="button"
                    className="rounded border border-white/15 px-2 py-1 text-xs"
                    onClick={() => setRenamingId(category.id)}
                  >
                    Umbenennen
                  </button>
                  {!category.fulfillmentLocked && (
                    <form
                      action={deleteCategory}
                      onSubmit={(event) => {
                        if (category.dishes.length > 0) {
                          const ok = window.confirm(
                            `Kategorie „${category.title}“ enthält ${category.dishes.length} Gericht(e). Wirklich inkl. aller Gerichte löschen?`
                          );
                          if (!ok) {
                            event.preventDefault();
                            return;
                          }
                        } else if (!window.confirm("Kategorie wirklich löschen?")) {
                          event.preventDefault();
                        }
                      }}
                    >
                      <input type="hidden" name="categoryId" value={category.id} />
                      <input
                        type="hidden"
                        name="mode"
                        value={category.dishes.length > 0 ? "delete-all" : "abort"}
                      />
                      <button
                        type="submit"
                        className="rounded border border-red-400/40 px-2 py-1 text-xs text-red-200"
                        disabled={deletingCategory}
                      >
                        Kategorie löschen
                      </button>
                    </form>
                  )}
                </>
              )}
              <button
                type="button"
                className="btn-primary !py-2 !text-xs"
                onClick={() => setEditing({ categoryId: category.id, dishId: null })}
              >
                Gericht hinzufügen
              </button>
            </div>
          </div>

          <ul className="divide-y divide-white/10">
            {[...category.dishes]
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((dish) => (
                <li
                  key={dish.id}
                  className="flex flex-col gap-3 py-4 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div>
                    <p className="font-medium">
                      {dish.name}
                      {!dish.visible && (
                        <span className="ml-2 text-xs text-muted">(ausgeblendet)</span>
                      )}
                      {dish.popular && (
                        <span className="ml-2 text-xs text-saigon-green">Beliebt</span>
                      )}
                    </p>
                    {dish.description && (
                      <p className="mt-1 text-sm text-muted">{dish.description}</p>
                    )}
                    <p className="mt-1 text-sm text-saigon-green">
                      {displayPrice(dish) ?? "Preis fehlt"}
                    </p>
                    {dish.variants.length > 0 && (
                      <ul className="mt-2 space-y-1 text-xs text-muted">
                        {dish.variants.map((variant) => (
                          <li key={variant.id}>
                            {variant.label}:{" "}
                            {displayPrice({
                              priceCents: variant.priceCents,
                              priceFrom: false,
                              variants: [],
                            })}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="space-y-2">
                    <button
                      type="button"
                      className="rounded border border-white/15 px-2 py-1 text-xs"
                      onClick={() =>
                        setEditing({ categoryId: category.id, dishId: dish.id })
                      }
                    >
                      Bearbeiten
                    </button>
                    <DishRowActions categoryId={category.id} dishId={dish.id} />
                  </div>
                </li>
              ))}
          </ul>
        </section>
      ))}

      {editing && (
        <DishEditor
          categoryId={editing.categoryId}
          dish={activeDish}
          menuVersion={menu.settings.menuVersion}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
