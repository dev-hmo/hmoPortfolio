"use client";

import { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { motion } from "framer-motion";

export default function Grid() {
    const [gridItems, setGridItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/grid")
            .then(res => res.json())
            .then(data => {
                setGridItems(data);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    if (loading) {
        // Minimal loading placeholder
        return <section id="about" className="py-20 animate-pulse bg-white/5 h-96 rounded-2xl mx-4" />;
    }

    return (
        <section id="about">
            <BentoGrid>
                {gridItems.map((item, index) => (
                    <motion.div
                        key={item._id || index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={item.className}
                    >
                        <BentoGridItem
                            id={item.id || index + 1}
                            title={item.title}
                            description={item.description}
                            className="h-full"
                            img={item.img}
                            imgClassName={item.imgClassName}
                            titleClassName={item.titleClassName}
                            spareImg={item.spareImg}
                        />
                    </motion.div>
                ))}
            </BentoGrid>
        </section>
    );
}
