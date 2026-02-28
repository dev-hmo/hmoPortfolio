"use client";
import React, { useState, useEffect } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { motion } from "framer-motion";
import type { Testimonial } from "@/types";

export function Endorsements() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        fetch("/api/testimonials")
            .then(res => res.json())
            .then(setTestimonials)
            .catch(console.error);
    }, []);

    return (
        <div className="h-[40rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden w-full py-20 pb-40">
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-bold mb-10 text-white z-20"
            >
                Client & Peer <span className="text-cyan-500">Endorsements</span>
            </motion.h2>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="w-full"
            >
                {testimonials.length > 0 && (
                    <InfiniteMovingCards
                        items={testimonials}
                        direction="right"
                        speed="slow"
                    />
                )}
            </motion.div>
        </div>
    );
}
