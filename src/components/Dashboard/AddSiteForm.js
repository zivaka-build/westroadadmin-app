import { Form, Row, Col } from "react-bootstrap";
import React, { useState, useCallback, Fragment } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import "./../../assets/css/form.css";
import ReactDOM from "react-dom";
import SalesRadio from "./../../assets/icons/Addmember/salesradio.png";
import BackOfficeRadio from "./../../assets/icons/Addmember/backofficeradio.png";
import EngineeringRadio from "./../../assets/icons/Addmember/engineeringradio.png";
import FinanceRadio from "./../../assets/icons/Addmember/financeradio.png";
import PurchaseRadio from "./../../assets/icons/Addmember/purchaseradio.png";
import ManagementRadio from "./../../assets/icons/Addmember/managementradio.png";
import SalesCheck from "./../../assets/icons/Addmember/salescheck.png";
import BackOfficeCheck from "./../../assets/icons/Addmember/backofficecheck.png";
import EngineeringCheck from "./../../assets/icons/Addmember/engineeringcheck.png";
import FinanceCheck from "./../../assets/icons/Addmember/financecheck.png";
import PurchaseCheck from "./../../assets/icons/Addmember/purchasecheck.png";
import ManagementCheck from "./../../assets/icons/Addmember/managementcheck.png";
import Swal from "sweetalert2";

