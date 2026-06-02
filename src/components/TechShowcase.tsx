'use client';
import { motion } from 'framer-motion';
import { FaReact, FaFigma, FaGitAlt, FaMicrosoft, FaFileExcel } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiPython, SiPostman, SiHtml5, SiCss3, SiNotion, SiClickup } from 'react-icons/si';

const technologies = [
  // Frontend
  { name: 'React.js', icon: FaReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
  
  // Backend / Scripting
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  
  // UI/UX & QA
  { name: 'Figma', icon: FaFigma, color: '#F24E1E' },
  { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
  
  // PM & Version Control
  { name: 'ClickUp', icon: SiClickup, color: '#7B68EE' },
  { name: 'Notion', icon: SiNotion, color: '#FFFFFF' },
  { name: 'MS Office', icon: FaMicrosoft, color: '#00A4EF' },
  { name: 'Excel', icon: FaFileExcel, color: '#217346' },
  { name: 'Git', icon: FaGitAlt, color: '#F05032' },
];

export default function TechShowcase() {
  return (
    <div className="tech-showcase">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: (index % 5) * 0.1,
            type: "spring",
            stiffness: 200
          }}
          whileHover={{ 
            y: -10, 
            scale: 1.1,
            boxShadow: `0 10px 25px -5px ${tech.color}50`
          }}
          className="tech-item glass"
        >
          <tech.icon size={40} color={tech.color === '#000000' || tech.color === '#FFFFFF' ? 'white' : tech.color} />
          <span className="tech-name">{tech.name}</span>
        </motion.div>
      ))}
    </div>
  );
}
