import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ShowCaseCardComponent from "./Card/showcaseCardComponent";
import Particle from "./Particle";
import { showCaseData } from "../constants/data";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works</strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {showCaseData.map((project) => (
            <Col md={6} className="project-card" key={project.id}>
              <ShowCaseCardComponent data={project} />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
