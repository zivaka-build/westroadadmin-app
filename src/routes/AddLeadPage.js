import React from "react";
import AddLead from "../components/Dashboard/AddLeadForm.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';
function AddLeadPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <AddLead />;
  }
}

export default AddLeadPage;
