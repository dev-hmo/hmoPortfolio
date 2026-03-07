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

    // 🕵️ Layer 1: Stealth Entry Point
    // If user hits the secret path (e.g., /my-vault), grant them a temporary shield cookie and send to login
    if (path === `/${ADMIN_SECRET_PATH}`) {
        const response = NextResponse.redirect(new URL("/admin", request.url));
        response.cookies.set(SHIELD_COOKIE, "shield-active", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 4, // 4 hours of access
            path: "/",
        });
        return response;
    }

    // 🛡️ Layer 2: Access Gateway (The Proxy Shield)
    const isAdminRoute = path.startsWith("/admin");
    const isSensitiveApi = path.startsWith("/api") && ["POST", "PUT", "DELETE", "PATCH"].includes(method);
    const hasShield = request.cookies.get(SHIELD_COOKIE)?.value === "shield-active";

    // Block any attempt to reach admin routes or mutate data without the shield cookie
    if ((isAdminRoute || isSensitiveApi) && !hasShield) {
        // Return 404 to make the system look like it doesn't exist (Honeypot)
        return new NextResponse(null, { status: 404 });
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
