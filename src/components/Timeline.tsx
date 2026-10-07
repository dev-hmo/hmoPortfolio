'use client';
import { motion } from 'framer-motion';

const experiences = [
  {
    year: "MAY 2025 - JUL 2025",
    title: "Intern React Developer",
    company: "NK Software House",
    description: "Built responsive web interfaces using React.js and Tailwind CSS, participated in code reviews with senior developers, debugged UI rendering issues, and collaborated on component architecture for production-ready applications."
  },
  {
    year: "DEC 2025 - JUL 2026",
    title: "Software Delivery & Technical Coordinator",
    company: "RITZ Cyber Intelligence Co., Ltd",
    description: "Coordinated software delivery workflows across multiple projects, managed technical milestones, facilitated communication between development teams and stakeholders, and ensured on-time delivery of software products."
  },
  {
    year: "NOV 2024 - OCT 2025",
    title: "IT Support Specialist & Technical QA",
    company: "Infinity Success Co., Ltd",
    description: "Provided technical support for fintech platforms, conducted end-to-end system validation, documented and tracked bugs via Jira, and validated API responses using Postman to ensure data integrity across services."
  },
  {
    year: "MAY 2024 - SEP 2024",
    title: "Technical Support & Software UAT Lead",
    company: "App.com.mm",
    description: "Led a UAT team validating web and mobile applications, authored detailed bug reports with reproduction steps, provided technical problem-solving support, and drove a 40% reduction in post-release defects through rigorous pre-launch testing cycles."
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
            <h4 className="timeline-year">{exp.year}</h4>
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
