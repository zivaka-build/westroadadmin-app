import React,{useState,useEffect} from "react";
import axios from "axios";
import { BASE_URL } from "./../../config/url";
import Cookies from 'js-cookie';
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  }));
 
function ListofDemand(){
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
    
   

    const reset = (e) => {
        setPaid("");
        setDt("");
        
        
    }


    
    

    useEffect(() => {
       
        const Token = 'bearer' + " " + Cookies.get('Token')
        
        if(dt==="" && paid === ""){
            axios.get(`${BASE_URL}/api/v1/demand/getlistofdemands`,{headers:{Authorization:Token}})
        .then(response => {
          console.log(response.data)
          if(response.data.message == "no Demand found1"){
            setForm([])
          }
          else{
            var data = response.data
            const demands = data.map((t)=>{
              const {demandId, customerId, demandGenerationDate, dueDate, demandType, description, amount, isPaid, paymentDate, creditTransId} = t
              const formattedDate1 = demandGenerationDate.substring(8,10)+"-"+demandGenerationDate.substring(5,7)+"-"+demandGenerationDate.substring(0,4)
              const formattedDate2 = dueDate.substring(8,10)+"-"+dueDate.substring(5,7)+"-"+dueDate.substring(0,4)
              var formattedDate3 = ""
              if(!paymentDate){
                formattedDate3 = ""
              }    
              else if(paymentDate){
                formattedDate3 = paymentDate.substring(8,10)+"-"+paymentDate.substring(5,7)+"-"+paymentDate.substring(0,4)
              }     
              
              var dt = ""
              if(demandType === "BasicConstructionCharge"){
                dt= "Basic Construction Charge"
              }

              else if(demandType === "LatePaymentFee"){
                dt= "Late Payment Fee"
              }

              else if(demandType === "LegalCharge") {
                dt= "Legal Charge"
              }

              else if(demandType === "SaleAgreement"){
                dt= "Sale Agreement"
              }

              else if(demandType === "BCCFirstDemand") {
                dt = "BCC First Demand"
              }

              var pd = ""
              if(isPaid === true) {
                pd = "Yes"
              }
              
              else if(isPaid === false) {
                pd="No"
              }
              return {
                demandId, 
                customerId, 
                demandGenerationDate : formattedDate1, 
                dueDate: formattedDate2, 
                demandType: dt, 
                description, 
                amount, 
                isPaid : pd, 
                paymentDate: formattedDate3,
                creditTransId
                };
            })  
            setForm(demands)
          }
        })
     
        }
        else if(dt!=="" && paid===""){
            axios.get(`${BASE_URL}/api/v1/demand/getlistofdemands?demandType=${dt}`,{headers:{Authorization:Token}})
        .then(response => {
          
          if(response.data.message == "no Demand found3"){
            setForm([])
          }
          else{
            var data = response.data
            const demands = data.map((t)=>{
              const {demandId, customerId, demandGenerationDate, dueDate, demandType, description, amount, isPaid, paymentDate, creditTransId} = t
              const formattedDate1 = demandGenerationDate.substring(8,10)+"-"+demandGenerationDate.substring(5,7)+"-"+demandGenerationDate.substring(0,4)
              const formattedDate2 = dueDate.substring(8,10)+"-"+dueDate.substring(5,7)+"-"+dueDate.substring(0,4)
              var formattedDate3 = ""
              if(!paymentDate){
                formattedDate3 = ""
              }    
              else if(paymentDate){
                formattedDate3 = paymentDate.substring(8,10)+"-"+paymentDate.substring(5,7)+"-"+paymentDate.substring(0,4)
              }     
              
              var dt = ""
              if(demandType === "BasicConstructionCharge"){
                dt= "Basic Construction Charge"
              }

              else if(demandType === "LatePaymentFee"){
                dt= "Late Payment Fee"
              }

              else if(demandType === "LegalCharge") {
                dt= "Legal Charge"
              }

              else if(demandType === "SaleAgreement"){
                dt= "Sale Agreement"
              }

              else if(demandType === "BCCFirstDemand") {
                dt = "BCC First Demand"
              }

              var pd = ""
              if(isPaid === true) {
                pd = "Yes"
              }
              
              else if(isPaid === false) {
                pd="No"
              }
              return {
                demandId, 
                customerId, 
                demandGenerationDate : formattedDate1, 
                dueDate: formattedDate2, 
                demandType: dt, 
                description, 
                amount, 
                isPaid : pd, 
                paymentDate: formattedDate3,
                creditTransId
                };
            })  
            setForm(demands)
          }
        })
        }
        else if(dt==="" && paid!==""){
            axios.get(`${BASE_URL}/api/v1/demand/getlistofdemands?isPaid=${paid}`,{headers:{Authorization:Token}})
        .then(response => {
          if(response.data.message == "no Demand found1"){
            setForm([])
          }
          else{
            var data = response.data
            const demands = data.map((t)=>{
              const {demandId, customerId, demandGenerationDate, dueDate, demandType, description, amount, isPaid, paymentDate, creditTransId} = t
              const formattedDate1 = demandGenerationDate.substring(8,10)+"-"+demandGenerationDate.substring(5,7)+"-"+demandGenerationDate.substring(0,4)
              const formattedDate2 = dueDate.substring(8,10)+"-"+dueDate.substring(5,7)+"-"+dueDate.substring(0,4)
              var formattedDate3 = ""
              if(!paymentDate){
                formattedDate3 = ""
              }    
              else if(paymentDate){
                formattedDate3 = paymentDate.substring(8,10)+"-"+paymentDate.substring(5,7)+"-"+paymentDate.substring(0,4)
              }     
              
              var dt = ""
              if(demandType === "BasicConstructionCharge"){
                dt= "Basic Construction Charge"
              }

              else if(demandType === "LatePaymentFee"){
                dt= "Late Payment Fee"
              }

              else if(demandType === "LegalCharge") {
                dt= "Legal Charge"
              }

              else if(demandType === "SaleAgreement"){
                dt= "Sale Agreement"
              }

              else if(demandType === "BCCFirstDemand") {
                dt = "BCC First Demand"
              }

              var pd = ""
              if(isPaid === true) {
                pd = "Yes"
              }
              
              else if(isPaid === false) {
                pd="No"
              }
              return {
                demandId, 
                customerId, 
                demandGenerationDate : formattedDate1, 
                dueDate: formattedDate2, 
                demandType: dt, 
                description, 
                amount, 
                isPaid : pd, 
                paymentDate: formattedDate3,
                creditTransId
                };
            })  
            setForm(demands)
          }
        })
        }
        else if(dt!=="" && paid!==""){
            axios.get(`${BASE_URL}/api/v1/demand/getlistofdemands?demandType=${dt}&isPaid=${paid}`,{headers:{Authorization:Token}})
        .then(response => {
          if(response.data.message == "no Demand found1"){
            setForm([])
          }
          else{
            var data = response.data
            const demands = data.map((t)=>{
              const {demandId, customerId, demandGenerationDate, dueDate, demandType, description, amount, isPaid, paymentDate, creditTransId} = t
              const formattedDate1 = demandGenerationDate.substring(8,10)+"-"+demandGenerationDate.substring(5,7)+"-"+demandGenerationDate.substring(0,4)
              const formattedDate2 = dueDate.substring(8,10)+"-"+dueDate.substring(5,7)+"-"+dueDate.substring(0,4)
              var formattedDate3 = ""
              if(!paymentDate){
                formattedDate3 = ""
              }    
              else if(paymentDate){
                formattedDate3 = paymentDate.substring(8,10)+"-"+paymentDate.substring(5,7)+"-"+paymentDate.substring(0,4)
              }     
              
              var dt = ""
              if(demandType === "BasicConstructionCharge"){
                dt= "Basic Construction Charge"
              }

              else if(demandType === "LatePaymentFee"){
                dt= "Late Payment Fee"
              }

              else if(demandType === "LegalCharge") {
                dt= "Legal Charge"
              }

              else if(demandType === "SaleAgreement"){
                dt= "Sale Agreement"
              }

              else if(demandType === "BCCFirstDemand") {
                dt = "BCC First Demand"
              }

              var pd = ""
              if(isPaid === true) {
                pd = "Yes"
              }
              
              else if(isPaid === false) {
                pd="No"
              }
              return {
                demandId, 
                customerId, 
                demandGenerationDate : formattedDate1, 
                dueDate: formattedDate2, 
                demandType: dt, 
                description, 
                amount, 
                isPaid : pd, 
                paymentDate: formattedDate3,
                creditTransId
                };
            })  
            setForm(demands)
          }
          
          
        })
        }
      
    },[dt,paid])

    return(
        <div className="mt-3">
        <MaterialTable

            data={form}
            title="Demand List"
            columns={
                [
                    { title: 'Demand Id', field: 'demandId' },
                    { title: 'Customer Id', field: 'customerId' },
                    { title: 'Demand Generation Date', field: 'demandGenerationDate' },
                    { title: 'Due Date', field: 'dueDate' },
                    { title: 'Demand Type', field: 'demandType' },
                    { title: 'Description', field: 'description' },
                    { title: 'Amount', field: 'amount' },
                    { title: 'Paid', field: 'isPaid' },
                    { title: 'Payment Date', field: 'paymentDate' },
                    { title: 'Credit Trans Id', field: 'creditTransId' },
                    
                    
                    
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
                        </MenuItem><MenuItem value="SaleAgreement" >
                        Sale Agreement
                        </MenuItem>
                        <MenuItem value="BCCFirstDemand" >
                        BCC First Demand
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
            
           ></MaterialTable>
            
        </div>
    );

}

export default ListofDemand;