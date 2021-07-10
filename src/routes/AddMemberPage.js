import React from "react";
import AddMember from "../components/Dashboard/AddMemberForm.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function AddMemberPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <AddMember />;
  }
}

export default AddMemberPage;
