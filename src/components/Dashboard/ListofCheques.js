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

  
    const [ form, setForm ] = useState([])
    var [clearanceBank, setClearanceBank] = useState("")
    const [ chequeNo, setChequeNo] = useState("")

    var bankAccount = ""

    if(clearanceBank === "Bank1") {
      bankAccount = "11111"
    }
    else if(clearanceBank === "Bank2") {
      bankAccount = "22222"
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
 
    useEffect(() => {
       
        const Token = 'bearer' + " " + Cookies.get('Token')
        
            axios.get(`${BASE_URL}/api/v1/cheque/getlistofcheque`,{headers:{Authorization:Token}})
        .then(response => {
          console.log(response)
          setForm(response.data)
        })
     
    },[])

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
                    { title: 'Cheque Date', render: (rowData) => !rowData.chequeDate ?  "": rowData.chequeDate.substring(8,10)+"-"+rowData.chequeDate.substring(5,7)+"-"+rowData.chequeDate.substring(0,4) },
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
{/*                     
                    <FormControl className={classes.formControl} style={{marginTop: "-65px"}}>
                    <InputLabel id="demo-simple-select-helper-label">Demand Types</InputLabel>
                      <Select
                        value={dt}
                        onChange={(e)=>setDt(e.target.value)}
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="" disabled>
                        Demand Types
                        </MenuItem>
                        <MenuItem value="BasicConstructionCharge" >
                        Basic Construction Charge
                        </MenuItem><MenuItem value="LatePaymentFee" >
                        Late Payment Fee
                        </MenuItem>
                        <MenuItem value="LegalCharge" >
                        Legal Charge
                        </MenuItem><MenuItem value="ExtraWork" >
                        Extra Work
                        </MenuItem>
                       

                      </Select>
                  
                    </FormControl>

                    <FormControl className={classes.formControl} style={{marginTop: "-65px"}}>
                    <InputLabel id="demo-simple-select-helper-label">Paid</InputLabel>
                      <Select
                        value={paid}
                        onChange={(e)=>setPaid(e.target.value)}
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                        
                      >
                        <MenuItem value="all" disabled>
                         Paid
                        </MenuItem>
                        <MenuItem value="true" >
                        Yes
                        </MenuItem>
                        <MenuItem value="false" >
                        No
                        </MenuItem>
                        
                        

                        
                      </Select>
                    
                    </FormControl> */}

  
  
{/*                     
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
                  icon: ()=> <Edit />,
                  tooltip: 'Send To Bank',
                  onClick: (event, rowData) => {
                    setOpen(true)
                    setChequeNo(rowData.chequeNo)
                  },
                  disabled: rowData.bankSubmitDate
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
            
        </div>
        </div>
    );

}

export default ListofCheque;