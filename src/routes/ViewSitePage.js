import React from 'react';
import ViewSite from "../components/Dashboard/ViewSite";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function ViewSitePage (){
    if( Cookies.get('Token') === undefined ) {
        return <Redirect to="/loginfirst" noThrow />
    }
      else {
      return <ViewSite />;
      }
}

export default ViewSitePage;