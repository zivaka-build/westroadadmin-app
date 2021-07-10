import React,{useState,useEffect} from "react";
import axios from "axios";
import { BASE_URL } from "./../../config/url";
import Cookies from 'js-cookie';
import {GiGears} from 'react-icons/gi'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Form} from "react-bootstrap";
import MaterialTable, { MTableToolbar } from "material-table";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';
import { navigate } from "@reach/router";
import {IoMdArrowBack} from 'react-icons/io'


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

  function ViewUser(){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const [users, setUsers] = useState([])
    const [username, setUsername] = useState("")

    const deactivate = (e) => {
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.put(`${BASE_URL}/api/v1/user/deactivateUserByUserName`,{userName: username},{ headers : { 'Authorization' : Token }})
        .then(response => {
            axios.get(`${BASE_URL}/api/v1/user/getListOfUsers`,{ headers : { 'Authorization' : Token }})
            .then(response => {
                console.log(response)
                setUsers(response.data.users)
            })
            setOpen(false)
        })
    }

    useEffect(() => { 
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/user/getListOfUsers`,{ headers : { 'Authorization' : Token }})
        .then(response => {
            console.log(response)
            setUsers(response.data.users)
        })

    }, [])


      return(
          <>
          <div className="mt-3 row container-fluid justify-content-center px-1">
            <div className="col-12">
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={()=>navigate("/dashboard/home")}><IoMdArrowBack />Back</button>
            </div>
          </div>
          <br />
          <MaterialTable
            data={users}
            title="Users"
            columns={
                [
                    { title: 'User Id', defaultSort: 'desc',field: 'userId', customSort: (a,b) => a.tableData.id < b.tableData.id ? -1 : 1},
                    { title: 'Full Name', field: 'userFullName' },
                    { title: 'Username', field: 'userName' },
                    { title: 'Mobile', field: 'userMobile'},
                    { title: 'Email', field: 'userEmail' },
                    { title: "Role", field: "userRole"},
                    { title: "Active", render : (rowData) => rowData.isActive === true ? "Yes" : "No"},
                    
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
                    icon: () => <GiGears />,
                    tooltip: 'Deactivate User',
                    onClick: (event, rowData) => {
                       setUsername(rowData.userName)
                       setOpen(true)
                    },
                }

            ]}
            
           ></MaterialTable>
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
               
                <h6>Are you sure you want to deactivate this user ?</h6>
                <br />
                <div className="text-center">
                <button className="btn btn-secondary btn-user" onClick={deactivate}>
                Deactivate User
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-secondary btn-user" onClick={handleClose} style={{backgroundColor : "white", color : "black"}}>
                Cancel
                </button>
                </div>
            </div>
            </Fade>
      </Modal>
          </>
      )
  }

  export default ViewUser;