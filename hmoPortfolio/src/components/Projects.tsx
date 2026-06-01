"use client";
import { useState, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { motion } from "framer-motion";
import type { Project } from "@/types";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

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

    return (
        <CardContainer className="inter-var group relative overflow-hidden rounded-3xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:-translate-y-1">
            <CardBody className="bg-[#050714]/80 backdrop-blur-2xl relative group/card dark:hover:shadow-2xl border border-white/10 hover:border-cyan-500/50 w-full h-auto rounded-xl p-6">
                {/* Image */}
                <CardItem translateZ="50" className="relative w-full h-[30vh] overflow-hidden rounded-xl mt-4">
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
                </CardItem>

                {/* Content */}
                <div className="mt-8">

                    <CardItem
                        translateZ="50"
                        className="font-bold text-xl lg:text-2xl text-white mb-2 line-clamp-1"
                    >
                        {title}
                    </CardItem>
                    <CardItem
                        as="p"
                        translateZ="60"
                        className="text-sm lg:text-base text-[#bec1dd] font-light line-clamp-2 mb-6"
                    >
                        {description}
                    </CardItem>

                    <div className="flex items-center justify-between">
                        <CardItem
                            translateZ={20}
                            as="a"
                            href={ghLink}
                            target="_blank"
                            className="text-sm lg:text-base text-cyan-500 font-medium hover:underline"
                        >
                            Source Code
                        </CardItem>
                        <CardItem
                            translateZ={20}
                            as="a"
                            href={demoLink}
                            target="_blank"
                            className="flex items-center gap-2 text-sm lg:text-base text-purple font-medium hover:underline"
                        >
                            Check Live Site
                            <FaLocationArrow className="text-xs" color="#CBACF9" />
                        </CardItem>
                    </div>
                </div>
            </CardBody>
        </CardContainer>
    );
}
