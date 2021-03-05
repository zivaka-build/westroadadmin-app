import { Form, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Cookies from "js-cookie";
import { navigate } from "@reach/router";
import { BASE_URL } from "../../config/url";
import "./../../assets/css/addmember.css";
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
import { Email } from "@material-ui/icons";

function AddMember() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [fulladdress, setFulladdress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [pan, setPan] = useState("");
  const [supervisorid, setSupervisorid] = useState("");
  const [supervisorname, setSupervisorname] = useState("");

  const [error1, setError1] = useState(false);

  const [tom, setTom] = useState("");
  const [fn, setFn] = useState("");
  const [ln, setLn] = useState("");
  const [gn, setGn] = useState("");
  const [ph, setPh] = useState("");
  const [wa, setWa] = useState("");
  const [em, setEm] = useState("");
  const [ad, setAd] = useState("");
  const [ct, setCt] = useState("");
  const [st, setSt] = useState("");
  const [pc, setPc] = useState("");
  const [ec, setEc] = useState("");
  const [ecn, setEcn] = useState("");

  // useEffect(() => {
  //   const Token = "bearer" + " " + Cookies.get("Token");

  //   axios
  //     .get(`${BASE_URL}` + "/api/v1.0/broker/getallbroker", {
  //       headers: { Authorization: Token },
  //     })
  //     .then((response) => {
  //       const arr2 = response.data;
  //       const brokers = arr2.brokers.map((broker) => {
  //         const { firstName, lastName, brokerID } = broker;

  //         return {
  //           firstName,
  //           lastName,
  //           brokerID,
  //         };
  //       });
  //       setBrokers(brokers);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const handleNext1 = () => {
    setActiveStep(1);
  };

  const handleNext2 = () => {
    setActiveStep(2);
  };

  const handleNext3 = () => {
    setActiveStep(3);
  };

  const handleBack1 = () => {
    setActiveStep(0);
  };

  const handleBack2 = () => {
    setActiveStep(1);
  };

  // const finish = () => {
  //   const Token = "bearer" + " " + Cookies.get("Token");
  //   axios
  //     .post(
  //       `${BASE_URL}` + "/api/v1.0/broker/addbroker",
  //       {
  //         firstName: firstname,
  //         lastName: lastname,
  //         typeOfMember: typeofmember,
  //         gender: gender,
  //         whatsapp: whatsapp,
  //         city: city,
  //         state: state,
  //         pinCode: pincode,
  //         address: address,
  //         phone: phone,
  //         email: email,
  //         emergencyContactName: emergencycontactname,
  //         emergencyContactNumber: 1 * emergencycontact,
  //         password: password,
  //       },
  //       { headers: { Authorization: Token } }
  //     )
  //     .then((response) => {
  //       console.log(response);
  //       navigate("/teammembers");
  //     })
  //     .catch((error) => console.log(error));
  // };

  return (
    <div>
      <div className="addmember" name="addmember" id="addmember">
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel className="step-label">
              <h4>Add a member</h4>
            </StepLabel>
            <StepContent>
              <form id="addmember" name="addmember">
                <div className="row">
                  <div className="col-6">
                    <label>First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="firstname"
                      id="outlined-basic"
                      value={firstname}
                      onChange={(e) => {
                        setFirstname(e.target.value);
                      }}
                    />
                  </div>

                  <div className="col-6">
                    <label>Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="lastname"
                      id="outlined-basic"
                      value={lastname}
                      onChange={(e) => {
                        setLastname(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <br />
                <div className="row">
                  <div className="col-2">
                    <label class="text-align left">Gender</label>
                  </div>
                  <div className="col-10">
                    <label class="form-check-label px-4">
                      Male
                      <input
                        type="radio"
                        className="form-check-input"
                        id="male"
                        name="gender"
                        onClick={(e) => {
                          setGender("Male");
                        }}
                      />
                    </label>

                    <label class="form-check-label px-4">
                      Female
                      <input
                        type="radio"
                        className="form-check-input"
                        id="female"
                        name="gender"
                        onClick={(e) => {
                          setGender("Female");
                        }}
                      />
                    </label>
                    <label class="form-check-label px-4">
                      Other
                      <input
                        type="radio"
                        className="form-check-input"
                        id="other"
                        name="gender"
                        onClick={(e) => {
                          setGender("Other");
                        }}
                      />
                    </label>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-12">
                    <label>Current Addresss</label>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <label>Full Address</label>
                    <input
                      type="text"
                      class="form-control"
                      name="fulladdress"
                      id="outlined-basic"
                      value={fulladdress}
                        onChange={(e) => {
                          setFulladdress(e.target.value);
                        }}
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
                        onChange={(e) => {
                          setLandmark(e.target.value);
                        }}
                    />
                  </div>

                  <div className="col-6">
                    <label>City</label>
                    <input
                      type="text"
                      class="form-control"
                      name="city"
                      id="outlined-basic"
                      value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                    />
                  </div>
                </div>
                <br />
                <div class="row">
                  <div className="col-6">
                    <label>Pincode</label>
                    <input
                      type="text"
                      class="form-control"
                      name="pincode"
                      id="outlined-basic"
                      maxLength={6}
                      value={pincode}
                        onChange={(e) => {
                          setPincode(e.target.value);
                        }}
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
                        onChange={(e) => {
                          setState(e.target.value);
                        }}
                    />
                  </div>
                </div>

                <br />
                <div className="row">
                  <div className="col-12">
                    <label>Email id</label>
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      id="outlined-basic"
                      value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-6">
                    <label>Password</label>
                    <input
                      type="password"
                      class="form-control"
                      name="password"
                      id="outlined-basic"
                      value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                    />
                  </div>
                  <div className="col-6">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="outlined-basic"
                      value={confirmpassword}
                        onChange={(e) => {
                          setConfirmpassword(e.target.value);
                        }}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-6">
                    <label>Mobile Number</label>
                    <input
                      type="number"
                      class="form-control"
                      name="mobilenumber"
                      id="outlined-basic"
                      value={mobilenumber}
                        onChange={(e) => {
                          setMobilenumber(e.target.value);
                        }}
                    />
                  </div>
                  <div className="col-6">
                    <label>Whatsapp Number</label>
                    <input
                      type="number"
                      class="form-control"
                      id="outlined-basic"
                      name="whatsapp"
                      value={whatsapp}
                        onChange={(e) => {
                          setWhatsapp(e.target.value);
                        }}
                    />
                  </div>
                </div>

                <br />
                <div className="row">
                  <div className="col-6">
                    <label>Aadhar ID</label>
                    <input
                      type="text"
                      class="form-control"
                      name="aadharid"
                      id="outlined-basic"
                      value={aadhar}
                        onChange={(e) => {
                          setAadhar(e.target.value);
                        }}
                    />
                  </div>

                  <div className="col-6">
                    <label>PAN Card ID</label>
                    <input
                      type="text"
                      class="form-control"
                      name="pan"
                      id="outlined-basic"
                      value={pan}
                        onChange={(e) => {
                          setPan(e.target.value);
                        }}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-6">
                    <label>Supervisor ID</label>
                    <input
                      type="text"
                      class="form-control"
                      name="supervisorid"
                      id="outlined-basic"
                      value={supervisorid}
                        onChange={(e) => {
                          setSupervisorid(e.target.value);
                        }}
                    />
                  </div>

                  <div className="col-6">
                    <label>Supervisor Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="supervisorname"
                      id="outlined-basic"
                      value={supervisorname}
                        onChange={(e) => {
                          setSupervisorname(e.target.value);
                        }}
                    />
                  </div>
                </div>
                <br />
              </form>
              <div
                id="error2"
                style={{ display: "none", color: "red", paddingBottom: 10 }}
              >
                Please enter correct password in Confirm Password!
              </div>
              <div
                id="error1"
                style={{ display: "none", color: "red", paddingBottom: 10 }}
              >
                Please fill out all details!
              </div>
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
              <h4>Choose department</h4>
            </StepLabel>
            <StepContent>
              <Form.Group as={Row}>
                <Col lg={4} className="py-4">
                  <img src={BackOfficeRadio} height="40" width="40" />
                  <label class="form-check-label px-4">
                    Back Office
                    <input
                      type="radio"
                      className="form-check-input"
                      id="backOffice"
                      name="department"
                      value="backOffice"
                    />
                  </label>
                </Col>
                <Col lg={4} className="py-4">
                  <img src={SalesRadio} height="40" width="40" />
                  <label class="form-check-label px-4">
                    Sales
                    <input
                      type="radio"
                      className="form-check-input"
                      id="sales"
                      name="department"
                      value="sales"
                    />
                  </label>
                </Col>
                <Col lg={4} className="py-4">
                  <img src={EngineeringRadio} height="40" width="40" />
                  <label class="form-check-label px-4">
                    Engineering
                    <input
                      type="radio"
                      className="form-check-input"
                      id="engineering"
                      name="department"
                      value="engineering"
                    />
                  </label>
                </Col>

                <Col lg={4} className="py-4">
                  <img src={FinanceRadio} height="40" width="40" />
                  <label class="form-check-label px-4">
                    Finance
                    <input
                      type="radio"
                      className="form-check-input"
                      id="finance"
                      name="department"
                      value="finance"
                    />
                  </label>
                </Col>
                <Col lg={4} className="py-4">
                  <img src={PurchaseRadio} height="40" width="40" />
                  <label class="form-check-label px-4">
                    Purchase
                    <input
                      type="radio"
                      className="form-check-input"
                      id="purchase"
                      name="department"
                      value="purchase"
                    />
                  </label>
                </Col>
                <Col lg={4} className="py-4">
                  <img src={ManagementRadio} height="40" width="40" />
                  <label class="form-check-label px-4">
                    Management
                    <input
                      type="radio"
                      className="form-check-input"
                      id="management"
                      name="department"
                      value="management"
                    />
                  </label>
                </Col>
              </Form.Group>
              <div className="row justify-content-center">
              <div className="col-2">
                  <button
                    className="btn btn-secondary btn-user btn-block"
                    onClick={handleBack1}
                  >
                    Back
                  </button>
                </div>
                <div className=" col-2">
                  <button
                    className="btn btn-secondary btn-user btn-block"
                    onClick={handleNext2}
                  >
                    Next
                  </button>
                </div>
                
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              <h4>Choose access role</h4>
            </StepLabel>
            <StepContent>
              <Form.Group as={Row}>
                <Col lg={4} className="py-4">
                  <img src={BackOfficeCheck} height="40" width="40" />
                  <label class="form-check-label px-4">
                    Back Office
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="backOffice"
                      name="access"
                      value="backOffice"
                    />
                  </label>
                </Col>
                <Col lg={4} className="py-4">
                  <img src={SalesCheck} height="40" width="40" />
                  <label class="form-check-label px-4">
                    Sales
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="sales"
                      name="access"
                      value="sales"
                    />
                  </label>
                </Col>
                <Col lg={4} className="py-4">
                  <img src={EngineeringCheck} height="40" width="40" />
                  <label class="form-check-label px-4">
                    Engineering
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="engineering"
                      name="access"
                      value="engineering"
                    />
                  </label>
                </Col>

                <Col lg={4} className="py-4">
                  <img src={FinanceCheck} height="40" width="40" />
                  <label class="form-check-label px-4">
                    Finance
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="finance"
                      name="access"
                      value="finance"
                    />
                  </label>
                </Col>
                <Col lg={4} className="py-4">
                  <img src={PurchaseCheck} height="40" width="40" />
                  <label class="form-check-label px-4">
                    Purchase
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="purchase"
                      name="access"
                      value="purchase"
                    />
                  </label>
                </Col>
                <Col lg={4} className="py-4">
                  <img src={ManagementCheck} height="40" width="40" />
                  <label class="form-check-label px-4">
                    Management
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="management"
                      name="access"
                      value="management"
                    />
                  </label>
                </Col>
              </Form.Group>
              <div className="row justify-content-center">
                
                <div className="col-2">
                  <button
                    className="btn btn-secondary btn-user btn-block"
                    onClick={handleBack2}
                  >
                    Back
                  </button>
                </div>
                <div className=" col-2">
                  <button
                    className="btn btn-secondary btn-user btn-block"
                    onClick={handleNext3}
                  >
                    Next
                  </button>
                </div>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel className="step-label">
              <h4>Review</h4>
            </StepLabel>
            <StepContent>
              <div>
                <p>Click on Submit to Create Team Member</p>
              </div>
              <form id="addmember" name="addmember">
                <div className="row">
                  <div className="col-6">
                    <label>First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="firstname"
                      id="outlined-basic"
                      value={firstname}
                      readonly
                    />
                  </div>

                  <div className="col-6">
                    <label>Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="lastname"
                      id="outlined-basic"
                      value={lastname}
                      readonly
                    />
                  </div>
                </div>

                <br />
                <div className="row">
                  <div className="col-2">
                    <label class="text-align left">Gender</label>
                  </div>
                  <div className="col-10">
                    <label class="form-check-label px-4">
                      Male
                      <input
                        type="radio"
                        className="form-check-input"
                        id="male"
                        name="gender"
                        
                        readonly
                      />
                    </label>

                    <label class="form-check-label px-4">
                      Female
                      <input
                        type="radio"
                        className="form-check-input"
                        id="female"
                        name="gender"
                        {...gender == "Female"? 'checked="checked"' : null}
                        // checked={true}
                        readonly
                      />
                    </label>
                    <label class="form-check-label px-4">
                      Other
                      <input
                        type="radio"
                        className="form-check-input"
                        id="other"
                        name="gender"
                        value="other"
                      />
                    </label>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-12">
                    <label>Current Addresss</label>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <label>Full Address</label>
                    <input
                      type="text"
                      class="form-control"
                      name="fulladdress"
                      id="outlined-basic"
                      value={fulladdress}
                      readonly
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
                      readonly
                    />
                  </div>

                  <div className="col-6">
                    <label>City</label>
                    <input
                      type="text"
                      class="form-control"
                      name="city"
                      id="outlined-basic"
                      value={city}
                      readonly
                    />
                  </div>
                </div>
                <br />
                <div class="row">
                  <div className="col-6">
                    <label>Pincode</label>
                    <input
                      type="text"
                      class="form-control"
                      name="pincode"
                      id="outlined-basic"
                      value={pincode}
                      readonly
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
                      readonly
                    />
                  </div>
                </div>

                <br />
                <div className="row">
                  <div className="col-12">
                    <label>Email id</label>
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      id="outlined-basic"
                      value={email}
                      readonly
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-6">
                    <label>Password</label>
                    <input
                      type="password"
                      class="form-control"
                      name="password"
                      id="outlined-basic"
                      value={password}
                      readonly
                    />
                  </div>
                  <div className="col-6">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="outlined-basic"
                      value={confirmpassword}
                      readonly
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-6">
                    <label>Mobile Number</label>
                    <input
                      type="text"
                      class="form-control"
                      name="mobilenumber"
                      id="outlined-basic"
                      value={mobilenumber}
                      readonly
                    />
                  </div>
                  <div className="col-6">
                    <label>Whatsapp Number</label>
                    <input
                      type="text"
                      class="form-control"
                      id="outlined-basic"
                      name="whatsapp"
                      value={whatsapp}
                      readonly
                    />
                  </div>
                </div>

                <br />
                <div className="row">
                  <div className="col-6">
                    <label>Aadhar ID</label>
                    <input
                      type="text"
                      class="form-control"
                      name="aadhar"
                      id="outlined-basic"
                      value={aadhar}
                      readonly
                    />
                  </div>

                  <div className="col-6">
                    <label>PAN Card ID</label>
                    <input
                      type="text"
                      class="form-control"
                      name="pan"
                      id="outlined-basic"
                      value={pan}
                      readonly
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-6">
                    <label>Supervisor ID</label>
                    <input
                      type="text"
                      class="form-control"
                      name="supervisorid"
                      id="outlined-basic"
                      value={supervisorid}
                      readonly
                    />
                  </div>

                  <div className="col-6">
                    <label>Supervisor Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="supervisorname"
                      id="outlined-basic"
                      value={supervisorname}
                      readonly
                    />
                  </div>
                </div>
                <br />
              </form>
              <div className="row justify-content-center">
              <div className="col-2">
                  <button
                    className="btn btn-secondary btn-user btn-block"
                    onClick={handleBack1}
                  >
                    Back
                  </button>
                </div>
                <div className=" col-2">
                  <button className="btn btn-secondary btn-user btn-block">
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
