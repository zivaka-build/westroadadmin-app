import React from 'react';
import ViewLoanBank from "../components/Dashboard/ViewLoanBank";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function ViewLoanBankPage (){
    if( Cookies.get('Token') === undefined ) {
        return <Redirect to="/loginfirst" noThrow />
    }
      else {
      return <ViewLoanBank />;
      }
}

export default ViewLoanBankPage;