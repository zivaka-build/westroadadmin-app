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

function ViewPaymentTerms(){

    const [paymentTerms, setPaymentTerms] = useState([])

    useEffect(() => { 
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/paymentterms/getListOfPaymentTerms`,{ headers : { 'Authorization' : Token }})
        .then(response => {
            console.log(response)
            setPaymentTerms(response.data.paymentTerms)
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
            data={paymentTerms}
            title="Payment Terms"
            columns={
                [
                    { title: 'Site Name', field: 'siteName'},
                    { title: 'Phase Code', field: 'phaseCode' },
                    { title: 'Term Id', field: 'paymentTermsId' },
                    { title: 'Updated At', render : (rowData) => rowData.updatedAt.substring(8,10)+"-"+rowData.updatedAt.substring(5,7)+"-"+rowData.updatedAt.substring(0,4) , customSort : (a,b) => a.updatedAt < b.updatedAt ? -1 : 1},
                    
                    
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
                    icon: 'remove_red_eye',
                    tooltip: 'View Payment Term',
                    onClick: (event, rowData) => {
                      navigate(`/dashboard/individualpaymentterm/${rowData.paymentTermsId}`)
                    },
                }

            ]}
            
           ></MaterialTable>
        </>
    )
}

export default ViewPaymentTerms;