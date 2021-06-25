import React from "react";
import AddLoanBank from "../components/Dashboard/AddLoanBank.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function AddLoanBankPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <AddLoanBank />;
  }
}

export default AddLoanBankPage;