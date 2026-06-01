"use client";

import dynamic from "next/dynamic";
import React from "react";

const GlobeComponent = dynamic(() => import("./TechGlobe").then((mod) => mod.TechGlobe), {
    ssr: false,
});

export function TechGlobeWrapper() {
    return <GlobeComponent />;
}
