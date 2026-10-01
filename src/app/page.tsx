'use client';
import LiquidBackground from '@/components/LiquidBackground';
import SplineHero from '@/components/SplineHero';
import LiquidButton from '@/components/LiquidButton';
import CrystalCard from '@/components/CrystalCard';
import Timeline from '@/components/Timeline';
import ContactForm from '@/components/ContactForm';
import ProjectShowcase from '@/components/ProjectShowcase';
import TextReveal from '@/components/TextReveal';
import RotatingText from '@/components/RotatingText';
import StatsCounter from '@/components/StatsCounter';
import Services from '@/components/Services';
import MagneticElement from '@/components/MagneticElement';
import { FaGithub, FaLinkedin, FaArrowRight, FaShieldAlt, FaCheckCircle, FaLaptopCode } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main style={{ position: 'relative', overflowX: 'hidden' }}>
      {/* Liquid Crystal Animated Mesh Background */}
      <LiquidBackground />

      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION — 3D Liquid Crystal & Spline Layout
          ═══════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          paddingTop: 'clamp(100px, 12vw, 135px)',
          paddingBottom: 'clamp(50px, 8vw, 85px)',
          zIndex: 10,
        }}
      >
        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
            {/* Left Column: Fluid Typography & Interactive CTAs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 xl:col-span-7 flex flex-col items-start lg:pl-6 xl:pl-10 max-w-[620px]"
            >
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  background: 'rgba(0, 240, 255, 0.08)',
                  border: '1px solid rgba(0, 240, 255, 0.25)',
                  boxShadow: '0 0 20px rgba(0, 240, 255, 0.15)',
                  marginBottom: '1.25rem',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#00f0ff',
                    boxShadow: '0 0 10px #00f0ff',
                    display: 'inline-block',
                    animation: 'pulseGlow 2s infinite',
                  }}
                />
                <span
                  style={{
                    color: '#00f0ff',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  Available for Junior QA / Testing Roles
                </span>
              </motion.div>

              {/* Fluid Wavy Title Entrance */}
              <div style={{ width: '100%', marginBottom: '0.5rem' }}>
                <TextReveal
                  text={t.hero.title}
                  style={{
                    fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)',
                    fontWeight: 800,
                    lineHeight: 1.08,
                    letterSpacing: '-0.02em',
                    justifyContent: 'flex-start',
                    textShadow: '0 0 35px rgba(0, 240, 255, 0.28)',
                  }}
                />
              </div>

              {/* QA / Frontend Rotating Roles (Left aligned, natural line-breaking) */}
              <div style={{ width: '100%', marginBottom: '1rem' }}>
                <RotatingText align="left" />
              </div>

              {/* Punchy Hero Description */}
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                  maxWidth: '520px',
                }}
              >
                {t.hero.subtitle}
              </p>

              {/* Action Buttons: Liquid CTA + Secondary Crystal Button */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  flexWrap: 'wrap',
                  marginBottom: '2.25rem',
                }}
              >
                <LiquidButton href="#work" icon={<FaArrowRight size={13} />}>
                  {t.nav.work}
                </LiquidButton>

                <MagneticElement>
                  <a
                    href="#contact"
                    style={{
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '14px 28px',
                      borderRadius: '9999px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                      fontSize: '0.96rem',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.4)';
                      e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 240, 255, 0.2)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {t.nav.contact}
                  </a>
                </MagneticElement>
              </div>

              {/* Quick Trust Highlights */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  flexWrap: 'wrap',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  width: '100%',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <FaCheckCircle color="#00f0ff" size={13} />
                  <span>Manual Testing &amp; UAT</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <FaLaptopCode color="#8a2be2" size={13} />
                  <span>React / Next.js Debugging</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <FaShieldAlt color="#ff0055" size={13} />
                  <span>API &amp; Postman Testing</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: 3D Spline Scene Floating Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 xl:col-span-5 flex justify-center items-center relative"
            >
              <SplineHero />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          IMPACT STATS — Liquid Frosted Glass Strip
          ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: '50px 0',
          position: 'relative',
          zIndex: 10,
          background: 'rgba(10, 5, 28, 0.45)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderTop: '1px solid rgba(0, 240, 255, 0.1)',
          borderBottom: '1px solid rgba(138, 43, 226, 0.1)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div className="container">
          <StatsCounter />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SERVICES SECTION — Crystal Glass Cards
          ═══════════════════════════════════════════════════════════ */}
      <section id="services" style={{ padding: 'clamp(80px, 12vw, 120px) 0', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', textAlign: 'center', marginBottom: '1rem' }}>
            {t.services.title1} <span className="text-gradient">{t.services.title2}</span>
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: 'var(--text-secondary)',
              marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              maxWidth: '680px',
              margin: '0 auto clamp(2.5rem, 5vw, 4.5rem) auto',
            }}
          >
            {t.services.desc}
          </p>
          <Services />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ABOUT SECTION — Crystal Profile & 3D Orb
          ═══════════════════════════════════════════════════════════ */}
      <section id="about" style={{ padding: 'clamp(80px, 12vw, 120px) 0', position: 'relative', zIndex: 10 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(2rem, 5vw, 4rem)', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 450px' }}>
            <CrystalCard style={{ padding: 'clamp(2rem, 4vw, 3.5rem)', height: '100%' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  background: 'rgba(0, 240, 255, 0.08)',
                  border: '1px solid rgba(0, 240, 255, 0.25)',
                  color: '#00f0ff',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  marginBottom: '1.25rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Junior QA Tester & Frontend Developer
              </div>
              <h2 style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', marginBottom: '1.5rem' }}>
                {t.about.title1} <span className="text-gradient">{t.about.title2}</span>
              </h2>
              <p style={{ fontSize: 'clamp(1.02rem, 1.8vw, 1.15rem)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                {t.about.desc}
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ padding: '10px 16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <span style={{ color: '#00f0ff', fontWeight: 700, fontSize: '1.1rem' }}>Zero</span>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0 }}>Critical Release Bugs</p>
                </div>
                <div style={{ padding: '10px 16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <span style={{ color: '#8a2be2', fontWeight: 700, fontSize: '1.1rem' }}>40%</span>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0 }}>Post-Launch Defect Drop</p>
                </div>
                <div style={{ padding: '10px 16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <span style={{ color: '#ff0055', fontWeight: 700, fontSize: '1.1rem' }}>100%</span>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0 }}>Test Case Coverage</p>
                </div>
              </div>
            </CrystalCard>
          </div>

          <div style={{ flex: '1 1 360px', display: 'flex', justifyContent: 'center' }}>
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              style={{ position: 'relative', width: '320px', height: '320px' }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle, rgba(0, 240, 255, 0.3) 0%, rgba(138, 43, 226, 0.25) 50%, transparent 70%)',
                  borderRadius: '50%',
                  filter: 'blur(45px)',
                  animation: 'pulseGlow 5s infinite',
                }}
              />
              <div
                className="glass"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 2,
                  border: '1.5px solid rgba(0, 240, 255, 0.35)',
                  boxShadow: '0 0 50px rgba(0, 240, 255, 0.2), inset 0 0 30px rgba(138, 43, 226, 0.25)',
                }}
              >
                <span style={{ fontSize: '4.5rem', marginBottom: '8px' }}>🔬</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#00f0ff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Manual &amp; UAT
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Defect Tracking &amp; QA
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          EXPERIENCE TIMELINE
          ═══════════════════════════════════════════════════════════ */}
      <section id="experience" style={{ padding: 'clamp(80px, 12vw, 120px) 0', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            {t.experience.title1} <span className="text-gradient">{t.experience.title2}</span>
          </h2>
          <Timeline />
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          PROJECT SHOWCASE — Liquid Crystal Cards
          ═══════════════════════════════════════════════════════════ */}
      <section id="work" style={{ padding: 'clamp(80px, 12vw, 120px) 0', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', textAlign: 'center', marginBottom: '1rem' }}>
            {t.work.title1} <span className="text-gradient">{t.work.title2}</span>
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: 'var(--text-secondary)',
              marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              maxWidth: '680px',
              margin: '0 auto clamp(2.5rem, 5vw, 4rem) auto',
            }}
          >
            {t.work.desc}
          </p>
          <ProjectShowcase />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CONTACT / FOOTER SECTION
          ═══════════════════════════════════════════════════════════ */}
      <section id="contact" style={{ padding: 'clamp(100px, 14vw, 140px) 0 60px 0', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', textAlign: 'center', marginBottom: '1rem' }}>
            {t.contact.title1} <span className="text-gradient">{t.contact.title2}</span>
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              textAlign: 'center',
              marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              maxWidth: '600px',
              margin: '0 auto clamp(2.5rem, 5vw, 4rem) auto',
            }}
          >
            {t.contact.desc}
          </p>

          <ContactForm />

          {/* Liquid Crystal Social Icons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '5rem', marginBottom: '2.5rem' }}>
            <MagneticElement>
              <a
                href="https://github.com/dev-hmo"
                target="_blank"
                rel="noreferrer"
                className="social-link github"
                aria-label="GitHub Profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(0, 240, 255, 0.2)',
                  boxShadow: '0 0 20px rgba(0, 240, 255, 0.1)',
                }}
              >
                <FaGithub size={22} />
              </a>
            </MagneticElement>

            <MagneticElement>
              <a
                href="https://www.linkedin.com/in/hlaing-min-oo-656369240"
                target="_blank"
                rel="noreferrer"
                className="social-link linkedin"
                aria-label="LinkedIn Profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(138, 43, 226, 0.2)',
                  boxShadow: '0 0 20px rgba(138, 43, 226, 0.1)',
                }}
              >
                <FaLinkedin size={22} />
              </a>
            </MagneticElement>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', textAlign: 'center' }}>
            © 2026 Hlaing Min Oo. Liquid Crystal Edition.
          </p>
        </div>
      </section>
    </main>
  );
}
