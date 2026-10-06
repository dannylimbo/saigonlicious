import { redirect } from "next/navigation";
import { MenuAdminClient } from "@/components/admin/MenuAdminClient";
import { readSession } from "@/lib/auth/session";
import { getAdminMenu } from "@/app/admin/actions";

export default async function AdminMenuPage() {
  const session = await readSession();
  if (!session) redirect("/admin/login");
  if (session.mustChangePassword) redirect("/admin/einrichtung");

  const menu = await getAdminMenu();
  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide">Speisekarte</h1>
      <p className="mt-2 text-sm text-muted">
        Kategorie auswählen, Gericht bearbeiten, speichern.
      </p>
      <div className="mt-6">
        <MenuAdminClient menu={menu} />
      </div>
    </div>
  );
}
