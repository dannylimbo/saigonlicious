import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth/session";
import { loadSettings } from "@/lib/store/menu-store";
import AdminSetupClient from "./SetupClient";

export default async function AdminSetupPage() {
  const session = await readSession();
  if (!session) redirect("/admin/login");

  const settings = await loadSettings();
  if (settings.setupComplete && !session.mustChangePassword) {
    redirect("/admin/speisekarte");
  }

  return <AdminSetupClient />;
}
