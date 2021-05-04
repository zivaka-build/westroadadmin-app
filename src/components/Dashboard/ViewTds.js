import React,{useState,useEffect} from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { BASE_URL } from "./../../config/url";
import Cookies from 'js-cookie';
import {GiGears} from 'react-icons/gi'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Form} from "react-bootstrap";


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
  }));
 
function ViewTds(){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);


    const handleClose = () => {
        setOpen(false);
    };

    const [open1, setOpen1] = React.useState(false);


    const handleClose1 = () => {
        setOpen1(false);
    };

    const [ tds, setTds ] = useState([])
    const [tid, setTid ] = useState("")
    const [ tmode, setTmode] = useState("")
    const [ bank, setBank] = useState("")
    const [ eName, setEName] = useState("")
    const [ ePan, setEPan] = useState("")

    const updateEntity = (e) => {
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios
            .put(`${BASE_URL}/api/v1/tds/updateentitydetails`,{TDSId: tid,entityName: eName, entityPAN: ePan},{ headers : { 'Authorization' : Token }})
            .then(response => {
                console.log(response)
                axios
            .get(`${BASE_URL}/api/v1/tds/getlistoftds`,{ headers : { 'Authorization' : Token }})
            .then(response=>{
                const tds = response.data.map((t)=>{
                    const {TDSId, TDSsection, entityType, entityName, entityPAN, taxSlab, TDSAmount, TDSBookingDate, TDSPaid, TDSPaidDate} = t
                    const formattedDate = TDSBookingDate.substring(8,10)+"-"+TDSBookingDate.substring(5,7)+"-"+TDSBookingDate.substring(0,4)
                    var formattedPaymentDate = ""
                    if(!TDSPaidDate){
                        formattedPaymentDate = ""
                    }
                    else if(TDSPaidDate) {
                        formattedPaymentDate = TDSPaidDate.substring(8,10)+"-"+TDSPaidDate.substring(5,7)+"-"+TDSPaidDate.substring(0,4)
                    }
                    return {
                        TDSId, 
                        TDSsection, 
                        entityType,
                        entityName,
                        entityPAN, 
                        taxSlab, 
                        TDSAmount, 
                        TDSBookingDate : formattedDate, 
                        TDSPaid,
                        TDSPaidDate : formattedPaymentDate
                        
                      };
                })
                setTds(tds.reverse());
                setOpen1(false);          
            })
            })

    }

    const process = (e) => {
        e.preventDefault();
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios
            .post(`${BASE_URL}/api/v1/tds/processtds`,{TDSId: tid,transactionMode: tmode,bankName: bank},{ headers : { 'Authorization' : Token }})
            .then(response => {
                console.log(response)
            })
    }

    useEffect(() => {
       
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios
            .get(`${BASE_URL}/api/v1/tds/getlistoftds`,{ headers : { 'Authorization' : Token }})
            .then(response=>{
                const tds = response.data.map((t)=>{
                    const {TDSId, TDSsection, entityType, entityName, entityPAN, taxSlab, TDSAmount, TDSBookingDate, TDSPaid,TDSPaidDate} = t
                    const formattedDate = TDSBookingDate.substring(8,10)+"-"+TDSBookingDate.substring(5,7)+"-"+TDSBookingDate.substring(0,4)
                    var formattedPaymentDate = ""
                    if(!TDSPaidDate){
                        formattedPaymentDate = ""
                    }
                    else if(TDSPaidDate) {
                        formattedPaymentDate = TDSPaidDate.substring(8,10)+"-"+TDSPaidDate.substring(5,7)+"-"+TDSPaidDate.substring(0,4)
                    }
                    var formattedPaid = ""
                    if(TDSPaid == false) {
                        formattedPaid = "No"
                    }
                    else if(TDSPaid == true) {
                        formattedPaid = "Yes"
                    }
                    return {
                        TDSId, 
                        TDSsection, 
                        entityType,
                        entityName,
                        entityPAN, 
                        taxSlab, 
                        TDSAmount, 
                        TDSBookingDate : formattedDate, 
                        TDSPaid : formattedPaid,
                        TDSPaidDate : formattedPaymentDate
                        
                      };
                })
                setTds(tds.reverse());          
            })
    }, [])

    return(
        <div className="row container-fluid px-0">
        <div className="col-12 mt-4">
        <MaterialTable
            data={tds}
            title="TDS Rates"
            columns={
                [
                    { title: 'TDS ID', field: 'TDSId' },
                    { title: 'TDS Section', field: 'TDSsection' },
                    { title: 'Entity Type', field: 'entityType' },
                    { title: 'Entity Name', field: 'entityName' },
                    { title: 'Entity Pan', field: 'entityPAN' },
                    { title: 'Tax Slab', field: 'taxSlab' },
                    { title: 'TDS Amount', field: 'TDSAmount' },
                    { title: 'Booking Date', field: 'TDSBookingDate' },
                    { title: 'TDS Paid', field: 'TDSPaid' },
                    { title: 'Payment Date', field: 'TDSPaidDate' },
                    
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
                    paddingLeft: '11px'
                
                }
            }}
            actions={[
                rowData => (
                {
                    icon: ()=> <GiGears />,
                    tooltip: 'Process TDS',
                    onClick: (event, rowData) => {
                    setOpen(true);
                    setTid(rowData.TDSId)},
                    disabled: rowData.entityPAN === null || rowData.TDSPaid === "Yes",
                }),
                rowData => ({
                    icon: 'edit',
                    tooltip: 'Update Entity',
                    onClick: (event, rowData) => {
                    setOpen1(true);
                    setEName(rowData.entityName);
                    setEPan(rowData.entityPAN);
                    setTid(rowData.TDSId);
                    },
                    disabled: rowData.TDSPaid === "Yes",
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
                <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Transaction Mode</Form.Label>
                <Form.Control as="select" onChange={(e)=>setTmode(e.target.value)}>
                <option>Select a Transaction Mode</option>   
                <option>NEFT</option>
                <option>RGTS</option>
                <option>IMPS</option>
                </Form.Control>
                </Form.Group>
        
                <label>Bank Name</label>
                <input
                type="text"
                class="form-control"
                name="bankname"
                id="bankname"
                onChange={(e)=>setBank(e.target.value)}
                />
                <br />
                <div className="text-center">
                <button className="btn btn-secondary btn-user" onClick={process}>
                Process
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-secondary btn-user" onClick={handleClose} style={{backgroundColor : "white", color : "black"}}>
                Cancel
                </button>
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
                <label>Entity Name</label>
                <input
                type="text"
                class="form-control"
                name="entityname"
                id="entityname"
                value={eName}
                onChange={(e)=>setEName(e.target.value)}
                />
                <br />

                <label>Entity PAN</label>
                <input
                type="text"
                class="form-control"
                name="entitypan"
                id="entitypan"
                value={ePan}
                onChange={(e)=>setEPan(e.target.value)}
                />
                <br />
                <div className="text-center">
                <button className="btn btn-secondary btn-user" onClick={updateEntity}>
                Save
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-secondary btn-user" onClick={handleClose1} style={{backgroundColor : "white", color : "black"}}>
                Cancel
                </button>
                </div>
            </div>
            </Fade>
      </Modal>
        </div>
        </div>
    );

}

export default ViewTds;