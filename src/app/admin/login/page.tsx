"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, type ActionResult } from "@/app/admin/actions";

const initial: ActionResult | null = null;

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initial);

  return (
    <div className="mx-auto max-w-md">
      <h1 className="font-display text-3xl tracking-wide">Anmelden</h1>
      <p className="mt-2 text-sm text-muted">
        Hier bearbeitest du die Speisekarte von Saigonlicious.
      </p>

      <form action={formAction} className="card-dark mt-6 space-y-4">
        <label className="block text-sm">
          Passwort
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="mt-2 w-full rounded-lg border border-white/15 bg-charcoal px-3 py-3 text-white outline-none focus:border-saigon-green"
          />
        </label>
        {state && !state.ok && (
          <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-200">
            {state.message}
          </p>
        )}
        <button type="submit" className="btn-primary w-full" disabled={pending}>
          {pending ? "Bitte warten…" : "Anmelden"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-muted">
        <Link href="/" className="text-saigon-green hover:underline">
          Zurück zur Website
        </Link>
      </p>
    </div>
  );
}
