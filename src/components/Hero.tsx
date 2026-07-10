import Link from "next/link";
import { siteConfig } from "@/lib/site-data";
import { orderHref } from "@/lib/utils";
import { BrushLabel } from "@/components/ui/BrushLabel";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section
      id="start"
      className="relative overflow-hidden bg-charcoal pt-24 lg:pt-28"
    >
      <div className="lg:grid lg:grid-cols-2 lg:items-center">
        <div className="container-narrow flex flex-col justify-center px-4 py-10 sm:px-6 lg:max-w-none lg:px-10 lg:py-16 xl:px-14">
          <Reveal immediate delay={0}>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <BrushLabel>Lieferservice</BrushLabel>
              <span className="stamp-badge text-xs sm:text-sm">
                Mittagstisch ab {siteConfig.lunchPrice}
              </span>
            </div>
          </Reveal>

          <Reveal immediate delay={120}>
            <h1 className="display-heading max-w-3xl font-display text-white">
              Asiatisch genießen.
              <span className="block text-saigon-green">Frisch geliefert.</span>
            </h1>
          </Reveal>

          <Reveal immediate delay={220}>
            <p className="prose-muted mt-6 max-w-xl text-lg text-white/88 sm:text-xl">
              Aromatische Currys, Reis- und Nudelgerichte, Desserts und Mittagstisch –
              frisch zubereitet in der Zeppelinstraße 1, Lüneburg.
            </p>
          </Reveal>

          <Reveal immediate delay={320}>
            <a
              href={siteConfig.phoneHref}
              className="mt-7 inline-flex items-center gap-2 font-display text-[clamp(1.75rem,4vw,2.5rem)] tracking-wide text-saigon-green transition-colors hover:text-saigon-green-light"
            >
              <PhoneIcon />
              {siteConfig.phone}
            </a>
          </Reveal>

          <Reveal immediate delay={420}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#speisekarte" className="btn-primary">
                Speisekarte ansehen
              </Link>
              <a href={orderHref} className="btn-primary">
                Jetzt bestellen
              </a>
              <a href={siteConfig.phoneHref} className="btn-secondary">
                Anrufen
              </a>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Route öffnen
              </a>
            </div>
          </Reveal>
        </div>

        <div className="px-4 pb-10 sm:px-6 lg:px-6 lg:py-10 xl:px-8">
          <PhotoFrame
            src="/images/hero-noodles.png"
            alt="Knusprige Bratnudeln mit Hähnchen bei Saigonlicious"
            sizes="(max-width: 1024px) 100vw, 50vw"
            aspect="4/3"
            priority
            revealDelay={180}
            objectPosition="center center"
          />
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg
      className="h-7 w-7 shrink-0 sm:h-8 sm:w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}
