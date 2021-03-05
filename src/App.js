import React from 'react';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import "./../src/assets/css/style.css"
import LoginPage from "./LoginPage.js"
import Dashboard from "./components/Dashboard/Dashboard.js"
import Test1 from "./components/Test/Test1.js"
import 'animate.css';
import NotFound from './NotFound.js'


function App() {
  return (
    <div className="App">
      <Router>

        <Switch>
        <LoginPage exact path="/" />
        <NotFound path="/notfound" />
        <Dashboard>
        <Switch>
          <Test1 exact path="/test1" />
         
        </Switch>
        </Dashboard>
        </Switch>


      </Router>
    </div>
  );
}

export default App;
