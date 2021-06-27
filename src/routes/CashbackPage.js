import React from "react";
import Cashback from "../components/Dashboard/Cashback.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function CashbackPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <Cashback />;
  }
}

export default CashbackPage;