'use client';
import CrystalCard from './CrystalCard';
import { FaBug, FaLaptopCode, FaServer } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      title: t.services.s1,
      desc: t.services.s1Desc,
      icon: FaBug,
      color: 'var(--accent-cyan)',
      gradient: 'from-cyan-500/10 to-transparent',
    },
    {
      title: t.services.s2,
      desc: t.services.s2Desc,
      icon: FaLaptopCode,
      color: 'var(--accent-purple)',
      gradient: 'from-purple-500/10 to-transparent',
    },
    {
      title: t.services.s3,
      desc: t.services.s3Desc,
      icon: FaServer,
      color: 'var(--accent-pink)',
      gradient: 'from-pink-500/10 to-transparent',
    }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
      {services.map((svc, index) => (
        <CrystalCard key={index} style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '18px',
            background: `${svc.color}15`,
            color: svc.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            boxShadow: `0 0 30px ${svc.color}20`,
            border: `1px solid ${svc.color}15`,
          }}>
            <svc.icon size={28} />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)', fontWeight: 700 }}>{svc.title}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem' }}>{svc.desc}</p>
        </CrystalCard>
      ))}
    </div>
  );
}
