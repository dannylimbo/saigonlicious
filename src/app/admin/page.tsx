import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth/session";
import { loadSettings } from "@/lib/store/menu-store";

export default async function AdminIndexPage() {
  const session = await readSession();
  if (!session) redirect("/admin/login");
  if (session.mustChangePassword) redirect("/admin/einrichtung");

  const settings = await loadSettings();
  if (!settings.setupComplete) redirect("/admin/einrichtung");

  redirect("/admin/speisekarte");
}
