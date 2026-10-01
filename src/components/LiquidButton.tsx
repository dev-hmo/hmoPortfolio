'use client';
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface LiquidButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

export default function LiquidButton({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary',
  icon,
}: LiquidButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`liquid-button-wrapper ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5px',
        borderRadius: '9999px',
        overflow: 'hidden',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
    >
      {/* Animated glowing iridescent gradient border */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          inset: '-150%',
          background: variant === 'primary'
            ? 'conic-gradient(from 0deg, #00f0ff, #8a2be2, #ff0055, #00f0ff)'
            : 'conic-gradient(from 0deg, rgba(0,240,255,0.4), rgba(138,43,226,0.3), rgba(0,240,255,0.4))',
          filter: isHovered ? 'blur(4px)' : 'blur(2px)',
          opacity: isHovered ? 1 : 0.85,
          transition: 'filter 0.3s ease, opacity 0.3s ease',
        }}
      />

      {/* Button Core Surface */}
      <div
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '14px 34px',
          borderRadius: '9999px',
          background: variant === 'primary' 
            ? 'radial-gradient(ellipse at center, rgba(14, 8, 38, 0.92) 0%, rgba(5, 2, 18, 0.96) 100%)'
            : 'rgba(10, 5, 30, 0.85)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          color: '#ffffff',
          fontWeight: 600,
          fontSize: '1rem',
          letterSpacing: '0.02em',
          zIndex: 2,
          boxShadow: isHovered
            ? '0 0 35px rgba(0, 240, 255, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4)'
            : '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* Dynamic liquid radial spotlight following mouse */}
        {isHovered && (
          <div
            style={{
              position: 'absolute',
              top: mousePos.y - 40,
              left: mousePos.x - 40,
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0, 240, 255, 0.25) 0%, transparent 70%)',
              pointerEvents: 'none',
              filter: 'blur(10px)',
            }}
          />
        )}

        {/* Shimmer sweep overlay */}
        <motion.div
          animate={isHovered ? { x: ['-100%', '200%'] } : {}}
          transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '50%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            transform: 'skewX(-20deg)',
            pointerEvents: 'none',
          }}
        />

        <span style={{ position: 'relative', zIndex: 3, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          {children}
          {icon && <span style={{ transition: 'transform 0.2s ease', transform: isHovered ? 'translateX(3px)' : 'none' }}>{icon}</span>}
        </span>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} style={{ textDecoration: 'none', display: 'inline-block' }}>
        {content}
      </a>
    );
  }

  return (
    <div onClick={onClick} style={{ display: 'inline-block' }}>
      {content}
    </div>
  );
}
