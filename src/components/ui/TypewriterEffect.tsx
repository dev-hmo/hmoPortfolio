"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

export const TypewriterEffectSmooth = ({
    words,
    className,
    cursorClassName,
}: {
    words: {
        text: string;
        className?: string;
    }[];
    className?: string;
    cursorClassName?: string;
}) => {
    const wordsArray = words.map((word) => {
        return {
            ...word,
            text: word.text.split(""),
        };
    });

    const [scope, animate] = useAnimate();
    const isInView = useInView(scope);
    useEffect(() => {
        if (isInView) {
            animate(
                "div.word",
                {
                    opacity: 1,
                },
                {
                    duration: 0.1,
                    delay: stagger(0.1),
                }
            );
            animate(
                "span",
                {
                    opacity: 1,
                },
                {
                    duration: 0.1,
                    delay: stagger(0.01),
                }
            );
        }
    }, [isInView]);

    const renderWords = () => {
        return (
            <motion.div ref={scope} className="inline">
                {wordsArray.map((word, idx) => {
                    return (
                        <motion.div key={`word-${idx}`} className="inline-block word opacity-0">
                            {word.text.map((char, index) => (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    key={`char-${index}`}
                                    className={cn(
                                        `dark:text-white text-black`,
                                        word.className
                                    )}
                                >
                                    {char}
                                </motion.span>
                            ))}
                            &nbsp;
                        </motion.div>
                    );
                })}
            </motion.div>
        );
    };
    return (
        <div
            className={cn(
                "flex flex-wrap gap-1 justify-center items-center font-normal",
                className
            )}
        >
            {renderWords()}
            <motion.span
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className={cn(
                    "block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
                    cursorClassName
                )}
            ></motion.span>
        </div>
    );
};
