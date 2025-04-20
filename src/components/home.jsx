import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Tilt from "react-parallax-tilt";
import Typewriter from "typewriter-effect";
import { AiFillGithub, AiOutlineYoutube } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import homeLogo from "../assets/img/home-main.png";
import myImg from "../assets/img/avatar.png";
import Particle from "./Particle";

function Home() {
  return (
    <section>
      {/* Top Section */}
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name"> Hlaing Min Oo</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Typewriter
                  options={{
                    strings: [
                      "Web Developer",
                      "Full Stack Developer",
                      "React Developer",
                      "QA Engineer",
                    ],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 50,
                  }}
                />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>
        </Container>
      </Container>

      {/* Intro Section */}
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
                  <b className="purple">Web Technologies and Products </b> with
                  a growing curiosity for the possibilities in{" "}
                  <b className="purple">Blockchain.</b>
                </i>
                <br />
                <br />
                Whenever I can, I channel my passion into building full-stack
                applications using{" "}
                <i>
                  <b className="purple">
                    {" "}
                    Modern Tools , Library and Frameworks
                  </b>
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

          {/* Social Links */}
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
                    className="icon-colour home-social-icons"
                  >
                    <AiFillGithub />
                  </a>
                </li>
                <li className="social-icons">
                  <a
                    href="https://www.youtube.com/@kirin6761"
                    target="_blank"
                    rel="noreferrer"
                    className="icon-colour home-social-icons"
                  >
                    <AiOutlineYoutube />
                  </a>
                </li>
                <li className="social-icons">
                  <a
                    href="https://www.linkedin.com/in/hlaing-min-oo-656369240"
                    target="_blank"
                    rel="noreferrer"
                    className="icon-colour home-social-icons"
                  >
                    <FaLinkedinIn />
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
}

export default Home;
