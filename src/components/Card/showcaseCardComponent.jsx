import React from "react";
import { Card, Button } from "react-bootstrap";
import { BsGithub } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";

export default function ShowCaseCardComponent({ data }) {
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={data.image} alt={data.title} />
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {data.description}
        </Card.Text>
        <Button variant="primary" href={data.githubLink} target="_blank">
          <BsGithub /> &nbsp; GitHub
        </Button>
        {data.liveDemoLink && (
          <Button
            variant="primary"
            href={data.liveDemoLink}
            target="_blank"
            style={{ marginLeft: "10px" }}
          >
            <CgWebsite /> &nbsp; Demo
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
