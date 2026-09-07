import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth/utils";

const rateLimit = new Map<string, { count: number; startTime: number }>();
const blockedIps = new Map<string, number>();
const MAX_REQUESTS = 35;
const WINDOW_MS = 60 * 1000;
const BLACKLIST_TIME = 60 * 1000;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Extracción de IP compatible con TS
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    (req as unknown as { ip?: string }).ip ||
    "127.0.0.1";

  const now = Date.now();

  // --- 1. PROTECCIÓN DoS (Rate Limit) ---
  if (blockedIps.has(ip)) {
    const blockTime = blockedIps.get(ip)!;

    if (now - blockTime > BLACKLIST_TIME) {
      blockedIps.delete(ip);
    } else {
      const remainingBlockedTime = Math.ceil((BLACKLIST_TIME - (now - blockTime)) / 1000);
      return new Response(
        `Demasiadas peticiones en un minuto, por favor vuelve a intentarlo en: ${remainingBlockedTime} segundos.`,
        { status: 429 }
      );
    }
  }

  let requestData = rateLimit.get(ip);

  if (!requestData) {
    requestData = { count: 0, startTime: now };
    rateLimit.set(ip, requestData);
  }

  if (now - requestData.startTime > WINDOW_MS) {
    requestData.count = 0;
    requestData.startTime = now;
  }

  requestData.count += 1;

  if (requestData.count > MAX_REQUESTS) {
    blockedIps.set(ip, now);
    rateLimit.delete(ip);
    return new Response(`Demasiadas peticiones, por favor vuelve a intentarlo en un minuto.`, {
      status: 429,
    });
  }

  // --- 2. CONTROL DE ACCESO PARA DASHBOARD ADMIN ---
  if (pathname.startsWith("/dashboard/admin")) {
    const token = req.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const payload = verifyToken(token) as { role?: string } | null;

      const userRole = payload?.role?.toUpperCase();

      if (!payload || (userRole !== "ADMIN" && userRole !== "SUPERADMIN")) {
        return NextResponse.rewrite(new URL("/not-found", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};