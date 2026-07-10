import { siteConfig } from "./site-data";

export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export const orderHref = siteConfig.phoneHref;
