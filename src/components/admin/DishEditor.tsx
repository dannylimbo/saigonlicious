"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
  deleteDishAction,
  duplicateDishAction,
  moveDishAction,
  saveDishAction,
  type ActionResult,
} from "@/app/admin/actions";
import { formatEuro } from "@/lib/money";
import type { MenuDish } from "@/lib/menu-types";

const initial: ActionResult | null = null;

const EXISTING_IMAGES = [
  "/images/popular-red-curry.png",
  "/images/popular-peanut-curry.png",
  "/images/popular-sweet-sour.png",
  "/images/popular-duck-noodles.png",
  "/images/popular-nam-bo-bowl.png",
  "/images/takeaway-duck-rice.png",
  "/images/spring-rolls.png",
  "/images/kitchen-menu.png",
  "/images/hero-noodles.png",
  "/images/green-curry.png",
  "/images/bowl-duck.png",
  "/images/storefront.png",
  "/images/exterior-front.png",
  "/images/interior-counter.png",
];

type Props = {
  categoryId: string;
  dish: MenuDish | null;
  menuVersion: number;
  onClose: () => void;
};

export function DishEditor({ categoryId, dish, menuVersion, onClose }: Props) {
  const [state, formAction, pending] = useActionState(saveDishAction, initial);
  const [variants, setVariants] = useState(
    dish?.variants.length
      ? dish.variants.map((variant) => ({
          label: variant.label,
          price: formatEuro(variant.priceCents),
        }))
      : []
  );
  const [imageUrl, setImageUrl] = useState(dish?.imageUrl ?? "");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const dirty = useRef(false);

  useEffect(() => {
    if (state?.ok) onClose();
  }, [state, onClose]);

  useEffect(() => {
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!dirty.current) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  async function onUpload(file: File | null) {
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        setUploadError(data.error || "Upload fehlgeschlagen.");
        return;
      }
      setImageUrl(data.url);
      dirty.current = true;
    } catch {
      setUploadError("Upload fehlgeschlagen. Bitte erneut versuchen.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center">
      <form
        action={formAction}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-charcoal-card p-5"
        onChange={() => {
          dirty.current = true;
        }}
      >
        <h2 className="font-display text-2xl tracking-wide">
          {dish ? "Gericht bearbeiten" : "Gericht hinzufügen"}
        </h2>

        <input type="hidden" name="categoryId" value={categoryId} />
        <input type="hidden" name="dishId" value={dish?.id ?? ""} />
        <input type="hidden" name="menuVersion" value={menuVersion} />
        <input type="hidden" name="imageUrl" value={imageUrl} />

        <label className="mt-4 block text-sm">
          Name
          <input
            name="name"
            required
            defaultValue={dish?.name ?? ""}
            className="mt-2 w-full rounded-lg border border-white/15 bg-charcoal px-3 py-3 outline-none focus:border-saigon-green"
          />
        </label>

        <label className="mt-4 block text-sm">
          Beschreibung
          <textarea
            name="description"
            rows={3}
            defaultValue={dish?.description ?? ""}
            className="mt-2 w-full rounded-lg border border-white/15 bg-charcoal px-3 py-3 outline-none focus:border-saigon-green"
          />
        </label>

        {variants.length === 0 ? (
          <label className="mt-4 block text-sm">
            Preis (z. B. 10,90 oder ab 10,90)
            <input
              name="price"
              required
              defaultValue={
                dish?.priceCents != null
                  ? formatEuro(dish.priceCents, dish.priceFrom)
                  : ""
              }
              className="mt-2 w-full rounded-lg border border-white/15 bg-charcoal px-3 py-3 outline-none focus:border-saigon-green"
            />
          </label>
        ) : (
          <input type="hidden" name="price" value="" />
        )}

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Varianten (z. B. Hähnchen, Ente)</p>
            <button
              type="button"
              className="text-sm text-saigon-green"
              onClick={() => {
                dirty.current = true;
                setVariants((current) => [...current, { label: "", price: "" }]);
              }}
            >
              + Variante
            </button>
          </div>
          {variants.map((variant, index) => (
            <div key={index} className="grid gap-2 sm:grid-cols-[1fr_7rem_auto]">
              <input
                name="variantLabel"
                placeholder="Bezeichnung"
                value={variant.label}
                onChange={(event) => {
                  dirty.current = true;
                  const next = [...variants];
                  next[index] = { ...next[index], label: event.target.value };
                  setVariants(next);
                }}
                className="rounded-lg border border-white/15 bg-charcoal px-3 py-2 outline-none focus:border-saigon-green"
              />
              <input
                name="variantPrice"
                placeholder="10,90"
                value={variant.price}
                onChange={(event) => {
                  dirty.current = true;
                  const next = [...variants];
                  next[index] = { ...next[index], price: event.target.value };
                  setVariants(next);
                }}
                className="rounded-lg border border-white/15 bg-charcoal px-3 py-2 outline-none focus:border-saigon-green"
              />
              <button
                type="button"
                className="text-sm text-red-300"
                onClick={() => {
                  dirty.current = true;
                  setVariants((current) => current.filter((_, i) => i !== index));
                }}
              >
                Entfernen
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          <p className="text-sm font-medium">Bild</p>
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt=""
              className="h-28 w-40 rounded-lg object-cover"
            />
          ) : (
            <p className="text-sm text-muted">Kein Bild ausgewählt.</p>
          )}
          <label className="block text-sm">
            Neues Bild hochladen
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="mt-2 block w-full text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-saigon-green file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
              disabled={uploading || pending}
              onChange={(event) => onUpload(event.target.files?.[0] ?? null)}
            />
          </label>
          {uploading && <p className="text-sm text-muted">Bild wird hochgeladen…</p>}
          {uploadError && (
            <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-200">
              {uploadError}
            </p>
          )}
          <label className="block text-sm">
            Vorhandenes Bild wählen
            <select
              className="mt-2 w-full rounded-lg border border-white/15 bg-charcoal px-3 py-3 outline-none focus:border-saigon-green"
              value={EXISTING_IMAGES.includes(imageUrl) ? imageUrl : ""}
              onChange={(event) => {
                dirty.current = true;
                setImageUrl(event.target.value);
              }}
            >
              <option value="">— Kein vorgefertigtes Bild —</option>
              {EXISTING_IMAGES.map((src) => (
                <option key={src} value={src}>
                  {src.replace("/images/", "")}
                </option>
              ))}
            </select>
          </label>
          {imageUrl && (
            <button
              type="button"
              className="text-sm text-red-300"
              onClick={() => {
                dirty.current = true;
                setImageUrl("");
              }}
            >
              Bild entfernen
            </button>
          )}
        </div>

        <label className="mt-4 block text-sm">
          Bildbeschreibung
          <input
            name="imageAlt"
            defaultValue={dish?.imageAlt ?? ""}
            className="mt-2 w-full rounded-lg border border-white/15 bg-charcoal px-3 py-3 outline-none focus:border-saigon-green"
          />
        </label>

        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="visible"
              defaultChecked={dish?.visible ?? true}
              className="h-4 w-4"
            />
            Auf der Website anzeigen
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="popular"
              defaultChecked={dish?.popular ?? false}
              className="h-4 w-4"
            />
            Beliebtes Gericht
          </label>
        </div>

        {state && (
          <p
            className={`mt-4 rounded-lg px-3 py-2 text-sm ${
              state.ok ? "bg-saigon-green/20 text-saigon-green-light" : "bg-red-500/15 text-red-200"
            }`}
          >
            {state.message}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          <button type="submit" className="btn-primary" disabled={pending || uploading}>
            {pending ? "Speichern…" : "Speichern"}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              if (dirty.current && !window.confirm("Ungespeicherte Änderungen verwerfen?")) {
                return;
              }
              onClose();
            }}
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
}

export function DishRowActions({
  categoryId,
  dishId,
}: {
  categoryId: string;
  dishId: string;
}) {
  const [, duplicateAction, duplicating] = useActionState(duplicateDishAction, initial);
  const [, deleteAction, deleting] = useActionState(deleteDishAction, initial);
  const [, moveAction] = useActionState(moveDishAction, initial);

  return (
    <div className="flex flex-wrap gap-2">
      <form action={moveAction}>
        <input type="hidden" name="categoryId" value={categoryId} />
        <input type="hidden" name="dishId" value={dishId} />
        <input type="hidden" name="direction" value="up" />
        <button type="submit" className="rounded border border-white/15 px-2 py-1 text-xs">
          Hoch
        </button>
      </form>
      <form action={moveAction}>
        <input type="hidden" name="categoryId" value={categoryId} />
        <input type="hidden" name="dishId" value={dishId} />
        <input type="hidden" name="direction" value="down" />
        <button type="submit" className="rounded border border-white/15 px-2 py-1 text-xs">
          Runter
        </button>
      </form>
      <form action={duplicateAction}>
        <input type="hidden" name="categoryId" value={categoryId} />
        <input type="hidden" name="dishId" value={dishId} />
        <button type="submit" className="rounded border border-white/15 px-2 py-1 text-xs" disabled={duplicating}>
          Duplizieren
        </button>
      </form>
      <form
        action={deleteAction}
        onSubmit={(event) => {
          if (!window.confirm("Gericht wirklich löschen?")) event.preventDefault();
        }}
      >
        <input type="hidden" name="categoryId" value={categoryId} />
        <input type="hidden" name="dishId" value={dishId} />
        <button type="submit" className="rounded border border-red-400/40 px-2 py-1 text-xs text-red-200" disabled={deleting}>
          Löschen
        </button>
      </form>
    </div>
  );
}
