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
import AddLeadPage from "./routes/AddLeadPage"
import ViewLeadPage from "./routes/ViewLeadPage"
import IndividualLeadPage from "./routes/IndividualLeadPage"
import AddTdsRatesPage from "./routes/AddTdsRatesPage"
import ViewTdsRatesPage from "./routes/ViewTdsRatesPage"
import ViewTdsPage from "./routes/ViewTdsPage"
import ListofApplicationForm from "./components/Dashboard/ListofApplicationForm";
import ViewSitePage from "./routes/ViewSitePage"
import IndividualSitePage from "./routes/IndividualSitePage"

function App() {
  return (
    <div className="App">
      <Router>
        <LoginPage path="/" />
        <NotFoundPage path="/notfound" />
        <DefaultDashboard path="/dashboard">
          <ConfigurationPage path="/config" />
          <ListofApplicationForm path="/listofapplicationform" />
          <TeamMemberPage path="/teammember" />
          <AddMemberPage path="/addmember" />
          <SitePage path="/site" />
          <AddSitePage path="/addsite" />
          <LeadsPage path="/leads" />
          <AddLeadPage path="/addlead" />
          <ViewLeadPage path="/viewlead" />
          <IndividualLeadPage path="/individuallead/:leadID" />
          <AddTdsRatesPage path="/addtdsrates" />
          <ViewTdsRatesPage path="/viewtdsrates" />
          <ViewTdsPage path="/viewtds" />
          <ViewSitePage path="/managesite" />
          <IndividualSitePage path="/individualsite/:siteID" />
        </DefaultDashboard>

      </Router>
    </div>
  );
}

export default App;
