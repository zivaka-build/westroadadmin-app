import React from 'react';
import ShowLead from "../components/Dashboard/ShowLead";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function ViewLeadPage (){
    if( Cookies.get('Token') === undefined ) {
        return <Redirect to="/loginfirst" noThrow />
      }
      else {
      return <ShowLead />;
      }
}

export default ViewLeadPage
