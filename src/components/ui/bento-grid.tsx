"use client";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "./canvas-reveal-effect";

// We don't have Lottie installed yet, but we will use MagicButton directly
import { MagicButton } from "./MagicButton";

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
                "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
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
    const [leftLists, setLeftLists] = useState(["JavaScript", "MongoDB", "Node.js"]);
    const [rightLists, setRightLists] = useState(["React.js", "Express", "TailwindCSS"]);

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
                    if (data?.skills && data.skills.length > 0) {
                        const all = data.skills.slice(0, 6); // Take first 6 for clean grid
                        setLeftLists(all.slice(0, 3));
                        setRightLists(all.slice(3, 6));
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
                "row-span-1 relative overflow-hidden rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none bg-white border border-white/[0.1] justify-between flex flex-col space-y-4",
                className
            )}
            style={{
                background: "rgb(4,7,29)",
                backgroundColor:
                    "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
            }}
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
                        "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
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
                        className={`font-sans text-lg lg:text-3xl max-w-96 font-bold z-10 select-none ${id === 6 ? "!text-center mx-auto" : ""}`}
                        style={{ color: "#fff" }}
                    >
                        {title}
                    </div>

                    {/* Tech stack list */}
                    {id === 3 && (
                        <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2 -top-3">
                            <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                                {leftLists.map((item, i) => (
                                    <span
                                        key={i}
                                        className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                                    >
                                        {item}
                                    </span>
                                ))}
                                <span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]"></span>
                            </div>
                            <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                                <span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]"></span>
                                {rightLists.map((item, i) => (
                                    <span
                                        key={i}
                                        className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
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
