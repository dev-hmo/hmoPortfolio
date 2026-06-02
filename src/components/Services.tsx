'use client';
import TiltCard from './TiltCard';
import { FaLaptopCode, FaProjectDiagram, FaUserShield } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      title: t.services.s1,
      desc: t.services.s1Desc,
      icon: FaLaptopCode,
      color: 'var(--accent-cyan)'
    },
    {
      title: t.services.s2,
      desc: t.services.s2Desc,
      icon: FaProjectDiagram,
      color: 'var(--accent-purple)'
    },
    {
      title: t.services.s3,
      desc: t.services.s3Desc,
      icon: FaUserShield,
      color: 'var(--accent-pink)'
    }
  ];

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
