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
import TextField from '@material-ui/core/TextField';

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
 
function ListofTransaction(){
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
    const [ form1, setForm1 ] = useState([])
    
    const [ view, setView ] = useState("")
    const [ unitName, setUnitName] = useState("")
    const [ unitType, setUnitType] = useState("")
    const [ tc, setTc] = useState("")
    const [ unitFloor, setUnitFloor] = useState("")
    const [ unitPhase, setUnitPhase] = useState("")
    const [ onHold, setOnHold] = useState("")
    const [ tt, setTt] = useState("")
    const [ stat, setStat] = useState([])
    const [ ptca, setPtca] = useState([])
    const [from, setFrom] = useState("")
    const [to,setTo] = useState("")
    
    const [fromval, setFromval] = useState("")
    const [toval,setToval] = useState("")

    const reset = (e) => {
        setTc("");
        setTt("");
        setToval("")
        setFromval("")
        setForm(form1)
        
    }

    const changeFrom = (e) => {
      var date = e.target.value
      var month = date.substring(5,7)
      setFromval(e.target.value)

      if(month === "01"){
        setFrom(date.substring(8)+"-"+"jan"+"-"+date.substring(0,4))
  
      }
      else if(month === "02"){
        setFrom(date.substring(8)+"-"+"feb"+"-"+date.substring(0,4))
  
      }
      else if(month === "03"){
        setFrom(date.substring(8)+"-"+"mar"+"-"+date.substring(0,4))
  
      }
      else if(month === "04"){
        setFrom(date.substring(8)+"-"+"apr"+"-"+date.substring(0,4))
  
      }
      
      else if(month === "05"){
        setFrom(date.substring(8)+"-"+"may"+"-"+date.substring(0,4))
  
      }

      else if(month === "06"){
        setFrom(date.substring(8)+"-"+"jun"+"-"+date.substring(0,4))
  
      }

      else if(month === "07"){
        setFrom(date.substring(8)+"-"+"jul"+"-"+date.substring(0,4))
  
      }

      else if(month === "08"){
        setFrom(date.substring(8)+"-"+"aug"+"-"+date.substring(0,4))
  
      }

      else if(month === "09"){
        setFrom(date.substring(8)+"-"+"sep"+"-"+date.substring(0,4))
  
      }

      else if(month === "10"){
        setFrom(date.substring(8)+"-"+"oct"+"-"+date.substring(0,4))
  
      }

      else if(month === "11"){
        setFrom(date.substring(8)+"-"+"nov"+"-"+date.substring(0,4))
  
      }

      else if(month === "12"){
        setFrom(date.substring(8)+"-"+"dec"+"-"+date.substring(0,4))
  
      }
    }

    const changeTo = (e) => {
      var date = e.target.value
      var month = date.substring(5,7)
      setToval(e.target.value)

      if(month === "01"){
        setTo(date.substring(8)+"-"+"jan"+"-"+date.substring(0,4))
  
      }
      else if(month === "02"){
        setTo(date.substring(8)+"-"+"feb"+"-"+date.substring(0,4))
  
      }
      else if(month === "03"){
        setTo(date.substring(8)+"-"+"mar"+"-"+date.substring(0,4))
  
      }
      else if(month === "04"){
        setTo(date.substring(8)+"-"+"apr"+"-"+date.substring(0,4))
  
      }
      
      else if(month === "05"){
        setTo(date.substring(8)+"-"+"may"+"-"+date.substring(0,4))
  
      }

      else if(month === "06"){
        setTo(date.substring(8)+"-"+"jun"+"-"+date.substring(0,4))
  
      }

      else if(month === "07"){
        setTo(date.substring(8)+"-"+"jul"+"-"+date.substring(0,4))
  
      }

      else if(month === "08"){
        setTo(date.substring(8)+"-"+"aug"+"-"+date.substring(0,4))
  
      }

      else if(month === "09"){
        setTo(date.substring(8)+"-"+"sep"+"-"+date.substring(0,4))
  
      }

      else if(month === "10"){
        setTo(date.substring(8)+"-"+"oct"+"-"+date.substring(0,4))
  
      }

      else if(month === "11"){
        setTo(date.substring(8)+"-"+"nov"+"-"+date.substring(0,4))
  
      }

      else if(month === "12"){
        setTo(date.substring(8)+"-"+"dec"+"-"+date.substring(0,4))
  
      }
    }


    
    

    useEffect(() => {
       
        const Token = 'bearer' + " " + Cookies.get('Token')
        
       if(tt===""&& tc==="" && from ==="" && to===""){
        axios.post(`${BASE_URL}/api/v1/transaction/getAllTransaction`,{headers:{Authorization:Token}})
        .then(response => {
          
          setForm(response.data)
          setForm1(response.data)
        })
       }
       else if(tt !=="" && tc==="" && from ==="" && to===""){
        axios.post(`${BASE_URL}/api/v1/transaction/getAllTransaction?transactionType=${tt}`,{headers:{Authorization:Token}})
          .then(response => {
            console.log(response)
            setForm(response.data)
          })
       }
       else if(tt ==="" && tc!=="" && from ==="" && to===""){
        axios.post(`${BASE_URL}/api/v1/transaction/getAllTransaction?transactionCategory=${tc}`,{headers:{Authorization:Token}})
          .then(response => {
            console.log(response)
            setForm(response.data)
          })
       }
       else if(tt !=="" && tc !=="" && from ==="" && to===""){
        axios.post(`${BASE_URL}/api/v1/transaction/getAllTransaction?transactionType=${tt}&transactionCategory=${tc}`,{headers:{Authorization:Token}})
          .then(response => {
            
            setForm(response.data)
          })
       }

       else if(tt !=="" && tc ==="" && from !=="" && to !==""){
        axios.post(`${BASE_URL}/api/v1/transaction/getAllTransaction?transactionType=${tt}&startDate=${from}&endDate=${to}`,{headers:{Authorization:Token}})
          .then(response => {
            console.log(response)
            setForm(response.data)
          })
       }

       else if(tt ==="" && tc !=="" && from !=="" && to !==""){
        axios.post(`${BASE_URL}/api/v1/transaction/getAllTransaction?transactionCategory=${tc}&startDate=${from}&endDate=${to}`,{headers:{Authorization:Token}})
          .then(response => {
            console.log(response)
            setForm(response.data)
          })
       }
       else if(tt !=="" && tc !=="" && from !=="" && to !==""){
        axios.post(`${BASE_URL}/api/v1/transaction/getAllTransaction?transactionType=${tt}&transactionCategory=${tc}&startDate=${from}&endDate=${to}`,{headers:{Authorization:Token}})
          .then(response => {
            console.log(response)
            setForm(response.data)
          })
       }
        
          
          
        
    },[tt,tc,from,to])

    return(
        <div className="row container-fluid px-0">
        <div className="col-12 mt-4">
        <MaterialTable
            data={form}
            title="Transactions"
            columns={
                [
                    { title: 'Transaction Id', field: '_id' },
                    { title: 'Transaction Type', field: 'transactionType' },
                    { title: 'Transaction Mode', field: 'transactionMode' },
                    { title: 'Transaction Bank', field: 'transactionBank' },
                    { title: 'Transaction Amount', field: 'transactionAmount' },
                    { title: 'Transaction Category', field: 'transactionCategory' },
                    
                    
                    
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
                    <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
                      <Select
                        value={tt}
                        onChange={(e)=>setTt(e.target.value)}
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="" disabled>
                         Transaction Type
                        </MenuItem>
                        <MenuItem value="debit" >
                        Debit
                        </MenuItem>
                        <MenuItem value="credit" >
                        Credit
                        </MenuItem>
                        <MenuItem value="raw" >
                        Raw
                        </MenuItem>
                       

                      </Select>
                  
                    </FormControl>

                    <FormControl className={classes.formControl} style={{marginTop: "-65px"}}>
                    <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                      <Select
                        value={tc}
                        onChange={(e)=>setTc(e.target.value)}
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                        
                      >
                        <MenuItem value="all" disabled>
                          Transaction Category
                        </MenuItem>
                        <MenuItem value="qqqq" >
                        qqqq
                        </MenuItem>
                        <MenuItem value="cash" >
                        Cash
                        </MenuItem>
                        <MenuItem value="bookingAmount" >
                        Booking Amount
                        </MenuItem>
                        

                        
                      </Select>
                    
                    </FormControl>

                    <TextField
                    id="date-from"
                    label="From"
                    type="date"
                    style={{width: "13.5%",marginTop: "-65px" }}
                    value={fromval}
                    onChange={changeFrom}
                    InputLabelProps={{
                      shrink: true
                    }}
                    />

                  <TextField
                    id="date-from"
                    label="To"
                    type="date"
                    style={{width: "13.5%",marginTop: "-65px" }}
                    value={toval}
                    onChange={changeTo}
                    InputLabelProps={{
                      shrink: true
                    }}
                    />
                    
        
  
  
                    
                    <FormControl className={classes.formControl} style={{marginTop: "-50px",marginRight:"125px"}}>
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
            
           ></MaterialTable>
            
        </div>
        </div>
    );

}

export default ListofTransaction;