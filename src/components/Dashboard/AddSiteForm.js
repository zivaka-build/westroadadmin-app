import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import "./../../assets/css/form.css";
import Swal from "sweetalert2";

function AddMember() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [sitename, setSiteName] = React.useState("");
  const [sitedesc, setSiteDesc] = React.useState("");
  const [hirano, setHiraNo] = React.useState("");
  const [sitecode, setSiteCode] = React.useState("");
  const [__, set__] = React.useState("");
  const [fulladdress, setFullAddress] = React.useState("");
  const [landmark, setLandmark] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [addUnit, setAddUnit] = React.useState([
    { unitname: "", basesqftrate: "", basesqft: "" },
  ]);
  const [addPhase, setAddPhase] = React.useState([
    { phasename: "", phasecode: "" },
  ]);
  const [flooresccharges, setFloorEscCharges] = React.useState("");
  const [builtupareafactor, setBuiltUpAreaFactor] = React.useState("");
  const [superbuiltupareafactor, setSuperBuiltUpAreaFactor] = React.useState(
    ""
  );
  const [carparkingopen, setCarParkingOpen] = React.useState("");
  const [carparkingcovered, setCarParkingCovered] = React.useState("");
  const [othercharges, setOtherCharges] = React.useState([
    { name: "", amount: "", gst: "", chargestype: "" },
  ]);
  const [chargestype, setChargesType] = React.useState("");

  const handleNext1 = () => {
    if (
      sitename === "" ||
      sitedesc === "" ||
      hirano === "" ||
      sitecode === "" ||
      __ === "" ||
      fulladdress === "" ||
      landmark === "" ||
      pincode === "" ||
      city === "" ||
      state === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Ooops",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        text: "Please fill out all details!",
      });
    } else {
      setActiveStep(1);
    }
  };

  const handleAddUnit = () => {
    const values = [...addUnit];
    values.push({ unitname: "", basesqftrate: "", basesqft: "" });
    setAddUnit(values);
  };

  const handleAddPhase = () => {
    const values = [...addPhase];
    values.push({ phasename: "", phasecode: "" });
    setAddPhase(values);
  };

  const handleAddOtherCharges = () => {
    const values = [...othercharges];
    values.push({ name: "", amount: "", gst: "", chargestype: "" });
    setOtherCharges(values);
  };

  const handleUnitChange = (index, event) => {
    const values = [...addUnit];
    if (event.target.name === "unitname") {
      values[index].unitname = event.target.value;
    } else if (event.target.name === "basesqftrate") {
      values[index].basesqftrate = event.target.value;
    } else {
      values[index].basesqft = event.target.value;
    }
    setAddUnit(values);
  };

  const handlePhaseChange = (index, event) => {
    const values = [...addPhase];
    if (event.target.name === "phasename") {
      values[index].phasename = event.target.value;
    } else {
      values[index].phasecode = event.target.value;
    }
    setAddPhase(values);
  };

  const handleOtherChargesChange = (index, event) => {
    const values = [...othercharges];
    if (event.target.name === "name") {
      values[index].name = event.target.value;
    } else if (event.target.name === "amount") {
      values[index].amount = event.target.value;
    } else if (event.target.name === "gst") {
      values[index].gst = event.target.value;
    } else {
      if (event.target.id === "fixed") {
        values[index].chargestype = "fixed";
      } else if (event.target.id === "persqft") {
        values[index].chargestype = "persqft";
      }
    }
    setAddUnit(values);
  };

  const validateAddUnit = (addUnit) => {
    for (let index = 0; index < addUnit.length; index++) {
      if (
        addUnit[index].unitname == "" ||
        addUnit[index].basesqftrate == "" ||
        addUnit[index].basesqft == ""
      ) {
        return 0;
      }
    }
    return 1;
  };

  const validateAddPhase = (addPhase) => {
    for (let index = 0; index < addPhase.length; index++) {
      if (addPhase[index].phasename == "" || addPhase[index].phasecode == "") {
        return 0;
      }
    }
    return 1;
  };
  console.log(othercharges);
  const handleSubmit = () => {
    if (
      validateAddUnit(addUnit) === 0 ||
      validateAddPhase(addPhase) === 0 ||
      flooresccharges === "" ||
      builtupareafactor === "" ||
      superbuiltupareafactor === "" ||
      carparkingopen === "" ||
      carparkingcovered === ""
      // name === "" ||
      // amount === "" ||
      // gst === "" ||
      // othercharges === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Ooops",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        text: "Please fill out all details!",
      });
    }
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
              <div className="row">
                <div className="col-6">
                  <label>Site Name</label>
                  <input
                    type="text"
                    class="form-control"
                    name="sitename"
                    id="outlined-basic"
                    value={sitename}
                    onChange={(e) => setSiteName(e.target.value)}
                  />
                </div>

                <div className="col-6">
                  <label>Site Description</label>
                  <input
                    type="text"
                    class="form-control"
                    name="sitedesc"
                    id="outlined-basic"
                    value={sitedesc}
                    onChange={(e) => setSiteDesc(e.target.value)}
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
                    value={hirano}
                    onChange={(e) => setHiraNo(e.target.value)}
                  />
                </div>

                <div className="col-4">
                  <label>Site Code</label>
                  <input
                    type="text"
                    class="form-control"
                    name="sitecode"
                    id="outlined-basic"
                    value={sitecode}
                    onChange={(e) => setSiteCode(e.target.value)}
                  />
                </div>

                <div className="col-4">
                  <label>...</label>
                  <input
                    type="text"
                    class="form-control"
                    name="..."
                    id="outlined-basic"
                    value={__}
                    onChange={(e) => set__(e.target.value)}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-2">
                  <label class="text-align left">Site Logo</label>
                </div>
                <div className="col-10">
                  <input type="file" class="form-control-file" id="sitelogo" />
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
                      value={fulladdress}
                      onChange={(e) => setFullAddress(e.target.value)}
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
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <label>Pincode</label>
                    <input
                      type="number"
                      class="form-control"
                      name="pincode"
                      id="outlined-basic"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
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
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                  <div className="col-6">
                    <label>State</label>
                    <input
                      type="text"
                      class="form-control"
                      name="state"
                      id="outlined-basic"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <br />

              <div className="justify-content-center row">
                <div className=" col-2">
                  <button
                    className="btn btn-secondary btn-user btn-block"
                    onClick={() => handleNext1()}
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
              <div className="row">
                <div className="col-12">
                  <label className="heading2">Unit Types</label>
                </div>
              </div>
              <div></div>

              {addUnit.map((addUnit, index) => {
                return (
                  <div className="row" style={{ paddingBottom: "6px" }}>
                    <div className="col-3">
                      <label>Unit Name</label>
                      <input
                        type="text"
                        class="form-control"
                        name="unitname"
                        id="outlined-basic"
                        value={addUnit.unitname}
                        onChange={(event) => handleUnitChange(index, event)}
                      />
                    </div>

                    <div className="col-3">
                      <label>Base Sq Ft Rate</label>
                      <input
                        type="text"
                        class="form-control"
                        name="basesqftrate"
                        id="outlined-basic"
                        value={addUnit.basesqftrate}
                        onChange={(event) => handleUnitChange(index, event)}
                      />
                    </div>

                    <div className="col-3">
                      <label>Base Sq Ft</label>
                      <input
                        type="text"
                        class="form-control"
                        name="basesqft"
                        id="outlined-basic"
                        value={addUnit.basesqft}
                        onChange={(event) => handleUnitChange(index, event)}
                      />
                    </div>
                    <div className="col-3 my-auto">
                      <a className="deactivate">Delete</a>
                    </div>
                  </div>
                );
              })}

              <div className="row">
                <div className="col-9">
                  <div className="d-flex flex-row-reverse">
                    <button className="add-btn" onClick={() => handleAddUnit()}>
                      Add row
                    </button>
                    <br />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <label className="heading2">Phase</label>
                </div>
              </div>
              <div></div>
              <div>
                {addPhase.map((addPhase, index) => {
                  return (
                    <div className="row" style={{ paddingBottom: "6px" }}>
                      <div className="col-3">
                        <label>Phase Name</label>
                        <input
                          type="text"
                          class="form-control"
                          name="phasename"
                          id="outlined-basic"
                          value={addPhase.phasename}
                          onChange={(event) => handlePhaseChange(index, event)}
                        />
                      </div>

                      <div className="col-3">
                        <label>Phase Code</label>
                        <input
                          type="text"
                          class="form-control"
                          name="basesqftrate"
                          id="outlined-basic"
                          value={addPhase.phasecode}
                          onChange={(event) => handlePhaseChange(index, event)}
                        />
                      </div>

                      <div className="col-3 my-auto">
                        <a className="deactivate">Delete</a>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="d-flex flex-row-reverse">
                    <button
                      className="add-btn"
                      onClick={() => handleAddPhase()}
                    >
                      Add row
                    </button>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-4">
                  <label>Floor Escalation Charge</label>
                  <input
                    type="number"
                    class="form-control"
                    name="flooresccharge"
                    id="outlined-basic"
                    value={flooresccharges}
                    onChange={(e) => setFloorEscCharges(e.target.value)}
                  />
                </div>

                <div className="col-4">
                  <label>Built Up Area Factor</label>
                  <input
                    type="number"
                    class="form-control"
                    name="builtupareafactor"
                    id="outlined-basic"
                    value={builtupareafactor}
                    onChange={(e) => setBuiltUpAreaFactor(e.target.value)}
                  />
                </div>

                <div className="col-4">
                  <label>Super Built Up Area Factor</label>
                  <input
                    type="number"
                    class="form-control"
                    name="superbuiltupareafactor"
                    id="outlined-basic"
                    value={superbuiltupareafactor}
                    onChange={(e) => setSuperBuiltUpAreaFactor(e.target.value)}
                  />
                </div>
              </div>
              <br />

              <div className="row">
                <div className="col-4">
                  <label>Car Parking Open</label>
                  <input
                    type="number"
                    class="form-control"
                    name="carparkingopen"
                    id="outlined-basic"
                    value={carparkingopen}
                    onChange={(e) => setCarParkingOpen(e.target.value)}
                  />
                </div>

                <div className="col-4">
                  <label>Car Parking Covered</label>
                  <input
                    type="number"
                    class="form-control"
                    name="carparkingcovered"
                    id="outlined-basic"
                    value={carparkingcovered}
                    onChange={(e) => setCarParkingCovered(e.target.value)}
                  />
                </div>
              </div>
              <br />

              <div className="row">
                <div className="col-12">
                  <label className="heading2">Other Charges</label>
                </div>
              </div>
              <div></div>
              {othercharges.map((othercharges, index) => {
                return (
                  <div>
                    -
                    <div className="row" style={{ paddingBottom: "6px" }}>
                      <div className="col-4">
                        <label>Name</label>
                        <input
                          type="text"
                          class="form-control"
                          name="name"
                          id="outlined-basic"
                          value={othercharges.name}
                          onChange={(event) =>
                            handleOtherChargesChange(index, event)
                          }
                        />
                      </div>

                      <div className="col-4">
                        <label>Amount</label>
                        <input
                          type="text"
                          class="form-control"
                          name="amount"
                          id="outlined-basic"
                          value={othercharges.amount}
                          onChange={(event) =>
                            handleOtherChargesChange(index, event)
                          }
                        />
                      </div>

                      <div className="col-4">
                        <label>GST</label>
                        <input
                          type="text"
                          class="form-control"
                          name="gst"
                          id="outlined-basic"
                          value={othercharges.gst}
                          onChange={(event) =>
                            handleOtherChargesChange(index, event)
                          }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-10">
                        <label
                          class="form-check-label"
                          style={{ paddingRight: "4rem" }}
                        >
                          Fixed
                          <input
                            type="radio"
                            className="form-check-input"
                            id="fixed"
                            value="othercharges"
                            checked={
                              othercharges.chargestype == "fixed" ? true : false
                            }
                            onChange={(event) =>
                              handleOtherChargesChange(index, event)
                            }
                          />
                        </label>

                        <label class="form-check-label px-4">
                          Per SqFt
                          <input
                            type="radio"
                            className="form-check-input"
                            id="persqft"
                            value="chargestype"
                            checked={
                              othercharges.chargestype == "persqft"
                                ? true
                                : false
                            }
                            onChange={(event) =>
                              handleOtherChargesChange(index, event)
                            }
                          />
                        </label>
                      </div>
                    </div>
                    <br />
                  </div>
                );
              })}
              <div className="row">
                <div className="col-9">
                  <div className="d-flex flex-row-reverse">
                    <button
                      className="add-btn"
                      onClick={() => handleAddOtherCharges()}
                    >
                      Add row
                    </button>
                    <br />
                  </div>
                </div>
              </div>
              <br />
              <div className="row justify-content-center">
                <div className="col-2">
                  <button
                    className="btn btn-secondary btn-user btn-block"
                    onClick={() => setActiveStep(0)}
                  >
                    Back
                  </button>
                </div>
                <div className=" col-2">
                  <button
                    className="btn btn-secondary btn-user btn-block"
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </button>
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
