import Link from "next/link";

export const metadata = {
  title: "Datenschutz – Saigonlicious Lüneburg",
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-charcoal px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm text-saigon-green hover:underline">
          ← Zurück zur Startseite
        </Link>
        <h1 className="mt-6 font-display text-4xl text-white">Datenschutz</h1>
        <div className="mt-8 space-y-4 text-muted">
          <p>
            Diese Seite ist ein Platzhalter für die Datenschutzerklärung. Bitte
            vor Veröffentlichung eine vollständige Datenschutzerklärung ergänzen.
          </p>
        </div>
      </div>
    </div>
  );
}
