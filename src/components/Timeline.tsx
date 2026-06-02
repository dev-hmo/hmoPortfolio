'use client';
import { motion } from 'framer-motion';

const experiences = [
  {
    year: "DEC 2025 - PRESENT",
    title: "Project Coordinator",
    company: "RITZ Cyber Intelligence Co., Ltd",
    description: "Cross-functional Team Coordination, External Client & Stakeholder Management, Requirement Gathering & Scope Management, Product UI/UX & QA Testing, Project Tracking & Documentation."
  },
  {
    year: "NOV 2024 - OCT 2025",
    title: "IT Support Specialist / System Analyst",
    company: "Infinity Success Co., Ltd",
    description: "Provided daily IT support, managed software installations and backups, assisted development teams with system testing and drafting technical documentation."
  },
  {
    year: "MAY 2024 - SEP 2024",
    title: "Software UAT Test Team Lead / IT Support",
    company: "App.com.mm Co., Ltd",
    description: "Led User Acceptance Testing (UAT) phase for multiple web and mobile applications. Identified, tracked, and reported UI/UX bugs and performance issues."
  },
  {
    year: "APRIL 2023 - MAY 2024",
    title: "Junior Network Administrator",
    company: "CGM Goldenland Co., Ltd",
    description: "Monitored and maintained internal office network systems, active servers, and hardware inventory."
  },
  {
    year: "NOV 2020 - MAY 2022",
    title: "Computer Service Technician",
    company: "Tech Ace Computer & Gaming",
    description: "Diagnosed hardware issues, assembled custom PCs, and handled OS/essential software installations."
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
