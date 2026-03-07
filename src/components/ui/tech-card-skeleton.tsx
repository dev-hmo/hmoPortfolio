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
    // Determine the items to show
    const items = skillsList && skillsList.length > 0
        ? skillsList
        : ["React 19", "Next.js 15", "TypeScript", "MongoDB", "Tailwind CSS", "Figma", "Node.js", "Express.js"];

    // Split items into 3 rows for a dense, visually impressive wall
    const row1 = items.slice(0, Math.ceil(items.length / 3));
    const row2 = items.slice(Math.ceil(items.length / 3), Math.ceil((items.length / 3) * 2));
    const row3 = items.slice(Math.ceil((items.length / 3) * 2));

    return (
        <div className="h-full w-full relative flex flex-col items-center justify-center pointer-events-none mb-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] gap-4 py-4">
            {/* Row 1 - Left to Right */}
            <div className="flex w-max shrink-0 gap-4 animate-scroll hover:[animation-play-state:paused]" style={{ "--animation-duration": "30s", "--animation-direction": "forwards" } as any}>
                {[...row1, ...row1, ...row1].map((item, idx) => (
                    <TechPill key={`r1-${idx}`} item={item} />
                ))}
            </div>

            {/* Row 2 - Right to Left, Faster */}
            <div className="flex w-max shrink-0 gap-4 animate-scroll hover:[animation-play-state:paused]" style={{ "--animation-duration": "25s", "--animation-direction": "reverse" } as any}>
                {[...row2, ...row2, ...row2].map((item, idx) => (
                    <TechPill key={`r2-${idx}`} item={item} />
                ))}
            </div>

            {/* Row 3 - Left to Right, Slower */}
            <div className="flex w-max shrink-0 gap-4 animate-scroll hover:[animation-play-state:paused]" style={{ "--animation-duration": "35s", "--animation-direction": "forwards" } as any}>
                {[...row3, ...row3, ...row3].map((item, idx) => (
                    <TechPill key={`r3-${idx}`} item={item} />
                ))}
            </div>
            
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.3)_0%,transparent_70%)]" />
        </div>
    );
};

const TechPill = ({ item }: { item: string }) => {
    return (
        <div className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#10132E]/80 border border-cyan-500/20 shadow-[0px_0px_8px_0px_rgba(248,248,248,0.1)_inset,0px_4px_12px_rgba(0,0,0,0.5)] backdrop-blur-sm relative z-20">
            {getTechIcon(item, "h-4 w-4 sm:h-5 sm:w-5 text-cyan-400")}
            <span className="text-xs sm:text-sm font-medium text-white whitespace-nowrap">
                {item}
            </span>
        </div>
    );
};
