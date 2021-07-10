import React from "react";
import AddCash from "../components/Dashboard/AddCash.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';
function AddCashPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <AddCash />;
  }
}

export default AddCashPage;