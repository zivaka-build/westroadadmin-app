import React from "react";
import IndividualPaymentTerms from "../components/Dashboard/IndividualPaymentTerms.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function IndividualPaymentTermsPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <IndividualPaymentTerms />;
  }
}

export default IndividualPaymentTermsPage;