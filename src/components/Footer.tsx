import Link from "next/link";
import {
  deliveryHours,
  navLinks,
  openingHours,
  siteConfig,
} from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal pb-20 sm:pb-8">
      <div className="container-narrow section-padding !py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-script text-2xl text-white">{siteConfig.name}</p>
            <p className="mt-1 text-sm text-muted">{siteConfig.tagline}</p>
            <p className="mt-4 text-sm text-muted">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.city}
            </p>
            <a
              href={siteConfig.phoneHref}
              className="mt-2 inline-block font-semibold text-saigon-green hover:text-saigon-green-light"
            >
              {siteConfig.phone}
            </a>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-saigon-green">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/impressum" className="text-sm text-muted transition-colors hover:text-white">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-sm text-muted transition-colors hover:text-white">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-saigon-green">
              Öffnungszeiten
            </h3>
            <ul className="space-y-1 text-sm text-muted">
              {openingHours.map((row) => (
                <li key={row.days}>
                  {row.days}: {row.hours}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-saigon-green">
              Lieferzeiten
            </h3>
            <ul className="space-y-1 text-sm text-muted">
              {deliveryHours.map((row) => (
                <li key={row.days}>
                  {row.days}: {row.hours}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-saigon-green-light">PayPal-Zahlung möglich</p>
            <a
              href={siteConfig.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-muted transition-colors hover:text-white"
            >
              Facebook: {siteConfig.facebookHandle}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {siteConfig.name}. Alle Rechte vorbehalten.
          </p>
          <a
            href={siteConfig.url}
            className="text-xs text-muted transition-colors hover:text-saigon-green"
          >
            {siteConfig.url.replace("https://", "")}
          </a>
        </div>
      </div>
    </footer>
  );
}
