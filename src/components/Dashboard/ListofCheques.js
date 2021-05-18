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
import {ReactComponent as Edit} from "./../../assets/icons/Vector.svg"

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
    };

    const [open1, setOpen1] = React.useState(false);


    const handleClose1 = () => {
        setOpen1(false);
    };

    const [ form, setForm ] = useState([])
    
    const [ view, setView ] = useState("")
    const [ unitName, setUnitName] = useState("")
    const [ unitType, setUnitType] = useState("")
    const [ paid, setPaid] = useState("")
    const [ unitFloor, setUnitFloor] = useState("")
    const [ unitPhase, setUnitPhase] = useState("")
    const [ onHold, setOnHold] = useState("")
    const [ dt, setDt] = useState("")
    const [ stat, setStat] = useState([])
    const [ ptca, setPtca] = useState([])
    
   

    
    

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
                    { title: 'Cheque Date', field: 'chequeDate' },
                    { title: 'Cheque Amount', field: 'chequeAmount' },
                    { title: 'Issued To', field: 'issuedTo' },
                    { title: 'Issued By', field: 'issuedBy' },
                    { title: 'Payment Type', field: 'paymentType' },
                    { title: 'Sent To Bank', field: 'sentToBank' },
                    { title: 'Bank Submit Date', field: 'bankSubmitDate' },
                    { title: 'Clearance Bank Name', field: 'clearanceBankName' },
                    { title: 'Payment Category', field: 'paymentCategory' },
                    { title: 'Clearance Bank Account', field: 'clearanceBankAccount' },
                    { title: 'Clearance Processed', field: 'clearanceProcessed' },
                    { title: 'Clearance Date', field: 'clearanceDate' },
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
            
           ></MaterialTable>
            
        </div>
        </div>
    );

}

export default ListofCheque;