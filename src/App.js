// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { Router } from "@reach/router"
import "./assets/css/style.css"
import LoginPage from "./LoginPage"

// import AllActiveLeadsPage from "./AllActiveLeadsPage"
// import AllLeadsPage from './AllLeadsPage';
// import TBROPage from './TBROPage';
// import ViewAllBrokerPage from './ViewAllBrokerPage';
// import IndividualLeadPage from './IndividualLeadPage'
import AddBrokerPage from "./AddBrokerPage"
// import Broker from "./components/Broker"
// import AddLeadPage from "./AddLeadPage"
// import ResetPasswordPage from "./ResetPasswordPage"
// import AddDeveloperPage from "./AddDeveloperPage"
// import ViewDeveloperPage from "./ViewDeveloperPage"
// import AddPropertyPage from "./AddPropertyPage"
// import ViewPropertyPage from './ViewPropertyPage';
// import IndividualPropertyPage from './IndividualPropertyPage';
// import IndividualDeveloperPage from './IndividualDeveloperPage';
// import ViewAllSiteVisitsPage from './ViewAllSiteVisitsPage';
// import AddTaskPage from './AddTaskPage';
// import ViewAllOpenTasksPage from './ViewAllOpenTasksPage';
// import ViewAllTasksPage from './ViewAllTasksPage';
// import IndividualTaskPage from './IndividualTaskPage'
function App() {
  return (
    <div className="App">
      <Router>
        <LoginPage path="/" />
        {/* <Broker path="/broker" />
        <AllActiveLeadsPage path="/allactiveleads" />
        <AllLeadsPage path="/allleads" />
        <ViewAllBrokerPage path="/teammembers" />
        <TBROPage path="/tbro" /> */}
        <AddBrokerPage path="/manageteam" />
        {/* <IndividualLeadPage path="/individuallead" />
        <AddLeadPage path="/createlead" />
        <AddDeveloperPage path="/adddeveloper" />
        <ViewDeveloperPage path="/viewdeveloper" />
        <ResetPasswordPage path="/resetpassword" />
        <AddPropertyPage path="/addproject" />
        <ViewPropertyPage path="/viewprojects" />
        <IndividualPropertyPage path="/individualproject" />
        <IndividualDeveloperPage path="/individualdeveloper" />
        <ViewAllSiteVisitsPage path="/sitevisits" />
        <AddTaskPage path="/addtasks" />
        <ViewAllOpenTasksPage path="/allopentasks" />
        <ViewAllTasksPage path="/alltasks" />
        <IndividualTaskPage path="/individualtask" /> */}
      
        
      </Router>
    </div>
  );
}

export default App;
