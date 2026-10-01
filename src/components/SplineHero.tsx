'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { SiJira, SiClickup, SiPostman, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss3 } from 'react-icons/si';
import { FaReact, FaGitAlt, FaFigma } from 'react-icons/fa';

interface SplineHeroProps {
  sceneUrl?: string;
  className?: string;
}

// 10 Core Tech Skills to Orbit around the 3D Crystal
const techSkills = [
  { name: 'Jira', icon: SiJira, color: '#2684FF', glow: 'rgba(38, 132, 255, 0.5)', category: 'QA Tool' },
  { name: 'ClickUp', icon: SiClickup, color: '#7B68EE', glow: 'rgba(123, 104, 238, 0.5)', category: 'Bug Tracking' },
  { name: 'Postman', icon: SiPostman, color: '#FF6C37', glow: 'rgba(255, 108, 55, 0.5)', category: 'API Testing' },
  { name: 'React.js', icon: FaReact, color: '#61DAFB', glow: 'rgba(97, 218, 251, 0.5)', category: 'Frontend' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.4)', category: 'Framework' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8', glow: 'rgba(56, 189, 248, 0.5)', category: 'Styling' },
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26', glow: 'rgba(227, 79, 38, 0.5)', category: 'Structure' },
  { name: 'CSS3', icon: SiCss3, color: '#1572B6', glow: 'rgba(21, 114, 182, 0.5)', category: 'Responsive' },
  { name: 'Figma', icon: FaFigma, color: '#F24E1E', glow: 'rgba(242, 78, 30, 0.5)', category: 'UI/UX' },
  { name: 'Git', icon: FaGitAlt, color: '#F05032', glow: 'rgba(240, 80, 50, 0.5)', category: 'Version Control' },
];

