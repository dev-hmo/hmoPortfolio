'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { SiJira, SiClickup, SiPostman, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss3 } from 'react-icons/si';
import { FaReact, FaGitAlt, FaFigma } from 'react-icons/fa';

interface SplineHeroProps {
  sceneUrl?: string;
  className?: string;
}

// 10 Core Developer Skills to Orbit around the 3D Element
const techSkills = [
  { name: 'React.js', icon: FaReact, color: '#0EA5E9', category: 'Frontend' },
  { name: 'Next.js', icon: SiNextdotjs, color: 'currentColor', category: 'Framework' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#14B8A6', category: 'Styling' },
  { name: 'HTML5', icon: SiHtml5, color: '#F97316', category: 'Structure' },
  { name: 'CSS3', icon: SiCss3, color: '#3B82F6', category: 'Responsive' },
  { name: 'Figma', icon: FaFigma, color: '#A855F7', category: 'UI/UX' },
  { name: 'Git', icon: FaGitAlt, color: '#EF4444', category: 'Version Control' },
  { name: 'Postman', icon: SiPostman, color: '#F97316', category: 'API Testing' },
  { name: 'Jira', icon: SiJira, color: '#2563EB', category: 'Project Tracking' },
  { name: 'ClickUp', icon: SiClickup, color: '#6366F1', category: 'Task Management' },
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

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);

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
  };

  const orbitRadius = 168;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full min-h-[420px] sm:min-h-[460px] flex flex-col items-center justify-center select-none ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* Subtle Ambient Refraction */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, var(--accent-teal-subtle) 0%, transparent 65%)',
          filter: 'blur(50px)',
          opacity: 0.7,
        }}
      />

      {/* Floating 3D Frosted Core Element */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: [-6, 6, -6],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
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
              border: '1px dashed var(--glass-border)',
              borderRadius: '50%',
              opacity: 0.8,
            }}
          />
        )}

        {/* Outer Precision Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-15px] sm:inset-[-25px] rounded-full pointer-events-none"
          style={{
            border: '1px solid var(--glass-border)',
            transform: 'rotateX(65deg) translateZ(25px)',
          }}
        />

        {/* Counter Precision Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-35px] sm:inset-[-45px] rounded-full pointer-events-none"
          style={{
            border: '1px dashed var(--glass-border)',
            transform: 'rotateY(60deg) rotateX(30deg) translateZ(-15px)',
            opacity: 0.7,
          }}
        />

        {/* Main Frosted Glass Sphere */}
        <div
          className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden flex items-center justify-center"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(28px) saturate(140%)',
            WebkitBackdropFilter: 'blur(28px) saturate(140%)',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--glass-shadow)',
            transform: 'translateZ(45px)',
          }}
        >
          {/* Subtle clean inner highlight */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.12) 0%, transparent 60%)',
            }}
          />

          {/* Clean Technical Centerpiece */}
          <div
            className="relative z-10 text-center flex flex-col items-center justify-center px-4 py-3 pointer-events-none select-none"
            style={{ transform: 'translateZ(30px)' }}
          >
            {/* Tech Monogram Badge */}
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'var(--accent-teal-subtle)',
                border: '1px solid rgba(20, 184, 166, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '10px',
                color: 'var(--accent-teal)',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: '0.95rem',
              }}
            >
              TS
            </div>

            {/* Role Header */}
            <h3
              style={{
                fontSize: 'clamp(0.85rem, 2vw, 0.98rem)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                color: 'var(--text-primary)',
                margin: 0,
                lineHeight: 1.25,
              }}
            >
              FRONTEND DEVELOPER
            </h3>

            {/* Clean hairline separator */}
            <div
              style={{
                width: '40px',
                height: '1px',
                margin: '8px 0',
                background: 'var(--glass-border)',
              }}
            />

            {/* Stack Details */}
            <p
              style={{
                fontSize: 'clamp(0.72rem, 1.8vw, 0.8rem)',
                fontWeight: 500,
                color: 'var(--accent-teal)',
                margin: 0,
                fontFamily: 'var(--font-mono)',
                letterSpacing: '-0.01em',
              }}
            >
              React.js &amp; Next.js
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            DESKTOP CONTINUOUS CIRCULAR ORBIT (10 TECH ICONS)
            ═══════════════════════════════════════════════════════════ */}
        {!isMobile && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 38,
              ease: 'linear',
            }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
            style={{ transform: 'translateZ(55px)' }}
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
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 38,
                      ease: 'linear',
                    }}
                    onMouseEnter={() => setHoveredTech(tech.name)}
                    onMouseLeave={() => setHoveredTech(null)}
                    whileHover={{ scale: 1.2, zIndex: 60 }}
                    className="relative cursor-pointer"
                  >
                    {/* Clean Frosted Badge */}
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: isHovered
                          ? '1px solid var(--accent-teal)'
                          : '1px solid var(--glass-border)',
                        boxShadow: isHovered
                          ? '0 6px 20px rgba(0, 0, 0, 0.15)'
                          : 'var(--glass-shadow)',
                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                      }}
                    >
                      <tech.icon
                        size={20}
                        color={isHovered ? 'var(--accent-teal)' : tech.color}
                        style={{
                          transition: 'color 0.2s ease',
                        }}
                      />
                    </div>

                    {/* Tooltip on Hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.9 }}
                          transition={{ duration: 0.15 }}
                          style={{
                            position: 'absolute',
                            bottom: '50px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            whiteSpace: 'nowrap',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            background: 'var(--bg-surface)',
                            border: '1px solid var(--glass-border)',
                            boxShadow: 'var(--glass-shadow)',
                            color: 'var(--text-primary)',
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            pointerEvents: 'none',
                            zIndex: 100,
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          <span>{tech.name}</span>
                          <span style={{ color: 'var(--text-muted)', marginLeft: '4px', fontSize: '0.68rem' }}>
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
          MOBILE RESPONSIVE TECH DOCK
          ═══════════════════════════════════════════════════════════ */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-full max-w-[340px] mt-4 flex flex-col items-center"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            <span className="text-[11px] font-mono tracking-wider text-slate-400 uppercase">
              Core Tech Stack
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '8px',
              padding: '10px 12px',
              borderRadius: '16px',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--glass-border)',
              boxShadow: 'var(--glass-shadow)',
            }}
          >
            {techSkills.map((tech) => (
              <div
                key={tech.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                  borderRadius: '10px',
                  background: 'rgba(128, 128, 128, 0.05)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                <tech.icon size={18} color={tech.color} />
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
