"use client";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import gridData from "../../data/grid.json";

export default function Grid() {
    return (
        <section id="about">
            <BentoGrid className="w-full py-20 px-4 md:px-8 max-w-7xl">
                {gridData.map((item: any, i: number) => (
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
