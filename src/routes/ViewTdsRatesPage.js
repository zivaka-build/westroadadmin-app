import React from 'react';
import ViewTdsRates from "../components/Dashboard/ViewTdsRates";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function ViewTdsRatesPage (){
    if( Cookies.get('Token') === undefined ) {
        return <Redirect to="/loginfirst" noThrow />
    }
      else {
      return <ViewTdsRates />;
      }
}

export default ViewTdsRatesPage