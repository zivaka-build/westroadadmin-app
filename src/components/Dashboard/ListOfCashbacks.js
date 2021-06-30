import React,{useState,useEffect} from "react";
import axios from "axios";
import { BASE_URL } from "./../../config/url";
import Cookies from 'js-cookie';
import {ReactComponent as Edit} from "./../../assets/icons/Vector.svg"
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar } from "material-table";
import { navigate , Redirect} from "@reach/router";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';
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

function ListOfCashbacks(){
    const classes = useStyles();
    const [coupons, setCoupons] = useState([])
    const [valid, setValid] = useState("")
    const [customers, setCustomers] = useState([])
    const [customer, setCustomer] = useState("")

    const reset = (e) => {
        setValid("")
        setCustomer("")
    }
    
    useEffect(() => {
       
        const Token = 'bearer' + " " + Cookies.get('Token')

        axios.get(`${BASE_URL}/api/v1/customer/getListOfCustomers`,{ headers: { Authorization: Token }})
        .then(response => {
            setCustomers(response.data)
        })

        if(valid === "" && customer === ""){
        axios.get(`${BASE_URL}/api/v1/cashback/getlistofcashbackcoupons`,{ headers: { Authorization: Token }})
        .then(response => {
            console.log(response)
            setCoupons(response.data)
        })
        }
        else if(valid !== "" && customer === ""){
        axios.get(`${BASE_URL}/api/v1/cashback/getlistofcashbackcoupons?couponValid=${valid}`,{ headers: { Authorization: Token }})
        .then(response => {
            console.log(response)
            setCoupons(response.data)
        })
        }
        else if(valid === "" && customer !== ""){
        axios.get(`${BASE_URL}/api/v1/cashback/getlistofcashbackcoupons?customerId=${customer}`,{ headers: { Authorization: Token }})
        .then(response => {
            console.log(response)
            setCoupons(response.data)
        })
        }
        else if(valid !== "" && customer !== ""){
        axios.get(`${BASE_URL}/api/v1/cashback/getlistofcashbackcoupons?couponValid=${valid}&customerId=${customer}`,{ headers: { Authorization: Token }})
        .then(response => {
            console.log(response)
            setCoupons(response.data)
        })
        }
    },[valid, customer])

    return(
        <>
          <div className="mt-3 row container-fluid justify-content-center px-2" >
            <div className="col-12">
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={()=>navigate("/dashboard/home")}><IoMdArrowBack />Back</button>
            </div>
          </div>
        <div className="row container-fluid px-0">
        <div className="col-12 mt-4">
        <MaterialTable
            data={coupons}
            title="Cashbacks"
            columns={
                [
                    { title: 'Coupon ID', field: 'couponId' },
                    { title: 'Amount', field: 'amount'},
                    { title: 'Customer ID', field: 'customerId' },
                    { title: 'Created At', render: (rowData) => !rowData.createdAt ? "" : rowData.createdAt.substring(8,10)+"-"+rowData.createdAt.substring(5,7)+"-"+rowData.createdAt.substring(0,4), customSort: (a, b) => a.createdAt < b.createdAt ? -1 : 1 },
                    { title: 'Updated At', defaultSort: 'desc', render: (rowData) => !rowData.updatedAt ? "" : rowData.updatedAt.substring(8,10)+"-"+rowData.updatedAt.substring(5,7)+"-"+rowData.updatedAt.substring(0,4), customSort: (a, b) => a.updatedAt < b.updatedAt ? -1 : 1 },
                    { title: 'Encashed', render: (rowData) => rowData.couponValid === true ? "Yes" : "No" },
                    { title: 'Encashed By', field:'encashedBy' },
                    { title: 'Description', field: 'encashedDescription' },
                    { title: 'Encash Date ', render: (rowData) => !rowData.encashedDate ? "" : rowData.encashedDate.substring(8,10)+"-"+rowData.encashedDate.substring(5,7)+"-"+rowData.encashedDate.substring(0,4), customSort: (a, b) => a.encashedDate < b.encashedDate ? -1 : 1 },
                    
                  
                    
                    
                    
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
                    <InputLabel id="demo-simple-select-helper-label">Encashed</InputLabel>
                      <Select
                        value={valid}
                        onChange={(e)=>setValid(e.target.value)}
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="" disabled>
                        Encashed
                        </MenuItem>
                        <MenuItem value={true} >
                        Yes
                        </MenuItem><MenuItem value={false} >
                        No
                        </MenuItem>
                      </Select>
                  
                    </FormControl>

                    <FormControl className={classes.formControl} style={{marginTop: "-65px"}}>
                    <InputLabel id="demo-simple-select-helper-label">Customer</InputLabel>
                      <Select
                        value={customer}
                        onChange={(e)=>setCustomer(e.target.value)}
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="all" disabled>
                         Customer
                        </MenuItem>
                        { customers.map((c)=>(
                        <MenuItem value={c.customerId}>
                        {c.customerId}
                        </MenuItem>
                        ))}
                                              
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
        </div>
        </>
    )
}

export default ListOfCashbacks; 