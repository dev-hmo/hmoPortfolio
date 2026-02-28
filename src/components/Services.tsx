"use client";

import { useState, useEffect } from "react";
import { HoverEffectCard } from "./ui/hover-card";
import { Code, Database, LayoutTemplate, Zap } from "lucide-react";
import { motion } from "framer-motion";
import type { ServiceItem } from "@/types";

export default function Services() {
    const [servicesData, setServicesData] = useState<ServiceItem[]>([]);

    useEffect(() => {
        fetch("/api/services")
            .then(res => res.json())
            .then(setServicesData)
            .catch(console.error);
    }, []);

    return (
        <section id="services" className="py-20 w-full">
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="heading text-center text-3xl md:text-5xl font-bold mb-16 text-neutral-200"
            >
                My <span className="text-cyan-500">Expertise</span>
            </motion.h1>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {servicesData.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                        <HoverEffectCard
                            className="flex flex-col h-full bg-[#04071d] border-white/10"
                        >
                            <div className="mb-4">
                                {item.icon === "Code" ? (
                                    <Code className="h-8 w-8 text-cyan-500" />
                                ) : item.icon === "Database" ? (
                                    <Database className="h-8 w-8 text-cyan-500" />
                                ) : item.icon === "LayoutTemplate" ? (
                                    <LayoutTemplate className="h-8 w-8 text-cyan-500" />
                                ) : (
                                    <Zap className="h-8 w-8 text-cyan-500" />
                                )}
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-white">{item.title}</h3>
                            <p className="text-sm text-neutral-400 leading-relaxed font-light">
                                {item.description}
                            </p>
                        </HoverEffectCard>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
