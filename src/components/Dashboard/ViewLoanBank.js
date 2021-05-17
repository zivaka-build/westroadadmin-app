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

    const [banks, setBanks] = useState([])

    function add() {
        navigate("/dashboard/addloanbank")
    }

    const deleteBank = (e) => {
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.delete(`${BASE_URL}/api/v1/loan/deleteLoanBankByBankCode/${Cookies.get("BankCode")}`,{ headers : { 'Authorization' : Token }})
        .then(response => {
            setOpen(false)
            axios.get(`${BASE_URL}/api/v1/loan/getListOfLoanBank`,{ headers : { 'Authorization' : Token }})
            .then(response => {
            console.log(response)
            setBanks(response.data.loan.reverse())
            })
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
                    icon: 'remove_red_eye',
                    tooltip: 'View',
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
        </div>
        </>
    )
}

export default ViewLoanBank;