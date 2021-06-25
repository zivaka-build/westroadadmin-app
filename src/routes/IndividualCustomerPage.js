import React from "react";
import IndividualCustomer from "../components/Dashboard/IndividualCustomer.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function IndividualCustomerPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <IndividualCustomer />;
  }
}

export default IndividualCustomerPage;