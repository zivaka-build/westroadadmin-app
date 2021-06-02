import React, {useState,useEffect} from "react"
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Form } from "react-bootstrap";
import { useParams } from "@reach/router"
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";
import MaterialTable from "material-table";
import { navigate } from "@reach/router";
import {ReactComponent as Edit} from "./../../assets/icons/Vector.svg"
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  }));

function TaskList() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const [open1, setOpen1] = React.useState(false);

    const handleClose1 = () => {
        setOpen1(false);
    };

 
    const [myTasks, setMyTasks] = useState([])
    const [otherTasks, setOtherTasks] = useState([])
    const [closedTasks, setClosedTasks] = useState([])
    const [taskId, setTaskId] = useState("")

    const closeMyTask = (e) => {
        e.preventDefault()
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.post(`${BASE_URL}/api/v1/task/closeTaskByTaskId`,{taskID : taskId},{headers:{Authorization:Token}})
        .then(response => {
            axios.get(`${BASE_URL}/api/v1/task/getalltasks?taskStatus=Open&userName=${Cookies.get('UserName')}`,{headers:{Authorization:Token}})
            .then(response => {
            setMyTasks(response.data)
            })

            axios.get(`${BASE_URL}/api/v1/task/getalltasks?taskStatus=Open`,{headers:{Authorization:Token}})
            .then(response => {
                console.log(response)
            setOtherTasks(response.data)
            })

            axios.get(`${BASE_URL}/api/v1/task/getalltasks?taskStatus=Closed`,{headers:{Authorization:Token}})
            .then(response => {
            setClosedTasks(response.data)
            })
            
            setOpen(false)
        })
        
    }
    
    const closeOtherTask = (e) => {
        e.preventDefault()
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.post(`${BASE_URL}/api/v1/task/closeTaskByTaskId`,{taskID : taskId},{headers:{Authorization:Token}})
        .then(response => {
            axios.get(`${BASE_URL}/api/v1/task/getalltasks?taskStatus=Open&userName=${Cookies.get('UserName')}`,{headers:{Authorization:Token}})
            .then(response => {
            setMyTasks(response.data)
            })

            axios.get(`${BASE_URL}/api/v1/task/getalltasks?taskStatus=Open`,{headers:{Authorization:Token}})
            .then(response => {
                console.log(response)
            setOtherTasks(response.data)
            })

            axios.get(`${BASE_URL}/api/v1/task/getalltasks?taskStatus=Closed`,{headers:{Authorization:Token}})
            .then(response => {
            setClosedTasks(response.data)
            })
            
            setOpen1(false)
        })
    }
    useEffect(() => {
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/task/getalltasks?taskStatus=Open&userName=${Cookies.get('UserName')}`,{headers:{Authorization:Token}})
        .then(response => {
            console.log(response)
          setMyTasks(response.data)
        })

        axios.get(`${BASE_URL}/api/v1/task/getalltasks?taskStatus=Open`,{headers:{Authorization:Token}})
        .then(response => {
            console.log(response)
          setOtherTasks(response.data)
        })

        axios.get(`${BASE_URL}/api/v1/task/getalltasks?taskStatus=Closed`,{headers:{Authorization:Token}})
        .then(response => {
        
          setClosedTasks(response.data)
        })
    },[])

    return(
        <>
        <div className="row justify-content-center mt-3">
            <div className="col-12">
                <h4>Task List</h4>
            </div>
        </div>
        <Tab.Container id="left-tabs-example" defaultActiveKey={Cookies.get('TaskActiveKey')}>
        <Row>
            <Col sm={12}>
            <center>
            <Nav variant="pills" className="justify-content-center flex-row">
                <Nav.Item onClick={()=>{Cookies.set('TaskActiveKey', 'first')}}>
                <Nav.Link className="tabs" eventKey="first">My Tasks</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={()=>{Cookies.set('TaskActiveKey', 'second')}}>
                <Nav.Link className="tabs" eventKey="second">All Other Tasks</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={()=>{Cookies.set('TaskActiveKey', 'third')}}>
                <Nav.Link className="tabs" eventKey="third">Closed Tasks</Nav.Link>
                </Nav.Item>
                
            </Nav>
            </center>
            </Col>
        </Row>
        <br />
        <Row>
            <Col sm={12}>
            <Tab.Content>
                    <Tab.Pane eventKey="first">
                        <div className="col-12 text-center">
                            <button className="btn btn-secondary btn-user" onClick={()=>navigate("/dashboard/addtask")}>Create Task</button>
                        </div>
                        <br />
                        <MaterialTable 
                        data={myTasks}
                        title="My Tasks"
                        columns={
                            [
                                { title: 'Task Id', defaultSort : 'desc', field: 'taskID' },
                                { title: 'Task Title', field: 'taskTitle' },
                                { title: 'Task Description', field: 'taskDescription' },
                                { title: 'Task Type', field: 'taskType' },
                                { title: 'Status', field: 'taskStatus' },
                                { title: 'Due Date', render: (rowData) => !rowData.dueDate ? "" : rowData.dueDate.substring(8,10)+"-"+rowData.dueDate.substring(5,7)+"-"+rowData.dueDate.substring(0,4), customSort: (a, b) => a.dueDate < b.dueDate ? -1 : 1  },
                                { title: 'Name', field: 'userFullName' },
                            ]
                        }
                        options={{
                            search: true,
                            actionsColumnIndex: -1,
                        }}
                        options={{

                            headerStyle: {
                                backgroundColor: '#EE4B46',
                                color: '#fff',
                            
                            }
                        }}
                        actions={[
                            {
                                icon: 'close',
                                tooltip: 'Close Task',
                                onClick: (event, rowData) => {
                                    setOpen(true)
                                    setTaskId(rowData.taskID)
                                }
                            }

                        ]}></MaterialTable>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                            timeout: 500,
                            }}
                        >
                        <Fade in={open}>
                        <div className={classes.paper}>
                            <br />
                            <div className="row">
                                <p>Are you sure you want to close the task ?</p>
                            </div>
                            <div className="row container-fluid justify-content-center">
                                <div className="col-4 text-right">
                                    <button className="btn btn-secondary btn-user" style={{backgroundColor: "white", color: "black"}} onClick={()=> setOpen(false)}>No</button>

                                </div>
                                &nbsp;&nbsp;
                                <div className="col-4">
                                    <button className="btn btn-secondary btn-user" onClick={closeMyTask}>Yes</button>
                                                            
                                </div>
                            </div>
                            <br />
                            
                        </div>
                        </Fade>
                        </Modal>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                        <div className="col-12 text-center">
                            <button className="btn btn-secondary btn-user" onClick={()=>navigate("/dashboard/addtask")}>Create Task</button>
                        </div>
                        <br />
                        <MaterialTable 
                            data={otherTasks}
                            title="All Other Tasks"
                            columns={
                                [
                                    { title: 'Task Id', defaultSort : 'desc', field: 'taskID' },
                                    { title: 'Task Title', field: 'taskTitle' },
                                    { title: 'Task Description', field: 'taskDescription' },
                                    { title: 'Task Type', field: 'taskType' },
                                    { title: 'Status', field: 'taskStatus' },
                                    { title: 'Due Date', render: (rowData) => !rowData.dueDate ? "" : rowData.dueDate.substring(8,10)+"-"+rowData.dueDate.substring(5,7)+"-"+rowData.dueDate.substring(0,4), customSort: (a, b) => a.dueDate < b.dueDate ? -1 : 1  },
                                    { title: 'Name', field: 'userFullName' },

                                ]
                            }
                            options={{
                                search: true,
                                actionsColumnIndex: -1,
                            }}
                            options={{

                                headerStyle: {
                                    backgroundColor: '#EE4B46',
                                    color: '#fff',
                                
                                }
                            }}
                            actions={[
                                {
                                    icon: 'close',
                                    tooltip: 'Close Task',
                                    onClick: (event, rowData) => {
                                        setOpen1(true);
                                        setTaskId(rowData.taskID)
                                    }
                                }

                            ]}></MaterialTable>
                            <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={open1}
                            onClose={handleClose1}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                            timeout: 500,
                            }}
                        >
                        <Fade in={open1}>
                        <div className={classes.paper}>
                            <br />
                            <div className="row">
                                <p>Are you sure you want to close the task ?</p>
                            </div>
                            <div className="row container-fluid justify-content-center">
                                <div className="col-4 text-right">
                                    <button className="btn btn-secondary btn-user" style={{backgroundColor: "white", color: "black"}} onClick={()=> setOpen1(false)}>No</button>

                                </div>
                                &nbsp;&nbsp;
                                <div className="col-4">
                                    <button className="btn btn-secondary btn-user" onClick={closeOtherTask}>Yes</button>
                                                            
                                </div>
                            </div>
                            <br />
                            
                        </div>
                        </Fade>
                        </Modal>

                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                    <div className="col-12 text-center">
                            <button className="btn btn-secondary btn-user" onClick={()=>navigate("/dashboard/addtask")}>Create Task</button>
                    </div>
                    <br />
                    <MaterialTable 
                        data={closedTasks}
                        title="Closed Tasks"
                        columns={
                            [
                                { title: 'Task Id', defaultSort : 'desc', field: 'taskID' },
                                { title: 'Task Title', field: 'taskTitle' },
                                { title: 'Task Description', field: 'taskDescription' },
                                { title: 'Task Type', field: 'taskType' },
                                { title: 'Status', field: 'taskStatus' },
                                { title: 'Due Date', render: (rowData) => !rowData.dueDate ? "" : rowData.dueDate.substring(8,10)+"-"+rowData.dueDate.substring(5,7)+"-"+rowData.dueDate.substring(0,4), customSort: (a, b) => a.dueDate < b.dueDate ? -1 : 1 },
                                { title: 'Name', field: 'userFullName' },

                            ]
                        }
                        options={{
                            search: true,
                            actionsColumnIndex: -1,
                        }}
                        options={{

                            headerStyle: {
                                backgroundColor: '#EE4B46',
                                color: '#fff',
                            
                            }
                        }}
                        ></MaterialTable>
                    </Tab.Pane>
            </Tab.Content>        

            </Col>
        </Row>

        </Tab.Container>
        <br />
        </>
    )
}

export default TaskList;