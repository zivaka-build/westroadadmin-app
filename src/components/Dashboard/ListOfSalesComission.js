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

    const [incentiveId, setIncentiveId] = useState("")
    const [brokerCompany, setBrokerCompany] = useState("")
    const [brokerName, setBrokerName] = useState("")
    const [brokerRERA, setBrokerRERA] = useState("")
    const [brokerPAN, setBrokerPAN] = useState("")
    const [brokerAddress, setBrokerAddress] = useState("")
    const [amount, setAmount] = useState("")
    const [paid, setPaid] = useState(false)
    const [sts, setSts] = useState(false)

    useEffect(() => { 
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/salesCommission/getListOfSalesCommissions`,{ headers : { 'Authorization' : Token }})
        .then(response => {
            console.log(response)
            setSales(response.data.salesIncentive)
        })

    }, [])

    const save = (e) => {
        e.preventDefault()
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.put(`${BASE_URL}/api/v1/salesCommission/updateSalesCommision`,
        {
            incentiveId: incentiveId,
            brokerCompany: brokerCompany,
            brokerName: brokerName,
            brokerPAN: brokerPAN,
            brokerRERA: brokerRERA,
            brokerAddress: brokerAddress,
            paymentAmount: amount,
            isPaid: paid,
            settledToSalary: sts,
        },
        { headers : { 'Authorization' : Token }})
        .then(response => {
            axios.get(`${BASE_URL}/api/v1/salesCommission/getListOfSalesCommissions`,{ headers : { 'Authorization' : Token }})
            .then(response => {
            setSales(response.data.salesIncentive)
            setOpen(false)
        })
        })
    }

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
                       setIncentiveId(rowData.incentiveId);
                       setBrokerCompany(rowData.brokerCompany);
                       setBrokerName(rowData.brokerName);
                       setBrokerRERA(rowData.brokerRERA);
                       setBrokerPAN(rowData.brokerPAN);
                       setBrokerAddress(rowData.brokerAddress);
                       setAmount(rowData.paymentAmount);
                       setPaid(rowData.isPaid)
                       setSts(rowData.settledToSalary)
                       setOpen(true)
                    },
                }

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
                            <div className="row justify-content-center">
                                  <div className="col-6">
                                    <label>Incentive ID</label>
                                    <input 
                                    type="text"
                                    class="form-control"
                                    name="incentiveId"
                                    value={incentiveId}
                                    />
                                  </div>
                                  <div className="col-6">
                                    <label>Amount</label>
                                    <input 
                                    type="number"
                                    class="form-control"
                                    name="amount"
                                    value={amount}
                                    onChange={(e)=>setAmount(e.target.value)}
                                    />
                                  </div>
                              </div>
                              <div className="row mt-2 justify-content-center">
                                  <div className="col-6">
                                    <label>Broker Name</label>
                                    <input 
                                    type="text"
                                    class="form-control"
                                    name="brokerName"
                                    value={brokerName}
                                    onChange={(e)=>setBrokerName(e.target.value)}
                                    />
                                  </div>
                                  <div className="col-6">
                                    <label>Broker Company</label>
                                    <input 
                                    type="text"
                                    class="form-control"
                                    name="brokerCompany"
                                    value={brokerCompany}
                                    onChange={(e)=>setBrokerCompany(e.target.value)}
                                    />
                                  </div>
                              </div>
                              <div className="row mt-2 justify-content-center">
                                  <div className="col-6">
                                    <label>Broker PAN</label>
                                    <input 
                                    type="text"
                                    class="form-control"
                                    name="brokerPAN"
                                    value={brokerPAN}
                                    onChange={(e)=>setBrokerPAN(e.target.value)}
                                    />
                                  </div>
                                  <div className="col-6">
                                    <label>Broker RERA</label>
                                    <input 
                                    type="text"
                                    class="form-control"
                                    name="brokerRERA"
                                    value={brokerRERA}
                                    onChange={(e)=>setBrokerRERA(e.target.value)}
                                    />
                                  </div>
                              </div>
                              <div className="row mt-2 justify-content-center">
                                  <div className="col-12">
                                    <label>Broker Address</label>
                                    <input 
                                    type="text"
                                    class="form-control"
                                    name="brokerAddress"
                                    value={brokerAddress}
                                    onChange={(e)=>setBrokerAddress(e.target.value)}
                                    />
                                  </div>
                              </div>
                              <div className="row mt-2 justify-content-center">
                                  <div className="col-6">
                                  <Form.Group controlId="paid">
                                    <Form.Label>Paid</Form.Label>
                                    <Form.Control  as="select" value={paid} onChange={(e)=> setPaid(e.target.value)}>
                                    <option>Select an option</option>
                                    <option value={true}>Yes</option>    
                                    <option value={false}>No</option> 
                                    </Form.Control>
                                  </Form.Group>
                                  </div>
                                  <div className="col-6">
                                  <Form.Group controlId="sts" >
                                    <Form.Label>Settled To Salary</Form.Label>
                                    <Form.Control  as="select" value={sts} onChange={(e)=> setSts(e.target.value)}>
                                    <option>Select an option</option>
                                    <option value={true}>Yes</option>    
                                    <option value={false}>No</option> 
                                    </Form.Control>
                                  </Form.Group>
                                  </div>
                              </div>
                              <br />
                              <div className="text-center">
                              <button className="btn btn-secondary btn-user" onClick={save}>
                              Save
                              </button>
                              &nbsp;&nbsp;
                              <button className="btn btn-secondary btn-user" onClick={handleClose} style={{backgroundColor : "white", color : "black"}}>
                              Cancel
                              </button>
                              </div>
                            </div>
                            
                            </Fade>
                    </Modal>
        </>
    )
}

export default ListOfSalesComission;