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

  const back = (e) => {
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
    if (email === '') {
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

    if (email === '' || password === '') {
      Swal.fire({
        icon: 'error',
        title: 'Ooops',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        text: 'email and password cannot be left empty!'
      })
    }
    else {
      const data = {
        userName: userName,
        password: password,
      }
      axios
        .post('http://52.66.99.255:8050/api/v1/user/login', qs.stringify(data))
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            // Cookies.set('Token', response.data.token)
            //  Cookies.set('FirstName', response.data.firstName)
            // Cookies.set('email', response.data.email)
            // Cookies.set('SuperUser', response.data.isSuperuser)
            //  navigate("/tbro")
            Swal.fire({
              icon: 'error',
              title: 'Ooops',
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
              text: response.message
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
    <div className="bg-gradient-primary align-items-center">

      <div className="container" style={{ height: "100vh" }}>
        {/* Outer Row */}
        <img src={westroad} style={{ height: '260px', marginTop: '-90px' }} />

        <div className="row pt-5 justify-content-center" style={{
          position: 'fixed',
          width: '500px',
          right: '-10px',
          top: '-10px'
        }}>

          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0" >
                {/* Nested Row within Card Body */}
                <div className="row">

                  <div className="col-lg-12" id="login" name="login" style={{ display: "block" }}>

                    <div className="p-5" style={{ padding: '2.5rem' }}>
                      <img src={WestRoad} style={{ height: '160px', marginLeft: '27%' }} />

                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Westroad Management System</h1>
                      </div>
                      <Form className="user" onSubmit={submitHandler}>
                        <div className="form-group">
                          <Input type="text" className="form-control form-control-user" id="email" value={userName} name="email" onChange={changeUser} placeholder="Username" />
                        </div>
                        <div className="form-group">
                          <Input type="password" className="form-control form-control-user" id="password" value={password} name="password" onChange={changePassword} placeholder="Password (8+ characters)" />
                        </div>
                        <br />

                        <button type="submit" href="" className="btn btn-primary btn-user btn-block" style={{
                          background: "green",
                          width: '200px',
                          margin: '0 auto'
                        }} >
                          Login
                        </button>


                      </Form>

                      <div className="text-center">
                        <a className="small" onClick={forgotPassword}>Forgot Password?</a>
                      </div>

                    </div>
                  </div>
                  <div className="col-lg-12" id="forgotpassword" name="forgotpassword" style={{ display: "none", }}>
                    <div className="p-5">
                      <img src={WestRoad} style={{ height: '160px', marginLeft: '10%' }} />

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
                </div>
              </div>

            </div>

          </div>
          <img src={zivaka} style={{
            height: '80px', position: 'absolute',
            top: '90vh',
            right: '5vh',
          }} />

        </div>

      </div>
      <img src={base} style={{
        height: '130px',
        position: 'absolute',
        top: '82%',
        right: '73%'
      }} />
    </div>

  );
}


export default LoginForm;