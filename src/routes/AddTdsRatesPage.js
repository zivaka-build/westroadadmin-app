import React from "react";
import AddTdsRates from "../components/Dashboard/AddTdsRates.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function AddTdsRatesPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <AddTdsRates />;
  }
}

export default AddTdsRatesPage;