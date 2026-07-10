import { siteConfig } from "./site-data";

export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export const deliveryHref = siteConfig.lieferando.delivery;
export const collectionHref = siteConfig.lieferando.collection;

export const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
