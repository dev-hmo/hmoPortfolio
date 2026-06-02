'use client';
import TiltCard from './TiltCard';
import { FaLaptopCode, FaProjectDiagram, FaUserShield } from 'react-icons/fa';

const services = [
  {
    title: 'Frontend Development',
    desc: 'Crafting visually stunning, high-performance web applications using React, Next.js, and complex 3D WebGL interactions.',
    icon: FaLaptopCode,
    color: 'var(--accent-cyan)'
  },
  {
    title: 'Project Management',
    desc: 'Leading cross-functional teams, managing timelines, requirements, and delivering enterprise software solutions efficiently.',
    icon: FaProjectDiagram,
    color: 'var(--accent-purple)'
  },
  {
    title: 'Security Project Coordination',
    desc: 'Managing and coordinating complex cyber security assessment projects, ensuring seamless communication between security teams and enterprise clients.',
    icon: FaUserShield,
    color: 'var(--accent-pink)'
  }
];

export default function Services() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
      {services.map((svc, index) => (
        <TiltCard key={index} style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', background: `linear-gradient(135deg, ${svc.color}15, rgba(0,0,0,0.6))` }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: `${svc.color}20`, color: svc.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: `0 0 20px ${svc.color}40` }}>
            <svc.icon size={30} />
          </div>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{svc.title}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem' }}>{svc.desc}</p>
        </TiltCard>
      ))}
    </div>
  );
}
