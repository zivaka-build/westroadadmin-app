import React, { Component } from "react"
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link ,  useHistory } from 'react-router-dom';
import { BASE_URL } from '../../config/url.js';
import WestRoad from '../../westroad.png';
import zivaka from '../../zivaka.png';
import base from '../../BASE.png';

// commit to west-13 branch and merge to release
class LoginForm extends Component {

  state = {
    brokerID: '',
    password: '',
    email: '',
    baseurl: 'https://ilead.vaanic.com'


  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })

  }

  forgotPassword = (e) => {
    var login = document.querySelector("#login");
    login.style.display = "none";

    var forgotpassword = document.querySelector("#forgotpassword");
    forgotpassword.style.display = "block";
  }

  back = (e) => {
    var login = document.querySelector("#login");
    login.style.display = "block";

    var forgotpassword = document.querySelector("#forgotpassword");
    forgotpassword.style.display = "none";
  }

  resetLink = (e) => {
    const user = {
      email: this.state.email
    }
    e.preventDefault()

    if (document.reset.email.value == "") {
      var error = document.querySelector("#error");
      error.style.display = "block";
    }

    else {

      axios
        .post(`${BASE_URL}` + '/api/v1.0/broker/forgotpassword', { email: user.email })
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

  submitHandler = (e) => {
   

       

    



  }


  render() {
    return (
      //jsx-a11y/anchor-is-valid
      <div className="bg-gradient-primary align-items-center">

        <div className="container" style={{ height: "100vh" }}>
          {/* Outer Row */}

          <div className="row pt-5 justify-content-center" style={{
            position: 'fixed',
            width: '500px',
            right: '-10px',
            top: '-10px'
          }}>
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  {/* Nested Row within Card Body */}
                  <div className="row">

                    <div className="col-lg-12" id="login" name="login" style={{ display: "block" }}>

                      <div className="p-5" style={{ padding: '2.5rem' }}>
                        <img src={WestRoad} style={{ height: '160px', marginBottom: '-15px', }} />

                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">Westroad Management System</h1>
                        </div>
                        <form className="user" onSubmit={this.submitHandler}>
                          <div className="form-group">
                            <input type="text" className="form-control form-control-user" id="brokerID" name="brokerID" onChange={this.changeHandler} placeholder="Email address" />
                          </div>
                          <div className="form-group">
                            <input type="password" className="form-control form-control-user" id="password" name="password" onChange={this.changeHandler} placeholder="Password (8+ characters)" />
                          </div>
                          <br />

                          <button type="submit" href="" className="btn btn-primary btn-user btn-block" style={{
                            background: "green",
                            width: '200px',
                            margin: '0 auto'
                          }} >
                            Login
                        </button>


                        </form>

                        <div className="text-center">
                          <a className="small" onClick={this.forgotPassword}>Forgot Password?</a>
                        </div>

                      </div>
                    </div>
                    <div className="col-lg-12" id="forgotpassword" name="forgotpassword" style={{ display: "none", }}>
                      <div className="p-5">
                        <img src={WestRoad} style={{ height: '160px', marginBottom: '-15px', }} />

                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">Forgot Password</h1>
                        </div>
                        <form className="reset user" name="reset" id="reset" onSubmit={this.resetLink}>
                          <div className="form-group">
                            <input type="text" className="form-control form-control-user" type="email" id="email" name="email" onChange={this.changeHandler} placeholder="Please Enter Registered Email" />
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
                          <button className="btn btn-secondary btn-user btn-block" onClick={this.back}>
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
}

export default LoginForm;