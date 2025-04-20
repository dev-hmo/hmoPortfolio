import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Particle from "./Particle";
import SkillCardComponent from "./Card/skillCardComponent";
import { skillStackData, toolStackData } from "../constants/data";
import laptopImg from "../assets/img/about.png";

function About() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        {/* About Section */}
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Know Who <strong className="purple">I'M</strong>
            </h1>
            <Card className="quote-card-view">
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p style={{ textAlign: "justify" }}>
                    Hi Everyone, I am{" "}
                    <span className="purple">Hlaing Min Oo </span>
                    from <span className="purple">Yangon, Myanmar.</span>
                    <br />
                    I am currently employed as an IT Support Specialist
                    (Application) at Infinity Success Co., Ltd.
                    <br />
                    I have a Diploma in Information Technology from Yangon
                    Distance Education (National Management Degree College).
                    <br />
                    <br />
                    Besides tech, here are a few things I love to do!
                  </p>
                  <ul>
                    <li className="about-activity">
                      💻 Learning New Technologies
                    </li>
                    <li className="about-activity">✍️ Writing Tech Blogs</li>
                    <li className="about-activity">✈️ Travelling</li>
                  </ul>

                  <p style={{ color: "rgb(155 126 172)" }}>
                    "Code with heart, build with vision."
                  </p>
                  <footer className="blockquote-footer">HMO</footer>
                </blockquote>
              </Card.Body>
            </Card>
          </Col>

          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
            <img src={laptopImg} alt="about" className="img-fluid" />
          </Col>
        </Row>

        {/* Tech Stack Section */}
        <h1 className="project-heading">
          Professional <strong className="purple">Skillset </strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
          {skillStackData.map((skill) => (
            <SkillCardComponent key={skill.id} data={skill} />
          ))}
        </Row>

        {/* Tool Stack Section */}
        <h1 className="project-heading">
          <strong className="purple">Tools</strong> I use
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
          {toolStackData.map((tool) => (
            <SkillCardComponent key={tool.id} data={tool} />
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default About;
