import CardSingleButton from "./CardSingleButton";
import React, { Component } from "react";
import "../../assets/css/card-single-button.css";

class TeamMember extends Component {
  render() {
    return (
      <div className="config" style={{ paddingTop: "70px" }}>
        <div className="row">
          <div className="col-6">
            <CardSingleButton
              title="Add Team Members"
              text="Add a team member"
              buttonText="Add"
              buttonLink="/dashboard/addmember"
            />
          </div>
          <div className="col-6">
            <CardSingleButton
              title="View Team Members"
              text="View a team member"
              buttonText="View"
              buttonLink="/"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TeamMember;
