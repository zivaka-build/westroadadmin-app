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

function ViewLoanBank(){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);


    const handleClose = () => {
        setOpen(false);
    };

    const [open1, setOpen1] = React.useState(false);


    const handleClose1 = () => {
        setOpen1(false);
    };

    const [banks, setBanks] = useState([])

    function add() {
        navigate("/dashboard/addloanbank")
    }

    const [bname, setBname] = useState("")
    const [bcode, setBcode] = useState("")
    const [gi, setGi] = useState("")
    const [wi, setWi] = useState("")
    const [si, setSi] = useState("")


    const deleteBank = (e) => {
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.delete(`${BASE_URL}/api/v1/loan/deleteLoanBankByBankCode/${Cookies.get("BankCode")}`,{ headers : { 'Authorization' : Token }})
        .then(response => {
            setOpen(false)
            axios.get(`${BASE_URL}/api/v1/loan/getListOfLoanBank`,{ headers : { 'Authorization' : Token }})
            .then(response => {
            setBanks(response.data.loan.reverse())
            })
        })
    }

    function changeBankCode() {
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/loan/getLoanBankByBankCode/${Cookies.get("BankCode")}`,{ headers : { 'Authorization' : Token }})
        .then(response => {
            setBname(response.data.bankName)
            setBcode(response.data.bankCode)
            setGi(response.data.rateOfInterest)
            setWi(response.data.rateOfInterestWomen)
            setSi(response.data.rateOfInterestSenior)
        })
    }

    const save = (e) =>{
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios
            .put(`${BASE_URL}/api/v1/loan/updateLoanBank`,{bankCode: bcode, bankName: bname, rateOfInterest: gi, rateOfInterestWomen: wi, rateOfInterestSenior: si},{ headers : { 'Authorization' : Token }})
            .then(response => {
                if(response.status == 200) {
                    axios.get(`${BASE_URL}/api/v1/loan/getListOfLoanBank`,{ headers : { 'Authorization' : Token }})
                        .then(response => {
                        setBanks(response.data.loan.reverse()) 
                    })
                    setOpen1(false)
                }
               
            })
    }

    useEffect(() => { 
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/loan/getListOfLoanBank`,{ headers : { 'Authorization' : Token }})
        .then(response => {
            console.log(response)
            setBanks(response.data.loan.reverse())
        })

        

    }, [])
    return (
        <>
        <div className="container-fluid mt-4">
        <div className="col-12 mb-5 text-center">
        <button className="btn btn-secondary btn-user" onClick={add}>Add Loan Bank</button>
        </div>
        <MaterialTable
            data={banks}
            title="Loan Bank"
            columns={
                [
                    { title: 'Bank Name', field: 'bankName'},
                    { title: 'Bank Code', field: 'bankCode' },
                    { title: 'ROI', field: 'rateOfInterest' },
                    { title: 'ROI Women', field: 'rateOfInterestWomen'},
                    { title: 'ROI Senior Citizen', field: 'rateOfInterestSenior' },
                    
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
                    icon: 'edit',
                    tooltip: 'Edit',
                    onClick: (event, rowData) => {
                        setOpen1(true)
                        Cookies.set("BankCode", rowData.bankCode)
                        changeBankCode()
                    },
                },
                rowData => ({
                    icon: 'delete',
                    tooltip: 'Delete',
                    onClick: (event, rowData) => {
                    setOpen(true)
                    Cookies.set("BankCode", rowData.bankCode)
                    },
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
                <div className="row">
                    <p>Are you sure you want to delete ?</p>
                </div>
                <div className="row container-fluid justify-content-center">
                    <div className="col-4 text-right">
                        <button className="btn btn-secondary btn-user" style={{backgroundColor: "white", color: "black"}} onClick={()=> setOpen(false)}>No</button>

                    </div>
                    &nbsp;&nbsp;
                    <div className="col-4">
                        <button className="btn btn-secondary btn-user" onClick={deleteBank}>Yes</button>
                                                    
                    </div>
                </div>
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
                <div className="row">
                    <label>Bank Name</label>
                    <input
                    type="text"
                    class="form-control"
                    name="bankname"
                    id="bankname"
                    value={bname}
                    onChange={(e)=>setBname(e.target.value)} />
                </div>
                <br />
                <div className="row">
                    <label>Bank Code</label>
                    <input
                    type="text"
                    class="form-control"
                    name="bankcode"
                    id="bankcode"
                    value={bcode}
                    onChange={(e)=>setBcode(e.target.value)} />
                </div>
                <br />
                <div className="row">
                    <label>General Rate of Interest</label>
                    <input
                    type="number"
                    class="form-control"
                    name="gi"
                    id="gi"
                    value={gi}
                    onChange={(e)=>setGi(e.target.value)} />
                </div>
                <br />
                <div className="row">
                    <label>Rate of Interest for Women</label>
                    <input
                    type="number"
                    class="form-control"
                    name="wi"
                    id="wi"
                    value={wi}
                    onChange={(e)=>setWi(e.target.value)} />
                </div>
                <br />
                <div className="row">
                    <label>Rate of Interest for Senior Citizen</label>
                    <input
                    type="number"
                    class="form-control"
                    name="si"
                    id="si"
                    value={si}
                    onChange={(e)=>setSi(e.target.value)} />
                </div>
                <br />
                <div className="row container-fluid justify-content-center">
                    <div className="col-4 text-right">
                        <button className="btn btn-secondary btn-user" style={{backgroundColor: "white", color: "black"}} onClick={()=> setOpen1(false)}>Cancel</button>

                    </div>
                    &nbsp;&nbsp;
                    <div className="col-4">
                        <button className="btn btn-secondary btn-user" onClick={save}>Save</button>
                                                    
                    </div>
                </div>
            </div>
            </Fade>
      </Modal>
        </div>
        </>
    )
}

export default ViewLoanBank;