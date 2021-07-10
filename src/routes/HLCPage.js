import React from "react";
import HomeLoanCalculator from "../components/Dashboard/HomeLoanCalculator";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function HLCPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <HomeLoanCalculator />;
  }
}

export default HLCPage;
