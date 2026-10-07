'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CrystalCard from './CrystalCard';
import { FaExternalLinkAlt, FaCode, FaShieldAlt } from 'react-icons/fa';

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
    desc: 'Performed end-to-end QA validation on payment workflows, managed API regression suites, and verified transactional data integrity across distributed payment services.',
    tags: ['QA Testing', 'REST API', 'Data Validation', 'Manual Testing'],
    badge: 'QA & Support',
    thumbnailType: 'fintech',
    urlEndpoint: 'uat.payment-gateway.io/checkout',
    suiteMetrics: {
      status: 'WORKFLOWS VERIFIED',
      testsRun: 'Payment API Suites',
      keyMetric: 'Zero Critical Leaks'
    }
  },
  {
    id: 'school',
    name: 'Multi-Tenant School Management Platform',
    client: 'Private High School in Yangon',
    desc: 'Served as Technical Coordinator and Tester. Coordinated feature delivery between school leadership and development teams, designing test cases for role-based RBAC permissions.',
    tags: ['Project Coordination', 'Test Strategy', 'RBAC Testing', 'Cross-Browser'],
    badge: 'Coordinator & QA',
    thumbnailType: 'school',
    urlEndpoint: 'school-portal.edu.mm/admin/uat',
    suiteMetrics: {
      status: 'TEST CASES VALIDATED',
      testsRun: 'Gradebooks & Permissions',
      keyMetric: 'Cross-Browser Verified'
    }
  },
  {
    id: 'evbus',
    name: 'EV Bus Fleet & Loyalty Mini App Testing',
    client: 'EV Transit Operator in Thailand',
    desc: 'Managed release verification timelines and performed usability testing across responsive mobile web views and native wrappers, cataloging defect reproduction scripts in Jira.',
    tags: ['Coordination', 'Mobile Web QA', 'Defect Tracking', 'Jira'],
    badge: 'Coordinator & QA',
    thumbnailType: 'evbus',
    urlEndpoint: 'miniapp.ev-transit.th/uat',
    suiteMetrics: {
      status: 'RELEASE SYNCHRONIZED',
      testsRun: 'Mobile Web & Wrappers',
      keyMetric: 'Clear Defect Reports'
    }
  },
  {
    id: 'pos',
    name: 'F&B POS + Inventory App Verification',
    client: 'Regional Coffee Chain',
    desc: 'Coordinated technical sprint testing for touch terminal POS software. Validated offline data sync, thermal printer hardware peripherals, and real-time inventory updates.',
    tags: ['Integration Testing', 'Offline Sync', 'Hardware Integration', 'Jira'],
    badge: 'Coordinator & QA',
    thumbnailType: 'pos',
    urlEndpoint: 'pos-cloud.system/terminal-qa',
    suiteMetrics: {
      status: 'HARDWARE VALIDATED',
      testsRun: 'Offline Sync & HW',
      keyMetric: 'Hardware Integration OK'
    }
  }
];

const frontendProjects = [
  { name: 'Oryx Training Center', url: 'https://oryx-training-center.vercel.app/', img: null, tags: ['React', 'Next.js', 'Tailwind CSS', 'Responsive UI'], desc: 'Modern educational training platform built with Next.js and Tailwind CSS. Features dynamic course routing, mobile-first layouts, and accessible component architecture.' },
  { name: 'Booking MM', url: 'https://bookingmm.vercel.app/', img: null, tags: ['React', 'Next.js', 'REST APIs', 'Tailwind CSS'], desc: 'Full-featured booking platform with React-powered client interfaces, real-time availability querying via REST APIs, and a streamlined checkout flow.' },
  { name: 'HMO Portfolio', url: 'https://hmo-porfolio.vercel.app/', img: '/img/oldportfolio.png', tags: ['Next.js 15', 'Tailwind CSS', 'Framer Motion', 'TypeScript'], desc: 'High-performance engineering portfolio built with Next.js, featuring responsive glassmorphism, Framer Motion micro-interactions, and light/dark theme adaptation.' },
  { name: 'Panda Film Engine', url: 'https://pandaflim.vercel.app/', img: '/img/pandaflim.png', tags: ['React', 'API Integration', 'Responsive UI', 'Next.js'], desc: 'High-speed movie exploration interface utilizing Next.js image optimization, instant search with debounced API queries, and responsive grid layouts.' },
  { name: 'Pi Vape E-Commerce', url: 'https://vape-shop-delta.vercel.app/', img: '/img/vapeshop.png', tags: ['React', 'E-Commerce', 'Framer Motion', 'Tailwind CSS'], desc: 'Refined e-commerce showcase featuring responsive product catalog components, smooth cart state management, and conversion-focused UI patterns.' },
  { name: 'Feedback Cloud', url: 'https://customer-feedback-app-gold.vercel.app/', img: '/img/customerfeedbackapp.png', tags: ['React', 'Firebase', 'State Management', 'Real-time'], desc: 'Real-time client sentiment dashboard built with React and Firestore. Features reactive state updates, instant form validation, and live survey data aggregation.' },
  { name: 'Pixel Forge Studio', url: 'https://pixel-forge-tawny.vercel.app/', img: '/img/pixelforge.png', tags: ['React', 'Component Library', 'Framer Motion', 'TypeScript'], desc: 'Interactive frontend component laboratory exploring reusable UI patterns, accessible keyboard navigation, and modular component design systems.' },
  { name: 'Task Manager App', url: 'https://todolist-iota-lac-27.vercel.app/', img: '/img/todolist.png', tags: ['React', 'Node.js', 'MongoDB', 'Full-Stack'], desc: 'Full-stack task management application with React frontend, Node.js backend, and MongoDB storage. Implements complete CRUD workflows and live state updates.' },
];

