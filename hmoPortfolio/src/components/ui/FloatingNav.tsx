/* eslint-disable */
"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const FloatingNav = ({
    navItems,
    className,
}: {
    navItems: {
        name: string;
        link: string;
        icon?: React.ReactNode;
    }[];
    className?: string;
}) => {
    // The dock will always be visible, floating gracefully at the top
    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={cn(
                    "flex max-w-fit fixed z-[5000] top-6 inset-x-0 mx-auto px-6 py-3 rounded-full border border-white/10 bg-[#0a0a1a]/60 backdrop-blur-xl items-center justify-center space-x-2 md:space-x-6 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]",
                    className
                )}
            >
                {navItems.map((navItem: any, idx: number) => (
                    <Link
                        key={`link=${idx}`}
                        href={navItem.link}
                        className={cn(
                            "relative flex items-center space-x-2 text-neutral-300 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:text-white hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                        )}
                    >
                        <span className="block sm:hidden">{navItem.icon}</span>
                        <span className="cursor-pointer">{navItem.name}</span>
                    </Link>
                ))}
            </motion.div>
        </AnimatePresence>
    );
};
