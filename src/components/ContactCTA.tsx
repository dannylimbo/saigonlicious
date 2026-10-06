import Link from "next/link";
import { siteConfig } from "@/lib/site-data";
import { deliveryHref, externalLinkProps } from "@/lib/utils";
import { BrushLabel } from "@/components/ui/BrushLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function ContactCTA() {
  return (
    <Section
      id="kontakt"
      tone="green-black"
      pattern="dots"
      glow="center"
      divider
      decor={[
        { icon: "mango", className: "decor-pos-tl", mobile: false },
        { icon: "lime", className: "decor-pos-br" },
        { icon: "noodles", className: "decor-pos-mid", mobile: false },
      ]}
      className="section-padding"
      aria-labelledby="cta-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-saigon-green/8 via-transparent to-orchid/6" aria-hidden />

      <div className="container-narrow relative text-center">
        <Reveal>
          <div className="mb-4 flex justify-center">
            <BrushLabel>Jetzt telefonisch bestellen</BrushLabel>
          </div>
          <h2
            id="cta-heading"
            className="section-heading brush-stroke mx-auto max-w-3xl font-display tracking-wide text-white"
          >
            Lust auf asiatisches Essen?
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-muted">
            Ruf uns an unter {siteConfig.phone} – oder bestelle alternativ über
            Lieferando.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={siteConfig.phoneHref} className="btn-primary">
              Jetzt telefonisch bestellen
            </a>
            <Link href="#speisekarte" className="btn-secondary">
              Speisekarte ansehen
            </Link>
            <a href={deliveryHref} {...externalLinkProps} className="btn-secondary">
              Alternativ über Lieferando bestellen
            </a>
          </div>
        </Reveal>

        <div className="brush-divider mt-10" aria-hidden />
      </div>
    </Section>
  );
}
