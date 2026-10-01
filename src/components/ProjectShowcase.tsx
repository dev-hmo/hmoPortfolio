'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CrystalCard from './CrystalCard';
import { FaExternalLinkAlt, FaCode, FaCheckCircle, FaShieldAlt, FaMobileAlt, FaServer, FaBug } from 'react-icons/fa';
import Image from 'next/image';

interface QAProject {
  id: string;
  name: string;
  client: string;
  desc: string;
  tags: string[];
  badge: string;
  thumbnailType: 'fintech' | 'school' | 'evbus' | 'pos';
  urlEndpoint: string;
  suiteMetrics: {
    status: string;
    testsRun: string;
    keyMetric: string;
  };
}

const qaProjects: QAProject[] = [
  {
    id: 'fintech',
    name: 'Fintech Platform & Payment Gateway UAT',
    client: 'Infinity Success Co., Ltd',
    desc: 'Performed manual QA testing on core fintech workflows, provided direct technical support and troubleshooting for clients, and managed accurate data entry to ensure system reliability.',
    tags: ['QA Testing', 'Tech Support', 'Data Entry', 'Manual Testing'],
    badge: 'QA & Tech Support',
    thumbnailType: 'fintech',
    urlEndpoint: 'uat.payment-gateway.io/checkout',
    suiteMetrics: {
      status: 'WORKFLOWS VERIFIED',
      testsRun: 'Core Fintech QA',
      keyMetric: 'Data Entry & Support'
    }
  },
  {
    id: 'school',
    name: 'Multi-Tenant School Management Platform',
    client: 'Well Known Private High School in Yangon',
    desc: 'Acted as a Project Coordinator and Software Tester. Streamlined communication between developers and the school administration while executing test cases to validate gradebooks and role-based permissions.',
    tags: ['Project Coordination', 'Testing', 'Test Case Design', 'Cross-Browser'],
    badge: 'Coordinator & Tester',
    thumbnailType: 'school',
    urlEndpoint: 'school-portal.edu.mm/admin/uat',
    suiteMetrics: {
      status: 'TEST CASES VALIDATED',
      testsRun: 'Gradebooks & Roles',
      keyMetric: 'Cross-Browser Testing'
    }
  },
  {
    id: 'evbus',
    name: 'EV Bus Fleet & Loyalty Mini App Testing',
    client: 'Leading EV Bus Company in Thailand',
    desc: 'Supported the project as a Coordinator and Tester. Managed testing timelines and executed usability tests on mobile web and wrappers, documenting bugs clearly for the development team.',
    tags: ['Project Coordination', 'Usability Testing', 'Bug Tracking', 'Mobile QA'],
    badge: 'Coordinator & Tester',
    thumbnailType: 'evbus',
    urlEndpoint: 'miniapp.ev-transit.th/uat',
    suiteMetrics: {
      status: 'TIMELINES & QA SYNCED',
      testsRun: 'Mobile Web & Wrappers',
      keyMetric: 'Detailed Bug Reports'
    }
  },
  {
    id: 'pos',
    name: 'F&B POS + Inventory Mobile App QA',
    client: 'Popular Coffee Chain',
    desc: 'Served as Project Coordinator and Tester for a popular coffee chain\'s POS system. Coordinated testing phases and validated offline sync capabilities and hardware integration.',
    tags: ['Project Coordination', 'Integration Testing', 'Hardware Testing', 'Jira'],
    badge: 'Coordinator & Tester',
    thumbnailType: 'pos',
    urlEndpoint: 'pos-cloud.system/terminal-qa',
    suiteMetrics: {
      status: 'PHASES COORDINATED',
      testsRun: 'Offline Sync & HW',
      keyMetric: 'Hardware Integration OK'
    }
  }
];

