import React from "react";
import IndividualLead from "../components/Dashboard/IndividualLead.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function IndividualLeadPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <IndividualLead />;
  }
}

export default IndividualLeadPage;