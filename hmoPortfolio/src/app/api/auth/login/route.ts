import { NextResponse } from "next/server";
import { verifyPassword, createToken, getTokenCookieOptions } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const { password } = await request.json();

        if (!password) {
            return NextResponse.json(
                { error: "Password is required" },
                { status: 400 }
            );
        }

        const isValid = await verifyPassword(password);

        if (!isValid) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const token = createToken();
        const cookieOptions = getTokenCookieOptions();

        const response = NextResponse.json({ success: true, message: "Logged in" });
        response.cookies.set(cookieOptions.name, token, {
            httpOnly: cookieOptions.httpOnly,
            secure: cookieOptions.secure,
            sameSite: cookieOptions.sameSite,
            path: cookieOptions.path,
            maxAge: cookieOptions.maxAge,
        });

        return response;
    } catch (err) {
        console.error("Login API Error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