const securityProjects = [
  { 
    name: 'Web/Mobile App & AI Agent API Security Assessment', 
    client: 'HR Software Service Company in Myanmar',
    desc: 'Coordinated technical security assessment milestones for enterprise HR systems. Managed vulnerability remediation tracking, client meetings, and technical documentation.',
    badge: 'Project Coordinator',
    tags: ['Milestone Delivery', 'Technical Coordination', 'Deliverable Tracking']
  },
  { 
    name: 'Mobile Banking Wallet Security Assessment', 
    client: 'Commercial Banking Institution',
    desc: 'Coordinated security audit deliverables for mobile wallet systems. Monitored remediation sprint schedules and maintained compliance documentation.',
    badge: 'Project Coordinator',
    tags: ['Audit Coordination', 'Schedule Tracking', 'Remediation Review']
  },
  { 
    name: 'Enterprise Web Applications Security Assessment', 
    client: 'Financial Institution',
    desc: 'Managed enterprise web application security assessments. Coordinated remediation verification sprints between security engineers and application teams.',
    badge: 'Project Coordinator',
    tags: ['Sprint Management', 'Issue Tracking', 'Progress Reporting']
  },
  { 
    name: 'Internal Infrastructure Security Assessment', 
    client: 'Industrial Corporation',
    desc: 'Coordinated infrastructure audit projects, compliance milestone reviews, and executive reporting across corporate engineering teams.',
    badge: 'Project Coordinator',
    tags: ['Compliance Tracking', 'Infrastructure Audit', 'Technical Reporting']
  }
];

const categories = ['Frontend Development', 'QA & Testing', 'Cyber Security Coordination'];

