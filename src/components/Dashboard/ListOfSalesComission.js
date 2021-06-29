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

function ListOfSalesComission(){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const [sales, setSales] = useState([])

    useEffect(() => { 
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/salesCommission/getListOfSalesCommissions`,{ headers : { 'Authorization' : Token }})
        .then(response => {
            console.log(response)
            setSales(response.data.salesIncentive)
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
            data={sales}
            title="Sales Comission"
            columns={
                [
                    { title: 'Incentive Id', field: 'incentiveId'},
                    { title: 'Broker Name', field: 'brokerName' },
                    { title: 'PAN', field: 'brokerPAN'},
                    { title: 'RERA', field: 'brokerRERA' },
                    { title: 'Company', field: 'brokerCompany'},
                    { title: 'Amount', field: 'paymentAmount'},
                    { title: 'Payment Date', render: (rowData) => !rowData.paymentDate ? "" : rowData.paymentDate.substring(8,10)+"-"+rowData.paymentDate.substring(5,7)+"-"+rowData.paymentDate.substring(0,4), customSort: (a, b) => a.paymentDate < b.paymentDate ? -1 : 1  },
                    { title: 'Paid', render: (rowData) => rowData.isPaid === true ? "Yes":"No"},
                    { title: 'Settled To Salary', render: (rowData) => rowData.settledToSalary === true ? "Yes":"No"},
                    
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
                    tooltip: 'Edit Sales Comission',
                    onClick: (event, rowData) => {
                       
                    },
                }

            ]}
            
           ></MaterialTable>
        </>
    )
}

export default ListOfSalesComission;