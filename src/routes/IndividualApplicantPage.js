import React from "react";
import IndividualApplicant from "../components/Dashboard/IndividualApplicant.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function IndividualApplicantPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <IndividualApplicant />;
  }
}

export default IndividualApplicantPage;