const frontendProjects = [
  { name: 'Pixel Forge Studio', url: 'https://pixel-forge-tawny.vercel.app/', img: '/img/pixelforge.png', tags: ['UI/UX', 'Framer Motion', 'Design'] },
  { name: 'Vape Shop E-Commerce', url: 'https://vape-shop-delta.vercel.app/', img: '/img/vapeshop.png', tags: ['E-commerce', 'Frontend', 'Debugging'] },
  { name: 'Customer Feedback Portal', url: 'https://customer-feedback-app-gold.vercel.app/', img: '/img/customerfeedbackapp.png', tags: ['React', 'Form Validation', 'State Management'] },
  { name: 'PandaFlim Streaming UI', url: 'https://pandaflim.vercel.app/', img: '/img/pandaflim.png', tags: ['Entertainment', 'Frontend', 'Media Queries'] },
  { name: 'Task & Bug Tracker App', url: 'https://todolist-iota-lac-27.vercel.app/', img: '/img/todolist.png', tags: ['React', 'State Management', 'CRUD QA'] },
  { name: 'Oryx Training Center', url: 'https://oryx-training-center.vercel.app/', img: null, tags: ['React', 'Next.js', 'Responsive'] },
  { name: 'Booking MM', url: 'https://bookingmm.vercel.app/', img: null, tags: ['React', 'Next.js', 'UI Testing'] },
  { name: 'HMO Portfolio', url: 'https://hmo-porfolio.vercel.app/', img: '/img/oldportfolio.png', tags: ['Next.js 16', 'Liquid Crystal', 'Framer Motion'] }
];

const securityProjects = [
  { 
    name: 'Web/Mobile App & AI Agent API Security Assessment', 
    client: 'HR Software Service Company in Myanmar',
    desc: 'Coordinated security assessment projects for an HR software service company. Managed project timelines, scheduled meetings, tracked deliverables, and facilitated communication between clients and security engineers.',
    badge: 'Project Coordinator',
    tags: ['Project Coordination', 'Timeline Management', 'Client Communication', 'Task Tracking']
  },
  { 
    name: 'Mobile Banking Wallet Security Assessment', 
    client: 'Tier-1 Commercial Bank in Myanmar',
    desc: 'Served as Project Coordinator for a commercial bank security audit project. Tracked remediation schedules, managed project milestones, and organized administrative documentation.',
    badge: 'Project Coordinator',
    tags: ['Project Management', 'Schedule Tracking', 'Milestone Delivery', 'Documentation']
  },
  { 
    name: 'Enterprise Web Applications Security Assessment', 
    client: 'Major Banking Institution',
    desc: 'Coordinated enterprise-level web security assessments for banking institutions. Managed project tracking boards, scheduled review meetings, and ensured smooth workflow execution between teams.',
    badge: 'Project Coordinator',
    tags: ['Project Coordination', 'Workflow Management', 'Meeting Scheduling', 'Progress Reporting']
  },
  { 
    name: 'Internal Infrastructure Security Assessment', 
    client: 'Leading Industrial Manufacturing Corporation',
    desc: 'Coordinated internal infrastructure audit projects for an industrial corporation. Managed project documentation, tracked compliance checklists, and organized administrative workflows.',
    badge: 'Project Coordinator',
    tags: ['Project Coordination', 'Documentation', 'Compliance Tracking', 'Administration']
  }
];

const categories = ['QA & Testing', 'Frontend Development', 'Cyber Security Coordination'];

/* ═══════════════════════════════════════════════════════════
   QA THUMBNAIL COMPONENT
   Interactive high-fidelity preview simulating test suites,
   dashboards, and telemetry for QA projects.
   ═══════════════════════════════════════════════════════════ */
