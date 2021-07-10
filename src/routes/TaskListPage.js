import React from "react";
import TaskList from "../components/Dashboard/TaskList.js";
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function TaskListPage() {
  if( Cookies.get('Token') === undefined ) {
    return <Redirect to="/loginfirst" noThrow />
  }
  else {
  return <TaskList />;
  }
}

export default TaskListPage;