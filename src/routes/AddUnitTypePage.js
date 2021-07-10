import React from "react";
import AddUnitType from "../components/Dashboard/AddUnitType.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function AddUnitTypePage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <AddUnitType />;
  }
}

export default AddUnitTypePage;