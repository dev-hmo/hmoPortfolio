'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from './TiltCard';
import { FaExternalLinkAlt, FaCode, FaTasks, FaShieldAlt } from 'react-icons/fa';

const frontendProjects = [
  { name: 'Oryx Training Center', url: 'https://oryx-training-center.vercel.app/', tags: ['React', 'Next.js'] },
  { name: 'Booking MM', url: 'https://bookingmm.vercel.app/', tags: ['React', 'Next.js'] },
  { name: 'Vape Shop', url: 'https://vape-shop-delta.vercel.app/', tags: ['E-commerce', 'Frontend'] },
  { name: 'Pixel Forge', url: 'https://pixel-forge-tawny.vercel.app/', tags: ['UI/UX', 'Design'] },
  { name: 'Customer Feedback App', url: 'https://customer-feedback-app-gold.vercel.app/', tags: ['React', 'App'] },
  { name: 'PandaFlim', url: 'https://pandaflim.vercel.app/', tags: ['Entertainment', 'Frontend'] },
  { name: 'Todo List App', url: 'https://todolist-iota-lac-27.vercel.app/', tags: ['React', 'State Management'] },
  { name: 'HMO Portfolio', url: 'https://hmo-porfolio.vercel.app/', tags: ['Portfolio', 'Design'] }
];

const managementProjects = [
  { 
    name: 'Loyalty Mini App & Merchant Management', 
    client: 'Biggest EV Bus Company In Thailand',
    desc: 'End-to-end project coordination ensuring alignment between internal developers and external stakeholders.'
  },
  { 
    name: 'Enterprise School Management System', 
    client: 'Well Known Private High School in Yangon',
    desc: 'Requirement gathering, scope management, and full software development lifecycle management.'
  },
  { 
    name: 'POS + Inventory + Loyalty Mobile App', 
    client: 'Well Knowned Coffee Shop',
    desc: 'Comprehensive UI/UX wireframing, QA testing, and cross-functional team coordination.'
  }
];

const securityProjects = [
  { name: 'Web/Mobile App & AI Agent API Security Assessment', client: 'Well Known HR Software Service Company in Myanmar' },
  { name: 'Mobile Wallet Applications Security Assessment', client: 'One of the largest banks in Myanmar' },
  { name: 'Web Applications Security Assessment', client: 'One of the largest banks in Myanmar' },
  { name: 'Internal Infrastructure Security Assessment', client: 'One of the largest Painting Product Companies in Myanmar' },
  { name: '(LMS) Web Apps, APIs and Internal Infra Security', client: 'Education Services Company from Singapore' }
];

const categories = ['Frontend Development', 'Project Management', 'Cyber Security'];

export default function ProjectShowcase() {
  const [activeTab, setActiveTab] = useState(categories[0]);

  return (
    <div className="projects-wrapper">
      {/* Interactive Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            style={{
              padding: '12px 24px',
              borderRadius: '30px',
              border: '1px solid',
              borderColor: activeTab === category ? 'transparent' : 'var(--glass-border)',
              background: activeTab === category ? 'linear-gradient(90deg, var(--accent-purple), var(--accent-pink))' : 'var(--glass-bg)',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: activeTab === category ? '0 10px 20px -10px var(--accent-pink)' : 'none'
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Animated Content Area */}
      <div style={{ minHeight: '600px' }}>
        <AnimatePresence mode="wait">
          {/* Frontend Category */}
          {activeTab === 'Frontend Development' && (
            <motion.div
              key="frontend"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}
            >
              {frontendProjects.map((item, index) => (
                <TiltCard key={index} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '260px', background: 'linear-gradient(135deg, rgba(0,240,255,0.05), var(--card-bg-solid))', borderTop: '2px solid var(--accent-cyan)' }}>
                  <div>
                    <div style={{ marginBottom: '1.5rem', width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(0,240,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-cyan)' }}>
                      <FaCode size={24} />
                    </div>
                    <h4 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>{item.name}</h4>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                      {item.tags.map(tag => (
                        <span key={tag} style={{ fontSize: '0.75rem', padding: '6px 12px', background: 'var(--glass-bg)', borderRadius: '20px', color: 'var(--accent-cyan)' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <a href={item.url} target="_blank" rel="noreferrer" className="btn-outline" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}
                     onMouseOver={(e) => { e.currentTarget.style.background = 'var(--accent-cyan)'; e.currentTarget.style.color = '#000'; }}
                     onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent-cyan)'; }}>
                    View Site <FaExternalLinkAlt size={12} />
                  </a>
                </TiltCard>
              ))}
            </motion.div>
          )}

          {/* Management Category */}
          {activeTab === 'Project Management' && (
            <motion.div
              key="management"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}
            >
              {managementProjects.map((item, index) => (
                <TiltCard key={index} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '260px', background: 'linear-gradient(135deg, rgba(138,43,226,0.05), var(--card-bg-solid))', borderTop: '2px solid var(--accent-purple)' }}>
                  <div style={{ marginBottom: '1.5rem', width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(138,43,226,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-purple)' }}>
                    <FaTasks size={24} />
                  </div>
                  <h4 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>{item.name}</h4>
                  <div style={{ padding: '1rem', background: 'var(--glass-bg)', borderRadius: '8px', marginBottom: '1rem', borderLeft: '3px solid var(--accent-purple)' }}>
                    <p style={{ color: 'var(--accent-purple)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>Client</p>
                    <p style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>{item.client}</p>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.desc}</p>
                </TiltCard>
              ))}
            </motion.div>
          )}

          {/* Security Category */}
          {activeTab === 'Cyber Security' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}
            >
              {securityProjects.map((item, index) => (
                <TiltCard key={index} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '260px', background: 'linear-gradient(135deg, rgba(255,0,85,0.05), var(--card-bg-solid))', borderTop: '2px solid var(--accent-pink)' }}>
                  <div style={{ marginBottom: '1.5rem', width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255,0,85,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-pink)', boxShadow: '0 0 20px rgba(255,0,85,0.2)' }}>
                    <FaShieldAlt size={24} />
                  </div>
                  <h4 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>{item.name}</h4>
                  
                  <div style={{ padding: '0.5rem 1rem', background: 'var(--glass-bg)', borderRadius: '20px', display: 'inline-block', marginBottom: '1.5rem', alignSelf: 'flex-start', border: '1px solid rgba(255,0,85,0.3)' }}>
                    <span style={{ color: 'var(--accent-pink)', fontSize: '0.8rem', fontWeight: 600 }}>Role:</span> <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Project Coordinator</span>
                  </div>

                  <div style={{ marginTop: 'auto', padding: '1rem', background: 'var(--glass-bg)', borderRadius: '8px', borderLeft: '3px solid var(--accent-pink)' }}>
                    <p style={{ color: 'var(--accent-pink)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>Client</p>
                    <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{item.client}</p>
                  </div>
                </TiltCard>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
