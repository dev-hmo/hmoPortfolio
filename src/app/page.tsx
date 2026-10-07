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
import { FaGithub, FaLinkedin, FaArrowRight, FaCode, FaRocket, FaLaptopCode } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main style={{ position: 'relative', overflowX: 'hidden' }}>
      {/* Subtle Technical Mesh Background */}
      <LiquidBackground />

      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION — Clean Precision Layout
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
            {/* Left Column: Direct, Technical Developer Heading & CTAs */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 xl:col-span-7 flex flex-col items-start lg:pl-6 xl:pl-10 max-w-[620px]"
            >
              {/* Technical Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 14px',
                  borderRadius: '9999px',
                  background: 'var(--accent-teal-subtle)',
                  border: '1px solid rgba(20, 184, 166, 0.25)',
                  marginBottom: '1.25rem',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-teal)',
                    display: 'inline-block',
                  }}
                />
                <span
                  style={{
                    color: 'var(--accent-teal)',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  Available for Frontend &amp; Full-Stack Roles
                </span>
              </motion.div>

              {/* Clean Wavy Title Entrance */}
              <div style={{ width: '100%', marginBottom: '0.35rem' }}>
                <TextReveal
                  text={t.hero.title}
                  style={{
                    fontSize: 'clamp(2.75rem, 5.5vw, 4.25rem)',
                    fontWeight: 800,
                    lineHeight: 1.05,
                    letterSpacing: '-0.035em',
                    justifyContent: 'flex-start',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              {/* Developer Roles Showcase */}
              <div style={{ width: '100%', marginBottom: '1.2rem' }}>
                <RotatingText align="left" />
              </div>

              {/* Technical, Direct Bio */}
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                  maxWidth: '520px',
                }}
              >
                {t.hero.subtitle}
              </p>

              {/* Clean Action CTAs */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
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
                      padding: '12px 26px',
                      borderRadius: '9999px',
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-primary)',
                      fontWeight: 500,
                      fontSize: '0.92rem',
                      letterSpacing: '-0.01em',
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
                    {t.nav.contact}
                  </a>
                </MagneticElement>
              </div>

              {/* Technical Highlights */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  flexWrap: 'wrap',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--glass-border)',
                  width: '100%',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  <FaLaptopCode color="var(--accent-teal)" size={14} />
                  <span>React &amp; Next.js 15</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  <FaCode color="var(--accent-teal)" size={14} />
                  <span>TypeScript &amp; Tailwind</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  <FaRocket color="var(--accent-teal)" size={14} />
                  <span>REST APIs &amp; CI/CD</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: 3D Element Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 xl:col-span-5 flex justify-center items-center relative"
            >
              <SplineHero />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          IMPACT STATS — Precision Metrics Bar
          ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: '45px 0',
          position: 'relative',
          zIndex: 10,
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--glass-border)',
          borderBottom: '1px solid var(--glass-border)',
        }}
      >
        <div className="container">
          <StatsCounter />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SERVICES SECTION — Engineering Solutions
          ═══════════════════════════════════════════════════════════ */}
      <section id="services" style={{ padding: 'clamp(80px, 10vw, 110px) 0', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(2.25rem, 4vw, 3rem)', textAlign: 'center', marginBottom: '0.85rem' }}>
            {t.services.title1} <span className="text-gradient">{t.services.title2}</span>
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: 'var(--text-secondary)',
              marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
              maxWidth: '640px',
              margin: '0 auto clamp(2.5rem, 4vw, 3.5rem) auto',
            }}
          >
            {t.services.desc}
          </p>
          <Services />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ABOUT SECTION — Architecture & Engineering Focus
          ═══════════════════════════════════════════════════════════ */}
      <section id="about" style={{ padding: 'clamp(80px, 10vw, 110px) 0', position: 'relative', zIndex: 10 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(2rem, 5vw, 4rem)', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 450px' }}>
            <CrystalCard style={{ padding: 'clamp(2rem, 4vw, 3rem)', height: '100%' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  background: 'var(--accent-teal-subtle)',
                  border: '1px solid rgba(20, 184, 166, 0.25)',
                  color: 'var(--accent-teal)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '1.25rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                }}
              >
                Frontend Developer
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1.25rem' }}>
                {t.about.title1} <span className="text-gradient">{t.about.title2}</span>
              </h2>
              <p style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '2rem' }}>
                {t.about.desc}
              </p>
              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                <div style={{ padding: '12px 18px', background: 'var(--glass-bg)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                  <span style={{ color: 'var(--accent-teal)', fontWeight: 700, fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}>100%</span>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', margin: 0 }}>Responsive &amp; Mobile-First</p>
                </div>
                <div style={{ padding: '12px 18px', background: 'var(--glass-bg)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                  <span style={{ color: 'var(--accent-teal)', fontWeight: 700, fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}>Figma</span>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', margin: 0 }}>Design System Fidelity</p>
                </div>
                <div style={{ padding: '12px 18px', background: 'var(--glass-bg)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                  <span style={{ color: 'var(--accent-teal)', fontWeight: 700, fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}>Next.js</span>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', margin: 0 }}>Modern Component Architecture</p>
                </div>
              </div>
            </CrystalCard>
          </div>

          <div style={{ flex: '1 1 360px', display: 'flex', justifyContent: 'center' }}>
            <div
              className="glass"
              style={{
                width: '320px',
                height: '320px',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                textAlign: 'center',
                border: '1px solid var(--glass-border)',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: 'var(--accent-teal-subtle)',
                  border: '1px solid rgba(20, 184, 166, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-teal)',
                  marginBottom: '1rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                }}
              >
                &lt;/&gt;
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Engineering Focus
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, maxWidth: '240px' }}>
                Component modularity, type safety with TypeScript, and sub-second load times.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          EXPERIENCE TIMELINE
          ═══════════════════════════════════════════════════════════ */}
      <section id="experience" style={{ padding: 'clamp(80px, 10vw, 110px) 0', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(2.25rem, 4vw, 3rem)', textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
            {t.experience.title1} <span className="text-gradient">{t.experience.title2}</span>
          </h2>
          <Timeline />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PROJECT SHOWCASE
          ═══════════════════════════════════════════════════════════ */}
      <section id="work" style={{ padding: 'clamp(80px, 10vw, 110px) 0', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(2.25rem, 4vw, 3rem)', textAlign: 'center', marginBottom: '0.85rem' }}>
            {t.work.title1} <span className="text-gradient">{t.work.title2}</span>
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: 'var(--text-secondary)',
              marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
              maxWidth: '640px',
              margin: '0 auto clamp(2.5rem, 4vw, 3.5rem) auto',
            }}
          >
            {t.work.desc}
          </p>
          <ProjectShowcase />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CONTACT SECTION
          ═══════════════════════════════════════════════════════════ */}
      <section id="contact" style={{ padding: 'clamp(90px, 12vw, 120px) 0 60px 0', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(2.25rem, 4vw, 3rem)', textAlign: 'center', marginBottom: '0.85rem' }}>
            {t.contact.title1} <span className="text-gradient">{t.contact.title2}</span>
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              textAlign: 'center',
              marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
              maxWidth: '560px',
              margin: '0 auto clamp(2rem, 4vw, 3.5rem) auto',
            }}
          >
            {t.contact.desc}
          </p>

          <ContactForm />

          {/* Clean Social Links */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '4rem', marginBottom: '2rem' }}>
            <MagneticElement>
              <a
                href="https://github.com/dev-hmo"
                target="_blank"
                rel="noreferrer"
                className="social-link"
                aria-label="GitHub Profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                <FaGithub size={18} />
              </a>
            </MagneticElement>

            <MagneticElement>
              <a
                href="https://www.linkedin.com/in/hlaing-min-oo-656369240"
                target="_blank"
                rel="noreferrer"
                className="social-link"
                aria-label="LinkedIn Profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                <FaLinkedin size={18} />
              </a>
            </MagneticElement>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
            © 2026 Hlaing Min Oo • Built with Next.js &amp; TypeScript
          </p>
        </div>
      </section>
    </main>
  );
}
