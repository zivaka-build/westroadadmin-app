import React from "react";
import ListOfSalesComission from "../components/Dashboard/ListOfSalesComission.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function ListOfSalesComissionPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <ListOfSalesComission />;
  }
}

export default ListOfSalesComissionPage;