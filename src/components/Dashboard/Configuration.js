import CardSingleButton from "./CardSingleButton";
import React, { Component } from "react";
import "../../assets/css/card-single-button.css";

class Configuration extends Component {
  render() {
    return (
      <div className="config" style={{ paddingTop: "70px" }}>
        <div className="row">
          <div className="col-6">
            <CardSingleButton
              title="Team Members"
              text="Add, delete and view team members"
              buttonText="Manage"
              buttonLink="/dashboard/teammember"
            />
          </div>
          <div className="col-6">
            <CardSingleButton
              title="Manage Sites"
              text="Add, delete and sites"
              buttonText="Manage"
              buttonLink="/dashboard/site"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Configuration;
