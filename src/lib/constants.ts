// ===========================================================================
// Application Constants
// All magic strings, URLs, and configuration values are centralized here
// ===========================================================================

/** Site metadata */
export const SITE_CONFIG = {
    name: "Hlaing Min Oo",
    title: "Hlaing Min Oo | Full-Stack Developer & Project Coordinator",
    description:
        "Portfolio of Hlaing Min Oo — a Full-Stack Developer specializing in the MERN stack (MongoDB, Express, React, Node.js) and modern web technologies.",
    email: "hlaingminoo785@gmail.com",
    githubUsername: "dev-hmo",
    githubUrl: "https://github.com/dev-hmo",
} as const;

/** External URLs */
export const EXTERNAL_LINKS = {
    github: "https://github.com/dev-hmo",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com/in/hlaing-min-oo-656369240",
} as const;

/** Animation configuration */
export const ANIMATION_CONFIG = {
    /** Default scroll-triggered animation variants */
    fadeInUp: {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" as const },
        transition: { duration: 0.5 },
    },
    /** Stagger delay per item (seconds) */
    staggerDelay: 0.1,
    /** GitHub calendar months to show */
    githubCalendarMonths: 6,
} as const;

/** Tech stack lists for the bento grid */
export const TECH_STACK = {
    left: ["JavaScript", "MongoDB", "Node.js"],
    right: ["React.js", "Express", "TailwindCSS"],
} as const;

/** Security-related constants */
export const SECURITY = {
    /** Content Security Policy directives */
    cspDirectives: [
        "default-src 'self'",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "img-src 'self' data: blob: https: http:",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' https://api.github.com https://github-contributions-api.jogruber.de https://*.vercel-insights.com",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
    ],
    /** HSTS max-age in seconds (2 years) */
    hstsMaxAge: 63072000,
} as const;
