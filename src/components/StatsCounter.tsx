'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / value));
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [value, isInView]);

  return <span ref={ref}>{count}</span>;
};

export default function StatsCounter() {
  const stats = [
    { num: 5, label: "Years Experience" },
    { num: 16, label: "Projects Delivered" },
    { num: 7, label: "Corporate Clients" },
    { num: 6, label: "Certifications Earned" },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', padding: '2rem 0' }}>
      {stats.map((stat, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="glass"
          style={{ padding: '2rem', textAlign: 'center' }}
        >
          <h3 style={{ fontSize: '3.5rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem', fontWeight: 800 }}>
            <AnimatedNumber value={stat.num} />+
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: 500 }}>{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
