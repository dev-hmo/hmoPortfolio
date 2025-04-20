import React from "react";
import { Col } from "react-bootstrap";

export default function SkillCardComponent({ data }) {
  return (
    <Col xs={4} md={2} className="tech-icons">
      {data.icon}
    </Col>
  );
}
