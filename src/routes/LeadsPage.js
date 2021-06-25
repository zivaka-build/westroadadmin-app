import React from "react";
import Leads from "../components/Dashboard/Leads";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function LeadsPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <Leads />;
  }
}

export default LeadsPage;