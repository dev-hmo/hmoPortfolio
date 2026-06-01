"use client";
import { useState, useEffect } from "react";
import { FaLocationArrow, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MagicButton } from "./ui/MagicButton";
import type { SiteSettings } from "@/types";

export default function Footer() {
    const [settings, setSettings] = useState<SiteSettings | null>(null);

    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then(setSettings)
            .catch(console.error);
    }, []);

    const emailStr = settings?.email ? `mailto:${settings.email}` : "mailto:contact@example.com";

    // Create social media links dynamically from DB settings
    const dynamicSocials = [];
    if (settings?.githubUrl) {
        dynamicSocials.push({ id: 1, icon: <FaGithub size={20} />, link: settings.githubUrl });
    }
    if (settings?.linkedinUrl) {
        dynamicSocials.push({ id: 2, icon: <FaLinkedin size={20} />, link: settings.linkedinUrl });
    }
    if (settings?.twitterUrl) {
        dynamicSocials.push({ id: 3, icon: <FaTwitter size={20} />, link: settings.twitterUrl });
    }

    return (
        <footer className="w-full pt-20 pb-10" id="contact">
            {/* background grid */}
            <div className="w-full absolute left-0 -bottom-72 min-h-96">
                <img
                    src="/footer-grid.svg"
                    alt="grid"
                    className="w-full h-full opacity-50 "
                />
            </div>

            <div className="flex flex-col items-center">
                <h1 className="heading lg:max-w-[45vw] text-center text-3xl md:text-5xl font-bold mb-8 text-white relative z-20">
                    Ready to take <span className="text-cyan-500">your</span> outside
                    digital presence to the next level?
                </h1>
                <p className="text-white-200 md:mt-10 my-5 text-center text-neutral-400 max-w-lg mx-auto leading-relaxed">
                    {settings?.bio || "Reach out to me today and let's discuss how I can help you achieve your goals."}
                </p>
                <a href={emailStr} className="relative z-20">
                    <MagicButton
                        title="Let's get in touch"
                        icon={<FaLocationArrow />}
                        position="right"
                    />
                </a>
            </div>
            <div className="flex mt-16 md:flex-row flex-col justify-between items-center relative z-20">
                <p className="md:text-base text-sm md:font-normal font-light text-neutral-400">
                    Copyright © {new Date().getFullYear()} {settings?.name || "Hlaing Min Oo"}
                </p>

                <div className="flex items-center md:gap-3 gap-6 mt-4 md:mt-0">
                    {dynamicSocials.map((info) => (
                        <a
                            key={info.id}
                            href={info.link}
                            target="_blank"
                            rel="noreferrer"
                            className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300 text-cyan-500 hover:text-white transition-colors"
                        >
                            {info.icon}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
