import React from "react";
import TeamMember from "../components/Dashboard/TeamMember.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function TeamMemberPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <TeamMember />;
  }
}

export default TeamMemberPage;
