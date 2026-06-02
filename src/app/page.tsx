import ThreeBackground from '@/components/ThreeBackground';
import TiltCard from '@/components/TiltCard';
import Timeline from '@/components/Timeline';
import TechShowcase from '@/components/TechShowcase';
import ContactForm from '@/components/ContactForm';
import ProjectShowcase from '@/components/ProjectShowcase';
import TextReveal from '@/components/TextReveal';
import MagneticElement from '@/components/MagneticElement';
import RotatingText from '@/components/RotatingText';
import StatsCounter from '@/components/StatsCounter';
import Services from '@/components/Services';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Home() {
  return (
    <main>
      <ThreeBackground />
      
      {/* Hero Section */}
      <section id="hero" style={{ height: '100vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div className="container" style={{ textAlign: 'center', zIndex: 10 }}>
          <TextReveal 
            text="Hlaing Min Oo" 
            style={{ fontSize: '4.5rem', marginBottom: '0.5rem', textShadow: '0 0 20px rgba(0,240,255,0.3)', letterSpacing: '-0.02em', lineHeight: 1.1, fontWeight: 700 }}
          />
          <RotatingText />
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
            Detail-oriented and technically grounded Project Coordinator with a strong background in frontend web development and extensive experience in end-to-end software project management.
          </p>
          <MagneticElement>
            <a href="#work" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ boxShadow: '0 0 30px rgba(138, 43, 226, 0.5)' }}>View My Work</button>
            </a>
          </MagneticElement>
        </div>
      </section>

      {/* Impact Stats */}
      <section style={{ padding: '40px 0', position: 'relative', zIndex: 10, background: 'rgba(0,0,0,0.5)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container">
          <StatsCounter />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '100px 0', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <h2 style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '1rem' }}>
            Core <span className="text-gradient">Services</span>
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '4rem', fontSize: '1.1rem' }}>
            Multi-disciplinary expertise to drive your digital products forward.
          </p>
          <Services />
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '100px 0', position: 'relative', zIndex: 10 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <TiltCard style={{ padding: '3rem', height: '100%' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Driving Project <span className="text-gradient">Success</span></h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                Proven track record of aligning internal cross-functional teams and bridging communication with external high-profile corporate clients. Adept at requirement gathering, timeline tracking, UI/UX wireframing, and rigorous QA/UAT testing to deliver secure, high-quality enterprise solutions.
              </p>
            </TiltCard>
          </div>
          <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '300px', height: '300px' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(45deg, var(--accent-cyan), var(--accent-purple))', borderRadius: '50%', filter: 'blur(50px)', opacity: 0.5 }}></div>
              <div className="glass" style={{ width: '100%', height: '100%', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', position: 'relative', zIndex: 2, border: '2px solid rgba(255,255,255,0.2)' }}>
                🚀
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" style={{ padding: '100px 0', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <h2 style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '4rem' }}>
            My <span className="text-gradient">Journey</span>
          </h2>
          <Timeline />
        </div>
      </section>

      {/* Skills / Tech Showcase */}
      <section id="skills" style={{ padding: '100px 0', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <h2 style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '2rem' }}>
            Tech <span className="text-gradient">Arsenal</span>
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '4rem', fontSize: '1.1rem' }}>
            The tools and technologies I use to bring ideas to life.
          </p>
          <TechShowcase />
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" style={{ padding: '100px 0', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <h2 style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '4rem' }}>
            Featured <span className="text-gradient">Projects</span>
          </h2>
          
          <ProjectShowcase />
        </div>
      </section>

      {/* Footer / Contact */}
      <section id="contact" style={{ padding: '120px 0 80px 0', position: 'relative', zIndex: 10, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
        <div className="container">
          <h2 style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '1.5rem' }}>Let's Create Something <span className="text-gradient">Amazing</span></h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '4rem', fontSize: '1.2rem' }}>Ready to take your digital presence to the next dimension?</p>
          
          <ContactForm />
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '6rem', marginBottom: '3rem' }}>
            <MagneticElement>
              <a href="https://github.com/dev-hmo" target="_blank" rel="noreferrer" className="social-link github"><FaGithub /></a>
            </MagneticElement>
            <MagneticElement>
              <a href="https://www.linkedin.com/in/hlaing-min-oo-656369240" target="_blank" rel="noreferrer" className="social-link linkedin"><FaLinkedin /></a>
            </MagneticElement>
          </div>
          
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem', textAlign: 'center' }}>
            © 2026 Hlaing Min Oo. Designed with passion.
          </p>
        </div>
      </section>
    </main>
  );
}
