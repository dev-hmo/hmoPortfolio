'use client';
import CrystalCard from './CrystalCard';
import { FaReact, FaPaintBrush, FaTachometerAlt } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      title: t.services.s1,
      desc: t.services.s1Desc,
      icon: FaReact,
      color: 'var(--accent-teal)',
    },
    {
      title: t.services.s2,
      desc: t.services.s2Desc,
      icon: FaPaintBrush,
      color: 'var(--accent-indigo)',
    },
    {
      title: t.services.s3,
      desc: t.services.s3Desc,
      icon: FaTachometerAlt,
      color: 'var(--accent-teal)',
    }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
      {services.map((svc, index) => (
        <CrystalCard key={index} style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: 'var(--accent-teal-subtle)',
            color: svc.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
            border: '1px solid var(--glass-border)',
          }}>
            <svc.icon size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-primary)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            {svc.title}
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.92rem' }}>
            {svc.desc}
          </p>
        </CrystalCard>
      ))}
    </div>
  );
}
