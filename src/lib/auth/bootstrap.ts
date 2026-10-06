export function isAdminBootstrapAllowed(): boolean {
  if (process.env.ALLOW_ADMIN_BOOTSTRAP === "true") return true;
  if (process.env.ALLOW_ADMIN_BOOTSTRAP === "false") return false;
  // Local development only – never open bootstrap on Vercel production.
  if (process.env.VERCEL_ENV === "production") return false;
  if (process.env.NODE_ENV === "production" && process.env.VERCEL) return false;
  return process.env.NODE_ENV !== "production";
}
