import React from 'react';
import { Router } from "@reach/router"
import "./assets/css/style.css"
import LoginPage from "./LoginPage.js"


function App() {
  return (
    <div className="App">
      <Router>
        <LoginPage path="/" />



      </Router>
    </div>
  );
}

export default App;
