import type { Metadata } from "next";
import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";
import { readSession } from "@/lib/auth/session";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Speisekarte verwalten – Saigonlicious",
  robots: { index: false, follow: false },
};

const nav = [
  { href: "/admin/speisekarte", label: "Speisekarte" },
  { href: "/admin/mittagstisch", label: "Mittagstisch" },
  { href: "/admin/einstellungen", label: "Einstellungen" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await readSession();

  return (
    <div className="min-h-screen bg-charcoal text-white">
      <header className="border-b border-white/10 bg-charcoal-light">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <p className="font-script text-2xl text-saigon-green">Saigonlicious</p>
            <p className="text-xs text-muted">Speisekarte verwalten</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/" className="btn-secondary !py-2 !text-xs" target="_blank">
              Website ansehen
            </Link>
            {session && (
              <form action={logoutAction}>
                <button type="submit" className="btn-secondary !py-2 !text-xs">
                  Abmelden
                </button>
              </form>
            )}
          </div>
        </div>
        {session && !session.mustChangePassword && (
          <nav className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 pb-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-saigon-green"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6 pb-24">{children}</main>
    </div>
  );
}
