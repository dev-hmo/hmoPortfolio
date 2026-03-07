"use client";

import { useState, useEffect, useRef } from "react";
import { HoverEffectCard } from "./ui/hover-card";
import { Code, Database, LayoutTemplate, Zap } from "lucide-react";
import type { ServiceItem } from "@/types";
import { animate, stagger } from "animejs";
import { useInView } from "framer-motion";

export default function Services() {
    const [servicesData, setServicesData] = useState<ServiceItem[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-50px" });

    useEffect(() => {
        fetch("/api/services")
            .then(res => res.json())
            .then(setServicesData)
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (isInView && servicesData.length > 0) {
            animate(".service-card", {
                translateY: [100, 0],
                opacity: [0, 1],
                scale: [0.9, 1],
                delay: stagger(150),
                ease: "outElastic(1, .8)",
                duration: 1200,
            });
        }
    }, [isInView, servicesData]);

    return (
        <section id="services" className="py-20 w-full" ref={containerRef}>
            <h1 className="heading text-center text-3xl md:text-5xl font-bold mb-16 text-neutral-200">
                My <span className="text-cyan-500">Expertise</span>
            </h1>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {servicesData.map((item, i) => (
                    <div
                        key={i}
                        className="service-card opacity-0"
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
                    </div>
                ))}
            </div>
        </section>
    );
}
