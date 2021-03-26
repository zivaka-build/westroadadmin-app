import React from "react";
import { Router } from "@reach/router";
import "./assets/css/style.css";
import LoginPage from "./routes/LoginPage";
import "animate.css";
import NotFoundPage from "./routes/NotFound.js";
import AddMemberPage from "./routes/AddMemberPage.js";
import DefaultDashboard from "./routes/Dashboard";
import ConfigurationPage from "./routes/ConfigPage";
import TeamMemberPage from "./routes/TeamMemberPage.js";

function App() {
  return (
    <div className="App">
      <Router>
        <LoginPage path="/" />
        <NotFoundPage path="/notfound" />
        <DefaultDashboard path="/dashboard" />
        <ConfigurationPage path="/config" />
        <TeamMemberPage path="/teammember" />
        <AddMemberPage path="/addmember" />
      </Router>
    </div>
  );
}

export default App;
