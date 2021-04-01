import React from "react";
import { Router } from "@reach/router";
import "./assets/css/style.css";
import LoginPage from "./routes/LoginPage";
import "animate.css";
import NotFoundPage from "./routes/NotFound.js";
import AddMemberPage from "./routes/AddMemberPage.js";
import DefaultDashboard from "./components/Dashboard/Dashboard";
import ConfigurationPage from "./routes/ConfigPage";
import SitePage from "./routes/SitePage"
import AddSitePage from "./routes/AddSitePage"
import TeamMemberPage from "./routes/TeamMemberPage.js";
import LeadsPage from "./routes/LeadsPage.js"


function App() {
  return (
    <div className="App">
      <Router>
        <LoginPage path="/" />
        <NotFoundPage path="/notfound" />
        <DefaultDashboard path="/dashboard">
          <ConfigurationPage path="/config" />
          <TeamMemberPage path="/teammember" />
          <AddMemberPage path="/addmember" />
          <SitePage path="/site" />
          <AddSitePage path="/addsite" />
          <LeadsPage path="/leads" />
        </DefaultDashboard>

      </Router>
    </div>
  );
}

export default App;
