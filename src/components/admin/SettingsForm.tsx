"use client";

import { useActionState } from "react";
import {
  changePasswordAction,
  saveAllergenNoteAction,
  type ActionResult,
} from "@/app/admin/actions";
import { MIN_PASSWORD_LENGTH } from "@/lib/auth/password";

const initial: ActionResult | null = null;

export default function SettingsForm({ allergenNote }: { allergenNote: string }) {
  const [passwordState, passwordAction, passwordPending] = useActionState(
    changePasswordAction,
    initial
  );
  const [noteState, noteAction, notePending] = useActionState(
    saveAllergenNoteAction,
    initial
  );

  return (
    <div className="space-y-8">
      <form action={noteAction} className="card-dark space-y-4">
        <h2 className="font-display text-2xl tracking-wide">Allergene & Hinweise</h2>
        <textarea
          name="allergenNote"
          rows={5}
          defaultValue={allergenNote}
          className="w-full rounded-lg border border-white/15 bg-charcoal px-3 py-3 text-sm outline-none focus:border-saigon-green"
        />
        {noteState && (
          <p
            className={`rounded-lg px-3 py-2 text-sm ${
              noteState.ok
                ? "bg-saigon-green/20 text-saigon-green-light"
                : "bg-red-500/15 text-red-200"
            }`}
          >
            {noteState.message}
          </p>
        )}
        <button type="submit" className="btn-primary" disabled={notePending}>
          {notePending ? "Speichern…" : "Speichern"}
        </button>
      </form>

      <form action={passwordAction} className="card-dark space-y-4">
        <h2 className="font-display text-2xl tracking-wide">Passwort ändern</h2>
        <p className="text-sm text-muted">
          Mindestens {MIN_PASSWORD_LENGTH} Zeichen. Nach dem Speichern gilt nur noch das
          neue Passwort.
        </p>
        <label className="block text-sm">
          Neues Passwort
          <input
            type="password"
            name="password"
            required
            minLength={MIN_PASSWORD_LENGTH}
            className="mt-2 w-full rounded-lg border border-white/15 bg-charcoal px-3 py-3 outline-none focus:border-saigon-green"
          />
        </label>
        <label className="block text-sm">
          Passwort wiederholen
          <input
            type="password"
            name="confirm"
            required
            minLength={MIN_PASSWORD_LENGTH}
            className="mt-2 w-full rounded-lg border border-white/15 bg-charcoal px-3 py-3 outline-none focus:border-saigon-green"
          />
        </label>
        {passwordState && (
          <p
            className={`rounded-lg px-3 py-2 text-sm ${
              passwordState.ok
                ? "bg-saigon-green/20 text-saigon-green-light"
                : "bg-red-500/15 text-red-200"
            }`}
          >
            {passwordState.message}
          </p>
        )}
        <button type="submit" className="btn-primary" disabled={passwordPending}>
          {passwordPending ? "Speichern…" : "Passwort speichern"}
        </button>
      </form>
    </div>
  );
}
