export type MenuBadge = "Beliebt" | "Curry" | "Bowl" | "Mittag" | "Vorspeise" | "Nudeln";

export type ProteinOption = {
  label: string;
  price: string;
};

export type PopularDish = {
  name: string;
  description: string;
  price: string;
  badge?: MenuBadge;
  image?: string;
  imageAlt?: string;
};

export type MenuItem = {
  name: string;
  description?: string;
  price?: string;
  options?: ProteinOption[];
};

export type MenuCategory = {
  id: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
};

export const standardCurryProteins: ProteinOption[] = [
  { label: "mit zarten Hähnchenbruststreifen", price: "10,90 €" },
  { label: "mit gebackenem Hähnchenbrustfilet", price: "10,90 €" },
  { label: "mit knuspriger Entenbrust", price: "12,90 €" },
  { label: "mit gebackenen Garnelen", price: "11,90 €" },
  { label: "mit Rindfleisch", price: "11,90 €" },
  { label: "mit Bio-Tofu", price: "10,90 €" },
];

export const noodleProteins: ProteinOption[] = [
  { label: "mit zarten Hähnchenbruststreifen", price: "10,50 €" },
  { label: "mit gebackenem Hähnchenbrustfilet", price: "10,50 €" },
  { label: "mit knuspriger Entenbrust", price: "12,90 €" },
  { label: "mit gebackenen Garnelen", price: "11,90 €" },
  { label: "mit Rindfleisch", price: "11,90 €" },
];

export const sweetSourProteins: ProteinOption[] = [
  { label: "mit zarten Hähnchenbruststreifen", price: "10,90 €" },
  { label: "mit gebackenem Hähnchenbrustfilet", price: "10,90 €" },
  { label: "mit knuspriger Entenbrust", price: "12,90 €" },
];

export const popularDishes: PopularDish[] = [
  {
    name: "Bratnudeln mit Gemüse",
    description: "Wok-gebratene Nudeln mit frischem Gemüse.",
    price: "8,90 €",
    badge: "Beliebt",
    image: "/images/hero-noodles.png",
    imageAlt: "Bratnudeln mit Gemüse bei Saigonlicious",
  },
  {
    name: "Bratnudeln mit knuspriger Entenbrust",
    description: "Klassische Bratnudeln mit knuspriger Ente.",
    price: "12,90 €",
    badge: "Nudeln",
  },
  {
    name: "Rote Curry-Kokos-Sauce",
    description: "Leicht scharf, mit Gemüse und Jasminreis.",
    price: "ab 10,90 €",
    badge: "Curry",
  },
  {
    name: "Grüne Curry-Kokos-Sauce",
    description: "Aromatisch, leicht scharf mit Kokosmilch.",
    price: "ab 10,90 €",
    badge: "Curry",
    image: "/images/green-curry.png",
    imageAlt: "Grünes Curry bei Saigonlicious",
  },
  {
    name: "Erdnuss-Curry-Sauce",
    description: "Mit Erdnüssen, rotem Curry und Kokosmilch.",
    price: "ab 10,90 €",
    badge: "Curry",
  },
  {
    name: "Süß-Sauer-Sauce",
    description: "Mit Ananas, Gemüse und Jasminreis.",
    price: "ab 10,90 €",
    badge: "Curry",
  },
  {
    name: "Saigon Bowl",
    description: "Knusprige Ente, Mango, Salat, Erdnüsse und Glasnudeln.",
    price: "12,90 €",
    badge: "Bowl",
    image: "/images/takeaway-duck-rice.png",
    imageAlt: "Saigon Bowl mit knuspriger Ente",
  },
  {
    name: "Nam Bo Bowl",
    description: "Vietnamesische Reisnudeln mit Salat, Mango und Kräutern.",
    price: "ab 10,90 €",
    badge: "Bowl",
  },
  {
    name: "Hanoi Frühlingsrolle",
    description: "Knusprige Reispapierrolle mit Hähnchenhack und Gemüse.",
    price: "6,50 €",
    badge: "Vorspeise",
    image: "/images/spring-rolls.png",
    imageAlt: "Hanoi Frühlingsrolle",
  },
];

