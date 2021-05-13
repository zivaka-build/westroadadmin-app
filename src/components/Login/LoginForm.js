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

  const changeUser = (e) => {
    setuserName(e.target.value)

  }

  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  const changemail = (e) => {
    setemail(e.target.value)
  }

  const forgotPassword = (e) => {
    var login = document.querySelector("#login");
    login.style.display = "none";

    var forgotpassword = document.querySelector("#forgotpassword");
    forgotpassword.style.display = "block";
  }

  const back = () => {
    var login = document.querySelector("#login");
    login.style.display = "block";

    var forgotpassword = document.querySelector("#forgotpassword");
    forgotpassword.style.display = "none";
  }

  const resetLink = (e) => {
    e.preventDefault()

    const user = {
      email: email
    }
    if (email == '') {
      Swal.fire({
        icon: 'error',
        title: 'Ooops',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        text: 'email cannot be left empty!'
      })
    }
    else {
      const data = {
        email: email,
      }

      axios.post(`${BASE_URL}` + '', qs.stringify(data))
        .then((response) => {
          console.log(response)
          var message = document.querySelector("#message");
          message.style.display = "block";

          var error = document.querySelector("#error");
          error.style.display = "none";
        })
        .catch((error) => {
          console.log(error);

        })
    }
  }


  const submitHandler = (e) => {

    e.preventDefault()

    if (userName === '' || password === '') {
      Swal.fire({
        icon: 'error',
        title: 'Ooops',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        text: 'username and password cannot be left empty!'
      })
    }
    else if(userName === 'Customer' && password === '1234') {
      Swal.fire({
        icon: 'error',
        title: 'Ooops',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        text: 'This username cannot be used'
      })
    }
    else {
      const data = {
        userName: userName,
        password: password,
      }
      axios
        .post(`${BASE_URL}` + '/api/v1/auth/authenticateUser', qs.stringify(data))
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            Cookies.set('Token', response.data.message)
            Cookies.set('FullName', response.data.fullName)
            Cookies.set('userId', response.data.userId)

            Cookies.set('Role', response.data.role)
            navigate("/dashboard/addmember")
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              text: 'Login successful'
            })
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Ooops',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              text: 'Invalid username or password'
            })
          }

        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Ooops',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            text: error.message
          })
        }

        )

    }

  }


  return (
    //jsx-a11y/anchor-is-valid
    <>
     <div className="col-12 login-page">
            <div className="row">
                <div className="login-card">
                    <div className="col-lg-12" style={{display:"block"}}>
                    <img src={westroad} alt="westroad" className="westroad-img"/>

                    <Form className="user" onSubmit={submitHandler}>
                          <div className="form-group">
                            <Input type="text" className="form-control form-control-user form-input-styling" id="username" value={userName} name="username" onChange={changeUser} placeholder="Username"/>
                          </div>
                          
                          <div className="form-group">
                            <Input type="password" className="form-control form-control-user form-input-styling" id="password" value={password} name="password" onChange={changePassword} placeholder="Password (6+ characters)" />
                          </div>
                          
                          <div className="frgt" >
                          <a className="small" onClick={forgotPassword}>Forgot Your Password?</a>
                          </div>
                            <div style={{display:'flex'}}> 
                          <button type="submit" href="" className="btn btn-primary btn-user btn-block button-styling" style={{
                            background: "#ee4b46",
                            textAlign:"center"
                          }} >
                                                              Login
                        </button>
                        </div>

                        </Form>

                    </div>
                </div>
            </div>
        </div>

      
                    <div className="col-lg-12" id="forgotpassword" name="forgotpassword" style={{ display: "none", }}>
                      <div className="p-5">
                        <img src={WestRoad} style={{ height: '160px', marginLeft: '27%' }} />

                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">Forgot Password</h1>
                        </div>
                        <form className="reset user" name="reset" id="reset" onSubmit={resetLink}>
                          <div className="form-group">
                            <input type="text" className="form-control form-control-user" type="email" id="email" name="email" value={email} onChange={changemail} placeholder="Please Enter Registered email" />
                          </div>


                          <small name="message" id="message" style={{ display: 'none' }}>
                            <em>Reset link sent to your mail. Please check!</em>
                          </small>
                          <small name="error" id="error" style={{ display: 'none', color: 'red' }}>
                            <em>Please enter your email!</em>
                          </small>
                          <br />

                          <button type="submit" href="" className="btn btn-primary btn-user btn-block">
                            Send Reset Link
                        </button>
                          <button className="btn btn-secondary btn-user btn-block" onClick={back}>
                            Back To Login
                        </button>


                        </form>


                      </div>
                    </div>
                  
               
    </>
  );
}


export default LoginForm;
