'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const incrementTime = Math.abs(Math.floor(duration / end));

      const timer = setInterval(() => {
        start += 1;
        setDisplayValue(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
};

export default function StatsCounter() {
  const { t } = useLanguage();

  const stats = [
    { num: 5, label: t.stats.years },
    { num: 16, label: t.stats.projects },
    { num: 7, label: t.stats.clients },
    { num: 6, label: t.stats.certs },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
      {stats.map((stat, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
            <AnimatedNumber value={stat.num} />+
          </div>
          <div style={{ color: 'var(--accent-cyan)', fontSize: '1.1rem', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase' }}>
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
