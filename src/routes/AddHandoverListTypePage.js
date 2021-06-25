import React from "react";
import AddHandoverListType from "../components/Dashboard/AddHandoverListType";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';
function AddHandoverListTypePage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <AddHandoverListType />;
}
}

export default AddHandoverListTypePage;