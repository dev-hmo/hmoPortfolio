'use client';
import { motion } from 'framer-motion';

const experiences = [
  {
    year: "AUG 2026 - PRESENT",
    title: "Freelance QA Tester & Frontend Developer",
    company: "Self-Employed / Freelance",
    description: "Currently taking on freelance web projects focusing on end-to-end UAT, identifying UI/UX defects, and providing React/Next.js debugging support while pursuing my BSc in IT."
  },
  {
    year: "DEC 2025 - JUL 2026",
    title: "Project Coordinator (QA & Delivery)",
    company: "RITZ Cyber Intelligence Co., Ltd",
    description: "Coordinated QA workflows across security assessment projects, executing functional and regression testing while tracking defects in ClickUp to ensure on-time, zero-critical-bug releases."
  },
  {
    year: "MAY 2025 - JUL 2025",
    title: "Intern React Developer",
    company: "NK Software House",
    description: "Built and debugged responsive React.js components, performed cross-browser testing, and collaborated with senior developers to resolve UI rendering issues before production deployment."
  },
  {
    year: "NOV 2024 - OCT 2025",
    title: "IT Support Specialist & QA Support",
    company: "Infinity Success Co., Ltd",
    description: "Conducted end-to-end system testing for fintech platforms, documented and tracked bugs via Jira, and validated API responses using Postman to ensure data integrity across services."
  },
  {
    year: "MAY 2024 - SEP 2024",
    title: "Software UAT Test Team Lead",
    company: "App.com.mm Co., Ltd",
    description: "Led a UAT team testing web and mobile applications, authored detailed bug reports with reproduction steps, and drove a 40% reduction in post-release defects through rigorous pre-launch testing cycles."
  }
];

export default function Timeline() {
  return (
    <div className="timeline-container">
      {experiences.map((exp, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
        >
          <div className="timeline-content glass">
            <h4 className="timeline-year text-gradient">{exp.year}</h4>
            <h3 className="timeline-title">{exp.title}</h3>
            <h5 className="timeline-company">{exp.company}</h5>
            <p className="timeline-desc">{exp.description}</p>
          </div>
          <div className="timeline-dot"></div>
        </motion.div>
      ))}
    </div>
  );
}
