'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const titles = [
  "Project Coordinator",
  "Assistant Project Manager",
  "Frontend Developer",
  "Business Analyst",
  "UI/UX & QA Tester"
];

export default function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ height: '3.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5rem', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        <motion.h2
          key={index}
          initial={{ y: 40, opacity: 0, filter: 'blur(10px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -40, opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-gradient"
          style={{ fontSize: '2.5rem', margin: 0, textAlign: 'center', position: 'absolute' }}
        >
          {titles[index]}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
}
