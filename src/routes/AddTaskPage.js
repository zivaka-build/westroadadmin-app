import React from "react";
import AddTask from "../components/Dashboard/AddTask.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function AddTaskPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <AddTask />;
  }
}

export default AddTaskPage;