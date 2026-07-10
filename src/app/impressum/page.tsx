import Link from "next/link";
import { siteConfig } from "@/lib/site-data";

export const metadata = {
  title: "Impressum – Saigonlicious Lüneburg",
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-charcoal px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm text-saigon-green hover:underline">
          ← Zurück zur Startseite
        </Link>
        <h1 className="mt-6 font-display text-4xl text-white">Impressum</h1>
        <div className="mt-8 space-y-4 text-muted">
          <p>
            <strong className="text-white">{siteConfig.name}</strong>
            <br />
            {siteConfig.address.street}
            <br />
            {siteConfig.address.city}
          </p>
          <p>
            Telefon:{" "}
            <a href={siteConfig.phoneHref} className="text-saigon-green">
              {siteConfig.phone}
            </a>
          </p>
          <p className="text-sm">
            Platzhalter – bitte vollständige Impressumsangaben vor Veröffentlichung
            ergänzen.
          </p>
        </div>
      </div>
    </div>
  );
}
