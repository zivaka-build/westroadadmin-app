import React from 'react';
import ViewHandoverListType from "../components/Dashboard/ViewHandoverListType";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function ViewHandoverListTypePage (){
    if( Cookies.get('Token') === undefined ) {
        return <Redirect to="/loginfirst" noThrow />
      }
      else {
      return <ViewHandoverListType />;
      }
}

export default ViewHandoverListTypePage;