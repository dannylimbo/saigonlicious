export const lieferandoDeliveryUrl =
  "https://www.lieferando.de/speisekarte/saigonlicious-luneburg?utm_campaign=foodorder&utm_medium=organic&utm_source=google&shipping=delivery";

export const lieferandoCollectionUrl =
  "https://www.lieferando.de/speisekarte/saigonlicious-luneburg?utm_campaign=foodorder&utm_medium=organic&utm_source=google&shipping=collection";

export const siteConfig = {
  name: "Saigonlicious",
  tagline: "Asia-Imbiss & Lieferservice",
  description:
    "Saigonlicious in Lüneburg: Asiatische Gerichte und Currys. Am besten direkt telefonisch bestellen unter 04131 7218220 – alternativ über Lieferando.",
  url: "https://saigonlicious.de",
  phone: "04131 7218220",
  phoneHref: "tel:+4941317218220",
  lieferando: {
    delivery: lieferandoDeliveryUrl,
    collection: lieferandoCollectionUrl,
  },
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
  lunchOnlyOnSiteLabel: "Mittagstisch – nur vor Ort",
};

export const navLinks = [
  { href: "#start", label: "Start" },
  { href: "#bestellen", label: "Bestellen" },
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

export const faqItems = [
  {
    question: "Wie kann ich bei Saigonlicious bestellen?",
    answer:
      "Bestelle am besten direkt telefonisch unter 04131 7218220. Alternativ kannst du über Lieferando bestellen.",
  },
  {
    question: "Kann ich Essen liefern lassen?",
    answer:
      "Ja. Am einfachsten rufst du uns an. Alternativ kannst du über Lieferando eine Lieferung bestellen.",
  },
  {
    question: "Kann ich Essen abholen?",
    answer:
      "Ja. Am einfachsten bestellst du telefonisch und holst dein Essen ab. Alternativ geht Abholung auch über Lieferando.",
  },
  {
    question: "Muss ich über Lieferando bestellen?",
    answer:
      "Nein. Die telefonische Bestellung bei uns ist der Hauptweg. Lieferando ist eine zusätzliche Alternative.",
  },
  {
    question: "Wo befindet sich Saigonlicious?",
    answer:
      "Saigonlicious befindet sich in der Zeppelinstraße 1, 21337 Lüneburg.",
  },
  {
    question: "Gibt es Mittagstisch?",
    answer:
      "Ja, es gibt Mittagstisch – nur vor Ort. Unser Mittagsangebot gilt ausschließlich zum Verzehr im Restaurant. Keine telefonische Bestellung, keine Abholung und keine Lieferung.",
  },
  {
    question: "Kann man mit PayPal bezahlen?",
    answer: "Laut Speisekarte ist PayPal-Zahlung möglich.",
  },
];

export const galleryImages = [
  {
    src: "/images/takeaway-duck-rice.png",
    alt: "Knusprige Ente mit Reis zum Mitnehmen",
    index: 0,
  },
  {
    src: "/images/spring-rolls.png",
    alt: "Frische Vorspeisen bei Saigonlicious",
    index: 1,
  },
  {
    src: "/images/kitchen-menu.png",
    alt: "Speisekarte und Küche bei Saigonlicious",
    index: 2,
  },
  {
    src: "/images/storefront.png",
    alt: "Saigonlicious Laden in der Zeppelinstraße",
    index: 3,
  },
  {
    src: "/images/exterior-front.png",
    alt: "Außenansicht Saigonlicious Lüneburg",
    index: 4,
  },
  {
    src: "/images/interior-counter.png",
    alt: "Theke und Servicebereich bei Saigonlicious",
    index: 5,
  },
  {
    src: "/images/fresh-vegetables.png",
    alt: "Frisch zubereitetes asiatisches Gemüse",
    index: 6,
  },
] as const;
