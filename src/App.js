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
import CarParkingList from "./components/Dashboard/CarParkingList";
import ViewSitePage from "./routes/ViewSitePage"
import IndividualSitePage from "./routes/IndividualSitePage"
import HLCPage from "./routes/HLCPage"
import ListofUnits from "./components/Dashboard/ListofUnits";
import AddUnitPage from "./routes/AddUnitPage"
import ListofTransaction from "./components/Dashboard/ListofTransacrion";
import IndividualApplicationform from "./components/Dashboard/IndividualApplicationform";
import AddCarParking from "./components/Dashboard/AddCarParking";
import AddUnitTypePage from "./routes/AddUnitTypePage";
import ListofDemand from "./components/Dashboard/ListofDemands";
import ListofCheque from "./components/Dashboard/ListofCheques";
import InitiateAllotmentForm from "./components/Dashboard/InitiateAllotmentForm";
import AddLoanBankPage from "./routes/AddLoanBankPage"
import ViewLoanBankPage from "./routes/ViewLoanBankPage"
import CustomerPage from "./routes/CustomerPage"
import IndividualBankPage from "./routes/IndividualBankPage"
import HomepagePage from "./routes/HomepagePage"
import IndividualUnitPage from "./routes/IndividualUnitPage"
import IssueChequePage from "./routes/IssueChequePage"
import TaskListPage from "./routes/TaskListPage"
import AddCashPage from "./routes/AddCashPage"
import AddTaskPage from "./routes/AddTaskPage"
import ViewCashDepositPage from "./routes/ViewCashDepositPage"
function App() {
  return (
    <div className="App">
      <Router>
        <LoginPage path="/" />
        <NotFoundPage path="/notfound" />
        <DefaultDashboard path="/dashboard">
          <ConfigurationPage path="/config" />
          <ListofApplicationForm path="/listofapplicationform" />
          <ListofTransaction path="/listoftransaction" />
          <ListofCheque path="/listofcheque" />
          <CarParkingList path="/carparkinglist" />
          <ListofUnits path="/listofunits" />
          <ListofDemand path="/listofdemand" />
          <TeamMemberPage path="/teammember" />
          <AddMemberPage path="/addmember" />
          <SitePage path="/site" />
          <AddSitePage path="/addsite" />
          <AddCarParking path="/addcarparking" />
          <LeadsPage path="/leads" />
          <AddLeadPage path="/addlead" />
          <ViewLeadPage path="/viewlead" />
          <IndividualLeadPage path="/individuallead/:leadID" />
          <IndividualApplicationform path="/individualapplication/:applicationId" />
          <InitiateAllotmentForm path="/initiateallotment" />
          <AddTdsRatesPage path="/addtdsrates" />
          <ViewTdsRatesPage path="/viewtdsrates" />
          <ViewTdsPage path="/viewtds" />
          <ViewSitePage path="/managesite" />
          <IndividualSitePage path="/individualsite/:siteID" />
          <HLCPage path="/homeloancalculator" />
          <AddUnitPage path="/addunit/:siteID" />
          <AddUnitTypePage path="/addunittype/:siteID" />
          <AddLoanBankPage path="/addloanbank" />
          <ViewLoanBankPage path="/listofbanks" />
          <CustomerPage path="/viewcustomers" />
          <IndividualBankPage path="/individualbank/:bankCode" />
          <HomepagePage path="/home" />
          <IndividualUnitPage path="/individualunit/:unitName" />
          <IssueChequePage path="/issuecheque" />
          <TaskListPage path="/tasklist" />
          <AddCashPage path="/addcash" />
          <AddTaskPage path="/addtask" />
          <ViewCashDepositPage path="/listofcashdeposit" />
        </DefaultDashboard>

      </Router>
    </div>
  );
}

export default App;
