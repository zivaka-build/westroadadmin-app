import React, { Component } from "react"

import { Redirect} from "@reach/router"

import  Delay  from "react-delay"
import CircularProgress from '@material-ui/core/CircularProgress';

class LoginFirst extends Component {
    render() {
        return(
            <div className="bg-gradient-primary align-items-center">
            <div className="container" style={{height: "100vh", width:"25%"}}>
            
            <div className="card login-first align-items-center" >
             
              <br />
              <h6>You must be logged in first!</h6>
              <h6>Redirecting to Login Page...</h6>
              <br />
              <CircularProgress />
              <br />
              
              <Delay wait={3500}>
              <div> <Redirect to="/" noThrow /> </div>
              </Delay>
            </div>
            </div>
            </div>
        );
    }
}

export default LoginFirst;