function QAThumbnail({ project }: { project: QAProject }) {
  return (
    <div
      style={{
        width: '100%',
        height: '175px',
        borderRadius: '14px',
        overflow: 'hidden',
        position: 'relative',
        marginBottom: '1.25rem',
        border: '1px solid rgba(0, 240, 255, 0.2)',
        background: 'rgba(5, 2, 18, 0.9)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Browser / Test Suite Chrome Header */}
      <div
        style={{
          height: '28px',
          background: 'rgba(255, 255, 255, 0.04)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 10px',
          zIndex: 3,
        }}
      >
        {/* macOS Dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
        </div>

        {/* Mock Endpoint / URL Bar */}
        <div
          style={{
            fontSize: '0.68rem',
            fontFamily: 'monospace',
            color: 'rgba(255, 255, 255, 0.65)',
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '2px 10px',
            borderRadius: '9999px',
            border: '1px solid rgba(0, 240, 255, 0.15)',
            maxWidth: '220px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          🔒 https://{project.urlEndpoint}
        </div>

        {/* QA Pass Status Indicator */}
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#00f0ff',
            boxShadow: '0 0 8px #00f0ff',
          }}
        />
      </div>

      {/* Visual Workspace Mockup Area */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          padding: '12px 14px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Dynamic Background Mesh Gradients based on QA Project Type */}
        {project.thumbnailType === 'fintech' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 80% 20%, rgba(0, 240, 255, 0.22) 0%, rgba(138, 43, 226, 0.15) 50%, rgba(5, 2, 20, 0.95) 100%)',
            }}
          />
        )}
        {project.thumbnailType === 'school' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 20% 30%, rgba(138, 43, 226, 0.25) 0%, rgba(0, 240, 255, 0.12) 50%, rgba(5, 2, 20, 0.95) 100%)',
            }}
          />
        )}
        {project.thumbnailType === 'evbus' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.22) 0%, rgba(0, 240, 255, 0.15) 50%, rgba(5, 2, 20, 0.95) 100%)',
            }}
          />
        )}
        {project.thumbnailType === 'pos' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 30% 80%, rgba(245, 158, 11, 0.2) 0%, rgba(138, 43, 226, 0.15) 50%, rgba(5, 2, 20, 0.95) 100%)',
            }}
          />
        )}

        {/* Ambient Subtle Grid Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            pointerEvents: 'none',
          }}
        />

        {/* Specific Visual Mockup Content */}
        {project.thumbnailType === 'fintech' && (
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', background: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.4)', color: '#4ade80', fontFamily: 'monospace' }}>
                  POST /v1/charge
                </span>
                <span style={{ fontSize: '0.65rem', color: '#00f0ff', fontFamily: 'monospace' }}>200 OK (42ms)</span>
              </div>
              <span style={{ fontSize: '0.68rem', color: '#ffffff', fontWeight: 600 }}>💳 API Gateway UAT</span>
            </div>

            {/* Simulated Payment Card Mockup */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(0, 240, 255, 0.05) 100%)',
                backdropFilter: 'blur(10px)',
                borderRadius: '8px',
                padding: '6px 10px',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '18px', height: '14px', borderRadius: '3px', background: 'linear-gradient(135deg, #fbbf24, #d97706)', display: 'inline-block' }} />
                <span style={{ fontSize: '0.72rem', color: '#e2e8f0', fontFamily: 'monospace' }}>•••• 4821</span>
              </div>
              <span style={{ fontSize: '0.68rem', color: '#34d399', fontWeight: 600 }}>✓ Signature Valid</span>
            </div>
          </div>
        )}

        {project.thumbnailType === 'school' && (
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.68rem', color: '#c084fc', fontWeight: 600 }}>🎓 Portal Role Matrix</span>
              <span style={{ fontSize: '0.62rem', padding: '2px 6px', borderRadius: '9999px', background: 'rgba(138, 43, 226, 0.25)', border: '1px solid rgba(138, 43, 226, 0.4)', color: '#e9d5ff' }}>
                48 Scenarios
              </span>
            </div>

            {/* Role Validation Pills */}
            <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.65rem', padding: '3px 8px', borderRadius: '6px', background: 'rgba(0, 240, 255, 0.1)', border: '1px solid rgba(0, 240, 255, 0.3)', color: '#00f0ff' }}>
                ✓ Admin Panel
              </span>
              <span style={{ fontSize: '0.65rem', padding: '3px 8px', borderRadius: '6px', background: 'rgba(138, 43, 226, 0.1)', border: '1px solid rgba(138, 43, 226, 0.3)', color: '#c084fc' }}>
                ✓ Teacher Portal
              </span>
              <span style={{ fontSize: '0.65rem', padding: '3px 8px', borderRadius: '6px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#e2e8f0' }}>
                ✓ Student View
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
              <span>Browsers:</span>
              <span style={{ color: '#ffffff', fontWeight: 500 }}>Chrome • Safari • Edge • Firefox</span>
            </div>
          </div>
        )}

        {project.thumbnailType === 'evbus' && (
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.68rem', color: '#34d399', fontWeight: 600 }}>🚌 Fleet Mobile QA</span>
              <span style={{ fontSize: '0.62rem', padding: '2px 6px', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#6ee7b7' }}>
                ClickUp #142 Fixed
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '6px',
                background: 'rgba(0, 0, 0, 0.35)',
                borderRadius: '8px',
                padding: '6px 8px',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div>
                <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>QR Ticket Scanner:</span>
                <p style={{ margin: 0, fontSize: '0.68rem', color: '#00f0ff', fontWeight: 600 }}>✓ Sub-second Pass</p>
              </div>
              <div>
                <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>Offline Sync:</span>
                <p style={{ margin: 0, fontSize: '0.68rem', color: '#34d399', fontWeight: 600 }}>✓ Zero Packet Loss</p>
              </div>
            </div>
          </div>
        )}

        {project.thumbnailType === 'pos' && (
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.68rem', color: '#fbbf24', fontWeight: 600 }}>☕ F&amp;B POS Stress Testing</span>
              <span style={{ fontSize: '0.62rem', padding: '2px 6px', borderRadius: '9999px', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.4)', color: '#fde68a' }}>
                Jira Sprint Closed
              </span>
            </div>

            <div
              style={{
                background: 'rgba(0,0,0,0.35)',
                borderRadius: '8px',
                padding: '6px 10px',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span style={{ fontSize: '0.62rem', color: 'var(--text-secondary)' }}>Barcode Scan &amp; Cache:</span>
                <p style={{ margin: 0, fontSize: '0.68rem', color: '#ffffff', fontWeight: 600 }}>Hardware Sync Validated</p>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>100% OK</span>
            </div>
          </div>
        )}

        {/* Bottom Test Summary Bar */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '6px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <FaCheckCircle size={10} color="#00f0ff" />
            <span style={{ fontSize: '0.66rem', color: '#00f0ff', fontWeight: 600, fontFamily: 'monospace' }}>
              {project.suiteMetrics.status}
            </span>
          </div>
          <span style={{ fontSize: '0.64rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
            {project.suiteMetrics.keyMetric}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectShowcase() {
  const [activeTab, setActiveTab] = useState(categories[0]);

  return (
    <div className="projects-wrapper">
      {/* Interactive Crystal Filter Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
        {categories.map((category) => {
          const isSelected = activeTab === category;
          return (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              style={{
                position: 'relative',
                padding: '12px 28px',
                borderRadius: '9999px',
                border: isSelected ? '1px solid rgba(0, 240, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                background: isSelected 
                  ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.25) 0%, rgba(138, 43, 226, 0.3) 100%)' 
                  : 'rgba(10, 5, 28, 0.5)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isSelected 
                  ? '0 0 25px rgba(0, 240, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                  : 'none'
              }}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Animated Content Grid */}
      <div style={{ minHeight: '520px' }}>
        <AnimatePresence mode="wait">
          {/* QA & Testing Category with Rich Visual Thumbnails */}
          {activeTab === 'QA & Testing' && (
            <motion.div
              key="qa"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}
            >
              {qaProjects.map((item) => (
                <CrystalCard key={item.id} style={{ padding: '1.75rem', minHeight: '380px', display: 'flex', flexDirection: 'column' }}>
                  {/* Visual Image / Workspace Thumbnail */}
                  <QAThumbnail project={item} />

                  {/* Header & Role Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '9999px', background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.3)', color: '#00f0ff', fontWeight: 600 }}>
                      {item.badge}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                      {item.suiteMetrics.testsRun}
                    </span>
                  </div>
                  
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.35rem', color: '#ffffff', lineHeight: 1.35, fontWeight: 700 }}>{item.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#00f0ff', marginBottom: '0.85rem', fontWeight: 500 }}>Client: {item.client}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem', flexGrow: 1 }}>{item.desc}</p>
                  
                  {/* QA Skill Tags */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                    {item.tags.map(tag => (
                      <span key={tag} style={{ fontSize: '0.72rem', padding: '4px 10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', color: 'var(--text-secondary)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </CrystalCard>
              ))}
            </motion.div>
          )}

          {/* Frontend Category with Image Thumbnails */}
          {activeTab === 'Frontend Development' && (
            <motion.div
              key="frontend"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '2rem' }}
            >
              {frontendProjects.map((item, index) => (
                <CrystalCard key={index} style={{ padding: '1.75rem', minHeight: '380px', display: 'flex', flexDirection: 'column' }}>
                  {/* Thumbnail Image Header */}
                  <div
                    style={{
                      width: '100%',
                      height: '165px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      position: 'relative',
                      marginBottom: '1.25rem',
                      background: 'rgba(5, 2, 18, 0.8)',
                      border: '1px solid rgba(138, 43, 226, 0.25)',
                    }}
                  >
                    {item.img ? (
                      <img
                        src={item.img}
                        alt={item.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'top center',
                          transition: 'transform 0.4s ease',
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(138, 43, 226, 0.15) 100%)',
                        }}
                      >
                        <FaCode size={32} color="#00f0ff" style={{ marginBottom: '8px' }} />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>React / Next.js Web App</span>
                      </div>
                    )}
                  </div>

                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: '#ffffff', lineHeight: 1.35, fontWeight: 700 }}>{item.name}</h4>

                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem', flexGrow: 1 }}>
                    {item.tags.map(tag => (
                      <span key={tag} style={{ fontSize: '0.72rem', padding: '4px 10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', color: '#00f0ff' }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    style={{ 
                      textDecoration: 'none', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      gap: '8px', 
                      padding: '10px 18px', 
                      borderRadius: '9999px',
                      background: 'rgba(0, 240, 255, 0.08)',
                      border: '1px solid rgba(0, 240, 255, 0.3)',
                      color: '#00f0ff',
                      fontWeight: 600,
                      fontSize: '0.88rem',
                      transition: 'all 0.25s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 240, 255, 0.25)';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 240, 255, 0.08)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    View Project <FaExternalLinkAlt size={12} />
                  </a>
                </CrystalCard>
              ))}
            </motion.div>
          )}

          {/* Cyber Security Coordination Category */}
          {activeTab === 'Cyber Security Coordination' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '2rem' }}
            >
              {securityProjects.map((item, index) => (
                <CrystalCard key={index} style={{ padding: '2rem', minHeight: '280px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(255,0,85,0.1)', border: '1px solid rgba(255,0,85,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff0055', boxShadow: '0 0 15px rgba(255,0,85,0.2)' }}>
                      <FaShieldAlt size={22} />
                    </div>
                    <span style={{ fontSize: '0.72rem', padding: '4px 10px', borderRadius: '9999px', background: 'rgba(255,0,85,0.1)', border: '1px solid rgba(255,0,85,0.3)', color: '#ff0055', fontWeight: 600 }}>
                      {item.badge}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ffffff', lineHeight: 1.35, fontWeight: 700 }}>{item.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#ff0055', marginBottom: '1rem', fontWeight: 500 }}>Client: {item.client}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, flexGrow: 1 }}>{item.desc}</p>
                  
                  {/* Cyber Security Coordination Tags */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                    {item.tags.map((tag: string) => (
                      <span key={tag} style={{ fontSize: '0.72rem', padding: '4px 10px', background: 'rgba(255,0,85,0.06)', border: '1px solid rgba(255,0,85,0.2)', borderRadius: '9999px', color: 'var(--text-secondary)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </CrystalCard>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
