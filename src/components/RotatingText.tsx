'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const titles = [
  "Junior Software Tester & Frontend Enthusiast",
  "Frontend Developer & Web Tester",
  "Manual QA & UAT Tester",
  "Web Application Debugger"
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
      className={`w-full relative min-h-[4.2rem] sm:min-h-[4.6rem] flex items-center overflow-hidden mb-4 ${
        isLeft ? 'justify-start' : 'justify-center'
      } ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.h2
          key={index}
          initial={{ y: 25, opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -25, opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-gradient"
          style={{
            fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
            fontWeight: 800,
            lineHeight: 1.18,
            letterSpacing: '-0.02em',
            margin: 0,
            textAlign: isLeft ? 'left' : 'center',
            width: '100%',
            maxWidth: '560px',
            fontFamily: 'var(--font-display)',
          }}
        >
          {titles[index]}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
}
