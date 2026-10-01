'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticElement from './MagneticElement';
import { FaBars, FaTimes, FaSun, FaMoon, FaGlobe } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { lang, t, toggleLang } = useLanguage();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sectionIds = ['hero', 'services', 'about', 'experience', 'work', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const navItems = [
    { key: 'services', label: t.nav.services },
    { key: 'about', label: t.nav.about },
    { key: 'experience', label: t.nav.experience },
    { key: 'work', label: t.nav.work },
    { key: 'contact', label: t.nav.contact }
  ];

  return (
    <>
      {/* Floating Island Navigation Container */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          padding: scrolled ? '12px 16px' : '20px 24px',
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
          transition: 'padding 0.4s ease',
        }}
      >
        <div
          style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: '1160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            padding: '8px 18px',
            borderRadius: '9999px',
            background: scrolled
              ? 'rgba(7, 3, 20, 0.75)'
              : 'rgba(10, 5, 28, 0.55)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(0, 240, 255, 0.15)',
            boxShadow: scrolled
              ? '0 16px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 240, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Brand Logo */}
          <MagneticElement>
            <a
              href="#hero"
              onClick={closeMenu}
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, rgba(0,240,255,0.2), rgba(138,43,226,0.2))',
                  border: '1px solid rgba(0,240,255,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.95rem',
                  boxShadow: '0 0 15px rgba(0,240,255,0.2)',
                }}
              >
                💎
              </div>
              <h2
                className="text-gradient"
                style={{
                  fontSize: '1.25rem',
                  margin: 0,
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '1px',
                }}
              >
                &lt;HMO /&gt;
              </h2>
            </a>
          </MagneticElement>

          {/* Desktop Nav Items with Glowing Active Indicator */}
          {!isMobile && (
            <nav
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.key;
                return (
                  <a
                    key={item.key}
                    href={`#${item.key}`}
                    className="nav-link"
                    style={{
                      position: 'relative',
                      color: isActive ? '#ffffff' : 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontWeight: 500,
                      fontSize: '0.88rem',
                      padding: '8px 16px',
                      borderRadius: '9999px',
                      zIndex: 2,
                      transition: 'color 0.25s ease',
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '9999px',
                          background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.25) 0%, rgba(138, 43, 226, 0.3) 100%)',
                          border: '1px solid rgba(0, 240, 255, 0.45)',
                          boxShadow: '0 0 20px rgba(0, 240, 255, 0.35)',
                          zIndex: -1,
                        }}
                      />
                    )}
                    {item.label}
                  </a>
                );
              })}
            </nav>
          )}

          {/* Action Controls: Theme + Language + Mobile Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              style={{
                width: '38px',
                height: '38px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(0, 240, 255, 0.15)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.4)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {theme === 'dark' ? <FaSun size={15} color="#00f0ff" /> : <FaMoon size={15} color="#8a2be2" />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              aria-label="Toggle Language"
              style={{
                height: '38px',
                padding: '0 14px',
                display: 'flex',
                gap: '6px',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(0, 240, 255, 0.15)',
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.4)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <FaGlobe size={14} color="#00f0ff" /> {lang.toUpperCase()}
            </button>

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <button
                onClick={toggleMenu}
                aria-label="Open Navigation Menu"
                style={{
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(0, 240, 255, 0.2)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                }}
              >
                {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer with Liquid Crystal Glass Effect */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(28px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(3, 1, 15, 0.88)',
              zIndex: 55,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem',
              padding: '24px',
            }}
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.key}
                href={`#${item.key}`}
                onClick={closeMenu}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.06 * i }}
                style={{
                  color: activeSection === item.key ? '#00f0ff' : 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '2rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '1px',
                  textShadow: activeSection === item.key ? '0 0 20px rgba(0, 240, 255, 0.6)' : 'none',
                }}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
