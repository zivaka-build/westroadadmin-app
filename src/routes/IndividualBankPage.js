import React from "react";
import IndividualBank from "../components/Dashboard/IndividualBank.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function IndividualBankPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <IndividualBank />;
  }
}

export default IndividualBankPage;