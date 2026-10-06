# Umgebungsvariablen – Saigonlicious CMS

Keine echten Geheimnisse in dieses Dokument oder ins Repository schreiben.

## Erforderlich (Produktion & Preview)

| Variable | Zweck |
|---|---|
| `BLOB_READ_WRITE_TOKEN` | Lese-/Schreibzugriff auf Vercel Blob (Speisekarte, Einstellungen, Bilder) |
| `SESSION_SECRET` | Geheimnis für Admin-Sessions (mindestens 32 zufällige Zeichen) |

## Optional / Einrichtung

| Variable | Zweck |
|---|---|
| `ALLOW_ADMIN_BOOTSTRAP` | `true` nur kurzzeitig, um mit Startpasswort `123` die Ersteinrichtung zu öffnen. Danach entfernen oder auf `false` setzen. |
| `CMS_NAMESPACE` | Präfix für Blob-Pfade, z. B. `preview` vs. leer für Produktion – trennt Test- und Live-Daten |

## Startpasswort

- Lokal (ohne Vercel Production): Startpasswort `123`, danach Pflichtwechsel (≥ 12 Zeichen).
- Produktion: Admin bleibt gesperrt, bis `ALLOW_ADMIN_BOOTSTRAP=true` gesetzt und ein eigenes Passwort gespeichert wurde. Danach `ALLOW_ADMIN_BOOTSTRAP` wieder entfernen.

## Nicht verwenden

- Keine Passwörter in `NEXT_PUBLIC_*`
- Keine Passwort-Hashes im Frontend
- `DATABASE_URL` (Neon) ist optional und für dieses CMS nicht erforderlich – Speicherung läuft über Vercel Blob
