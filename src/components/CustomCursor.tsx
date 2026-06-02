'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show on desktop/fine pointers
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsVisible(true);
      
      const moveCursor = (e: MouseEvent) => {
        cursorX.set(e.clientX - 16);
        cursorY.set(e.clientY - 16);
      };

      window.addEventListener('mousemove', moveCursor);
      return () => window.removeEventListener('mousemove', moveCursor);
    }
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '2px solid rgba(0, 240, 255, 0.8)',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          boxShadow: '0 0 10px rgba(0,240,255,0.3)'
        }}
      />
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          position: 'fixed',
          top: '12px',
          left: '12px',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'white',
          pointerEvents: 'none',
          zIndex: 10000,
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}
