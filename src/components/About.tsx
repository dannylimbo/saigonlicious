import { siteConfig } from "@/lib/site-data";
import { BrushLabel, SectionHeading } from "@/components/ui/BrushLabel";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const trustItems = [
  "Lokal in Lüneburg",
  "Lieferando Bestellung",
  "Abholung möglich",
  "Mittagstisch",
  "PayPal möglich",
] as const;

export function About() {
  return (
    <Section
      tone="charcoal"
      pattern="grain"
      glow="top-left"
      divider
      decor={[
        { icon: "orchid", className: "decor-pos-tr", mobile: false },
        { icon: "cilantro", className: "decor-pos-bl" },
      ]}
      className="section-padding"
      aria-labelledby="about-heading"
    >
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
              className="photo-frame-overlap"
            />
          </div>

          <div className="lg:order-1">
            <Reveal delay={80}>
              <SectionHeading
                id="about-heading"
                accent
                brushStroke
                title="Asian Takeaway in Lüneburg"
              />
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
                  <li key={item}>
                    <BrushLabel className="text-[10px] sm:text-xs">{item}</BrushLabel>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={300}>
              <div className="card-rice mt-8 inline-block px-5 py-4">
                <p className="text-on-rice-muted text-sm">Standort</p>
                <p className="mt-1 font-medium">{siteConfig.address.full}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
