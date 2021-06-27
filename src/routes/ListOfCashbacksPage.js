import React from "react";
import ListOfCashbacks from "../components/Dashboard/ListOfCashbacks.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function ListOfCashbacksPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <ListOfCashbacks />;
  }
}

export default ListOfCashbacksPage;