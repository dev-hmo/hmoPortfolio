/* eslint-disable */
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TypewriterEffect } from "./TypewriterEffect";

export const TypewriterRotation = ({
    words,
    interval = 3000,
    className,
}: {
    words: string[];
    interval?: number;
    className?: string;
}) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (words.length <= 1) return;

        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, interval);

        return () => clearInterval(timer);
    }, [words, interval]);

    const currentWord = words[index] || "";

    return (
        <div className={cn("overflow-hidden py-2", className)}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="flex justify-center"
                >
                    <TypewriterEffect
                        words={currentWord.split(" ").map((word) => ({
                            text: word,
                            className: "text-white",
                        }))}
                        className="text-3xl md:text-5xl lg:text-7xl font-bold"
                        cursorClassName="bg-cyan-400 h-8 md:h-12 lg:h-16 w-1 md:w-2"
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
