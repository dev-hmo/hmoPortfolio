import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.png";
import Tilt from "react-parallax-tilt";
import { AiFillGithub, AiOutlineYoutube } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I discovered a passion for programming, and along the way, I’ve
              picked up a thing or two… 🤷‍♂️
              <br />
              <br />
              I’m proficient in{" "}
              <i>
                <b className="purple">HTML, CSS, JavaScript </b>
              </i>{" "}
              and fluent with modern frameworks like{" "}
              <i>
                <b className="purple">React.js and Next.js</b>
              </i>{" "}
              . I also work with{" "}
              <i>
                <b className="purple">Python</b>
              </i>{" "}
              to build dynamic, efficient solutions.
              <br />
              <br />
              My main interests lie in developing innovative &nbsp;
              <i>
                <b className="purple">Web Technologies and Products </b> with a
                growing curiosity for the possibilities in{" "}
                <b className="purple">Blockchain.</b>
              </i>
              <br />
              <br />
              Whenever I can, I channel my passion into building full-stack
              applications using{" "}
              <i>
                <b className="purple"> Modern Tools , Library and Frameworks</b>
              </i>{" "}
              .
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/dev-hmo"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="www.youtube.com/@kirin6761"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineYoutube />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="www.linkedin.com/in/hlaing-min-oo-656369240"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
