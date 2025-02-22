import { NextResponse } from "next/server";

const rateLimit = new Map(); // Store request data in memory
const blockedIps = new Map(); // Store blacklisted IPs with their block timestamp
const MAX_REQUESTS = 35; // Max allowed requests per minute
const WINDOW_MS = 60 * 1000; // Time window in milliseconds
const BLACKLIST_TIME = 60 * 1000; // Blacklist duration in milliseconds (1 minute)

//DoS protection
export function middleware(req) {
  const ip = req.ip || req.headers.get("x-forwarded-for") || "127.0.0.1";
  const now = Date.now();

  // Check if the IP is blacklisted
  if (blockedIps.has(ip)) {
    const blockTime = blockedIps.get(ip);
    
    // If 1 minute has passed since blocking, un-blacklist the IP
    if (now - blockTime > BLACKLIST_TIME) {
      blockedIps.delete(ip); // Remove from blacklist after 1 minute
    } else {
      // If still blacklisted, redirect to the block image
      let remainingBlockedTime = (BLACKLIST_TIME - (now - blockTime))/ 1000;;
      remainingBlockedTime = Math.ceil(remainingBlockedTime);  
      return new Response(`Demasiadas peticiones en un minuto, por favor vuelve a intentarlo en: ${remainingBlockedTime} segundos.`, { status: 429 });
    }
  }

  let requestData = rateLimit.get(ip);

  // If no data exists for this IP, initialize it
  if (!requestData) {
    requestData = { count: 0, startTime: now };
    rateLimit.set(ip, requestData);
  }

  // Reset count if the time window has passed (rate limiting reset)
  if (now - requestData.startTime > WINDOW_MS) {
    requestData.count = 0;
    requestData.startTime = now;
  }

  // Increment the request count
  requestData.count += 1;

  // If the count exceeds the limit, blacklist the IP and stop tracking it
  if (requestData.count > MAX_REQUESTS) {
    blockedIps.set(ip, now); // Blacklist the IP with the current timestamp
    rateLimit.delete(ip); // Remove from rateLimit to stop tracking further requests

    return new Response(`Demasiadas peticiones, por favor vuelve a intentarlo en un minuto.`, { status: 429 });
  }

  return NextResponse.next();
}

// Apply the middleware **only** to pages, not assets
export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
