import React from "react";
import { cn } from "@/lib/utils";

type MagicButtonProps = {
    title: string;
    icon?: React.ReactNode;
    position?: "left" | "right";
    handleClick?: () => void;
    otherClasses?: string;
};

export const MagicButton = ({
    title,
    icon,
    position = "right",
    handleClick,
    otherClasses,
}: MagicButtonProps) => {
    return (
        <button
            className="relative inline-flex h-12 w-full md:w-60 md:mt-10 overflow-hidden rounded-lg p-[1px] focus:outline-none"
            onClick={handleClick}
        >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

            {/* remove px-3 py-1, add px-7 for padding and font-medium */}
            <span
                className={cn(
                    "inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2",
                    otherClasses
                )}
            >
                {position === "left" && icon}
                {title}
                {position === "right" && icon}
            </span>
        </button>
    );
};
