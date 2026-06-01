/* eslint-disable */
"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Stars } from "@react-three/drei";
import * as THREE from "three";

function GalacticBackground() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.05;
            groupRef.current.rotation.x += delta * 0.02;
        }
    });

    return (
        <group ref={groupRef}>
            <Stars
                radius={50}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={1}
            />
            <Sparkles
                count={200}
                scale={12}
                size={4}
                speed={0.4}
                opacity={0.2}
                color="#3b82f6"
            />
            <Sparkles
                count={100}
                scale={15}
                size={6}
                speed={0.2}
                opacity={0.1}
                color="#10b981"
            />
        </group>
    );
}

export const FloatingShapes = () => {
    return (
        <div className="absolute inset-0 z-[1] pointer-events-none opacity-80 flex items-center justify-center">
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 2]}>
                <GalacticBackground />
            </Canvas>
        </div>
    );
};
