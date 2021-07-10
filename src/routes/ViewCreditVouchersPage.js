import React from 'react';
import ViewCreditVouchers from "../components/Dashboard/ViewCreditVouchers";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function ViewCreditVouchersPage (){
    if( Cookies.get('Token') === undefined ) {
        return <Redirect to="/loginfirst" noThrow />
      }
      else {
      return <ViewCreditVouchers />;
      }
}

export default ViewCreditVouchersPage;