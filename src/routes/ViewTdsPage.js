import React from 'react';
import ViewTds from "../components/Dashboard/ViewTds";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function ViewTdsPage (){
    if( Cookies.get('Token') === undefined ) {
        return <Redirect to="/loginfirst" noThrow />
    }
      else {
      return <ViewTds />;
      }
}

export default ViewTdsPage;