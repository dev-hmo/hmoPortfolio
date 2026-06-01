/* eslint-disable */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// In-memory rate limit store (Note: In a serverless/multi-instance environment, 
// a distributed store like Redis is preferred, but for a personal portfolio,
// this provides a robust first line of defense.)
const ipRequests = new Map<string, { count: number; lastReset: number }>();

const ADMIN_SECRET_PATH = process.env.ADMIN_SECRET_PATH || "admin-vault-entry";
const SHIELD_COOKIE = "hmo_access_shield";

const LIMITS = {
    AUTH: { window: 15 * 60 * 1000, max: 10 },
    API: { window: 60 * 1000, max: 60 },
    GLOBAL: { window: 60 * 1000, max: 200 },
};

export function middleware(request: NextRequest) {
    let ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for") || "127.0.0.1";
    if (ip.includes(",")) ip = ip.split(",")[0].trim();
    
    const now = Date.now();
    const url = request.nextUrl;
    const path = url.pathname;
    const method = request.method;

    // Skip static assets
    if (path.startsWith("/_next") || path.startsWith("/static") || path.includes(".")) {
        return NextResponse.next();
    }

    // 🛡️ Access Gateway: Admin dashboard removed. Block any attempt to mutate data.
    const isSensitiveApi = path.startsWith("/api") && ["POST", "PUT", "DELETE", "PATCH"].includes(method);

    // Block any attempt to mutate data
    if (isSensitiveApi) {
        return new NextResponse(JSON.stringify({ error: "API mutations are disabled (Admin dashboard removed)" }), { 
            status: 403,
            headers: { "Content-Type": "application/json" }
        });
    }

    // 📈 Layer 3: Rate Limiting
    let type: keyof typeof LIMITS = "GLOBAL";
    if (path.startsWith("/api/auth/login")) type = "AUTH";
    else if (path.startsWith("/api")) type = "API";

    const limit = LIMITS[type];
    const key = `${ip}:${type}`;
    
    const record = ipRequests.get(key) || { count: 0, lastReset: now };

    if (now - record.lastReset > limit.window) {
        record.count = 0;
        record.lastReset = now;
    }

    record.count++;
    ipRequests.set(key, record);

    if (record.count > limit.max) {
        return new NextResponse(
            JSON.stringify({ 
                error: "Too many requests. Please try again later.",
                retryAfter: Math.ceil((record.lastReset + limit.window - now) / 1000)
            }),
            { 
                status: 429, 
                headers: { 
                    "Content-Type": "application/json",
                    "Retry-After": Math.ceil((record.lastReset + limit.window - now) / 1000).toString()
                } 
            }
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api/auth/verify (don't limit session checks too strictly)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api/auth/verify|_next/static|_next/image|favicon.ico).*)",
    ],
};
