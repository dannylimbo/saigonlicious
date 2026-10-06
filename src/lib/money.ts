export type ParsedPrice = {
  cents: number;
  from: boolean;
};

export function parseEuroInput(raw: string): ParsedPrice {
  const trimmed = raw.trim();
  if (!trimmed) {
    throw new Error("Bitte einen Preis eingeben.");
  }

  const from = /^\s*ab\s+/i.test(trimmed);
  const numeric = trimmed
    .replace(/^\s*ab\s+/i, "")
    .replace(/\s*€\s*$/i, "")
    .replace(/\s/g, "")
    .replace(".", "")
    .replace(",", ".");

  const value = Number(numeric);
  if (!Number.isFinite(value) || value < 0) {
    throw new Error("Der Preis ist ungültig. Beispiel: 10,90");
  }

  return { cents: Math.round(value * 100), from };
}

export function formatEuro(cents: number, from = false): string {
  const euros = (cents / 100).toFixed(2).replace(".", ",");
  const label = `${euros} €`;
  return from ? `ab ${label}` : label;
}

export function lowestVariantCents(
  variants: { priceCents: number }[]
): number | null {
  if (variants.length === 0) return null;
  return Math.min(...variants.map((variant) => variant.priceCents));
}

export function displayPrice(item: {
  priceCents: number | null;
  priceFrom: boolean;
  variants: { priceCents: number }[];
}): string | undefined {
  if (item.variants.length > 0) {
    const lowest = lowestVariantCents(item.variants);
    if (lowest == null) return undefined;
    const from = item.priceFrom || item.variants.length > 1;
    return formatEuro(lowest, from);
  }
  if (item.priceCents == null) return undefined;
  return formatEuro(item.priceCents, item.priceFrom);
}
