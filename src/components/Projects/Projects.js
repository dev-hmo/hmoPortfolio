import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import pandaflim from "../../Assets/Projects/pandaflim.png";
import oldportfolio from "../../Assets/Projects/oldportfolio.png";
import vapeshop from "../../Assets/Projects/vapeshop.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={oldportfolio}
              isBlog={false}
              title="Porfolio"
              description="Personal Portfolio Website to showcase projects, skills, and experiences — built with HTML, CSS, JavaScript, and designed using Canva. Features a clean and responsive layout to highlight work samples, contact information, and personal branding."
              ghLink="https://github.com/dev-hmo/personal-porfolio.git"
              demoLink="https://hmo-porfolio.vercel.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={pandaflim}
              isBlog={false}
              title="Panda Flim"
              description="A simple and clean movie listing website built with HTML, CSS, and JavaScript. Allows users to explore movie posters, browse titles, and enjoy a responsive, user-friendly interface for discovering films."
              ghLink="https://github.com/dev-hmo/pandaflimbydevhmo"
              demoLink="https://pandaflim.vercel.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={vapeshop}
              isBlog={false}
              title="Pi Vape Shop"
              description="A modern and responsive vape product showcase website built with Next.js and Tailwind CSS, designed using Canva. Features smooth navigation, clean UI, and a structured product layout for an enhanced browsing experience."
              ghLink="https://github.com/dev-hmo/vape-shop"
              demoLink="https://vape-shop-delta.vercel.app/"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
