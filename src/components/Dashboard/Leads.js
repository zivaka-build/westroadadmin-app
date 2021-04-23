import CardSingleButton from "./CardSingleButton";
import React, { Component } from "react";
import "../../assets/css/card-single-button.css";

function Leads() {
  
    return (
      <div className="site" style={{ paddingTop: "70px" }}>
        <div className="row">
          <div className="col-6">
            <CardSingleButton
              title="Add Lead"
              text="Add a lead"
              buttonText="Add"
              buttonLink="/dashboard/addlead"
            />
          </div>
          <div className="col-6">
            <CardSingleButton
              title="View Leads"
              text="View all leads" 
              buttonText="View"
              buttonLink="/"
            />
          </div>
        </div>
      </div>
    );
  
}

export default Leads;
