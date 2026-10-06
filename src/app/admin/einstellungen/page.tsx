import { redirect } from "next/navigation";
import SettingsForm from "@/components/admin/SettingsForm";
import { readSession } from "@/lib/auth/session";
import { loadSettings } from "@/lib/store/menu-store";

export default async function AdminSettingsPage() {
  const session = await readSession();
  if (!session) redirect("/admin/login");
  if (session.mustChangePassword) redirect("/admin/einrichtung");

  const settings = await loadSettings();
  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide">Einstellungen</h1>
      <p className="mt-2 text-sm text-muted">Passwort und Hinweise zur Speisekarte.</p>
      <div className="mt-6">
        <SettingsForm allergenNote={settings.allergenNote} />
      </div>
    </div>
  );
}
