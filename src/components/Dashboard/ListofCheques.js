import React,{useState,useEffect} from "react";
import axios from "axios";
import { BASE_URL } from "./../../config/url";
import Cookies from 'js-cookie';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar } from "material-table";
import {ReactComponent as Edit} from "./../../assets/icons/Vector.svg"
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Form } from "react-bootstrap";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';

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
 
function ListofCheque(){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
        setClearanceBank("")
    };

    const [open1, setOpen1] = React.useState(false);

    const handleClose1 = () => {
        setOpen1(false);
        setCdate("");
        setBreason("");
        setCleared()
    };

  
    const [ form, setForm ] = useState([])
    var [clearanceBank, setClearanceBank] = useState("")
    const [ chequeNo, setChequeNo] = useState("")
    const [status, setStatus] = useState("")
    const [ptype, setPtype] = useState("")
    const [cdate, setCdate] = useState("")
    const [cleared, setCleared] = useState()
    const [breason, setBreason] = useState("")

    var bankAccount = ""

    if(clearanceBank === "Bank1") {
      bankAccount = "11111"
    }
    else if(clearanceBank === "Bank2") {
      bankAccount = "22222"
    }

    const reset = (e) => {
        setPtype("")
        setStatus("")
    }

    const sendCheque = (e) => {
      const Token = 'bearer' + " " + Cookies.get('Token')
      axios
      .post(`${BASE_URL}/api/v1/cheque/chequesenttobank`,{clearanceBankName : clearanceBank, clearanceBankAccount: bankAccount, chequeNo: chequeNo},{ headers : { 'Authorization' : Token }})
      .then(response => {
          console.log(response)
          axios.get(`${BASE_URL}/api/v1/cheque/getlistofcheque`,{headers:{Authorization:Token}})
        .then(response => {
          console.log(response)
          setForm(response.data)
          setOpen(false)
        })
      })
    }

    const clearCheque = (e) => {
      const Token = 'bearer' + " " + Cookies.get('Token')
      if( cleared === true){
        axios
        .post(`${BASE_URL}/api/v1/cheque/chequeclearenceconfirmation`,{chequeNo: chequeNo, clearanceDate: cdate, chequeCleared : cleared},{ headers : { 'Authorization' : Token }})
        .then(response => {
            console.log(response)
            axios.get(`${BASE_URL}/api/v1/cheque/getlistofcheque`,{headers:{Authorization:Token}})
          .then(response => {
            console.log(response)
            setForm(response.data)
            setOpen1(false)
          })
        })
      }
      else if( cleared === false){
        axios
        .post(`${BASE_URL}/api/v1/cheque/chequeclearenceconfirmation`,{chequeNo: chequeNo, clearanceDate: cdate, chequeCleared : cleared, bounceReason : breason},{ headers : { 'Authorization' : Token }})
        .then(response => {
            console.log(response)
            axios.get(`${BASE_URL}/api/v1/cheque/getlistofcheque`,{headers:{Authorization:Token}})
          .then(response => {
            console.log(response)
            setForm(response.data)
            setOpen1(false)
          })
        })
      }
    }
 
    useEffect(() => {
       
        const Token = 'bearer' + " " + Cookies.get('Token')
        
        if(ptype === "" && status === ""){
        axios.get(`${BASE_URL}/api/v1/cheque/getlistofcheque`,{headers:{Authorization:Token}})
        .then(response => {
          console.log(response)
          if (response.status === 200){
            setForm(response.data)
          }
          
        })
        .catch(error => {
          console.log(error)
          setForm([])
        })
      }
      else if(ptype !== "" && status === ""){
        axios.get(`${BASE_URL}/api/v1/cheque/getlistofcheque?paymentType=${ptype}`,{headers:{Authorization:Token}})
        .then(response => {
          console.log(response)
          if (response.status === 200){
            setForm(response.data)
          }
          
        })
        .catch(error => {
          console.log(error)
          setForm([])
        })
      }

      else if(ptype !== "" && status !== "") {
        if( status === "Received"){
        axios.get(`${BASE_URL}/api/v1/cheque/getlistofcheque?paymentType=${ptype}&sentToBank=false`,{headers:{Authorization:Token}})
        .then(response => {
          console.log(response)
          if (response.status === 200){
            setForm(response.data)
          }
          
        })
        .catch(error => {
          console.log(error)
          setForm([])
        })
        }
        else if( status === "Sent To Bank"){
        axios.get(`${BASE_URL}/api/v1/cheque/getlistofcheque?paymentType=${ptype}&sentToBank=true`,{headers:{Authorization:Token}})
        .then(response => {
          console.log(response)
          if (response.status === 200){
            setForm(response.data)
          }
          
        })
        .catch(error => {
          console.log(error)
          setForm([])
        })
        }
        else if( status === "Clearance Done") {
        axios.get(`${BASE_URL}/api/v1/cheque/getlistofcheque?paymentType=${ptype}&clearanceProcessed=true`,{headers:{Authorization:Token}})
        .then(response => {
          console.log(response)
          if (response.status === 200){
            setForm(response.data)
          }
  
        })
        .catch(error => {
          console.log(error)
          setForm([])
        })
        }
        else if( status === "Cheque Bounced") {
        axios.get(`${BASE_URL}/api/v1/cheque/getlistofcheque?paymentType=${ptype}&clearanceProcessed=false`,{headers:{Authorization:Token}})
        .then(response => {
          console.log(response)
          if (response.status === 200){
            setForm(response.data)
          }
        })
        .catch(error => {
          console.log(error)
          setForm([])
        })
        }
      }
     
    },[ptype, status])

    return(
        <div className="row container-fluid px-0">
        <div className="col-12 mt-4">
        <MaterialTable
            data={form}
            title="List of Cheque"
            columns={
                [
                    { title: 'Cheque Number', field: 'chequeNo' },
                    { title: 'Cheque Bank Name', field: 'chequeBankName' },
                    { title: 'Cheque Account No.', field: 'chequeAccountNo' },
                    { title: 'Cheque Date', defaultSort : 'desc', render : (rowData) => !rowData.chequeDate ?  "": rowData.chequeDate.substring(8,10)+"-"+rowData.chequeDate.substring(5,7)+"-"+rowData.chequeDate.substring(0,4), customSort: (a, b) => a.chequeDate < b.chequeDate ? -1 : 1 },
                    { title: 'Cheque Amount', field: 'chequeAmount' },
                    { title: 'Issued To', field: 'issuedTo' },
                    { title: 'Issued By', field: 'issuedBy' },
                    { title: 'Payment Type', field: 'paymentType' },
                    { title: 'Sent To Bank', field: 'sentToBank' },
                    { title: 'Bank Submit Date', render: (rowData) => !rowData.bankSubmitDate ?  "": rowData.bankSubmitDate.substring(8,10)+"-"+rowData.bankSubmitDate.substring(5,7)+"-"+rowData.bankSubmitDate.substring(0,4)},
                    { title: 'Clearance Bank Name', field: 'clearanceBankName' },
                    { title: 'Payment Category', field: 'paymentCategory' },
                    { title: 'Clearance Bank Account', field: 'clearanceBankAccount' },
                    { title: 'Clearance Processed', field: 'clearanceProcessed' },
                    { title: 'Clearance Date', render: (rowData) => !rowData.clearanceDate ?  "": rowData.clearanceDate.substring(8,10)+"-"+rowData.clearanceDate.substring(5,7)+"-"+rowData.clearanceDate.substring(0,4) },
                    { title: 'Cheque Cleared', field: 'chequeCleared' },
                    { title: 'Bounce Reason', field: 'bounceReason' },
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
      
                    <FormControl className={classes.formControl} style={{marginTop: "-65px"}}>
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
                    setChequeNo(rowData.chequeNo)
                  },
                  disabled: rowData.bankSubmitDate
                }),
                rowData => ({
                  icon: 'edit',
                  tooltip: 'Clearance',
                  onClick: (event, rowData) => {
                    setOpen1(true)
                    setChequeNo(rowData.chequeNo)
                  },
                  disabled: rowData.sentToBank === false
                })



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
                              <Form.Group controlId="clearanceBank" onChange={(e)=> setClearanceBank(e.target.value)}>
                                <Form.Label>Clearance Bank Name</Form.Label>
                                <Form.Control  as="select" >
                                <option>Select a Clearance Bank</option>
                                <option value="Bank1">Bank1</option>    
                                <option value="Bank2">Bank2</option> 
                                </Form.Control>
                              </Form.Group>

                              { clearanceBank !== "" ?
                              <>
                              <label>Clearance Bank Account</label>
                              <input 
                               type="number"
                               class="form-control"
                               name="bankAccount"
                               value={clearanceBank === "Bank1" ? "11111" : clearanceBank === "Bank2" ? "22222" : null}
                               readonly="true"
                               />

                              <br />
                              <label>Cheque No.</label>
                              <input 
                               type="number"
                               class="form-control"
                               name="chequeNo"
                               value={chequeNo}
                               readonly="true"
                               />

                              <br />
                              <div className="text-center">
                              <button className="btn btn-secondary btn-user" onClick={sendCheque}>
                              Send
                              </button>
                              &nbsp;&nbsp;
                              <button className="btn btn-secondary btn-user" onClick={handleClose} style={{backgroundColor : "white", color : "black"}}>
                              Cancel
                              </button>
                              </div>

                              </> : null 
                              }

                            </div>
                            </Fade>
                    </Modal>
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
                              <label>Cheque No.</label>
                              <input 
                               type="number"
                               class="form-control"
                               name="chequeNo"
                               value={chequeNo}
                               readonly="true"
                               />
                              
                              <br />
                              <label>Clearance Date</label>
                              <input 
                               type="date"
                               class="form-control"
                               name="clearanceDate"
                               onChange={(e)=>setCdate(e.target.value)}
                               />

                               <br />
                               <div className="row">
                               <div className="col-4">
                               <label>Cleared</label>
                               </div>
                               <div className="col-3">
                                <input 
                                type="radio"
                                class="form-check-input"
                                name="chequeCleared"
                                id="yes"
                                onClick={(e)=>setCleared(true)}
                                />
                                
                                <label>
                                 Yes
                               </label>
                               </div>
                               &nbsp;&nbsp;
                              <div className="col-3">
                              <input 
                               type="radio"
                               class="form-check-input"
                               name="chequeCleared"
                               id="no"
                               onClick={(e)=>setCleared(false)}
                               />
                               
                              <label>
                                No
                              </label>
                              </div>
                              </div>

                              { cleared === true ?
                              null :
                              cleared === false ?
                              <>
                              <br />
                              <label>Bounce Reason</label>
                              <input 
                               type="text"
                               class="form-control"
                               name="breason"
                               onChange={(e)=>setBreason(e.target.value)}
                               />
                              </>
                              : null
                              }
                              { cleared !== undefined ?
                              <>
                              <br />
                              <div className="text-center">
                              <button className="btn btn-secondary btn-user" onClick={clearCheque}>
                              Send
                              </button>
                              &nbsp;&nbsp;
                              <button className="btn btn-secondary btn-user" onClick={handleClose1} style={{backgroundColor : "white", color : "black"}}>
                              Cancel
                              </button>
                              </div>
                              </>
                              : null
                              }
                            </div>
                            </Fade>
                    </Modal>
            
        </div>
        </div>
    );

}

export default ListofCheque;