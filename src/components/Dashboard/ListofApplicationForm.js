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
 
function ListofApplicationForm(){
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
    
    const [ appid, setAppid ] = useState("")
    const [ unitName, setUnitName] = useState("")
    const [ carPark, setCarPark] = useState("")
    const [ status, setStatus] = useState("")
    const [ bookingBy, setBookingBy] = useState("")
    const [ isBankLoan, setIsBankLoan] = useState("")
    const [ siteName, setSiteName] = useState([])
    const [ snf,setSnf] = useState("")
    
   

    const reset = (e) => {
        setStatus("");
        setSnf("");
        
    }


    
    

    useEffect(() => {
       
        const Token = 'bearer' + " " + Cookies.get('Token')

        axios.get(`${BASE_URL}/api/v1/site/getAllSiteNames`,{headers:{Authorization:Token}})
        .then(response =>{
          
          setSiteName(response.data.siteMap)
        })

        if(status==="" && snf ===""){
          axios.get(`${BASE_URL}/api/v1/applicationform/getlistofapplicationform`,{headers:{Authorization:Token}})
          .then(response =>{
            console.log(response.data)
            setForm(response.data)
          })
        }
        else if(status==="" && snf!==""){
          axios.get(`${BASE_URL}/api/v1/applicationform/getlistofapplicationform?siteId=${snf}`,{headers:{Authorization:Token}})
          .then(response =>{
            console.log(response.data)
            setForm(response.data)
          })
        }
        else if(status==!"" && snf==""){
          axios.get(`${BASE_URL}/api/v1/applicationform/getlistofapplicationform?status=${status}`,{headers:{Authorization:Token}})
          .then(response =>{
            console.log(response.data)
            setForm(response.data)
          })
        }
        else if(status!=="" && snf!==""){
          axios.get(`${BASE_URL}/api/v1/applicationform/getlistofapplicationform?siteId=${snf}&status=${status}`,{headers:{Authorization:Token}})
          .then(response =>{
            console.log(response.data)
            setForm(response.data)
          })
        }
        

    },[status,snf])

    return(
        <div className="row container-fluid px-0">
        <div className="col-12 mt-4">
        <MaterialTable
            data={form}
            title="Application Forms"
            columns={
                [
                    { title: 'Application Id', field: 'applicationId' },
                    { title: 'Unit Name', field: 'unitName' },
                    { title: 'Car Parking Name', field: 'carParkingName' },
                    { title: 'Status', field: 'status' },
                    { title: 'Booking By', field: 'bookingBy' },
                    { title: 'Bank Loan', field: 'isBankLoan' },
                    
                    
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
                    <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                      <Select
                        value={status}
                        onChange={(e)=>setStatus(e.target.value)}
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="all" >
                          All
                        </MenuItem>
                        <MenuItem value="initiated">Booking Initiated</MenuItem>
                        <MenuItem value="form_generated">Form Generated</MenuItem>
                        <MenuItem value="amount_received">Booking Amount Recieved</MenuItem>
                        <MenuItem value="prov_ltr_generated">Provisional Letter Generated</MenuItem>
                        <MenuItem value="appointment">Agreement Appointment</MenuItem>
                        <MenuItem value="signed">Sales Agreement Signed</MenuItem>
                      </Select>
                    
                    </FormControl>
  
                   
                    <FormControl className={classes.formControl} style={{marginTop: "-65px"}}>
                    <InputLabel id="demo-simple-select-helper-label">Site Name</InputLabel>
                      <Select
                        value={snf}
                        onChange={(e)=>setSnf(e.target.value)}
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="" disabled>
                         Site Name
                        </MenuItem>
                        {siteName.map((t) => (
                            <MenuItem key={t.SiteId} value={t.SiteId}>{t.SiteName}</MenuItem>
                                        ))}

                      </Select>
                  
                    </FormControl>
                    <FormControl className={classes.formControl} style={{marginTop: "-50px"}}>
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
            // actions={[
            //     rowData => (
            //     {
            //         icon: ()=> <GiGears />,
            //         tooltip: 'Process TDS',
            //         onClick: (event, rowData) => {
            //         setOpen(true);
            //         setTid(rowData.TDSId)},
            //         disabled: rowData.entityPAN === null || rowData.TDSPaid === "Yes",
            //     }),
            //     rowData => ({
            //         icon: 'edit',
            //         tooltip: 'Update Entity',
            //         onClick: (event, rowData) => {
            //         setOpen1(true);
            //         setEName(rowData.entityName);
            //         setEPan(rowData.entityPAN);
            //         setTid(rowData.TDSId);
            //         },
            //         disabled: rowData.TDSPaid === "Yes",
            //     })


            // ]}
    
           ></MaterialTable>
            
        </div>
        </div>
    );

}

export default ListofApplicationForm;