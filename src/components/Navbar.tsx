'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticElement from './MagneticElement';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 60, padding: 'clamp(15px, 2vw, 20px) 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <MagneticElement>
            <a href="#hero" style={{ textDecoration: 'none' }} onClick={closeMenu}>
              <h2 className="text-gradient" style={{ fontSize: 'clamp(1.5rem, 3vw, 1.8rem)', margin: 0, fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '2px' }}>&lt;HMO /&gt;</h2>
            </a>
          </MagneticElement>

          {!isMobile ? (
            <div className="glass" style={{ padding: '10px 24px', display: 'flex', gap: '24px', borderRadius: '30px' }}>
              <a href="#about" className="nav-link" style={{ color: 'white', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>About</a>
              <a href="#services" className="nav-link" style={{ color: 'white', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>Services</a>
              <a href="#experience" className="nav-link" style={{ color: 'white', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>Experience</a>
              <a href="#skills" className="nav-link" style={{ color: 'white', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>Skills</a>
              <a href="#work" className="nav-link" style={{ color: 'white', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>Work</a>
              <a href="#contact" className="nav-link" style={{ color: 'white', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>Contact</a>
            </div>
          ) : (
            <button onClick={toggleMenu} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', zIndex: 70, padding: '10px' }}>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          )}
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
              background: 'rgba(5, 5, 5, 0.98)',
              backdropFilter: 'blur(20px)',
              zIndex: 55,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2.5rem'
            }}
          >
            {['About', 'Services', 'Experience', 'Skills', 'Work', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={closeMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '2px'
                }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
