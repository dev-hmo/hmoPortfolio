import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_USERNAME = "admin";
const COOKIE_NAME = "admin_token";

export async function verifyPassword(password: string): Promise<boolean> {
    // If ADMIN_PASSWORD starts with $2a$ or $2b$, it's already hashed
    if (ADMIN_PASSWORD.startsWith("$2")) {
        return bcrypt.compare(password, ADMIN_PASSWORD);
    }
    // Otherwise, compare plain text (for development)
    return password === ADMIN_PASSWORD;
}

export function createToken(): string {
    return jwt.sign({ username: ADMIN_USERNAME, role: "admin" }, JWT_SECRET, {
        expiresIn: "7d",
    });
}

export function verifyToken(token: string): { username: string; role: string } | null {
    try {
        return jwt.verify(token, JWT_SECRET) as { username: string; role: string };
    } catch {
        return null;
    }
}

export async function getSession(): Promise<{ username: string; role: string } | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
}

export function getTokenCookieOptions() {
    return {
        name: COOKIE_NAME,
        httpOnly: true,
        secure: true, // Always secure in production/deployments
        sameSite: "strict" as const, // Hardened from 'lax'
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    };
}
