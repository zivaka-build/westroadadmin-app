import React from "react";
import Homepage from "../components/Dashboard/Homepage";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function HomepagePage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <Homepage />;
  }
}

export default HomepagePage;
