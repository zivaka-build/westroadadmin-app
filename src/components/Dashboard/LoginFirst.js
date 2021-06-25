import React from "react";
import { Redirect} from "@reach/router"
import  Delay  from "react-delay"
import CircularProgress from '@material-ui/core/CircularProgress';

function LoginFirst(){
    return(
        <>
            <div className="align-items-center bg-danger" >
            <div className="container" style={{height: "100vh", width:"25%"}}>
            
            <div className="loginfirst-card login-first align-items-center py-5 px-5" >
             
              <br />
              <h6>You must be logged in first!</h6>
              <h6>Redirecting to Login Page...</h6>
              <br />
              <div className="text-center">
              <CircularProgress />
              </div>
              <br />
              
              <Delay wait={3500}>
              <div> <Redirect to="/" noThrow /> </div>
              </Delay>
            </div>
            </div>
            </div>
        </>
    )
}

export default LoginFirst;