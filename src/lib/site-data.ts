export const siteConfig = {
  name: "Saigonlicious",
  tagline: "Asia-Imbiss & Lieferservice",
  description:
    "Saigonlicious in Lüneburg: Asiatische Gerichte, Currys, Mittagstisch und Lieferservice. Jetzt Speisekarte ansehen, anrufen oder bestellen.",
  url: "https://saigonlicious.de",
  phone: "04131 7218220",
  phoneHref: "tel:+4941317218220",
  address: {
    street: "Zeppelinstraße 1",
    city: "21337 Lüneburg",
    full: "Zeppelinstraße 1, 21337 Lüneburg",
  },
  facebook: "https://www.facebook.com/Saigonlicious.LG",
  facebookHandle: "Saigonlicious.LG",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Zeppelinstraße+1,+21337+Lüneburg",
  mapsEmbed:
    "https://maps.google.com/maps?q=Zeppelinstra%C3%9Fe+1,+21337+L%C3%BCneburg&hl=de&z=16&output=embed",
  lunchPrice: "8,50 €",
};

export const navLinks = [
  { href: "#start", label: "Start" },
  { href: "#speisekarte", label: "Speisekarte" },
  { href: "#mittagstisch", label: "Mittagstisch" },
  { href: "#lieferung", label: "Lieferung" },
  { href: "#oeffnungszeiten", label: "Öffnungszeiten" },
  { href: "#standort", label: "Standort" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

export const openingHours = [
  { days: "Montag – Freitag", hours: "11:00 – 20:00" },
  { days: "Samstag – Sonntag", hours: "Ruhetag" },
] as const;

export const deliveryHours = [
  { days: "Montag – Freitag", hours: "11:30 – 19:45" },
  { days: "Samstag – Sonntag", hours: "Ruhetag" },
] as const;

export type MenuItem = {
  name: string;
  description?: string;
  price: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "indisch",
    title: "Indische Gerichte",
    subtitle: "mit Duft-Reis",
    items: [
      { name: "Chicken Madras", price: "10,90 €" },
      { name: "Chicken Bombay", price: "10,90 €" },
      { name: "Beef Tandoori Curry", price: "12,90 €" },
      { name: "Beef Vindaloo", price: "12,90 €" },
      { name: "Beef Coconut Madras", price: "12,90 €" },
      { name: "Beef Tikka Masala", price: "12,90 €" },
    ],
  },
  {
    id: "dessert",
    title: "Dessert",
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
    id: "kaffee",
    title: "Kaffee & Tee",
    subtitle: "Kein Lieferdienst",
    items: [
      { name: "Kaffee", price: "2,00 €" },
      { name: "Tee", price: "2,00 €" },
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
];

export const faqItems = [
  {
    question: "Wo befindet sich Saigonlicious?",
    answer:
      "Saigonlicious befindet sich in der Zeppelinstraße 1, 21337 Lüneburg.",
  },
  {
    question: "Bietet Saigonlicious Lieferung an?",
    answer:
      "Ja, Saigonlicious bietet einen Lieferservice an. Die Lieferzeiten sollten vor der Bestellung geprüft werden.",
  },
  {
    question: "Kann man auch abholen?",
    answer: "Ja, Bestellungen können auch abgeholt werden.",
  },
  {
    question: "Gibt es Mittagstisch?",
    answer: "Ja, laut Speisekarte gibt es Mittagstisch ab 8,50 €.",
  },
  {
    question: "Kann man mit PayPal bezahlen?",
    answer: "Laut Speisekarte ist PayPal-Zahlung möglich.",
  },
  {
    question: "Wie kann ich bestellen?",
    answer:
      "Du kannst telefonisch unter 04131 7218220 bestellen oder den Bestellbutton auf der Website nutzen.",
  },
];

export const galleryImages = [
  {
    src: "/images/hero-noodles.png",
    alt: "Knusprige Bratnudeln mit Hähnchen bei Saigonlicious",
    index: 0,
  },
  {
    src: "/images/green-curry.png",
    alt: "Grünes Curry im Takeaway-Becher",
    index: 1,
  },
  {
    src: "/images/takeaway-duck-rice.png",
    alt: "Knusprige Ente mit Reis zum Mitnehmen",
    index: 2,
  },
  {
    src: "/images/spring-rolls.png",
    alt: "Frühlingsrollen auf grünem Blatt-Teller",
    index: 3,
  },
  {
    src: "/images/bowl-duck.png",
    alt: "Nudelgericht mit knuspriger Ente",
    index: 4,
  },
  {
    src: "/images/fresh-vegetables.png",
    alt: "Frisch zubereitetes asiatisches Gemüse",
    index: 5,
  },
  {
    src: "/images/outdoor-meal.png",
    alt: "Asiatisches Gericht auf der Terrasse",
    index: 6,
  },
  {
    src: "/images/interior-counter.png",
    alt: "Theke und Servicebereich bei Saigonlicious",
    index: 7,
  },
] as const;

export const allergenNote =
  "Allergene und Zusatzstoffe: A Gluten, C Ei, G Milch, H Nüsse, L Schwefeldioxid, M Senf, N Sesam, O Schwefel, 1 mit Farbstoff, 2 mit Konservierungsstoff, 4 mit Geschmacksverstärker, 5 geschwefelt, 11 enthält Phenylalaninquelle, 13 gewachst.";
