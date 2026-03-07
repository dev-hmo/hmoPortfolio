"use client";
import React, { useEffect, useState } from "react";
import { animate, motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiNodedotjs,
    SiExpress, SiMongodb, SiMongoose, SiTailwindcss, SiFramer,
    SiJsonwebtokens, SiVercel, SiGit, SiGithub,
    SiPostman, SiFigma, SiLinux, SiNpm
} from "react-icons/si";
import { FaServer, FaLock, FaCloud, FaDesktop } from "react-icons/fa";
import { TbApi, TbBrandThreejs } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

export const getTechIcon = (name: string, className?: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("react") && lower.includes("three")) return <TbBrandThreejs className={className} />;
    if (lower.includes("react")) return <SiReact className={className} />;
    if (lower.includes("next")) return <SiNextdotjs className={className} />;
    if (lower.includes("typescript")) return <SiTypescript className={className} />;
    if (lower.includes("javascript") || lower.includes("es6")) return <SiJavascript className={className} />;
    if (lower.includes("node")) return <SiNodedotjs className={className} />;
    if (lower.includes("express")) return <SiExpress className={className} />;
    if (lower.includes("mongo") && lower.includes("atlas")) return <FaCloud className={className} />;
    if (lower.includes("mongo")) return <SiMongodb className={className} />;
    if (lower.includes("mongoose")) return <SiMongoose className={className} />;
    if (lower.includes("tailwind")) return <SiTailwindcss className={className} />;
    if (lower.includes("framer")) return <SiFramer className={className} />;
    if (lower.includes("jwt") || lower.includes("authentication")) return <FaLock className={className} />;
    if (lower.includes("api")) return <TbApi className={className} />;
    if (lower.includes("cloud")) return <FaCloud className={className} />;
    if (lower.includes("system")) return <FaServer className={className} />;
    if (lower.includes("responsive") || lower.includes("design")) return <FaDesktop className={className} />;
    if (lower.includes("three")) return <TbBrandThreejs className={className} />;
    if (lower.includes("vercel")) return <SiVercel className={className} />;
    if (lower.includes("git")) return <SiGithub className={className} />;
    if (lower.includes("vs code") || lower.includes("visual")) return <VscVscode className={className} />;
    if (lower.includes("postman")) return <SiPostman className={className} />;
    if (lower.includes("figma")) return <SiFigma className={className} />;
    if (lower.includes("linux")) return <SiLinux className={className} />;
    if (lower.includes("npm") || lower.includes("npx")) return <SiNpm className={className} />;
    return <FaServer className={className} />; // Default
};

export const TechCardSkeleton = ({ skillsList = [] }: { skillsList?: string[] }) => {
    const [icons, setIcons] = useState<string[]>([]);

    useEffect(() => {
        if (skillsList && skillsList.length > 0) {
            setIcons([...skillsList]);
        } else {
            setIcons(["React 19", "Next.js 15", "TypeScript", "MongoDB", "Tailwind CSS"]);
        }
    }, [skillsList]);

    useEffect(() => {
        // Rotate the icons array every 1 second
        const interval = setInterval(() => {
            setIcons((prev) => {
                if (prev.length <= 1) return prev;
                const next = [...prev];
                const first = next.shift();
                if (first) next.push(first);
                return next;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [icons.length]);

    const scale = [1, 1.1, 1];
    const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"];
    const sequence = [
        [".tech-circle-1", { scale, transform }, { duration: 0.8 }],
        [".tech-circle-2", { scale, transform }, { duration: 0.8 }],
        [".tech-circle-3", { scale, transform }, { duration: 0.8 }],
    ];

    useEffect(() => {
        // @ts-ignore
        animate(sequence as any, {
            repeat: Infinity,
            repeatDelay: 1,
        } as any);
    }, []);

    const renderIconContent = (index: number, iconClass: string, containerClass: string) => {
        const item = icons[index];
        if (!item) return null;
        return (
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={item}
                    initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                    animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                    className="flex flex-col items-center gap-2"
                >
                    <Container className={cn("shrink-0", containerClass)}>
                        {getTechIcon(item, iconClass)}
                    </Container>
                    <div className="h-4 flex items-start justify-center overflow-visible">
                        <span className="text-[10px] sm:text-xs font-medium text-white/80 whitespace-nowrap text-center mt-1">
                            {item}
                        </span>
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    };

    return (
        <div className="p-4 overflow-hidden h-full w-full relative flex items-center justify-center pointer-events-none mb-4">
            <div className="flex flex-row shrink-0 justify-center items-end gap-3 sm:gap-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] w-full pb-8">
                <div className="flex flex-col items-center">
                    {renderIconContent(0, "h-5 w-5 text-white", "h-12 w-12 tech-circle-1 opacity-60 scale-90 sm:scale-100")}
                </div>
                <div className="flex flex-col items-center z-10">
                    {renderIconContent(1, "h-6 w-6 text-cyan-400", "h-16 w-16 tech-circle-2 bg-[#10132E] border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)] opacity-100 scale-100 sm:scale-110")}
                </div>
                <div className="flex flex-col items-center">
                    {renderIconContent(2, "h-5 w-5 text-white", "h-12 w-12 tech-circle-3 opacity-60 scale-90 sm:scale-100")}
                </div>
            </div>

            <div className="h-40 w-px absolute top-10 m-auto z-40 bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move hidden md:block">
                <div className="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-10">
                    <Sparkles />
                </div>
            </div>
        </div>
    );
};

const Sparkles = () => {
    const randomMove = () => Math.random() * 2 - 1;
    const randomOpacity = () => Math.random();
    const random = () => Math.random();
    return (
        <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
                <motion.span
                    key={`star-${i}`}
                    animate={{
                        top: `calc(${random() * 100}% + ${randomMove()}px)`,
                        left: `calc(${random() * 100}% + ${randomMove()}px)`,
                        opacity: randomOpacity(),
                        scale: [1, 1.2, 0],
                    }}
                    transition={{
                        duration: random() * 2 + 4,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        position: "absolute",
                        width: `2px`,
                        height: `2px`,
                        borderRadius: "50%",
                        zIndex: 1,
                    }}
                    className="inline-block bg-white"
                />
            ))}
        </div>
    );
};

const Container = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div className={cn("rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)] overflow-hidden", className)}>
        {children}
    </div>
);
