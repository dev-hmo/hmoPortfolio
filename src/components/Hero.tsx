"use client";
import { useState, useEffect, useCallback } from "react";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { MagicButton } from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import type { SiteSettings } from "@/types";

export default function Hero() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [currentRole, setCurrentRole] = useState(0);
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

    const roles = settings?.title ? settings.title.split(",").map(r => r.trim()).filter(Boolean) : ["Developer"];

    // Rotate roles every 3 seconds
    const startFlipping = useCallback(() => {
        const interval = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % (roles.length || 1));
        }, 3000);
        return () => clearInterval(interval);
    }, [roles.length]);

    useEffect(() => {
        if (roles.length > 1) {
            return startFlipping();
        }
    }, [startFlipping, roles.length]);

    if (!settings) return <div className="h-screen w-full dark:bg-black-100 bg-white" />; // Loading state

    return (
        <div className="pb-20 pt-36 overflow-hidden">
            {/* Spotlights */}
            <div className="pointer-events-none">
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
            <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2] absolute top-0 left-0 flex items-center justify-center">
                {/* Radial gradient for the container to give a faded look */}
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            </div>

            <div className="flex justify-center relative my-20 z-10">
                <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center text-center">
                    <TextGenerateEffect
                        words="Transforming Concepts into Seamless User Experiences"
                        className="text-center text-[40px] md:text-5xl lg:text-6xl"
                    />

                    <div className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl text-white mt-2">
                        <span>Hi! I&apos;m {settings.name || "Hlaing Min Oo"}, a </span>
                        <span className="inline-block relative h-[1.4em] overflow-hidden align-bottom" style={{ minWidth: "280px" }}>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={roles[currentRole]}
                                    className="absolute left-0 right-0 text-cyan-400 font-semibold"
                                    initial={{
                                        opacity: 0,
                                        y: 30,
                                        filter: "blur(8px)",
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        filter: "blur(0px)",
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: -30,
                                        filter: "blur(8px)",
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeInOut",
                                    }}
                                >
                                    {roles[currentRole]}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                    </div>

                    <a href="#projects">
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
