import React from "react";
import IndividualDemand from "../components/Dashboard/IndividualDemand.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function IndividualDemandPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <IndividualDemand />;
  }
}

export default IndividualDemandPage;