export const menuCategories: MenuCategory[] = [
  {
    id: "suppen",
    title: "Suppen",
    items: [
      {
        name: "Buddha Suppe",
        description: "Mit Bio-Tofu, rotem Curry, Kokosmilch und Gemüse",
        price: "5,50 €",
      },
      {
        name: "Kokosnuss Suppe",
        description: "Mit Kokosmilch und Gemüse",
        price: "4,90 €",
      },
      {
        name: "Huhn-Thai-Curry-Suppe",
        description: "Grünes Thai-Curry mit Kokosmilch und Hähnchen",
        price: "5,50 €",
      },
      {
        name: "Mango Kokos Suppe",
        description: "Mit Hähnchen, Mango und Karotten",
        price: "5,50 €",
      },
    ],
  },
  {
    id: "vorspeisen",
    title: "Vorspeisen & Fingerfood",
    subtitle: "mit Süß-Sauer-Dip",
    items: [
      {
        name: "Hanoi Frühlingsrolle",
        description: "Knusprige Reispapierrolle mit Hähnchenhack und Gemüse",
        price: "6,50 €",
      },
      {
        name: "Wantan (7 Stk.)",
        description: "Gefüllt mit Hähnchen und Zwiebeln",
        price: "4,90 €",
      },
      {
        name: "Mini Frühlingsrollen (7 Stk.)",
        description: "Vegetarisch",
        price: "4,90 €",
      },
      { name: "Krabben Chips", price: "2,90 €" },
      {
        name: "Chicken Coconut Fingers (5 Stk.)",
        price: "6,50 €",
      },
    ],
  },
  {
    id: "bratnudeln",
    title: "Bratnudeln",
    items: [
      {
        name: "Bratnudeln mit Gemüse",
        description: "Basis mit Gemüse – optional mit Protein:",
        price: "8,90 €",
        options: noodleProteins,
      },
    ],
  },
  {
    id: "reisgerichte",
    title: "Reisgerichte",
    subtitle: "Mit Gemüse und Jasminreis",
    items: [
      {
        name: "Rote Curry-Kokos-Sauce",
        description: "Leicht scharf",
        options: standardCurryProteins,
      },
      {
        name: "Grüne Curry-Kokos-Sauce",
        description: "Leicht scharf",
        options: standardCurryProteins,
      },
      {
        name: "Teriyaki-Sauce",
        description: "Mit Knoblauch",
        options: standardCurryProteins,
      },
      {
        name: "Erdnuss-Creme-Sauce",
        options: standardCurryProteins,
      },
      {
        name: "Gelbe Mango-Currysauce",
        options: standardCurryProteins,
      },
      {
        name: "Süß-Sauer-Sauce",
        description: "Mit Ananas",
        options: sweetSourProteins,
      },
      {
        name: "Erdnuss-Curry-Sauce",
        description: "Mit Erdnüssen, rotem Curry und Kokosmilch",
        options: standardCurryProteins,
      },
    ],
  },
  {
    id: "salad-bowls",
    title: "Salad Bowls",
    items: [
      {
        name: "Saigon Bowl",
        description:
          "Knusprige Ente mit Mango, Salat der Saison, Erdnüssen, Limetten-Chili-Dressing und gebackenen Glasnudeln",
        price: "12,90 €",
      },
      {
        name: "Chicken Bowl",
        description:
          "Gebackenes Hähnchen, Salat, Gurke, Mango, Erdnuss-Dressing und Mini-Frühlingsrollen",
        price: "10,90 €",
      },
      {
        name: "Tempura Bowl",
        description:
          "Salat der Saison, Mango, Erdnüsse, Limetten-Dressing und Mini-Frühlingsrollen",
        price: "11,90 €",
      },
    ],
  },
  {
    id: "vietnamesisch",
    title: "Traditionell vietnamesisch",
    items: [
      {
        name: "Nam Bo Bowl",
        description:
          "Vietnamesische Reisnudeln mit Salat, Mango, Kräutern und Chili-Limetten-Dressing",
        options: [
          { label: "mit zarten Hähnchenbruststreifen", price: "11,90 €" },
          { label: "mit Rindfleisch", price: "12,90 €" },
          { label: "mit Bio-Tofu", price: "10,90 €" },
          { label: "mit Hanoi Frühlingsrolle", price: "11,90 €" },
        ],
      },
    ],
  },
  {
    id: "dessert",
    title: "Desserts",
    items: [
      {
        name: "Gebackene Banane mit Honig",
        description: "Süß und knusprig",
        price: "4,00 €",
      },
      {
        name: "Sesambällchen mit Karamellsauce",
        description: "Mit Sesam und Karamell",
        price: "4,00 €",
      },
    ],
  },
  {
    id: "extras",
    title: "Extras",
    items: [
      { name: "Extra Hähnchen", price: "3,50 €" },
      { name: "Extra Rind", price: "4,00 €" },
      { name: "Extra Ente", price: "4,50 €" },
    ],
  },
  {
    id: "saucen",
    title: "Saucen",
    items: [
      { name: "Erdnuss-Kokos-Sauce", price: "1,50 €" },
      { name: "Grüne Curry-Kokos-Sauce", price: "1,50 €" },
      { name: "Rote Curry-Sauce", price: "1,50 €" },
      { name: "Süß-Sauer-Sauce", price: "1,00 €" },
    ],
  },
  {
    id: "getraenke",
    title: "Softdrinks & Bier",
    items: [
      { name: "Coca-Cola / Fanta / Sprite (0,33 l)", price: "2,50 €" },
      { name: "Mineralwasser (0,33 l)", price: "2,00 €" },
      { name: "Mineralwasser (1,0 l)", price: "3,50 €" },
      { name: "Warsteiner (0,5 l)", price: "3,00 €" },
    ],
  },
  {
    id: "mittagstisch",
    title: "Mittagstisch",
    subtitle: "ab 8,50 €",
    items: [
      {
        name: "Tagesgericht",
        description: "Frisch zubereitet – perfekt für die Mittagspause",
        price: "ab 8,50 €",
      },
    ],
  },
  {
    id: "kaffee",
    title: "Kaffee & Tee",
    subtitle: "Kein Lieferdienst",
    items: [
      { name: "Kaffee", price: "2,00 €" },
      { name: "Tee", price: "2,00 €" },
    ],
  },
];

export const allergenNote =
  "Allergene und Zusatzstoffe: A Gluten, C Ei, G Milch, H Nüsse, L Schwefeldioxid, M Senf, N Sesam, O Schwefel, 1 mit Farbstoff, 2 mit Konservierungsstoff, 4 mit Geschmacksverstärker, 5 geschwefelt, 11 enthält Phenylalaninquelle, 13 gewachst.";
