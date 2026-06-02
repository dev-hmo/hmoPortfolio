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
  const { theme, setTheme } = useTheme();
  const { lang, t, toggleLang } = useLanguage();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const navItems = [
    { key: 'about', label: t.nav.about },
    { key: 'services', label: t.nav.services },
    { key: 'experience', label: t.nav.experience },
    { key: 'skills', label: t.nav.skills },
    { key: 'work', label: t.nav.work },
    { key: 'contact', label: t.nav.contact }
  ];

  return (
    <>
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 60, padding: 'clamp(15px, 2vw, 20px) 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <MagneticElement>
            <a href="#hero" style={{ textDecoration: 'none' }} onClick={closeMenu}>
              <h2 className="text-gradient" style={{ fontSize: 'clamp(1.5rem, 3vw, 1.8rem)', margin: 0, fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '2px' }}>&lt;HMO /&gt;</h2>
            </a>
          </MagneticElement>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="glass" style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}>
              {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
            
            {/* Language Toggle */}
            <button onClick={toggleLang} className="glass" style={{ height: '40px', padding: '0 12px', display: 'flex', gap: '6px', justifyContent: 'center', alignItems: 'center', borderRadius: '20px', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
              <FaGlobe size={16} /> {lang.toUpperCase()}
            </button>

            {!isMobile ? (
              <div className="glass" style={{ padding: '10px 24px', display: 'flex', gap: '24px', borderRadius: '30px' }}>
                {navItems.map(item => (
                  <a key={item.key} href={`#${item.key}`} className="nav-link" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>
                    {item.label}
                  </a>
                ))}
              </div>
            ) : (
              <button onClick={toggleMenu} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', zIndex: 70, padding: '8px' }}>
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              background: 'var(--bg-color)',
              backdropFilter: 'blur(20px)',
              zIndex: 55,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2.5rem'
            }}
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.key}
                href={`#${item.key}`}
                onClick={closeMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                style={{
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '2px'
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
