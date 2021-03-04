import { Form, Row, Col } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
// import { DetailsContext } from "./MemberContext";
import axios from "axios";
import Cookies from "js-cookie";
import { navigate } from "@reach/router";
import { MenuItem } from "@material-ui/core";
import { BASE_URL } from "../../config/url";

function AddMember() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [emergencycontact, setEmergencycontact] = useState("");
  const [password, setPassword] = useState("");
  const [typeofmember, setTypeofmember] = useState("");
  const [gender, setGender] = useState("");
  const [emergencycontactname, setEmergencycontactname] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error1, setError1] = useState(false);
  const [bid, setBid] = useState("");
  const [brokers, setBrokers] = useState([]);
  const [file, setFile] = useState("./../../assets/img/Logo.png");

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

  useEffect(() => {
    const Token = "bearer" + " " + Cookies.get("Token");

    axios
      .get(`${BASE_URL}` + "/api/v1.0/broker/getallbroker", {
        headers: { Authorization: Token },
      })
      .then((response) => {
        const arr2 = response.data;
        const brokers = arr2.brokers.map((broker) => {
          const { firstName, lastName, brokerID } = broker;

          return {
            firstName,
            lastName,
            brokerID,
          };
        });
        setBrokers(brokers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleNext1 = () => {
    setActiveStep(1);
  };

  const handleNext2 = () => {
    setActiveStep(2);
  };

  const handleBack1 = () => {
    setActiveStep(0);
  };

  const handleBack2 = () => {
    setActiveStep(1);
  };

  const finish = () => {
    const Token = "bearer" + " " + Cookies.get("Token");
    axios
      .post(
        `${BASE_URL}` + "/api/v1.0/broker/addbroker",
        {
          firstName: firstname,
          lastName: lastname,
          typeOfMember: typeofmember,
          gender: gender,
          whatsapp: whatsapp,
          city: city,
          state: state,
          pinCode: pincode,
          address: address,
          phone: phone,
          email: email,
          emergencyContactName: emergencycontactname,
          emergencyContactNumber: 1 * emergencycontact,
          password: password,
        },
        { headers: { Authorization: Token } }
      )
      .then((response) => {
        console.log(response);
        navigate("/teammembers");
      })
      .catch((error) => console.log(error));
  };

  const changeFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const changeLastname = (e) => {
    setLastname(e.target.value);
  };

  const changeWhatsapp = (e) => {
    setWhatsapp(e.target.value);
  };

  const changePhone = (e) => {
    setPhone(e.target.value);
  };

  const changeCity = (e) => {
    setCity(e.target.value);
  };

  const changeState = (e) => {
    setState(e.target.value);
  };

  const changePincode = (e) => {
    setPincode(e.target.value);
  };

  const changeAddress = (e) => {
    setAddress(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changeEmergencycontact = (e) => {
    setEmergencycontact(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeEmergencycontactname = (e) => {
    setEmergencycontactname(e.target.value);
  };

  const changeConfirmpassword = (e) => {
    setConfirmpassword(e.target.value);
  };

  const loadFile = (e) => {
    console.log(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const changeBid = (e) => {
    setBid(e.target.value);
    const bid = e.target.value;

    var teammember = document.querySelector("#teammember");
    teammember.style.display = "block";

    var save = document.querySelector("#save");
    save.style.display = "none";

    const Token = "bearer" + " " + Cookies.get("Token");
    axios
      .get(`${BASE_URL}` + "/api/v1.0/broker/getbrokerbyid/" + bid, {
        headers: { Authorization: Token },
      })
      .then((response) => {
        console.log(response);
        const tom = response.data.broker.typeOfMember;
        const fn = response.data.broker.firstName;
        const ln = response.data.broker.lastName;
        const gn = response.data.broker.gender;
        const ph = response.data.broker.phone;
        const wa = response.data.broker.whatsapp;
        const em = response.data.broker.email;
        const ad = response.data.broker.address;
        const ct = response.data.broker.city;
        const st = response.data.broker.state;
        const pc = response.data.broker.pinCode;
        const ec = response.data.broker.emergencyContactName;
        const ecn = response.data.broker.emergencyContactNumber;

        setTom(tom);
        setFn(fn);
        setLn(ln);
        setGn(gn);
        setPh(ph);
        setWa(wa);
        setEm(em);
        setAd(ad);
        setCt(ct);
        setSt(st);
        setPc(pc);
        setEc(ec);
        setEcn(ecn);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeTom = (e) => {
    setTom(e.target.value);
  };

  const changeFn = (e) => {
    setFn(e.target.value);
  };

  const changeLn = (e) => {
    setLn(e.target.value);
  };

  const changeGn = (e) => {
    setGn(e.target.value);
  };

  const changePh = (e) => {
    setPh(e.target.value);
  };

  const changeWa = (e) => {
    setWa(e.target.value);
  };

  const changeEm = (e) => {
    setEm(e.target.value);
  };

  const changeAd = (e) => {
    setAd(e.target.value);
  };

  const changeCt = (e) => {
    setCt(e.target.value);
  };

  const changeSt = (e) => {
    setSt(e.target.value);
  };

  const changePc = (e) => {
    setPc(e.target.value);
  };

  const changeEc = (e) => {
    setEc(e.target.value);
  };

  const changeEcn = (e) => {
    setEcn(e.target.value);
  };

  const addmember = (e) => {
    var addbroker = document.querySelector("#addbroker");
    addbroker.style.display = "block";

    var editbroker = document.querySelector("#editbroker");
    editbroker.style.display = "none";

    setBid("");
  };

  const save = (e) => {
    e.preventDefault();
    const Token = "bearer" + " " + Cookies.get("Token");
    if (
      ph.length >= 10 &&
      wa.length >= 10 &&
      pc.length >= 6 &&
      ecn.length >= 10
    ) {
      axios
        .put(
          `${BASE_URL}` + "/api/v1.0/broker/updatebrokerbyid/" + bid,
          {
            firstName: fn,
            lastName: ln,
            typeOfMember: tom,
            gender: gn,
            whatsapp: wa,
            city: ct,
            state: st,
            pinCode: pc,
            address: ad,
            phone: ph,
            email: em,
            emergencyContactName: ec,
            emergencyContactNumber: ecn,
          },
          { headers: { Authorization: Token } }
        )
        .then((response) => {
          if (response.status == "200") {
            var save = document.querySelector("#save");
            save.style.display = "block";
            console.log(response);
          } else {
            alert("Error");
          }
        })
        .catch((error) => console.log(error));
    }
  };

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
                      onChange={changeFirstname}
                    />
                  </div>

                  <div className="col-6">
                    <label>Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="lastname"
                      id="outlined-basic"
                      onChange={changeLastname}
                    />
                  </div>
                </div>

                <br />
                <div className="row">
                  <div className="col-2">
                    <label class="text-align left">Gender</label>
                  </div>
                  <div className="col-10">
                    <label class="form-check-label px-4" for="male">
                      Male
                      <input
                        type="radio"
                        class="form-check-input"
                        id="male"
                        name="male"
                        value="male"
                      />
                    </label>

                    <label class="form-check-label px-4" for="female">
                      Female
                      <input
                        type="radio"
                        class="form-check-input"
                        id="female"
                        name="female"
                        value="female"
                      />
                    </label>
                    <label class="form-check-label px-4" for="other">
                      Other
                      <input
                        type="radio"
                        class="form-check-input"
                        id="other"
                        name="other"
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
                      onChange={changeLastname}
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
                      onChange={changeLastname}
                    />
                  </div>
                  <div className="col-6">
                    <label>City</label>
                    <input
                      type="text"
                      class="form-control"
                      name="city"
                      id="outlined-basic"
                      onChange={changeLastname}
                    />
                  </div>
                </div>
                <div class="row">
                  <div className="col-6">
                    <label>Pincode</label>
                    <input
                      type="text"
                      class="form-control"
                      name="pincode"
                      id="outlined-basic"
                      minLength={6}
                      onChange={changeLastname}
                    />
                  </div>
                  <div className="col-6">
                    <label>State</label>
                    <select class="form-control" name="state">
                      <option>Haryana</option>
                      <option>Haryana</option>
                      <option>Haryana</option>
                    </select>
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
                      onChange={changeLastname}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <label>Password</label>
                    <input
                      type="password"
                      class="form-control"
                      name="password"
                      id="outlined-basic"
                      onChange={changeLastname}
                    />
                  </div>
                  <div className="col-6">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="outlined-basic"
                      onChange={changeLastname}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <label>Mobile Number</label>
                    <input
                      type="text"
                      class="form-control"
                      name="password"
                      id="outlined-basic"
                      onChange={changeLastname}
                    />
                  </div>
                  <div className="col-6">
                    <label>Whatsapp Number</label>
                    <input
                      type="text"
                      class="form-control"
                      id="outlined-basic"
                      name="password"
                      onChange={changeLastname}
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
              <div className="justify-content-center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext1}
                >
                  Next
                </Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              <h4>Choose department</h4>
            </StepLabel>
            <StepContent>
              <Form.Group as={Row}>
                <img
                  src={require("../../assets/img/Addmember/bankOfficeRadio.png")}
                />
                <Col lg={4}>
                  <Form.Check
                    type="radio"
                    label="first radio"
                    class="-ml-8"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                  />
                </Col>
                <Col lg={4}>
                  <Form.Check
                    type="radio"
                    label="second radio"
                    class="px"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                  />
                </Col>
                <Col lg={4}>
                  <Form.Check
                    type="radio"
                    label="Bank Office"
                    class="px"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                  />
                </Col>
                <Col lg={4}>
                  <Form.Check
                    type="radio"
                    label="Bank Office"
                    class="px"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                  />
                </Col>
                <Col lg={4}>
                  <Form.Check
                    type="radio"
                    label="Bank Office"
                    class="px"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                  />
                </Col>
                <Col lg={4}>
                  <Form.Check
                    type="radio"
                    label="Bank Office"
                    class="px"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                  />
                </Col>
              </Form.Group>
            </StepContent>
          </Step>
          <Step>
            <StepLabel className="step-label">
              <h4>Choose access role</h4>
            </StepLabel>
            <StepContent>
              <div>
                <p>Click on Finish to Create Team Member</p>
              </div>
              <form id="addbroker" name="addbroker">
                <center>
                  <div className="col-lg-8 col-md-12">
                    <div className="row justify-content-center">
                      <div className="col-6">
                        <TextField
                          fullWidth
                          name="typeofmember"
                          defaultValue={typeofmember}
                          InputProps={{ readOnly: true }}
                          id="outlined-basic"
                          select
                          label="Type Of Member"
                          variant="outlined"
                        >
                          <option value="Broker">Broker</option>
                          <option value="Channel Partner">
                            Channel Partner
                          </option>
                          <option value="Team Member">Team Member</option>
                          <option value="Propietor">Propietor</option>
                        </TextField>
                      </div>
                    </div>
                    <br />

                    <div className="row">
                      <div className="col-4">
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          name="firstname"
                          label="First Name"
                          defaultValue={firstname}
                          variant="outlined"
                          InputProps={{ readOnly: true }}
                        />
                      </div>

                      <div className="col-4">
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          name="lastname"
                          label="Last Name"
                          defaultValue={lastname}
                          variant="outlined"
                          InputProps={{ readOnly: true }}
                        />
                      </div>

                      <div className="col-4">
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          name="gender"
                          defaultValue={gender}
                          InputProps={{ readOnly: true }}
                          select
                          label="Gender"
                          variant="outlined"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </TextField>
                      </div>
                    </div>

                    <br />

                    <div className="row">
                      <div className="col-4">
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          name="phone"
                          label="Phone"
                          type="number"
                          defaultValue={phone}
                          variant="outlined"
                          InputProps={{ readOnly: true }}
                        />
                      </div>
                      <div className="col-4">
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          name="whatsapp"
                          type="number"
                          label="Whatsapp"
                          defaultValue={whatsapp}
                          variant="outlined"
                          InputProps={{ readOnly: true }}
                        />
                      </div>
                      <div className="col-4">
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          name="email"
                          label="Email"
                          type="email"
                          defaultValue={email}
                          variant="outlined"
                          InputProps={{ readOnly: true }}
                        />
                      </div>
                    </div>

                    <br />

                    <div className="row">
                      <div className="col-12">
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          name="address"
                          label="Residential Address"
                          defaultValue={address}
                          variant="outlined"
                          InputProps={{ readOnly: true }}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-4">
                        <TextField
                          fullWidth
                          Field
                          id="outlined-basic"
                          name="city"
                          label="City"
                          defaultValue={city}
                          variant="outlined"
                          InputProps={{ readOnly: true }}
                        />
                      </div>
                      <div className="col-4">
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          name="state"
                          label="State"
                          defaultValue={state}
                          variant="outlined"
                          InputProps={{ readOnly: true }}
                        />
                      </div>
                      <div className="col-4">
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          name="pincode"
                          label="Pin Code"
                          type="number"
                          defaultValue={pincode}
                          variant="outlined"
                          InputProps={{ readOnly: true }}
                        />
                      </div>
                    </div>
                    <br />

                    <div className="row">
                      <div className="col-6">
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          name="emergencycontactname"
                          defaultValue={emergencycontactname}
                          label="Emergency Contact Name"
                          variant="outlined"
                          InputProps={{ readOnly: true }}
                        />
                      </div>
                      <div className="col-6">
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          name="emergencycontact"
                          label="Emergency Contact"
                          type="number"
                          defaultValue={emergencycontact}
                          variant="outlined"
                          InputProps={{ readOnly: true }}
                        />
                      </div>
                    </div>
                    <br />

                    <div className="row">
                      <div className="col-6">
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          name="password"
                          label="Password"
                          type="password"
                          defaultValue={password}
                          variant="outlined"
                          InputProps={{ readOnly: true }}
                        />
                      </div>
                      <div className="col-6">
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          name="confirmpassword"
                          label="Confirm Password"
                          defaultValue={confirmpassword}
                          type="password"
                          variant="outlined"
                          InputProps={{ readOnly: true }}
                        />
                      </div>
                    </div>
                    <br />
                  </div>
                </center>
              </form>
              <Button variant="outlined" color="primary" onClick={handleBack2}>
                Back
              </Button>
              &nbsp;&nbsp;
              <Button variant="contained" color="primary" onClick={finish}>
                Finish
              </Button>
            </StepContent>
          </Step>
        </Stepper>
      </div>
    </div>
  );
}

export default AddMember;
