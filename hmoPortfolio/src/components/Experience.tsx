"use client";

import workExperience from "../../data/experience.json";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { ExperienceItem } from "@/types";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

export default function Experience() {
    const [experienceData, setExperienceData] = useState<ExperienceItem[]>([]);

    useEffect(() => {
        fetch("/api/experience")
            .then(res => res.json())
            .then(setExperienceData)
            .catch(console.error);
    }, []);

    return (
        <div className="py-20 w-full" id="experience">
            <h1 className="heading text-center text-3xl md:text-5xl font-bold mb-4 text-neutral-200">
                My <span className="text-cyan-500">Experience & Education</span>
            </h1>
            <p className="text-center text-neutral-400 mb-16 text-sm md:text-base max-w-xl mx-auto">
                A timeline of my professional and academic journey
            </p>

            <div className="relative max-w-4xl mx-auto px-4">
                {/* Vertical line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/50 via-cyan-500/20 to-transparent md:-translate-x-[1px]" />

                {experienceData.map((item, index) => {
                    const isLeft = index % 2 === 0;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className={`relative flex items-start mb-12 md:mb-16 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                                }`}
                        >
                            {/* Timeline dot */}
                            <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-cyan-500 border-4 border-black-100 z-10 -translate-x-1/2 mt-1 shadow-[0_0_12px_rgba(6,182,212,0.6)]" />

                            {/* Card */}
                            <div
                                className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                                    }`}
                            >
                                {/* Date badge */}
                                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
                                    {item.date}
                                </span>

                                <CardContainer className="inter-var group relative w-full">
                                    <CardBody
                                        className="p-6 w-full rounded-2xl transition-all duration-500 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_-5px_rgba(6,182,212,0.4)] border border-white/10 hover:border-cyan-500/50 bg-[#050714]/80 backdrop-blur-2xl"
                                    >
                                        <CardItem translateZ="50" className="w-full">
                                            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                                                {item.title}
                                            </h3>
                                            <p className="text-cyan-400 text-sm font-medium mb-3">
                                                {item.company}
                                            </p>
                                            <p className="text-neutral-400 text-sm leading-relaxed font-light">
                                                {item.description}
                                            </p>
                                        </CardItem>
                                    </CardBody>
                                </CardContainer>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