export default function SplineHero({ sceneUrl, className = '' }: SplineHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  // Parallax mouse interaction for 3D depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [16, -16]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHoveredTech(null);
  };

  // Orbit radius: fits comfortably inside container without screen overflow
  const orbitRadius = 195;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-[580px] flex flex-col items-center justify-center select-none ${className}`}
      style={{
        perspective: '1200px',
        minHeight: isMobile ? '480px' : '540px',
      }}
    >
      {/* Ambient background volumetric glow */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.16) 0%, rgba(138, 43, 226, 0.14) 45%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'pulseGlow 6s ease-in-out infinite',
        }}
      />

      {/* 
        SPLINE 3D SCENE INTEGRATION:
        To swap with a live Spline scene in future:
        1. npm install @splinetool/react-spline @splinetool/runtime
        2. import Spline from '@splinetool/react-spline'
        3. <Spline scene={sceneUrl || "https://prod.spline.design/YOUR_SCENE/scene.splinecode"} />
      */}

      {/* Floating 3D Liquid Crystal Core */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: [-10, 10, -10],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: 'easeInOut',
        }}
        className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {/* Orbital Track Guide Ring (Desktop) */}
        {!isMobile && (
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${orbitRadius * 2}px`,
              height: `${orbitRadius * 2}px`,
              border: '1px dashed rgba(0, 240, 255, 0.2)',
              borderRadius: '50%',
              boxShadow: '0 0 30px rgba(0, 240, 255, 0.08), inset 0 0 30px rgba(138, 43, 226, 0.06)',
            }}
          />
        )}

        {/* Outer Iridescent Gyro Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-15px] sm:inset-[-25px] rounded-full pointer-events-none"
          style={{
            border: '1.5px solid rgba(0, 240, 255, 0.25)',
            boxShadow: '0 0 25px rgba(0, 240, 255, 0.12), inset 0 0 20px rgba(0, 240, 255, 0.08)',
            transform: 'rotateX(65deg) translateZ(30px)',
          }}
        />

        {/* Counter Gyro Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-35px] sm:inset-[-45px] rounded-full pointer-events-none"
          style={{
            border: '1.5px dashed rgba(138, 43, 226, 0.22)',
            boxShadow: '0 0 30px rgba(138, 43, 226, 0.15)',
            transform: 'rotateY(60deg) rotateX(30deg) translateZ(-15px)',
          }}
        />

        {/* Main Liquid Crystal Sphere */}
        <div
          className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.22) 0%, rgba(0, 240, 255, 0.18) 28%, rgba(138, 43, 226, 0.25) 60%, rgba(5, 2, 25, 0.9) 100%)',
            backdropFilter: 'blur(30px) saturate(220%)',
            WebkitBackdropFilter: 'blur(30px) saturate(220%)',
            border: '1.5px solid rgba(0, 240, 255, 0.45)',
            boxShadow: `
              0 0 50px rgba(0, 240, 255, 0.35),
              0 0 100px rgba(138, 43, 226, 0.25),
              inset 0 0 45px rgba(0, 240, 255, 0.3),
              inset -20px -20px 60px rgba(138, 43, 226, 0.4)
            `,
            transform: 'translateZ(50px)',
          }}
        >
          {/* Inner holographic swirling liquid simulation */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.12, 1],
            }}
            transition={{
              rotate: { repeat: Infinity, duration: 16, ease: 'linear' },
              scale: { repeat: Infinity, duration: 8, ease: 'easeInOut' },
            }}
            className="absolute inset-0 opacity-70 pointer-events-none"
            style={{
              background: 'conic-gradient(from 180deg at 50% 50%, rgba(0,240,255,0.4) 0deg, rgba(138,43,226,0.5) 120deg, rgba(255,0,85,0.4) 240deg, rgba(0,240,255,0.4) 360deg)',
              filter: 'blur(20px)',
              mixBlendMode: 'screen',
            }}
          />

          {/* Chromatic light flare specular reflection */}
          <div
            className="absolute top-3 left-6 w-24 h-12 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.9) 0%, rgba(0, 240, 255, 0.4) 60%, transparent 100%)',
              transform: 'rotate(-35deg)',
              filter: 'blur(4px)',
            }}
          />

          {/* ═══════════════════════════════════════════════════════════
              EMBEDDED CRYSTAL TYPOGRAPHY:
              "QUALITY ASSURANCE" & "Bug Tracking & UAT"
              ═══════════════════════════════════════════════════════════ */}
          <div
            className="relative z-10 text-center flex flex-col items-center justify-center px-4 py-3 pointer-events-none select-none"
            style={{
              transform: 'translateZ(40px)',
              filter: 'drop-shadow(0 0 16px rgba(0, 240, 255, 0.5))',
            }}
          >
            {/* Luminous Core Badge Icon / Shield */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.85, 1, 0.85],
              }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/35 flex items-center justify-center mb-2.5 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              <span className="text-xl">🛡️</span>
            </motion.div>

            {/* Line 1: QUALITY ASSURANCE */}
            <motion.h3
              animate={{
                textShadow: [
                  '0 0 12px rgba(0, 240, 255, 0.75), 0 0 25px rgba(138, 43, 226, 0.5)',
                  '0 0 22px rgba(0, 240, 255, 0.95), 0 0 35px rgba(138, 43, 226, 0.85)',
                  '0 0 12px rgba(0, 240, 255, 0.75), 0 0 25px rgba(138, 43, 226, 0.5)'
                ]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              style={{
                fontSize: 'clamp(0.95rem, 2.4vw, 1.15rem)',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#ffffff',
                margin: 0,
                lineHeight: 1.2,
                fontFamily: 'var(--font-display)',
              }}
            >
              QUALITY ASSURANCE
            </motion.h3>

            {/* Luminous crystal accent divider */}
            <div
              style={{
                width: '64px',
                height: '1.5px',
                margin: '6px 0',
                background: 'linear-gradient(90deg, transparent, #00f0ff, #8a2be2, transparent)',
                boxShadow: '0 0 10px #00f0ff',
              }}
            />

            {/* Line 2: Bug Tracking & UAT */}
            <p
              style={{
                fontSize: 'clamp(0.72rem, 1.8vw, 0.82rem)',
                fontWeight: 600,
                letterSpacing: '0.06em',
                color: '#00f0ff',
                margin: 0,
                fontFamily: 'var(--font-mono, monospace)',
                textShadow: '0 0 12px rgba(0, 240, 255, 0.7)',
              }}
            >
              Bug Tracking &amp; UAT
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            DESKTOP CONTINUOUS CIRCULAR ORBIT (10 TECH ICONS)
            Smooth orbital rotation with counter-rotating upright icons
            ═══════════════════════════════════════════════════════════ */}
        {!isMobile && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 38,
              ease: 'linear',
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ transform: 'translateZ(65px)' }}
          >
            {techSkills.map((tech, index) => {
              const total = techSkills.length;
              const angleDeg = (index / total) * 360;
              const angleRad = (angleDeg * Math.PI) / 180;
              const x = Math.cos(angleRad) * orbitRadius;
              const y = Math.sin(angleRad) * orbitRadius;

              const isHovered = hoveredTech === tech.name;

              return (
                <div
                  key={tech.name}
                  style={{
                    position: 'absolute',
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                  className="pointer-events-auto"
                >
                  {/* Counter-rotate icon container so icon stays perfectly upright */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 38,
                      ease: 'linear',
                    }}
                    onMouseEnter={() => setHoveredTech(tech.name)}
                    onMouseLeave={() => setHoveredTech(null)}
                    whileHover={{ scale: 1.28, zIndex: 60 }}
                    className="relative cursor-pointer"
                  >
                    {/* Glassmorphic Orbital Tech Badge */}
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(9, 4, 26, 0.82)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: isHovered
                          ? `1.5px solid ${tech.color}`
                          : '1px solid rgba(0, 240, 255, 0.22)',
                        boxShadow: isHovered
                          ? `0 0 25px ${tech.glow}, 0 8px 20px rgba(0, 0, 0, 0.5)`
                          : '0 6px 18px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                        transition: 'border 0.25s ease, box-shadow 0.25s ease',
                      }}
                    >
                      <tech.icon
                        size={22}
                        color={tech.color}
                        style={{
                          filter: isHovered ? `drop-shadow(0 0 8px ${tech.color})` : 'none',
                          transition: 'filter 0.25s ease',
                        }}
                      />
                    </div>

                    {/* Tooltip on Hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.85 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.85 }}
                          transition={{ duration: 0.18 }}
                          style={{
                            position: 'absolute',
                            bottom: '52px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            whiteSpace: 'nowrap',
                            padding: '4px 10px',
                            borderRadius: '8px',
                            background: 'rgba(5, 2, 20, 0.94)',
                            backdropFilter: 'blur(14px)',
                            border: `1px solid ${tech.color}`,
                            boxShadow: `0 0 15px ${tech.glow}`,
                            color: '#ffffff',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            pointerEvents: 'none',
                            zIndex: 100,
                          }}
                        >
                          <span>{tech.name}</span>
                          <span style={{ color: 'var(--text-secondary)', marginLeft: '4px', fontSize: '0.68rem' }}>
                            ({tech.category})
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        )}
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════
          MOBILE RESPONSIVE TECH ARSENAL DOCK
          Floats gently beneath the sphere without overflowing screen
          ═══════════════════════════════════════════════════════════ */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-[340px] mt-4 flex flex-col items-center"
        >
          {/* Subtle Mobile Heading */}
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest text-cyan-300 uppercase">
              Core Tech &amp; QA Stack
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          </div>

          {/* Gentle Floating Tech Cluster (2 rows of 5) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '8px',
              padding: '12px 14px',
              borderRadius: '20px',
              background: 'rgba(10, 5, 28, 0.65)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(0, 240, 255, 0.18)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
            }}
          >
            {techSkills.map((tech, i) => (
              <motion.div
                key={tech.name}
                animate={{
                  y: [-3, 3, -3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.8 + (i % 3) * 0.4,
                  delay: i * 0.12,
                  ease: 'easeInOut',
                }}
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <tech.icon size={20} color={tech.color} />
                <span className="text-[9px] text-gray-300 mt-1 font-mono font-medium truncate max-w-[48px] text-center">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Bottom Floating Pedestal Shadow */}
      <div
        className="w-48 sm:w-64 h-6 rounded-[100%] pointer-events-none mt-2"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.28) 0%, rgba(138, 43, 226, 0.15) 40%, transparent 70%)',
          filter: 'blur(16px)',
          transform: 'scaleY(0.4)',
        }}
      />
    </div>
  );
}
