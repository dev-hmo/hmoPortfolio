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
  const buttonRef = useRef<HTMLDivElement>(null);

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={`liquid-button-wrapper ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '9999px',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 28px',
          borderRadius: '9999px',
          background: variant === 'primary' 
            ? 'var(--accent-teal)'
            : 'var(--glass-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: variant === 'primary'
            ? '1px solid rgba(255, 255, 255, 0.2)'
            : '1px solid var(--glass-border)',
          color: variant === 'primary' ? '#FFFFFF' : 'var(--text-primary)',
          fontWeight: 600,
          fontSize: '0.94rem',
          letterSpacing: '-0.01em',
          boxShadow: isHovered
            ? (variant === 'primary' 
                ? '0 8px 24px rgba(20, 184, 166, 0.4)' 
                : '0 8px 20px rgba(0, 0, 0, 0.08)')
            : (variant === 'primary'
                ? '0 4px 14px rgba(20, 184, 166, 0.25)'
                : '0 2px 6px rgba(0, 0, 0, 0.04)'),
          transition: 'all 0.25s ease',
        }}
      >
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
