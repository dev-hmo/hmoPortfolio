"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export const ScrollEffectWrapper = ({ children }: { children: React.ReactNode }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Translate Y: Starts lower, goes to 0 at center, goes up as it leaves
    const translateY = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [150, 0, 0, -150]);

    // Opacity: Fades in, stays solid in middle, fades out
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // 3D Rotation X: Starts tilted backward, straightens out
    const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [30, 0, 0, -30]);

    // Scale: Starts smaller, scales up to 100%
    const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.8, 1, 1, 0.9]);

    return (
        <div ref={containerRef} className="will-change-transform" style={{ perspective: "1200px" }}>
            <motion.div
                style={{
                    translateY,
                    opacity,
                    rotateX,
                    scale,
                    transformStyle: "preserve-3d",
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};
