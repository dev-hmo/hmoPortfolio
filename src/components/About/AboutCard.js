import React from "react";
import Card from "react-bootstrap/Card";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Hlaing Min Oo </span>
            from <span className="purple"> Yangon, Myanmar.</span>
            <br />
            I am currently employed as an IT Support Specialist (Application) at
            Infinity Success Co., Ltd.
            <br />
            I have a Diploma in Information Technology from Yangon Distance
            Education (National Management Degree College).
            <br />
            <br />
            Besides tech, here are a few things I love to do!
          </p>
          <ul>
            <li className="about-activity">💻 Learning New Technologies</li>
            <li className="about-activity">✍️ Writing Tech Blogs</li>
            <li className="about-activity">✈️ Travelling</li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Code with heart, build with vision."{" "}
          </p>
          <footer className="blockquote-footer">HMO</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
