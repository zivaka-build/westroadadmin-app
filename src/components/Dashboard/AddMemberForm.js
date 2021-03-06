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
import Swal from 'sweetalert2';

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
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState([]);
  const [management, setManagement] = useState("")
  const [backOffice, setBackOffice] = useState("")
  const [sales, setSales ] = useState("")
  const [engineering, setEngineering ] = useState("")
  const [finance, setFinance ] = useState("")
  const [purchase, setPurchase ] = useState("")


  const handleNext1 = () => {
    if (firstname === '' || lastname === '' || gender === '' || fulladdress == '' || landmark == '' || city == '' || pincode == '' || state == '' || email == '' || 
    password == '' || confirmpassword == '' || mobilenumber == '' || whatsapp == '' || aadhar == '' || pan == '' || supervisorid == '' || supervisorname == '') {
      Swal.fire({
        icon: 'error',
        title: 'Ooops',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        text: 'Please fill out all details!'
      })
    }
    else {
    setActiveStep(1);
    }
  };

  const handleNext2 = () => {
    if(department === "") {
      Swal.fire({
        icon: 'error',
        title: 'Ooops',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        text: 'Please Choose a Department!'
      })
    }
    else {
    setActiveStep(2);
    }
  };

  const handleNext3 = () => {
    if(backOffice == "" && management == "" && sales == "" && engineering == "" && purchase == "" && finance == ""){
      Swal.fire({
        icon: 'error',
        title: 'Ooops',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        text: 'Please Provide Access Roles!'
      })
    }
    else{
    setActiveStep(3);
    }
  };

  const handleBack1 = () => {
    setActiveStep(0);
  };

  const handleBack2 = () => {
    setActiveStep(1);
  };

  const changeBackOffice = (e) => {
    if(backOffice === "") {
      setBackOffice(e.target.value)
      role.push(e.target.value)
    }
    else {
      setBackOffice("")
      
      const arr = role.filter(function(role) {
          return role !== "Back Office"
      })
      setRole(arr)
  }
}

  const changeSales = (e) => {
    if(sales === "") {
      setSales(e.target.value)
      role.push(e.target.value)
    }
    else {
      setSales("")
      const arr = role.filter(function(role) {
        return role !== "Sales"
    })
    setRole(arr)
      
    }
  }

  const changeEngineering = (e) => {
    if(engineering === "") {
      setEngineering(e.target.value)
      role.push(e.target.value)
    }
    else {
      setEngineering("")
      const arr = role.filter(function(role) {
        return role !== "Engineering"
    })
    setRole(arr)
      
    }
  }

  const changeFinance = (e) => {
    if(finance === "") {
      setFinance(e.target.value)
      role.push(e.target.value)
    }
    else {
      setFinance("")
      const arr = role.filter(function(role) {
        return role !== "Finance"
    })
    setRole(arr)
    }
  }

  const changePurchase = (e) => {
    if(purchase === "") {
      setPurchase(e.target.value)
      role.push(e.target.value)
    }
    else {
      setPurchase("")
      const arr = role.filter(function(role) {
        return role !== "Purchase"
    })
    setRole(arr)
    }
  }

  const changeManagement = (e) => {
    if(management === "") {
      setManagement(e.target.value)
      role.push(e.target.value)
    }
    else {
      setManagement("")
      const arr = role.filter(function(role) {
        return role !== "Management"
    })
    setRole(arr)
    }
  }

  

  
  return (
    <div>
      <div className="addmember" name="addmember" id="addmember">
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel className="step-label">
              <h4>Add a Member</h4>
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
              <h4>Choose Department</h4>
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
                      value="Back Office"
                      checked={department == "Back Office"? true : false}
                      onClick={()=>setDepartment("Back Office")}
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
                      checked={department == "Sales"? true : false}
                      onClick={()=>setDepartment("Sales")}
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
                      checked={department == "Engineering"? true : false}
                      onClick={()=>setDepartment("Engineering")}
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
                      checked={department == "Finance"? true : false}
                      onClick={()=>setDepartment("Finance")}
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
                      checked={department == "Purchase"? true : false}
                      onClick={()=>setDepartment("Purchase")}
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
                      checked={department == "Management"? true : false}
                      onClick={()=>setDepartment("Management")}
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
              <h4>Choose Access Role</h4>
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
                      value="Back Office"
                      checked={backOffice !== ""? true : false}
                      onClick={changeBackOffice}
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
                      value="Sales"
                      checked={sales !== ""? true : false}
                      onClick={changeSales}
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
                      value="Engineering"
                      checked={engineering !== ""? true : false}
                      onClick={changeEngineering}
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
                      value="Finance"
                      checked={finance !== ""? true : false}
                      onClick={changeFinance}
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
                      value="Purchase"
                      checked={purchase !== ""? true : false}
                      onClick={changePurchase}
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
                      value="Management"
                      checked={management !== ""? true : false}
                      onClick={changeManagement}
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
                        checked={gender == "Male" ? true : false}
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
                        checked={gender == "Female" ? true : false}
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
                        checked={gender == "Other" ? true : false}
                        readonly
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
                    onClick={()=>setActiveStep(2)}
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
