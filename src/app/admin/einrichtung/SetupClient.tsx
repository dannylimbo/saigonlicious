"use client";

import { useActionState } from "react";
import { changePasswordAction, type ActionResult } from "@/app/admin/actions";
import { MIN_PASSWORD_LENGTH } from "@/lib/auth/password";

const initial: ActionResult | null = null;

export default function AdminSetupClient() {
  const [state, formAction, pending] = useActionState(changePasswordAction, initial);

  return (
    <div className="mx-auto max-w-md">
      <h1 className="font-display text-3xl tracking-wide">Neues Passwort festlegen</h1>
      <p className="mt-3 text-sm text-muted">
        Bevor du die Speisekarte bearbeiten kannst, musst du ein eigenes Passwort
        wählen (mindestens {MIN_PASSWORD_LENGTH} Zeichen). Das Startpasswort gilt
        danach nicht mehr.
      </p>

      <form action={formAction} className="card-dark mt-6 space-y-4">
        <label className="block text-sm">
          Neues Passwort
          <input
            type="password"
            name="password"
            required
            minLength={MIN_PASSWORD_LENGTH}
            autoComplete="new-password"
            className="mt-2 w-full rounded-lg border border-white/15 bg-charcoal px-3 py-3 text-white outline-none focus:border-saigon-green"
          />
        </label>
        <label className="block text-sm">
          Passwort wiederholen
          <input
            type="password"
            name="confirm"
            required
            minLength={MIN_PASSWORD_LENGTH}
            autoComplete="new-password"
            className="mt-2 w-full rounded-lg border border-white/15 bg-charcoal px-3 py-3 text-white outline-none focus:border-saigon-green"
          />
        </label>
        {state && !state.ok && (
          <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-200">
            {state.message}
          </p>
        )}
        <button type="submit" className="btn-primary w-full" disabled={pending}>
          {pending ? "Bitte warten…" : "Passwort speichern"}
        </button>
      </form>
    </div>
  );
}
