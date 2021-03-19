import CardSingleButton from "./CardSingleButton";
import React, { Component } from "react";
import "../../assets/css/card-single-button.css";

class Site extends Component {
  render() {
    return (
      <div className="site" style={{ paddingTop: "70px" }}>
        <div className="row">
          <div className="col-6">
            <CardSingleButton
              title="Add a site"
              text="Add a site"
              buttonText="Add"
              buttonLink="/dashboard/addsite"
            />
          </div>
          <div className="col-6">
            <CardSingleButton
              title="View Sites"
              text="View all the sites"
              buttonText="View"
              buttonLink="/"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Site;
