'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CrystalCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glowColor?: string;
}

export default function CrystalCard({ children, className = '', style = {}, glowColor }: CrystalCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    const maxRotation = 12;
    setRotateX(yPct * -maxRotation);
    setRotateY(xPct * maxRotation);
    setGlarePosition({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d", ...style }}
      className={`crystal-card ${className}`}
    >
      {/* Dynamic glare effect on hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '20px',
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.04) 0%, transparent 60%)`,
          pointerEvents: 'none',
          transition: 'background 0.1s ease',
          zIndex: 1,
        }}
      />
      <div style={{ transform: "translateZ(20px)", height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </motion.div>
  );
}
