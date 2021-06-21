import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import "./../../assets/css/form.css";
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "./../../config/url";
import Cookies from 'js-cookie'; 
import { NavigateBefore } from "@material-ui/icons";
import { navigate } from "@reach/router"


function AddMember() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [sitename, setSiteName] = React.useState("");
  const [sitedesc, setSiteDesc] = React.useState("");
  const [hirano, setHiraNo] = React.useState("");
  const [sitecode, setSiteCode] = React.useState("");
  const [bpsn, setBpsn] = React.useState("");
  const [fulladdress, setFullAddress] = React.useState("");
  const [landmark, setLandmark] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  
  const [addPhase, setAddPhase] = React.useState([
    { phaseName: "", phaseCode: "" },
  ]);

  const [addCarParking, setAddCarParking] = React.useState([
    {type: "", typeCode: "", price: ""}
  ])

  const [addLegalCharges, setAddLegalCharges] = React.useState([
    {description: "", amount: "", gst: "", bhk: ""}
  ])

  const [flooresccharges, setFloorEscCharges] = React.useState("");
  const [builtupareafactor, setBuiltUpAreaFactor] = React.useState("");
  const [superbuiltupareafactor, setSuperBuiltUpAreaFactor] = React.useState(
    ""
  );
  const [carparkingopen, setCarParkingOpen] = React.useState("");
  const [carparkingcovered, setCarParkingCovered] = React.useState("");
  const [othercharges, setOtherCharges] = React.useState([
    { name: "", amount: "", gst: "", fixed: "", perSqFt: "" },
  ]);
  const [chargestype, setChargesType] = React.useState("");

  const [noOfEscalation, setNoOfEscalation] = React.useState("")
  const [noOfFloor, setNoOfFloor] = React.useState("")
  const [ugstPercent, setUgstPercent] = React.useState("")

  const handleNext1 = () => {
    if (
      sitename === "" ||
      sitedesc === "" ||
      hirano === "" ||
      sitecode === "" ||
      bpsn === "" ||
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

  const handleAddPhase = () => {
    const values = [...addPhase];
    values.push({ phaseName: "", phaseCode: "" });
    setAddPhase(values);
  };

  const handleAddCarParking = () => {
    const values = [...addCarParking];
    values.push({ type: "", typeCode: "" , price: ""});
    setAddCarParking(values);
  };

  const handleAddLegalCharges = () => {
    const values = [...addLegalCharges];
    values.push({description: "", amount: "", gst: "", bhk: ""});
    setAddLegalCharges(values);
  };

  const handleAddOtherCharges = () => {
    const values = [...othercharges];
    values.push({ name: "", amount: "", gst: "", fixed: "" , perSqFt: ""});
    setOtherCharges(values);
  };

  

  const handlePhaseChange = (index, event) => {
    const values = [...addPhase];
    if (event.target.name === "phasename") {
      values[index].phaseName = event.target.value;
    } else {
      values[index].phaseCode = event.target.value;
    }
    setAddPhase(values);
  };

  const handleCarParkingChange = (index, event) => {
    const values = [...addCarParking];
    if (event.target.name === "type") {
      values[index].type = event.target.value;
    } 
    else if(event.target.name === "typecode") {
      values[index].typeCode = event.target.value;
    }
    else if(event.target.name === "price"){
      values[index].price = parseInt(event.target.value);
    }
   
    setAddCarParking(values);
  }

  const handleOtherChargesChange = (index, event) => {
    const values = [...othercharges];
    if (event.target.name === "name") {
      values[index].name = event.target.value;
    } else if (event.target.name === "amount") {
      values[index].amount = parseInt(event.target.value);
    } else if (event.target.name === "gst") {
      values[index].gst = parseInt(event.target.value);
    } else {
      if (event.target.id === "fixed") {
        values[index].fixed = "true";
        values[index].perSqFt = "false"
      } else if (event.target.id === "persqft") {
        values[index].fixed = "false";
        values[index].perSqFt = "true"
      }
    }
    setOtherCharges(values);
  };

  const handleLegalChargesChange = (index, event) => {
    const values = [...addLegalCharges];
    if (event.target.name === "description") {
      values[index].description = event.target.value;
    } 
    else if(event.target.name === "amount") {
      values[index].amount = event.target.value;
    }
    else if(event.target.name === "gst") {
      values[index].gst = event.target.value;
    }
    else {
      values[index].bhk = event.target.value + "BHK";
    }
    setAddLegalCharges(values);
  }

  console.log(othercharges)

  const handleDeletePhase = (index, event) => {
    const values = [...addPhase];
    values.pop()
    setAddPhase(values);
  };

  const handleDeleteCarParking = (index, event) => {
    const values = [...addCarParking];
    values.pop()
    setAddCarParking(values);
  };

  const handleDeleteLegalCharges = (index, event) => {
    const values = [...addLegalCharges];
    values.pop()
    setAddLegalCharges(values);
  };

  const handleDeleteOtherCharges = (index, event) => {
    const values = [...othercharges];
    values.pop()
    setOtherCharges(values);

  }
  


  const validateAddPhase = (addPhase) => {
    for (let index = 0; index < addPhase.length; index++) {
      if (addPhase[index].phaseName == "" || addPhase[index].phaseCode == "") {
        return 0;
      }
    }
    return 1;
  };
  console.log(addCarParking);
  const handleSubmit = () => {
    
    if (
      validateAddPhase(addPhase) === 0 ||
      flooresccharges === "" ||
      builtupareafactor === "" ||
      superbuiltupareafactor === ""
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
    else{
      const Token = 'bearer' + " " + Cookies.get('Token')
      console.log(Token);
      axios
            .post(`${BASE_URL}/api/v1/site/addNewSite`, 
            {
              siteName: sitename,
              siteDescription: sitedesc,
              siteAddress: {
                fullAddress: fulladdress,
                landmark: landmark,
                city: city,
                pinCode: pincode*1,
                state: state
              },
              siteActive: true,
              siteHIRANo: hirano,
              buildingPlanSanctionNo: bpsn,
              siteCompanyName: "Westroad Housing LLP",
              siteCode: sitecode,
              noEscalationFloor: noOfEscalation*1,
              noOfFloor: noOfFloor*1,
              floorEscalationCharge: flooresccharges*1,
              builtUpAreaFactor: builtupareafactor*1,
              superBuiltUpAreaFactor: superbuiltupareafactor*1,
              unitGSTPercentage: ugstPercent*1,
              phases: addPhase,
              carParkingType: addCarParking,
              otherCharges: othercharges,
              LegalCharges: addLegalCharges
            },
            { headers : { 'Authorization' : Token }},
            
            )
            .then((response) => {
                navigate("dashboard/managesite")
            })
            .catch(err=>{
                console.log(err)
            }) 
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
                  <label>Building Plan Sanction No.</label>
                  <input
                    type="text"
                    class="form-control"
                    name="bpsn"
                    id="outlined-basic"
                    value={bpsn}
                    onChange={(e) => setBpsn(e.target.value)}
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
                          value={addPhase.phaseName}
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
                          value={addPhase.phaseCode}
                          onChange={(event) => handlePhaseChange(index, event)}
                        />
                      </div>

                      <div className="col-6">
                        <button
                          className="add-btn mt-4"
                          onClick={() => handleAddPhase()}
                        >
                          Add row
                        </button>
                        &nbsp;&nbsp;
                        <button className="add-btn mt-4" onClick={()=> handleDeletePhase()} style={{display : index === 0 ? "none": "inline-block"}}>Delete</button>
                    </div>
                    </div>
                  );
                })}
              </div>
              <br />
              <div className="row">
                <div className="col-12">
                  <label className="heading2">Car Parkings</label>
                </div>
              </div>
              <div></div>
              <div>
                {addCarParking.map((addCarParking, index) => {
                  return (
                    <div className="row" style={{ paddingBottom: "6px" }}>
                      <div className="col-2">
                        <label>Type</label>
                        <input
                          type="text"
                          class="form-control"
                          name="type"
                          id="outlined-basic"
                          value={addCarParking.type}
                          onChange={(event) => handleCarParkingChange(index, event)}
                        />
                      </div>

                      <div className="col-2">
                        <label>Type Code</label>
                        <input
                          type="text"
                          class="form-control"
                          name="typecode"
                          id="outlined-basic"
                          value={addCarParking.typeCode}
                          onChange={(event) => handleCarParkingChange(index, event)}
                        />
                      </div>

                      <div className="col-2">
                        <label>Price</label>
                        <input
                          type="number"
                          class="form-control"
                          name="price"
                          id="outlined-basic"
                          value={addCarParking.price}
                          onChange={(event) => handleCarParkingChange(index, event)}
                        />
                      </div>

                

                      <div className="col-3">
                        <button
                          className="add-btn mt-4"
                          onClick={() => handleAddCarParking()}
                        >
                          Add row
                        </button>
                        &nbsp;&nbsp;
                        <button className="add-btn mt-4" onClick={()=> handleDeleteCarParking()} style={{display : index === 0 ? "none": "inline-block"}}>Delete</button>
                    </div>
                    </div>
                  );
                })}
              </div>
              <br />
              <div className="row">
                <div className="col-12">
                  <label className="heading2">Legal Charges</label>
                </div>
              </div>
              <div></div>
              <div>
                {addLegalCharges.map((addLegalCharges, index) => {
                  return (
                    <>
                    <div className="row" style={{ paddingBottom: "6px" }}>
                      <div className="col-9">
                        <label>Description</label>
                        <input
                          type="text"
                          class="form-control"
                          name="description"
                          id="outlined-basic"
                          value={addLegalCharges.description}
                          onChange={(event) => handleLegalChargesChange(index, event)}
                        />
                      </div>

                      <div className="col-3">
                        <label>BHK</label>
                        <input
                          type="number"
                          class="form-control"
                          name="bhk"
                          id="outlined-basic"
                          value={parseInt(addLegalCharges.bhk.substring(0,addLegalCharges.bhk.indexOf("B") ))}
                          onChange={(event) => handleLegalChargesChange(index, event)}
                        />
                      </div>
                      
                    </div>
                    <div className="row" style={{ paddingBottom: "6px" }}>
                      <div className="col-3">
                        <label>Amount</label>
                        <input
                          type="number"
                          class="form-control"
                          name="amount"
                          id="outlined-basic"
                          value={addLegalCharges.amount}
                          onChange={(event) => handleLegalChargesChange(index, event)}
                        />
                      </div>

                      <div className="col-3">
                        <label>GST</label>
                        <input
                          type="number"
                          class="form-control"
                          name="gst"
                          id="outlined-basic"
                          value={addLegalCharges.gst}
                          onChange={(event) => handleLegalChargesChange(index, event)}
                        />
                      </div>

                      <div className="col-3">
                        <button
                          className="add-btn mt-4"
                          onClick={() => handleAddLegalCharges()}
                        >
                          Add row
                        </button>
                        &nbsp;&nbsp;
                        <button className="add-btn mt-4" onClick={()=> handleDeleteLegalCharges()} style={{display : index === 0 ? "none": "inline-block"}}>Delete</button>
                      </div>
                    </div>
                    </>
                  );
                })}
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
                  <>
                  <div>
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
                          type="number"
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
                          type="number"
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
                            name="chargetype"
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
                            name="chargetype"
                            onChange={(event) =>
                              handleOtherChargesChange(index, event)
                            }
                          />
                        </label>
                      </div>
                    </div>
                    <br />
                  </div>
                  <div className="row">
                  <div className="col-12">
                    <div className="text-right">
                      <button
                        className="add-btn"
                        onClick={() => handleAddOtherCharges()}
                      >
                        Add row
                      </button>
                      &nbsp;&nbsp;
                      <button
                        className="add-btn"
                        onClick={() => handleDeleteOtherCharges()}
                        style={{display : index === 0 ? "none": "inline-block"}}
                      >
                        Delete
                      </button>
                      <br />
                    </div>
                  </div>
                </div>
                </>
                );
              })}
             
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
                  <label>No. Of Floors</label>
                  <input
                    type="number"
                    class="form-control"
                    name="nooffloor"
                    id="outlined-basic"
                    value={noOfFloor}
                    onChange={(e) => setNoOfFloor(e.target.value)}
                  />
                </div>

                <div className="col-4">
                  <label>No. Of Escalation Floor</label>
                  <input
                    type="number"
                    class="form-control"
                    name="noEscalationFloor"
                    id="outlined-basic"
                    value={noOfEscalation}
                    onChange={(e) => setNoOfEscalation(e.target.value)}
                  />
                </div>

                <div className="col-4">
                  <label>Unit GST Percentage</label>
                  <input
                    type="number"
                    class="form-control"
                    name="ugstPercent"
                    id="outlined-basic"
                    value={ugstPercent}
                    onChange={(e) => setUgstPercent(e.target.value)}
                  />
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
