import { Form, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../config/url";
import "./../../assets/css/form.css";
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
import {IoMdArrowBack} from 'react-icons/io'
import { useParams , navigate} from "@reach/router"

function AddMember() {
   
  const [ username, setUsername ] = useState("")
  const [ userfullname, setUserfullname ] = useState("")
  const [ mobilenumber, setMobilenumber ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ cpassword, setCpassword ] = useState("")

  const [phoneValidated, setPhoneValidated] = useState(false)
  const [emailValidated, setEmailValidated] = useState(false)
  const [passwordValidated, setPasswordValidated] = useState(false)
  const [userRole, setUserRole] = useState("")

  const addUser = (e) => {
    e.preventDefault();
    if(phoneValidated === true && emailValidated === true && passwordValidated === true){
      axios
      .post(`${BASE_URL}/api/v1/user/addNewUser`, {
        userName: username,
        userFullName: userfullname,
        password: password,
        userMobile: mobilenumber,
        userEmail: email,
        isActive: true,
        userRole: userRole,
      })
      .then((response) => {
        if(response.status === 200){
        navigate("/dashboard/viewuser")
        } 
       
        
      })
      .catch((error) => {
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "Ooops",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          text: "User or Email already exists!",
        });
      });
    }
   
  };

  const changeMobile =  (e) => {
    var mobile = e.target.value
    setMobilenumber(mobile)
    var message = document.getElementById('phnoMessage');
        if(mobile.length == 10){
            message.classList.remove('d-block');
            message.classList.add('d-none');
            setPhoneValidated(true)
            
        }
        else{
            
            message.classList.remove('d-none');
            message.classList.add('d-block');
            setPhoneValidated(false)

        }
  }

  const changeEmail = (e) => {
    var email = e.target.value
    setEmail(email)

    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        
        var message = document.getElementById('emailMessage');
        if( regex.test(email)){
           
            message.classList.remove('d-block');
            message.classList.add('d-none');
            setEmailValidated(true)
            
        }
        else {
            
            message.classList.remove('d-none');
            message.classList.add('d-block');
            setEmailValidated(false)
        }

  }

  const changeCpassword = (e) => {
    var cpassword = e.target.value
    setCpassword(e.target.value)

    var message = document.getElementById('passwordMessage');
    if(cpassword === password){
      message.classList.remove('d-block');
      message.classList.add('d-none');
      setPasswordValidated(true)      
    }
    else {
            
      message.classList.remove('d-none');
      message.classList.add('d-block');
      setPasswordValidated(false)
  }
  }

  return (
    <div>
      <div className="mt-3 row container-fluid justify-content-center px-1">
            <div className="col-12">
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={()=> navigate("/dashboard/home")}><IoMdArrowBack />Back</button>
        </div>
      </div>
      <br />
      <form onSubmit={addUser}>
      <div className="row justify-content-center">
            <div className="col-4">
                <label>Full Name</label>
                <input
                type="text"
                class="form-control"
                name="fullname"
                id="fullname"
                required
                onChange={(e)=>setUserfullname(e.target.value)}
                />
            </div>
            <div className="col-4">
                <label>Username</label>
                <input
                type="text"
                class="form-control"
                name="username"
                id="username"
                required
                onChange={(e)=>setUsername(e.target.value)}
                />
            </div>
        </div>
        <br />
      <div className="row justify-content-center">
            <div className="col-4">
                <label>Mobile</label>
                <input
                type="number"
                class="form-control"
                name="mobilenumber"
                id="mobilenumber"
                required
                onChange={changeMobile}
                />
                <small id="phnoMessage" className="text-danger d-none">
                Must be of 10 characters with numbers only
                </small> 
            </div>
            <div className="col-4">
                <label>Email</label>
                <input
                type="email"
                class="form-control"
                name="email"
                id="email"
                required
                onChange={changeEmail}
                />
                <small id="emailMessage" className="text-danger d-none">
               Enter Valid Email
                </small>
            </div>
        </div>
        <br />
      <div className="row justify-content-center">
            <div className="col-4">
                <label>Password</label>
                <input
                type="password"
                class="form-control"
                name="password"
                id="password"
                required
                onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <div className="col-4">
                <label>Confirm Password</label>
                <input
                type="password"
                class="form-control"
                name="cpassword"
                id="cpassword"
                required
                onChange={changeCpassword}
                />
                <small id="passwordMessage" className="text-danger d-none">
                Must be same as password
                </small>
            </div>
        </div>
        <br />
        <div className="row justify-content-center">
            <div className="col-8">
              <Form.Group controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control  as="select"  onChange={(e)=>setUserRole(e.target.value)} required>
                <option value="">Select a role</option>   
                <option value="Director">Director</option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
                <option value="Engineering">Engineering</option>
                <option value="ITAdmin">IT Admin</option>
              </Form.Control>
              </Form.Group>
            </div>
        </div>
        <br />
        <div className="row container-fluid justify-content-center">
        <div className="col-4 text-right">
            <button className="btn btn-secondary btn-user" type="reset"  style={{backgroundColor: "white", color: "black"}}>Reset</button>

        </div>
        <div className="col-4">
            <button className="btn btn-secondary btn-user">Create User</button>
                                        
        </div>
        </div>
        </form>

    </div>
  );
}

export default AddMember;
