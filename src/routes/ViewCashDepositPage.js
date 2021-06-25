import React from 'react';
import ViewCashDeposit from "../components/Dashboard/ViewCashDeposit";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function ViewCashDepositPage (){
    if( Cookies.get('Token') === undefined ) {
        return <Redirect to="/loginfirst" noThrow />
      }
      else {
      return <ViewCashDeposit />;
      }
    
}

export default ViewCashDepositPage;
