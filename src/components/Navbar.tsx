'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticElement from './MagneticElement';
import { FaBars, FaTimes, FaGlobe, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { lang, t, toggleLang } = useLanguage();

  useEffect(() => {
    setMounted(true);
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
          transition: 'padding 0.3s ease',
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
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(20px) saturate(140%)',
            WebkitBackdropFilter: 'blur(20px) saturate(140%)',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--glass-shadow)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Brand Monogram */}
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
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'var(--accent-teal-subtle)',
                  border: '1px solid rgba(20, 184, 166, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-teal)',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                }}
              >
                H
              </div>
              <span
                style={{
                  fontSize: '1.05rem',
                  margin: 0,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                hlaingminoo<span style={{ color: 'var(--accent-teal)' }}>.dev</span>
              </span>
            </a>
          </MagneticElement>

          {/* Desktop Nav Items */}
          {!isMobile && (
            <nav
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px',
                background: 'rgba(128, 128, 128, 0.04)',
                borderRadius: '9999px',
                border: '1px solid var(--glass-border)',
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
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.88rem',
                      padding: '7px 16px',
                      borderRadius: '9999px',
                      zIndex: 2,
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 32,
                        }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '9999px',
                          background: 'var(--accent-teal-subtle)',
                          border: '1px solid rgba(20, 184, 166, 0.25)',
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

          {/* Action Controls: Theme Switcher + Language Switcher + Mobile Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = 'var(--accent-teal)';
                  e.currentTarget.style.borderColor = 'var(--accent-teal)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                }}
              >
                {theme === 'dark' ? <FaSun size={14} /> : <FaMoon size={14} />}
              </button>
            )}

            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              aria-label="Toggle Language"
              style={{
                height: '36px',
                padding: '0 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: '9999px',
                background: 'transparent',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-teal)';
                e.currentTarget.style.color = 'var(--accent-teal)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
            >
              <FaGlobe size={12} color="var(--accent-teal)" /> {lang.toUpperCase()}
            </button>

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <button
                onClick={toggleMenu}
                aria-label="Open Navigation Menu"
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                }}
              >
                {isOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer with Clean Frosted Glass */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'var(--bg-color)',
              opacity: 0.96,
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ delay: 0.05 * i }}
                style={{
                  color: activeSection === item.key ? 'var(--accent-teal)' : 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
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
