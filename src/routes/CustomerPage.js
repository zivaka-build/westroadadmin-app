import React from "react";
import ListofCustomers from "../components/Dashboard/ListofCustomers.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function CustomerPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <ListofCustomers />;
  }
}

export default CustomerPage;