import React from 'react';
import { Router } from "@reach/router"
import "./assets/css/style.css"
import LoginPage from "./LoginPage.js"
import 'animate.css';
import NotFound from './NotFound.js'

function App() {
  return (
    <div className="App">
      <Router>
        <LoginPage path="/" />
        <NotFound path="/notfound" />


      </Router>
    </div>
  );
}

export default App;
