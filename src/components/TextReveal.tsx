'use client';
import { motion } from 'framer-motion';

export default function TextReveal({ text, className = '', style = {} }: { text: string, className?: string, style?: React.CSSProperties }) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const child: any = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
    },
  };

  return (
    <motion.div
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', ...style }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span variants={child} style={{ marginRight: '0.3em', display: 'inline-block' }} key={index}>
          {word === '<br/>' ? <br /> : word}
        </motion.span>
      ))}
    </motion.div>
  );
}
