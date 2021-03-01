import React from "react";
import { Button, Card } from "react-bootstrap";


export default function CardDoubleButton({title, text, buttonText1, buttonText2}) {
  return (
    <>
    <Card className= "dashboard-card text-center" >
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        </Card.Body>
        <div className="row w-100 m-0">
          <div className="col-6 p-0">
        <Button className= "button left-button my-auto border-end-8" variant="primary" >{buttonText1} </Button>
        </div>
        <div className="col-6 p-0 text-center">
        <Button className= "button right-button my-auto border-start-8" variant="primary" >{buttonText2} </Button>  
        </div>
        </div>
    </Card>
    </>
  )
}
