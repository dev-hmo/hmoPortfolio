"use client";

import React, { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

export function GithubActivity() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const selectLastHalfYear = (contributions: any[]) => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        const shownMonths = 6;

        return contributions.filter((activity: any) => {
            const date = new Date(activity.date);
            const monthOfDay = date.getMonth();

            return (
                date.getFullYear() === currentYear &&
                monthOfDay > currentMonth - shownMonths &&
                monthOfDay <= currentMonth
            );
        });
    };

    return (
        <section className="w-full py-20" id="activity">
            <h1 className="heading text-center text-3xl md:text-5xl font-bold mb-4 text-neutral-200">
                Live <span className="text-cyan-500">Activity</span>
            </h1>
            <p className="text-center text-neutral-400 mb-12 text-sm md:text-base max-w-xl mx-auto">
                My GitHub contributions from the last 6 months
            </p>

            <div className="flex justify-center w-full px-4">
                <div
                    className="w-full max-w-4xl p-6 md:p-10 rounded-3xl overflow-x-auto flex items-center justify-center min-h-[180px]"
                    style={{
                        background: "rgb(4,7,29)",
                        backgroundImage:
                            "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        boxShadow: "0 0 40px rgba(6,182,212,0.05)",
                    }}
                >
                    {mounted ? (
                        <GitHubCalendar
                            username="dev-hmo"
                            transformData={selectLastHalfYear}
                            colorScheme="dark"
                            theme={{
                                dark: ["#171717", "#0e7490", "#06b6d4", "#22d3ee", "#67e8f9"],
                            }}
                            style={{
                                color: "#a3a3a3",
                            }}
                        />
                    ) : (
                        <p className="text-neutral-500 text-sm">Loading activity...</p>
                    )}
                </div>
            </div>
        </section>
    );
}
