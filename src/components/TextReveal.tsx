'use client';
import { motion } from 'framer-motion';

export default function TextReveal({ text, className = '', style = {} }: { text: string, className?: string, style?: React.CSSProperties }) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const child: any = {
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 14,
        stiffness: 100,
        delay: i * 0.04,
      },
    }),
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -45,
      filter: 'blur(8px)',
    },
  };

  return (
    <motion.div
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', perspective: '600px', ...style }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          custom={index}
          variants={child}
          style={{
            marginRight: '0.3em',
            display: 'inline-block',
            transformOrigin: 'center bottom',
          }}
          key={index}
        >
          {word === '<br/>' ? <br /> : word}
        </motion.span>
      ))}
    </motion.div>
  );
}