function QAThumbnail({ project }: { project: QAProject }) {
  return (
    <div
      style={{
        width: '100%',
        height: '165px',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
        marginBottom: '1.25rem',
        border: '1px solid var(--glass-border)',
        background: 'var(--bg-surface)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Test Suite Chrome Header */}
      <div
        style={{
          height: '28px',
          background: 'rgba(128, 128, 128, 0.05)',
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981' }} />
        </div>

        <div
          style={{
            fontSize: '0.65rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-secondary)',
            background: 'var(--glass-bg)',
            padding: '2px 8px',
            borderRadius: '4px',
            border: '1px solid var(--glass-border)',
            maxWidth: '220px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          https://{project.urlEndpoint}
        </div>

        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-teal)',
          }}
        />
      </div>

      {/* Visual Workspace Mockup Area */}
      <div
        style={{
          flex: 1,
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'var(--accent-teal-subtle)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 600, padding: '2px 6px', borderRadius: '4px', background: 'rgba(20, 184, 166, 0.15)', color: 'var(--accent-teal)', fontFamily: 'var(--font-mono)' }}>
            STATUS: 200 OK
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
            {project.suiteMetrics.testsRun}
          </span>
        </div>

        <div
          style={{
            padding: '8px 10px',
            borderRadius: '8px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '0.72rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
            {project.suiteMetrics.status}
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--accent-teal)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
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
      {/* Precision Filter Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        {categories.map((category) => {
          const isSelected = activeTab === category;
          return (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              style={{
                position: 'relative',
                padding: '9px 20px',
                borderRadius: '9999px',
                border: isSelected ? '1px solid var(--accent-teal)' : '1px solid var(--glass-border)',
                background: isSelected ? 'var(--accent-teal)' : 'var(--glass-bg)',
                color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                fontSize: '0.88rem',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 4px 14px rgba(20, 184, 166, 0.25)' : 'none',
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
          {/* Frontend Development Category */}
          {activeTab === 'Frontend Development' && (
            <motion.div
              key="frontend"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '2rem' }}
            >
              {frontendProjects.map((item, index) => (
                <CrystalCard key={index} style={{ padding: '1.75rem', minHeight: '410px', display: 'flex', flexDirection: 'column' }}>
                  {/* Thumbnail Image Header */}
                  <div
                    style={{
                      width: '100%',
                      height: '165px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      position: 'relative',
                      marginBottom: '1.25rem',
                      background: 'rgba(128, 128, 128, 0.05)',
                      border: '1px solid var(--glass-border)',
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
                          transition: 'transform 0.3s ease',
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
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
                          background: 'var(--accent-teal-subtle)',
                        }}
                      >
                        <FaCode size={28} color="var(--accent-teal)" style={{ marginBottom: '6px' }} />
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>Next.js / React Application</span>
                      </div>
                    )}
                  </div>

                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.45rem', color: 'var(--text-primary)', lineHeight: 1.35, fontWeight: 700, letterSpacing: '-0.02em' }}>
                    {item.name}
                  </h4>
                  
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem', flexGrow: 0 }}>
                    {item.desc}
                  </p>

                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem', flexGrow: 1 }}>
                    {item.tags.map(tag => (
                      <span key={tag} style={{ fontSize: '0.72rem', padding: '3px 9px', background: 'var(--accent-teal-subtle)', border: '1px solid rgba(20, 184, 166, 0.2)', borderRadius: '6px', color: 'var(--accent-teal)', fontFamily: 'var(--font-mono)' }}>
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
                      padding: '9px 16px', 
                      borderRadius: '9999px', 
                      background: 'var(--accent-teal-subtle)', 
                      border: '1px solid rgba(20, 184, 166, 0.3)', 
                      color: 'var(--accent-teal)', 
                      fontWeight: 600, 
                      fontSize: '0.86rem', 
                      transition: 'all 0.2s ease' 
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'var(--accent-teal)';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'var(--accent-teal-subtle)';
                      e.currentTarget.style.color = 'var(--accent-teal)';
                    }}
                  >
                    View Project <FaExternalLinkAlt size={10} />
                  </a>
                </CrystalCard>
              ))}
            </motion.div>
          )}

          {/* QA & Testing Category */}
          {activeTab === 'QA & Testing' && (
            <motion.div
              key="qa"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}
            >
              {qaProjects.map((item) => (
                <CrystalCard key={item.id} style={{ padding: '1.75rem', minHeight: '380px', display: 'flex', flexDirection: 'column' }}>
                  <QAThumbnail project={item} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.74rem', padding: '3px 8px', borderRadius: '6px', background: 'var(--accent-teal-subtle)', border: '1px solid rgba(20, 184, 166, 0.25)', color: 'var(--accent-teal)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                      {item.badge}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {item.suiteMetrics.testsRun}
                    </span>
                  </div>
                  
                  <h4 style={{ fontSize: '1.18rem', marginBottom: '0.35rem', color: 'var(--text-primary)', lineHeight: 1.35, fontWeight: 700, letterSpacing: '-0.02em' }}>
                    {item.name}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--accent-teal)', marginBottom: '0.75rem', fontWeight: 500 }}>
                    Client: {item.client}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem', flexGrow: 1 }}>
                    {item.desc}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                    {item.tags.map(tag => (
                      <span key={tag} style={{ fontSize: '0.72rem', padding: '3px 8px', background: 'rgba(128, 128, 128, 0.06)', border: '1px solid var(--glass-border)', borderRadius: '6px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </CrystalCard>
              ))}
            </motion.div>
          )}

          {/* Cyber Security Coordination Category */}
          {activeTab === 'Cyber Security Coordination' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '2rem' }}
            >
              {securityProjects.map((item, index) => (
                <CrystalCard key={index} style={{ padding: '1.75rem', minHeight: '270px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--accent-teal-subtle)', border: '1px solid rgba(20, 184, 166, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-teal)' }}>
                      <FaShieldAlt size={18} />
                    </div>
                    <span style={{ fontSize: '0.74rem', padding: '3px 8px', borderRadius: '6px', background: 'var(--accent-teal-subtle)', border: '1px solid rgba(20, 184, 166, 0.25)', color: 'var(--accent-teal)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                      {item.badge}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.18rem', marginBottom: '0.4rem', color: 'var(--text-primary)', lineHeight: 1.35, fontWeight: 700, letterSpacing: '-0.02em' }}>
                    {item.name}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--accent-teal)', marginBottom: '0.85rem', fontWeight: 500 }}>
                    Client: {item.client}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, flexGrow: 1 }}>
                    {item.desc}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                    {item.tags.map((tag: string) => (
                      <span key={tag} style={{ fontSize: '0.72rem', padding: '3px 8px', background: 'rgba(128, 128, 128, 0.06)', border: '1px solid var(--glass-border)', borderRadius: '6px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
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
