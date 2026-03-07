"use client";
import { useState, useEffect } from "react";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { MagicButton } from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa";
import type { SiteSettings } from "@/types";
import { FloatingShapes } from "./ui/FloatingShapes";
import { TypewriterEffectSmooth } from "./ui/TypewriterEffect";

export default function Hero() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [settings, setSettings] = useState<SiteSettings | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        fetch("/api/settings")
            .then(res => res.json())
            .then(setSettings)
            .catch(console.error);
    }, []);

    if (!settings) return <div className="h-screen w-full dark:bg-black-100 bg-white" />; // Loading state

    const typewriterWords = [
        { text: "Hi!" },
        { text: "I'm" },
        { text: `${settings.name || "Hlaing Min Oo"},` },
        { text: "a" },
        { text: settings.title || "Developer", className: "text-cyan-400 font-semibold" },
        { text: "based" },
        { text: "in" },
        { text: `${settings.location || "Myanmar"}.` },
    ];

    return (
        <div className="pb-20 pt-36 relative min-h-screen w-[100vw] left-[calc(-50vw+50%)] overflow-hidden bg-black-100">
            {/* Spotlights */}
            <div className="pointer-events-none absolute inset-0 z-10">
                <Spotlight
                    className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
                    fill="white"
                />
                <Spotlight
                    className="h-[80vh] w-[50vw] top-10 left-full"
                    fill="purple"
                />
                <Spotlight
                    className="left-80 top-28 h-[80vh] w-[50vw]"
                    fill="blue"
                />
                {/* Mouse follow spotlight */}
                <div
                    className="absolute z-[1] transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
                        inset: 0,
                    }}
                />
            </div>

            {/* Grid Pattern Background */}
            <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2] absolute top-0 left-0 flex items-center justify-center z-0">
                {/* Radial gradient for the container to give a faded look */}
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            </div>

            {/* 3D Floating Shapes Background */}
            <FloatingShapes />

            <div className="flex justify-center relative my-20 z-20">
                <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center text-center">
                    <TextGenerateEffect
                        words="Transforming Concepts into Seamless User Experiences"
                        className="text-center text-[40px] md:text-5xl lg:text-6xl"
                    />

                    <div className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl text-white mt-2 flex justify-center">
                        <TypewriterEffectSmooth words={typewriterWords} />
                    </div>

                    <a href="#projects" className="mt-4">
                        <MagicButton
                            title="Show my work"
                            icon={<FaLocationArrow />}
                            position="right"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}
