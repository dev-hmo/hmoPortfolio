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
    // Use the provided className for sizing/margins, but inject specific brand colors via style
    if (lower.includes("react") && lower.includes("three")) return <TbBrandThreejs className={className} style={{ color: "#000000" }} />;
    if (lower.includes("react")) return <SiReact className={className} style={{ color: "#61DAFB" }} />;
    if (lower.includes("next")) return <SiNextdotjs className={className} style={{ color: "#ffffff" }} />;
    if (lower.includes("typescript")) return <SiTypescript className={className} style={{ color: "#3178C6" }} />;
    if (lower.includes("javascript") || lower.includes("es6")) return <SiJavascript className={className} style={{ color: "#F7DF1E" }} />;
    if (lower.includes("node")) return <SiNodedotjs className={className} style={{ color: "#339933" }} />;
    if (lower.includes("express")) return <SiExpress className={className} style={{ color: "#ffffff" }} />;
    if (lower.includes("mongo") && lower.includes("atlas")) return <FaCloud className={className} style={{ color: "#47A248" }} />;
    if (lower.includes("mongo")) return <SiMongodb className={className} style={{ color: "#47A248" }} />;
    if (lower.includes("mongoose")) return <SiMongoose className={className} style={{ color: "#880000" }} />;
    if (lower.includes("tailwind")) return <SiTailwindcss className={className} style={{ color: "#06B6D4" }} />;
    if (lower.includes("framer")) return <SiFramer className={className} style={{ color: "#0055FF" }} />;
    if (lower.includes("jwt") || lower.includes("authentication")) return <FaLock className={className} style={{ color: "#FF0000" }} />;
    if (lower.includes("api")) return <TbApi className={className} style={{ color: "#00E676" }} />;
    if (lower.includes("cloud")) return <FaCloud className={className} style={{ color: "#00B4AB" }} />;
    if (lower.includes("system")) return <FaServer className={className} style={{ color: "#888888" }} />;
    if (lower.includes("responsive") || lower.includes("design")) return <FaDesktop className={className} style={{ color: "#4285F4" }} />;
    if (lower.includes("three")) return <TbBrandThreejs className={className} style={{ color: "#000000" }} />;
    if (lower.includes("vercel")) return <SiVercel className={className} style={{ color: "#ffffff" }} />;
    if (lower.includes("git") && !lower.includes("github")) return <SiGit className={className} style={{ color: "#F05032" }} />;
    if (lower.includes("github")) return <SiGithub className={className} style={{ color: "#ffffff" }} />;
    if (lower.includes("vs code") || lower.includes("visual")) return <VscVscode className={className} style={{ color: "#007ACC" }} />;
    if (lower.includes("postman")) return <SiPostman className={className} style={{ color: "#FF6C37" }} />;
    if (lower.includes("figma")) return <SiFigma className={className} style={{ color: "#F24E1E" }} />;
    if (lower.includes("linux")) return <SiLinux className={className} style={{ color: "#FCC624" }} />;
    if (lower.includes("npm") || lower.includes("npx")) return <SiNpm className={className} style={{ color: "#CB3837" }} />;
    return <FaServer className={className} style={{ color: "#a1a1aa" }} />; // Default gray
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
            {getTechIcon(item, "h-4 w-4 sm:h-5 sm:w-5")}
            <span className="text-xs sm:text-sm font-medium text-white whitespace-nowrap">
                {item}
            </span>
        </div>
    );
};
