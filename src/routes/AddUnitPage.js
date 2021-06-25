import React from "react";
import AddUnit from "../components/Dashboard/AddUnit.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function AddUnitPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <AddUnit />;
  }
}

export default AddUnitPage;