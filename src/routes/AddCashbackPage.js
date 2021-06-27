import React from "react";
import AddCashback from "../components/Dashboard/AddCashback.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';
function AddCashbackPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <AddCashback />;
  }
}

export default AddCashbackPage;