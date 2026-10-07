'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const titles = [
  "Junior Frontend Developer",
  "React & Next.js Developer",
  "UI/UX Implementation Specialist",
  "Component Architecture & Web Performance"
];

interface RotatingTextProps {
  align?: 'left' | 'center';
  className?: string;
}

export default function RotatingText({ align = 'left', className = '' }: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3200);

    return () => clearInterval(intervalId);
  }, []);

  const isLeft = align === 'left';

  return (
    <div
      className={`w-full relative min-h-[3.6rem] sm:min-h-[4rem] flex items-center overflow-hidden mb-3 ${
        isLeft ? 'justify-start' : 'justify-center'
      } ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.h2
          key={index}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-gradient"
          style={{
            fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
            margin: 0,
            textAlign: isLeft ? 'left' : 'center',
            width: '100%',
            maxWidth: '560px',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {titles[index]}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
}
