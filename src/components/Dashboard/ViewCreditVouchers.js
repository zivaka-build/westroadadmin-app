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

function ViewCreditVouchers(){
    const [cvs, setCvs] = useState([])
    
    useEffect(() => {
       
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/finance/getlistofcreditvoucher`,{headers:{Authorization:Token}})
        .then(response => {
          console.log(response)
          setCvs(response.data)
          
        })
    },[])

    return(
        <>
        <div className="mt-2 row container-fluid justify-content-center px-1">
            <div className="col-12">
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={()=>navigate("/dashboard/home")}><IoMdArrowBack />Back</button>
            </div>
        </div> 
        <br />
          <MaterialTable
            data={cvs}
            title="Credit Vouchers"
            columns={
                [
                    { title: 'Receipt Number', field: 'recieptNumber'},
                    { title: 'Application Id', field: 'applicationId' },
                    { title: 'Customer Id', field: 'customerId' },
                    { title: 'Unit Name', field: 'unitName' },
                    { title: 'GST', field: 'gst' },
                    { title: 'Sub Total', field: 'subTotal' },
                    { title: 'Total', field: 'total' },
                    { title: 'Date', render: (rowData) => !rowData.date ? "" : rowData.date.substring(8,10)+"-"+rowData.date.substring(5,7)+"-"+rowData.date.substring(0,4), customSort: (a, b) => a.date < b.date ? -1 : 1  }, 
                    { title: 'Voucher Generated', render : (rowData) => rowData.voucherGenerated === true ? "Yes" : "No" },
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
        </>
    )
}

export default ViewCreditVouchers;