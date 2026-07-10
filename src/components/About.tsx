import { siteConfig } from "@/lib/site-data";
import { SectionHeading } from "@/components/ui/BrushLabel";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";

const trustItems = [
  "Lokal in Lüneburg",
  "Lieferando Bestellung",
  "Abholung möglich",
  "Mittagstisch",
  "PayPal möglich",
] as const;

export function About() {
  return (
    <section className="section-padding bg-charcoal" aria-labelledby="about-heading">
      <div className="container-narrow">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="lg:order-2">
            <PhotoFrame
              src="/images/interior-counter.png"
              alt="Innenbereich und Theke bei Saigonlicious in Lüneburg"
              sizes="(max-width: 1024px) 100vw, 50vw"
              aspect="4/3"
              revealDelay={80}
              objectPosition="center center"
            />
          </div>

          <div className="lg:order-1">
            <Reveal delay={80}>
              <SectionHeading id="about-heading" accent title="Asian Takeaway in Lüneburg" />
            </Reveal>
            <Reveal delay={160}>
              <p className="prose-muted text-lg leading-relaxed text-muted">
                Saigonlicious ist ein Asia-Imbiss und Lieferservice in Lüneburg.
                In der Zeppelinstraße 1 werden frische asiatische Gerichte, Currys,
                Reis- und Nudelgerichte sowie Desserts zubereitet – ideal zum
                Mitnehmen, Liefernlassen oder für die schnelle Mittagspause.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <ul className="mt-8 flex flex-wrap gap-2">
                {trustItems.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-saigon-green/30 bg-saigon-green/10 px-4 py-1.5 text-sm font-medium text-saigon-green-light"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={300}>
              <p className="mt-6 text-sm text-muted">{siteConfig.address.full}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
