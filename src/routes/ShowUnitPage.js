import React from 'react'
import ViewUnit from "../components/Dashboard/ViewUnit.js"
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

const ShowUnitPage = () => {
    if( Cookies.get('Token') === undefined ) {
        return <Redirect to="/loginfirst" noThrow />
      }
      else {
      return <ViewUnit />;
      }
}

export default ShowUnitPage
