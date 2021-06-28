import React from "react";
import EncashCashback from "../components/Dashboard/EncashCashback";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function EncashCashbackPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <EncashCashback />;
  }
}

export default EncashCashbackPage;