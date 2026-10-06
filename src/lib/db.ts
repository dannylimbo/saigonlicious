import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

type Sql = NeonQueryFunction<false, false>;

let cached: Sql | null = null;

export function getDatabaseUrl(): string | undefined {
  return (
    process.env.POSTGRES_URL ??
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL_NON_POOLING
  );
}

export function isDatabaseConfigured(): boolean {
  return Boolean(getDatabaseUrl());
}

export function getSql(): Sql {
  const url = getDatabaseUrl();
  if (!url) {
    throw new Error("Datenbank ist nicht verbunden.");
  }
  if (!cached) {
    cached = neon(url);
  }
  return cached;
}
