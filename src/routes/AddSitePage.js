import React from "react";
import AddSite from "../components/Dashboard/AddSiteForm.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function AddSitePage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <AddSite />;
  }
}

export default AddSitePage;
