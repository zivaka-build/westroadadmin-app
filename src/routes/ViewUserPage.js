import React from 'react';
import ViewUser from "../components/Dashboard/ViewUser";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function ViewUserPage (){
    if( Cookies.get('Token') === undefined ) {
        return <Redirect to="/loginfirst" noThrow />
    }
      else {
      return <ViewUser />;
      }
}

export default ViewUserPage