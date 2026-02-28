"use client";

import React, { useEffect, useRef, useState } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";

export function TechGlobe() {
    const globeEl = useRef<GlobeMethods | undefined>(undefined);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (globeEl.current) {
            // @ts-ignore
            globeEl.current.controls().autoRotate = true;
            // @ts-ignore
            globeEl.current.controls().autoRotateSpeed = 1.5;
        }
    }, [globeEl.current]);

    const N = 20;
    const arcsData = [...Array(N).keys()].map(() => ({
        startLat: (Math.random() - 0.5) * 180,
        startLng: (Math.random() - 0.5) * 360,
        endLat: (Math.random() - 0.5) * 180,
        endLng: (Math.random() - 0.5) * 360,
        color: ['#06b6d4', '#3b82f6', '#8b5cf6'][Math.round(Math.random() * 2)]
    }));

    if (!mounted) return <div className="h-[600px] w-full bg-black"></div>;

    return (
        <div className="flex flex-col items-center justify-center py-20 bg-black relative border-t border-neutral-900 w-full overflow-hidden">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white z-20 text-center">
                Global <span className="text-cyan-500">Reach</span>
            </h2>
            <p className="text-neutral-400 max-w-lg text-center mb-10 z-20">
                Deployed applications accessed from across the world.
            </p>

            <div className="relative w-full max-w-[800px] h-[600px] flex items-center justify-center cursor-move z-10 opacity-80 mix-blend-screen">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,black_70%)] z-20 pointer-events-none" />
                <Globe
                    ref={globeEl}
                    width={800}
                    height={600}
                    backgroundColor="rgba(0,0,0,0)"
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                    arcsData={arcsData}
                    arcColor="color"
                    arcDashLength={() => Math.random()}
                    arcDashGap={() => Math.random()}
                    arcDashAnimateTime={() => Math.random() * 4000 + 500}
                />
            </div>
        </div>
    );
}
