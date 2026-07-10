import Link from "next/link";
import { siteConfig } from "@/lib/site-data";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";

export function LunchSpecial() {
  return (
    <section
      className="section-padding relative overflow-hidden bg-charcoal"
      aria-labelledby="lunch-heading"
    >
      <div className="absolute right-0 top-1/2 h-64 w-64 max-w-[50vw] -translate-y-1/2 translate-x-1/4 rounded-full bg-saigon-green/5 blur-3xl" />

      <div className="container-narrow relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <Reveal>
              <span className="stamp-badge mb-6 inline-block text-lg sm:text-xl">
                Mittagstisch ab {siteConfig.lunchPrice}
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2
                id="lunch-heading"
                className="section-heading font-display tracking-wide text-white"
              >
                Perfekt für deine Mittagspause
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="prose-muted mt-4 text-lg text-muted">
                Frisch zubereitete Gerichte, schnell bestellt und lecker serviert.
                Ideal für die kurze Pause – zum Mitnehmen oder liefern lassen.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <Link href="#mittagstisch" className="btn-primary mt-8">
                Mittagstisch ansehen
              </Link>
            </Reveal>
          </div>

          <PhotoFrame
            src="/images/green-curry.png"
            alt="Frisches Curry-Gericht zum Mittagstisch bei Saigonlicious"
            sizes="(max-width: 1024px) 100vw, 50vw"
            aspect="4/3"
            revealDelay={120}
            objectPosition="center 40%"
          />
        </div>
      </div>
    </section>
  );
}
