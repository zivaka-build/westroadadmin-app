import React, { Component, useEffect, useState } from "react"
import axios from 'axios';
import Cookies from 'js-cookie';
import { navigate } from "@reach/router";
import { BASE_URL } from '../../config/url.js';
import WestRoad from '../../westroad.png';
import zivaka from '../../zivaka.png';
import base from '../../BASE.png';
import Swal from 'sweetalert2';
import qs from 'qs';
import westroad from '../../westroad_logo-02.jpg';
import { Form, Input } from 'reactstrap';
import rect from '../../Rectangle.png';
import squares from '../../square-dots.png';
import Squares from '../../square_dots.png';
import loginpagebg from '../../assets/img/loginpagebg.png'

function LoginForm() {

  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setuserName] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [errorbol, setErrorbol] = useState(false)
  const [otpValidated, setOtpValidated] = useState(false)
  
  const [getOTP, setGetOTP] = useState(false)

  const changeUser = (e) => {
    setuserName(e.target.value)

  }

  const changeOtp = (e) => {
    setOtp(e.target.value)

  }

  const getOTPapi = () =>{
    axios.post(`${BASE_URL}/api/v1/auth/sendOTP`,{userName:userName})
    .then((response) =>{
      
      if(response.data.otpSent===true){
        setGetOTP(true)
        setErrorbol(false)
      }
      else if(response.data.otpSent===false){
        setError(response.data.message)
        setGetOTP(false)
        setErrorbol(true)
        
      }
    })
  }

  const validateOTP = (e) => {
    e.preventDefault()
    axios.post(`${BASE_URL}/api/v1/auth/validateotp`,{userName:userName,OTP:otp*1})
    .then((response) =>{
      
      if(response.data.otpValidated === true)
      {
        Cookies.set('Token', response.data.token)
        Cookies.set('FullName', response.data.userFullName)
        Cookies.set('UserName', response.data.userName)
        setOtpValidated(true)
        navigate("/dashboard/home")

      }
      else if(response.data.otpValidated === false){
        setOtpValidated(false)
        setError(response.data.message)
        setErrorbol(true)
      }
     
    })
  }
  

  


  return (
    //jsx-a11y/anchor-is-valid
    <>
     <div className="col-12 login-page">
            <div className="row">
                <div className="login-card">
                    <div className="col-lg-12" style={{display:"block"}}>
                    <img src={westroad} alt="westroad" className="westroad-img"/>

                   
                          <div className="form-group" style={{display:getOTP===true?"none":"block", marginTop:'40px'}}>
                            <Input type="text" className="form-control form-control-user form-input-styling" id="username" value={userName} name="username" onChange={changeUser} placeholder="Username"/>
                          </div>

                          <div className="form-group" style={{display:getOTP===true?"block":"none", marginTop:'40px'}}>
                            <Input type="number" className="form-control form-control-user form-input-styling" id="otp" value={otp} name="Enter OTP" onChange={changeOtp} placeholder="Enter OTP"/>
                          </div>

                          { 
                           errorbol===true?
                           <>
                           <p className="text-center" style={{color : "red",size:"15px"}}><em>{error}</em></p>
                           </>:
                           null
                          }
                            

                          
                        
                            <div style={{display:getOTP===false?"block":"none", marginTop: '60px'}}> 
                          <button type="submit" href="" onClick={getOTPapi} className="btn btn-primary btn-user btn-block button-styling" style={{
                            background: "#ee4b46",
                            textAlign:"center"
                          }} >
                                                              Get OTP
                        </button>
                        </div>

                        <div style={{display:getOTP===true?"block":"none", marginTop: '60px'}}> 
                          <button type="submit" href="" onClick={validateOTP} className="btn btn-primary btn-user btn-block button-styling" style={{
                            background: "#ee4b46",
                            textAlign:"center"
                          }} >
                                                              Validate OTP
                        </button>
                        </div>

                    

                    </div>
                </div>
            </div>
        </div>

      
               
                  
               
    </>
  );
}


export default LoginForm;
