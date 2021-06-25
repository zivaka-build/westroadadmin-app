import React from "react";
import AddPaymentTerm from "../components/Dashboard/AddPaymentTerm.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function AddPaymentTermPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <AddPaymentTerm />;
  }
}

export default AddPaymentTermPage;