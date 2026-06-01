import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// ===========================================================================
// Input Sanitization — XSS Prevention
// Strips potentially dangerous HTML/script content from user input
// ===========================================================================

const DANGEROUS_TAGS = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const HTML_TAGS = /<\/?[^>]+(>|$)/g;
const EVENT_HANDLERS = /\s*on\w+\s*=\s*"[^"]*"/gi;

/**
 * Sanitizes user input by removing dangerous HTML tags and event handlers.
 * Use this on any content that could originate from user input.
 */
export function sanitizeInput(input: string): string {
    return input
        .replace(DANGEROUS_TAGS, "")
        .replace(EVENT_HANDLERS, "")
        .replace(HTML_TAGS, "")
        .trim();
}

