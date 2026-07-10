import Image from "next/image";
import { siteConfig } from "@/lib/site-data";
import { SectionHeading } from "@/components/ui/BrushLabel";
import { Reveal } from "@/components/ui/Reveal";

type HighlightItem = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  objectPosition?: string;
  variant?: "food" | "paypal";
};

const highlights: HighlightItem[] = [
  {
    title: "Lieferservice in Lüneburg",
    description:
      "Bestelle über Lieferando zur Lieferung oder hol dein Essen direkt bei uns ab.",
    image: "/images/takeaway-duck-rice.png",
    imageAlt: "Takeaway-Gericht mit knuspriger Ente und Reis",
    objectPosition: "center center",
    variant: "food",
  },
  {
    title: `Mittagstisch ab ${siteConfig.lunchPrice}`,
    description: "Schnell, lecker – perfekt für die Mittagspause.",
    image: "/images/kitchen-menu.png",
    imageAlt: "Mittagstisch und Speisekarte bei Saigonlicious",
    objectPosition: "center 30%",
    variant: "food",
  },
  {
    title: "Asiatische & vietnamesische Gerichte",
    description: "Von Curry und Bowls bis Bratnudeln – aromatisch und frisch.",
    image: "/images/spring-rolls.png",
    imageAlt: "Vorspeisen bei Saigonlicious",
    objectPosition: "center center",
    variant: "food",
  },
  {
    title: "PayPal-Zahlung möglich",
    description: "Scannen, zahlen, fertig – direkt an der Theke.",
    image: "/images/paypal-qr.png",
    imageAlt: "PayPal QR-Code bei Saigonlicious",
    variant: "paypal",
  },
];

function HighlightCard({
  item,
  delay,
}: {
  item: HighlightItem;
  delay: number;
}) {
  const isPayPal = item.variant === "paypal";

  return (
    <Reveal delay={delay} className="w-full min-w-0 self-start">
      <article className="card-dark group w-full overflow-hidden p-0">
        {isPayPal ? (
          <div className="flex items-start gap-4 p-4 sm:p-5">
            <div className="photo-frame shrink-0">
              <div className="photo-frame-inner relative h-24 w-24 overflow-hidden bg-white sm:h-28 sm:w-28">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-contain p-1.5"
                  sizes="112px"
                />
              </div>
            </div>
            <div className="min-w-0 pt-1">
              <h3 className="font-display text-xl tracking-wide text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="p-3 sm:p-4">
              <div className="photo-frame w-full">
                <div className="photo-frame-inner relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    style={{ objectPosition: item.objectPosition ?? "center" }}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
            <div className="px-5 pb-5 pt-0">
              <h3 className="font-display text-xl tracking-wide text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
              <div className="mt-4 h-0.5 w-10 bg-saigon-green transition-[width] duration-500 group-hover:w-full" />
            </div>
          </>
        )}
      </article>
    </Reveal>
  );
}

export function Highlights() {
  return (
    <section
      className="section-padding overflow-hidden bg-charcoal"
      aria-labelledby="highlights-heading"
    >
      <div className="container-narrow">
        <Reveal>
          <SectionHeading
            id="highlights-heading"
            accent
            title="Frisch. Schnell. Direkt zu dir."
            subtitle="Asian Takeaway & Lieferservice in Lüneburg."
          />
        </Reveal>

        <div className="grid min-w-0 grid-cols-1 items-start gap-5 sm:grid-cols-2">
          {highlights.map((item, index) => (
            <HighlightCard key={item.title} item={item} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