function AddMember() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext1 = () => {
    setActiveStep(1);
  };

  const handleBack1 = () => {
    setActiveStep(0);
  };

  const [addSite, setAddSite] = React.useState(0);

  const AddSite = () => {
    return (
      <>
        <div className="row">
          <div className="col-3">
            <label>Unit Name</label>
            <input
              type="text"
              class="form-control"
              name="unitname"
              id="outlined-basic"
            />
          </div>

          <div className="col-3">
            <label>Base Sq Ft Rate</label>
            <input
              type="text"
              class="form-control"
              name="basesqftrate"
              id="outlined-basic"
            />
          </div>

          <div className="col-3">
            <label>Base Sq Ft</label>
            <input
              type="text"
              class="form-control"
              name="basesqft"
              id="outlined-basic"
            />
          </div>
          <div className="col-3 my-auto">
            <a className="deactivate">Deactivate</a>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="customform">
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel className="step-label">
              <h4>Site Details</h4>
            </StepLabel>
            <StepContent>
              <form>
                <div className="row">
                  <div className="col-6">
                    <label>Site Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="sitename"
                      id="outlined-basic"
                    />
                  </div>

                  <div className="col-6">
                    <label>Site Description</label>
                    <input
                      type="text"
                      class="form-control"
                      name="sitedesc"
                      id="outlined-basic"
                    />
                  </div>
                </div>

                <br />
                <div className="row">
                  <div className="col-4">
                    <label>HIRA No.</label>
                    <input
                      type="text"
                      class="form-control"
                      name="hirano"
                      id="outlined-basic"
                    />
                  </div>

                  <div className="col-4">
                    <label>Site Code</label>
                    <input
                      type="text"
                      class="form-control"
                      name="sitecode"
                      id="outlined-basic"
                    />
                  </div>

                  <div className="col-4">
                    <label>...</label>
                    <input
                      type="text"
                      class="form-control"
                      name="..."
                      id="outlined-basic"
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-2">
                    <label class="text-align left">Site Logo</label>
                  </div>
                  <div className="col-10">
                    <input
                      type="file"
                      class="form-control-file"
                      id="sitelogo"
                    />
                  </div>
                </div>
                <br />
                <div>
                  <div className="row">
                    <div className="col-12">
                      <label className="heading2">Site Address</label>
                    </div>
                  </div>
                  <div></div>
                  <div className="row">
                    <div className="col-12">
                      <label>Full Address</label>
                      <input
                        type="text"
                        class="form-control"
                        name="fulladdress"
                        id="outlined-basic"
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-6">
                      <label>Landmark</label>
                      <input
                        type="text"
                        class="form-control"
                        name="landmark"
                        id="outlined-basic"
                      />
                    </div>
                    <div className="col-6">
                      <label>Pincode</label>
                      <input
                        type="number"
                        class="form-control"
                        name="pincode"
                        id="outlined-basic"
                      />
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <div className="col-6">
                      <label>City</label>
                      <input
                        type="text"
                        class="form-control"
                        name="city"
                        id="outlined-basic"
                      />
                    </div>

                    <div className="col-6">
                      <label>State</label>
                      <input
                        type="text"
                        class="form-control"
                        name="state"
                        id="outlined-basic"
                      />
                    </div>
                  </div>
                </div>
                <br />
              </form>
              <div className="justify-content-center row">
                <div className=" col-2">
                  <button
                    className="btn btn-secondary btn-user btn-block"
                    onClick={handleNext1}
                  >
                    Next
                  </button>
                </div>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              <h4>Site Configuration</h4>
            </StepLabel>
            <StepContent>
              <div>
                <div className="row">
                  <div className="col-12">
                    <label className="heading2">Unit Types</label>
                  </div>
                </div>
                <div></div>
                <div className="row">
                  <div className="col-3">
                    <label>Unit Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="unitname"
                      id="outlined-basic"
                    />
                  </div>

                  <div className="col-3">
                    <label>Base Sq Ft Rate</label>
                    <input
                      type="text"
                      class="form-control"
                      name="basesqftrate"
                      id="outlined-basic"
                    />
                  </div>

                  <div className="col-3">
                    <label>Base Sq Ft</label>
                    <input
                      type="text"
                      class="form-control"
                      name="basesqft"
                      id="outlined-basic"
                    />
                  </div>
                  <div className="col-3 my-auto">
                    <a className="deactivate">Deactivate</a>
                  </div>
                </div>
              </div>
              <Fragment>
                <div className="row" style={{ paddingTop: "4px" }}>
                  <div className="col-9">
                    <div className="d-flex flex-row-reverse">
                      <button
                        className="add-btn"
                        onClick={() => setAddSite(addSite + 1)}
                      >
                        Add row
                      </button>
                      {Array(addSite).fill(<AddSite />)}
                      <br />
                    </div>
                  </div>
                </div>
              </Fragment>
              <div>
                <div className="row">
                  <div className="col-12">
                    <label className="heading2">Phase</label>
                  </div>
                </div>
                <div></div>
                <div className="row">
                  <div className="col-3">
                    <label>Phase Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="unitname"
                      id="outlined-basic"
                    />
                  </div>

                  <div className="col-3">
                    <label>Phase Code</label>
                    <input
                      type="text"
                      class="form-control"
                      name="basesqftrate"
                      id="outlined-basic"
                    />
                  </div>

                  <div className="col-3 my-auto">
                    <a className="deactivate">Deactivate</a>
                  </div>
                </div>
                <div className="row" style={{ paddingTop: "4px" }}>
                  <div className="col-6">
                    <div className="d-flex flex-row-reverse">
                      <button className="add-btn">Add row</button>

                      <br />
                      <div className="row">
                  <div className="col-4">
                    <label>HIRA No.</label>
                    <input
                      type="text"
                      class="form-control"
                      name="hirano"
                      id="outlined-basic"
                    />
                  </div>

                  <div className="col-4">
                    <label>Site Code</label>
                    <input
                      type="text"
                      class="form-control"
                      name="sitecode"
                      id="outlined-basic"
                    />
                  </div>

                  <div className="col-4">
                    <label>...</label>
                    <input
                      type="text"
                      class="form-control"
                      name="..."
                      id="outlined-basic"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <label>HIRA No.</label>
                    <input
                      type="text"
                      class="form-control"
                      name="hirano"
                      id="outlined-basic"
                    />
                  </div>

                  <div className="col-4">
                    <label>Site Code</label>
                    <input
                      type="text"
                      class="form-control"
                      name="sitecode"
                      id="outlined-basic"
                    />
                  </div>
                </div>
                
                    </div>
                  </div>
                </div>
              </div>
            </StepContent>
          </Step>
        </Stepper>
      </div>
    </div>
  );
}

export default AddMember;
