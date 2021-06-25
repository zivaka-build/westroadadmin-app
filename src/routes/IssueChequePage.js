import React from "react";
import IssueCheque from "../components/Dashboard/IssueCheque.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function IssueChequePage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <IssueCheque />;
  }
}

export default IssueChequePage;