"use client";

import gridItems from "../../data/grid.json";
import { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

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
            <BentoGrid className="w-full py-20 px-4 md:px-8 max-w-7xl">
                {gridItems.map((item, i) => (
                    <BentoGridItem
                        key={item._id || item.id || i}
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        className={item.className}
                        img={item.img}
                        imgClassName={item.imgClassName}
                        titleClassName={item.titleClassName}
                        spareImg={item.spareImg}
                    />
                ))}
            </BentoGrid>
        </section>
    );
}
