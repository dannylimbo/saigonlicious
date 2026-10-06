import assert from "node:assert/strict";
import { displayPrice, formatEuro, parseEuroInput } from "../src/lib/money";
import { buildSeedMenu } from "../src/lib/store/menu-store";
import { FULFILLMENT_DINE_IN, LUNCH_CATEGORY_ID } from "../src/lib/menu-types";
import { isAdminBootstrapAllowed } from "../src/lib/auth/bootstrap";

assert.equal(parseEuroInput("10,90").cents, 1090);
assert.equal(parseEuroInput("ab 10,90").from, true);
assert.equal(formatEuro(1090), "10,90 €");
assert.equal(formatEuro(1090, true), "ab 10,90 €");
assert.equal(
  displayPrice({
    priceCents: null,
    priceFrom: true,
    variants: [{ priceCents: 1090 }, { priceCents: 1290 }],
  }),
  "ab 10,90 €"
);

const menu = buildSeedMenu();
const lunch = menu.categories.find((category) => category.id === LUNCH_CATEGORY_ID);
assert.ok(lunch);
assert.equal(lunch!.fulfillment, FULFILLMENT_DINE_IN);
assert.equal(lunch!.fulfillmentLocked, true);
assert.ok(menu.categories.some((category) => category.dishes.length > 0));

console.log("bootstrapAllowed(local):", isAdminBootstrapAllowed());
console.log("OK: money + mittagstisch lock + seed");
