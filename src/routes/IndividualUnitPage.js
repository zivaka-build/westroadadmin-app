import React from "react";
import IndividualUnit from "../components/Dashboard/IndividualUnit.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function IndividualUnitPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <IndividualUnit />;
  }
}

export default IndividualUnitPage;