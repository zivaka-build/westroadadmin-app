import React from 'react';
import ViewPaymentTerms from "../components/Dashboard/ViewPaymentTerms";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function ViewPaymentTermsPage (){
    if( Cookies.get('Token') === undefined ) {
        return <Redirect to="/loginfirst" noThrow />
    }
      else {
      return <ViewPaymentTerms />;
      }
}

export default ViewPaymentTermsPage;