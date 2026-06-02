'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function TiltCard({ children, className = '', style = {} }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    const maxRotation = 15;
    setRotateX(yPct * -maxRotation);
    setRotateY(xPct * maxRotation);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
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
      className={`glass ${className}`}
    >
      <div style={{ transform: "translateZ(30px)", height: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </motion.div>
  );
}
