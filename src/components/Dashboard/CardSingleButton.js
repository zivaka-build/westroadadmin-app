import React from "react";
import { Button, Card } from "react-bootstrap";

export default function CardSingleButton({
  title,
  text,
  buttonText,
  buttonLink,
}) {
  return (
    <>
      <Card className="dashboard-card text-center justify-content-center">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
        </Card.Body>
        <Button className="button" variant="primary" href={buttonLink}>
          {buttonText}
        </Button>
      </Card>
    </>
  );
}
