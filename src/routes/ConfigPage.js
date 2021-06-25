import React from "react";
import Configuration from "../components/Dashboard/Configuration";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function ConfigPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <Configuration />;
  }
}

export default ConfigPage;
