import React from "react";
import IndividualSite from "../components/Dashboard/IndividualSite.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function IndividualSitePage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <IndividualSite />;
  }
}

export default IndividualSitePage;