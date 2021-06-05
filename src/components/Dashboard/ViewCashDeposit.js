import React,{useState,useEffect} from "react";
import axios from "axios";
import { BASE_URL } from "./../../config/url";
import Cookies from 'js-cookie';
import MaterialTable, { MTableToolbar } from "material-table";
import { navigate } from "@reach/router";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import {IoMdArrowBack} from 'react-icons/io'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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

function ViewCashDeposit() {
    var today = new Date();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const [open1, setOpen1] = React.useState(false);

    const handleClose1 = () => {
        setOpen1(false);
    };

    const [cash, setCash] = useState([])
    const [cashId, setCashId] = useState("")
    const [depositor, setDepositor] = useState("")
    const [depositBank, setDepositBank] = useState("")
    const [csDate, setCsDate] = useState("")

    const sentToBank = (e) => {
      const Token = 'bearer' + " " + Cookies.get('Token')

      axios.put(`${BASE_URL}/api/v1/finance/cashsenttobank`,
      {
        cashDepositId : cashId,
        sentToBank : true,
        depositor: depositor,
        sentToBankDate: today,
        depositBank: depositBank

      },{headers:{Authorization:Token}})
        .then(response => {
          console.log(response)
          axios.get(`${BASE_URL}/api/v1/finance/getlistofcashdeposit`,{headers:{Authorization:Token}})
          .then(response => {
            console.log(response)
            setCash(response.data)
            
          })
          setOpen(false)
        })

    }

    const cashSubmit = (e) => {
      const Token = 'bearer' + " " + Cookies.get('Token')

      axios.put(`${BASE_URL}/api/v1/finance/cashdeposited`,
      {
        cashDepositId : cashId,
        cashSubmitted : true,
        cashSubmittedDate : csDate

      },{headers:{Authorization:Token}})
        .then(response => {
          console.log(response)
          axios.get(`${BASE_URL}/api/v1/finance/getlistofcashdeposit`,{headers:{Authorization:Token}})
          .then(response => {
            console.log(response)
            setCash(response.data)
            
          })
          setOpen1(false)
        })

    }

    useEffect(() => {
       
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/finance/getlistofcashdeposit`,{headers:{Authorization:Token}})
        .then(response => {
          console.log(response)
          setCash(response.data)
          
        })
    },[])
    return(
    <>
    <br />
    <div className="tabs-container" id="tabs-container">

    <Tab.Container id="left-tabs-example" defaultActiveKey={Cookies.get('ActiveCashKey')}>
    <Row>
        <Col sm={12}>
        <center>
        <Nav variant="pills" className="justify-content-center flex-row">
            <Nav.Item onClick={()=>{Cookies.set('ActiveCashKey', 'first')}}>
            <Nav.Link className="tabs" eventKey="first">Cash Deposits</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={()=>{Cookies.set('ActiveCashKey', 'second')}}>
            <Nav.Link className="tabs" eventKey="second">Cash Payments</Nav.Link>
            </Nav.Item>
        </Nav>
        </center>
        </Col>
    </Row>
    <br />
    <Tab.Content>
      <Col sm={12}>
        <Tab.Pane eventKey="first">
        <br />
        <MaterialTable
            data={cash}
            title="Cash Deposits"
            columns={
                [
                  { title: 'Cash Deposit ID', defaultSort : 'desc', render: (rowData) => rowData.cashDepositId, customSort: (a, b) => a.tableData.id < b.tableData.id ? -1 : 1 },
                  { title: 'Amount', field: 'depositAmount' },
                  { title: 'Received By', field: 'receivedBy' },
                  { title: 'Received Date', render : (rowData) => !rowData.receivedDate ?  "": rowData.receivedDate.substring(8,10)+"-"+rowData.receivedDate.substring(5,7)+"-"+rowData.receivedDate.substring(0,4), customSort: (a, b) => a.receivedDate < b.receivedDate ? -1 : 1 },
                  { title: 'Send To Bank', field: 'sentToBank' },
                  { title: 'Send To Bank Date', render : (rowData) => !rowData.sentToBankDate ?  "": rowData.sentToBankDate.substring(8,10)+"-"+rowData.sentToBankDate.substring(5,7)+"-"+rowData.sentToBankDate.substring(0,4), customSort: (a, b) => a.sentToBankDate < b.sentToBankDate ? -1 : 1 },
                  { title: 'Depositor', render : (rowData) => !rowData.depositor ? "" : rowData.depositor, customSort: (a, b) => a.depositor < b.depositor ? -1 : 1},
                  { title: 'Cash Submitted', field: 'cashSubmitted' },
                  { title: 'Cash Submitted Date', render : (rowData) => !rowData.cashSubmittedDate ?  "": rowData.cashSubmittedDate.substring(8,10)+"-"+rowData.cashSubmittedDate.substring(5,7)+"-"+rowData.cashSubmittedDate.substring(0,4), customSort: (a, b) => a.cashSubmittedDate < b.cashSubmittedDate ? -1 : 1 },
                    
                ]
            }
            options={{
                search: true,
                actionsColumnIndex: -1,
            }}
            components={{
                Toolbar: (props) => (
                  <div className="filters text-center">
                   <MTableToolbar {...props} />
      
                    {/*<FormControl className={classes.formControl} style={{marginTop: "-65px"}}>
                    <InputLabel id="demo-simple-select-helper-label">Payment Type</InputLabel>
                      <Select
                        value={ptype}
                        onChange={(e)=>setPtype(e.target.value)}
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="" disabled>
                        Payment Type
                        </MenuItem>
                        <MenuItem value="Credit" >
                        Credit
                        </MenuItem>
                        <MenuItem value="Debit" >
                        Debit
                        </MenuItem>
                      </Select>
                  
                    </FormControl>

                    <FormControl className={classes.formControl} style={{marginTop: "-65px"}}>
                    <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                      <Select
                        value={status}
                        onChange={(e)=>setStatus(e.target.value)}
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                        
                      >
                        <MenuItem value="all" disabled>
                         Status
                        </MenuItem>
                        <MenuItem value="Received">
                        Received
                        </MenuItem>
                        <MenuItem value="Sent To Bank">
                        Sent To Bank
                        </MenuItem>
                        <MenuItem value="Clearance Done">
                        Clearance Done
                        </MenuItem>
                        <MenuItem value="Cheque Bounced">
                        Cheque Bounced
                        </MenuItem>
                      </Select>
                    </FormControl> 

                    <FormControl className={classes.formControl} style={{marginTop: "-50px",marginRight:"110px"}}>
                    <button className="btn btn-secondary btn-user" onClick={reset} style={{backgroundColor : "white", color : "black"}}>
                    Reset Filter
                    </button>
                    </FormControl>
                    
                    */}
                    
                  </div>
                ),
              }}
            
            options={{

                headerStyle: {
                    backgroundColor: '#EE4B46',
                    color: '#fff',
                    paddingLeft: '11px'
                
                }
            }}

            actions={[
              rowData => ({
                  icon: 'edit',
                  tooltip: 'Send To Bank',
                  onClick: (event, rowData) => {
                    setOpen(true)
                    setCashId(rowData.cashDepositId)
                  },
                 disabled: rowData.sentToBank === "true"
                }),
                rowData => ({
                  icon: 'edit',
                  tooltip: 'Cash',
                  onClick: (event, rowData) => {
                   setOpen1(true)
                   setCashId(rowData.cashDepositId)
                  },
                  disabled: rowData.sentToBank === "false" || rowData.cashSubmitted === "true"
                })



          ]}
            
           ></MaterialTable>
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
                
                    <label>Cash Submit Date</label>
                    <input
                    type="date"
                    class="form-control"
                    name="submitDate"
                    id="submitDate"
                    onChange={(e)=>setCsDate(e.target.value)}
                    />
                    <br />
                <br />
                <div className="row container-fluid justify-content-center">
                    <div className="col-4 text-right">
                        <button className="btn btn-secondary btn-user" style={{backgroundColor: "white", color: "black"}} onClick={()=> setOpen1(false)}>No</button>

                    </div>
                    &nbsp;&nbsp;
                    <div className="col-4">
                        <button className="btn btn-secondary btn-user" onClick={cashSubmit}>Yes</button>
                                                  
                    </div>
                </div>
               
            </div>
            </Fade>
            </Modal>
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
                
                    <label>Depositor</label>
                    <input
                    type="text"
                    class="form-control"
                    name="depositor"
                    id="depositor"
                    onChange={(e)=>setDepositor(e.target.value)}
                    />
                    <br />

                    <label>Deposit Bank</label>
                    <input
                    type="text"
                    class="form-control"
                    name="depositBank"
                    id="depositBank"
                    onChange={(e)=>setDepositBank(e.target.value)}
                    />
                    <br />
                
                <br />
                <div className="row container-fluid justify-content-center">
                    <div className="col-4 text-right">
                        <button className="btn btn-secondary btn-user" style={{backgroundColor: "white", color: "black"}} onClick={()=> setOpen(false)}>No</button>

                    </div>
                    &nbsp;&nbsp;
                    <div className="col-4">
                        <button className="btn btn-secondary btn-user" onClick={sentToBank}>Yes</button>
                                                  
                    </div>
                </div>
               
            </div>
            </Fade>
            </Modal>
        </Tab.Pane>
        <Tab.Pane eventKey="second">
          
        </Tab.Pane>
      </Col>
    </Tab.Content>
    </Tab.Container>
    </div>
        
        </>
    )
}

export default ViewCashDeposit;