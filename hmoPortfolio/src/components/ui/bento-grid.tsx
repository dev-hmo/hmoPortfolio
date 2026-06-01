/* eslint-disable */
"use client";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "./canvas-reveal-effect";

// We don't have Lottie installed yet, but we will use MagicButton directly
import { MagicButton } from "./MagicButton";
import { TechCardSkeleton, getTechIcon } from "./tech-card-skeleton";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                // remove max-w-7xl mx-auto
                "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    id,
    title,
    description,
    img,
    imgClassName,
    titleClassName,
    spareImg,
}: {
    className?: string;
    id: number;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    img?: string;
    imgClassName?: string;
    titleClassName?: string;
    spareImg?: string;
}) => {
    const [copied, setCopied] = useState(false);
    const [email, setEmail] = useState("hlaingminoo785@gmail.com");
    const [skillsList, setSkillsList] = useState<string[]>(["React 19", "Next.js 15", "TypeScript"]);

    useEffect(() => {
        if (id === 6) {
            fetch("/api/settings")
                .then(res => res.json())
                .then(data => { if (data?.email) setEmail(data.email); })
                .catch(() => { });
        }
        if (id === 3) {
            fetch("/api/skills")
                .then(res => res.json())
                .then(data => {
                    const allSkills = [];
                    if (data?.skills) allSkills.push(...data.skills);
                    if (data?.tools) allSkills.push(...data.tools);
                    if (allSkills.length > 0) {
                        setSkillsList(allSkills);
                    }
                })
                .catch(() => { });
        }
    }, [id]);

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div
            className={cn(
                "row-span-1 relative overflow-hidden rounded-3xl group/bento transition-all duration-500 hover:-translate-y-1 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_-5px_rgba(6,182,212,0.4)] border border-white/10 hover:border-cyan-500/50 bg-[#050714]/80 backdrop-blur-2xl justify-between flex flex-col space-y-4",
                className
            )}
        >
            <div className={`${id === 6 && "flex justify-center"} h-full`}>
                <div className="w-full h-full absolute">
                    {img && (
                        <img
                            src={img}
                            alt={img}
                            className={cn(imgClassName, "object-cover object-center ")}
                        />
                    )}
                </div>
                <div
                    className={`absolute right-0 -bottom-5 ${id === 5 && "w-full opacity-80"
                        } `}
                >
                    {spareImg && (
                        <img
                            src={spareImg}
                            alt={spareImg}
                            className={"object-cover object-center w-full h-full"}
                        />
                    )}
                </div>

                <div
                    className={cn(
                        titleClassName,
                        "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col p-6 lg:p-12"
                    )}
                >
                    {id === 6 && (
                        <AnimatePresence>
                            <div className="absolute inset-0 h-full w-full">
                                <CanvasRevealEffect
                                    animationSpeed={3}
                                    containerClassName="bg-transparent"
                                    colors={[
                                        [59, 130, 246],
                                        [139, 92, 246],
                                    ]}
                                    dotSize={2}
                                />
                            </div>
                        </AnimatePresence>
                    )}
                    <div className="font-sans font-extralight text-[#c1c2d3] text-sm md:text-xs lg:text-base z-10 select-none">
                        {description}
                    </div>
                    <div
                        className={`font-sans text-xl lg:text-3xl max-w-lg font-bold z-10 select-none tracking-wide leading-snug ${id === 6 ? "!text-center mx-auto" : ""}`}
                        style={{ color: "#fff" }}
                    >
                        {title}
                    </div>

                    {/* Tech stack list */}
                    {id === 3 && (
                        <div className="flex flex-col gap-4 mt-4 h-full w-full relative z-50 overflow-hidden items-center justify-center">
                            <TechCardSkeleton skillsList={skillsList.length > 0 ? skillsList : undefined} />
                        </div>
                    )}

                    {id === 6 && (
                        <div className="mt-5 relative z-50">
                            <MagicButton
                                title={copied ? "Email Copy!" : "Copy my email"}
                                icon={<IoCopyOutline />}
                                position="left"
                                handleClick={handleCopy}
                                otherClasses="!bg-[#161A31]"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
