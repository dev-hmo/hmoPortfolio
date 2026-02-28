"use client";
import { useState, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { motion } from "framer-motion";
import type { Project } from "@/types";

export default function Projects() {
    const [showCaseData, setShowCaseData] = useState<Project[]>([]);

    useEffect(() => {
        fetch("/api/projects")
            .then(res => res.json())
            .then(setShowCaseData)
            .catch(console.error);
    }, []);

    return (
        <div className="py-20" id="projects">
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="heading text-center text-3xl md:text-5xl font-bold mb-4 text-neutral-200"
            >
                A small selection of{" "}
                <span className="text-cyan-500">recent projects</span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center text-neutral-400 mb-12 text-sm md:text-base max-w-xl mx-auto"
            >
                Hover over a project to explore
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-4">
                {showCaseData.map((project, index) => (
                    <ProjectCard key={project._id || index} project={project} index={index} />
                ))}
            </div>
        </div>
    );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const { title, description, image, ghLink, demoLink } = project;
    // Tilt logic
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        setTilt({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

    return (
        <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ rotateX: tilt.x, rotateY: tilt.y }}
            className="group relative overflow-hidden rounded-3xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] hover:-translate-y-1 perspective-1000"
            style={{
                background: "rgb(4,7,29)",
                backgroundImage:
                    "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
                transformStyle: "preserve-3d",
            }}
        >
            {/* Image */}
            <div className="relative w-full h-[30vh] overflow-hidden">
                <div className="absolute inset-0 bg-[#13162d]">
                    <img
                        src="/bg.png"
                        alt="bg"
                        className="object-cover w-full h-full opacity-50"
                    />
                </div>
                <img
                    src={image}
                    alt={title}
                    className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#04071d] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="p-6 lg:p-8">
                <h2 className="font-bold text-xl lg:text-2xl text-white mb-2 line-clamp-1">
                    {title}
                </h2>
                <p className="text-sm lg:text-base text-[#bec1dd] font-light line-clamp-2 mb-6">
                    {description}
                </p>

                <div className="flex items-center justify-between">
                    <a
                        href={ghLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm lg:text-base text-cyan-500 font-medium hover:underline"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Source Code
                    </a>
                    <a
                        href={demoLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm lg:text-base text-purple font-medium hover:underline"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Check Live Site
                        <FaLocationArrow className="text-xs" color="#CBACF9" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
