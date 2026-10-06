import { redirect } from "next/navigation";
import { MenuAdminClient } from "@/components/admin/MenuAdminClient";
import { readSession } from "@/lib/auth/session";
import { getAdminMenu } from "@/app/admin/actions";
import { LUNCH_NOTICE } from "@/lib/menu-types";

export default async function AdminLunchPage() {
  const session = await readSession();
  if (!session) redirect("/admin/login");
  if (session.mustChangePassword) redirect("/admin/einrichtung");

  const menu = await getAdminMenu();
  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide">Mittagstisch</h1>
      <p className="mt-2 text-sm text-muted">Mittagstisch – nur vor Ort</p>
      <p className="mt-2 max-w-2xl text-sm text-saigon-green-light">{LUNCH_NOTICE}</p>
      <div className="mt-6">
        <MenuAdminClient menu={menu} lunchOnly />
      </div>
    </div>
  );
}
