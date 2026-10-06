import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/constants";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");

  const publicAdminPaths = ["/admin/login"];
  if (publicAdminPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return response;
  }

  // Soft gate: pages still verify session server-side; this keeps bots out of deep links.
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);
  if (!hasSession && pathname !== "/admin/login") {
    if (pathname.startsWith("/admin/api") || pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
    }
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
