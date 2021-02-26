import React from "react";
import { Button, Card } from "react-bootstrap";


export default function CardElement({title, text, buttonText}) {
  return (
    <>
    <Card className= "dashboard-card text-center" style={{ width: "18rem"}} >
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        </Card.Body>
        <Button className= "button my-auto" variant="primary">{buttonText}</Button>
      
    </Card>
    </>
  )
}
