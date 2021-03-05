import React from 'react';
import { Router } from "@reach/router"
import "./assets/css/style.css"
import LoginPage from "./LoginPage.js"
import 'animate.css';
import NotFound from './NotFound.js'
import AddMember from "./components/Dashboard/AddMemberForm"

function App() {
  return (
    <div className="App">
      <Router>
        <LoginPage path="/" />
        <NotFound path="/notfound" />
        <AddMember path="/addmember" />


      </Router>
    </div>
  );
}

export default App;
