import React from "react";
import AddCreditVoucher from "../components/Dashboard/AddCreditVoucher.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';
function AddCreditVoucherPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <AddCreditVoucher />;
  }
}

export default AddCreditVoucherPage;