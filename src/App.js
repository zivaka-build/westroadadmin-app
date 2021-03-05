import React from 'react';
import { Router } from "@reach/router"
import "./assets/css/style.css"
import LoginPage from "./LoginPage.js"
import 'animate.css';
import NotFound from './NotFound.js'
import Dashboard from "./../src/components/Dashboard/Dashboard.js"

function App() {
  return (
    <div className="App">
      <Router>
        <LoginPage path="/" />
        <Dashboard path="/dashboard">
        <NotFound path="/notfound" />
        </Dashboard>

      </Router>
    </div>
  );
}

export default App;
