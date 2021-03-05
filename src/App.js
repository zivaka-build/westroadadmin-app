import React from "react";
import { Router } from "@reach/router";
import "./assets/css/style.css";
import LoginPage from "./LoginPage.js";
import "animate.css";
import NotFound from "./NotFound.js";
import AddMember from "./components/Dashboard/AddMemberForm";
import Dashboard from "./components/Dashboard/Dashboard.js";

function App() {
  return (
    <div className="App">
      <Router>
        <LoginPage path="/" />
        <NotFound path="/notfound" />
        <Dashboard path="/dashboard">
          <AddMember path="/addmember" />
        </Dashboard>
      </Router>
    </div>
  );
}

export default App;
