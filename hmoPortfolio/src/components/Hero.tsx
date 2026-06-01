"use client";
import { useState, useEffect } from "react";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { MagicButton } from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa";
import type { SiteSettings } from "@/types";
import { FloatingShapes } from "./ui/FloatingShapes";
import { TypewriterRotation } from "./ui/TypewriterRotation";

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

    const titles = settings.title
        ? settings.title.split(",").map(t => t.trim())
        : ["Full-Stack Developer", "Project Coordinator"];

    return (
        <div className="pb-20 pt-20 relative min-h-screen w-[100vw] left-[calc(-50vw+50%)] overflow-hidden bg-black-100">
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

            <div className="flex justify-center relative mt-10 mb-20 z-20">
                <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[70vw] flex flex-col items-center justify-center text-center">
                    <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80 mb-4 bg-white/5 py-2 px-4 rounded-full border border-white/10 backdrop-blur-sm">
                        Available for new projects
                    </p>

                    <h2 className="text-white text-lg md:text-xl lg:text-2xl font-light mb-2">
                        Hi, I&apos;m <span className="text-cyan-400 font-bold">{settings.name || "Hlaing Min Oo"}</span>
                    </h2>

                    <div className="text-center text-[40px] md:text-6xl lg:text-7xl font-bold text-white leading-tight min-h-[120px] md:min-h-[160px] flex items-center justify-center">
                        <TypewriterRotation
                            words={titles}
                            className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400"
                        />
                    </div>

                    <p className="text-center md:tracking-wider mb-8 mt-4 text-sm md:text-lg lg:text-xl text-blue-100/70 max-w-[40rem] mx-auto italic">
                        {settings.bio || "Building modern, scalable web applications with a focus on user experience and technical excellence."}
                    </p>

                    <a href="#projects">
                        <MagicButton
                            title="Explore My Work"
                            icon={<FaLocationArrow />}
                            position="right"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}
