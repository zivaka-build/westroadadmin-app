import React from 'react';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import "./assets/css/style.css"
import LoginPage from "./LoginPage.js"
import Dashboard from "./components/Dashboard/Dashboard.js"
import Test1 from "./components/Test/Test1.js"
import Test2 from "./components/Test/Test2.js"


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <LoginPage exact path="/" />
        <Dashboard>
        <Switch>
          <Test1 exact path="/test1" />
          <Test2 exact path="/test2" />
        </Switch>
        </Dashboard>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
