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
import {ReactComponent as Edit} from "./../../assets/icons/Vector.svg"
import {  navigate} from "@reach/router"

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
    
    const [ view, setView ] = useState("")
    const [ unitName, setUnitName] = useState("")
    const [ unitType, setUnitType] = useState("")
    const [ status, setStatus] = useState("")
    const [ unitFloor, setUnitFloor] = useState("")
    const [ unitPhase, setUnitPhase] = useState("")
    const [ onHold, setOnHold] = useState("")
    const [ usi,setUsi] = useState("")
    const [ upc,setUpc] = useState("")
    const [ siteData, setSiteData] = useState([])
    
   

    const reset = (e) => {
        setStatus("");
        setUsi("");
        setUpc("");
        
    }


    
    

    useEffect(() => {
       
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/site/getAllSiteNames`,{headers:{Authorization:Token}})
          .then(response => {
            
            setSiteData(response.data.siteMap)
          })
          
        
        if( usi === "" && upc === "" && status===""){
          axios.get(`${BASE_URL}/api/v1/unit/getlistofunit`,{headers:{Authorization:Token}})
          .then(response => {
            
            setForm(response.data)
          })
        }
        else if( usi !== "" && upc === "" && status==="")
        {
          axios.get(`${BASE_URL}/api/v1/unit/getlistofunit?unitSiteId=${usi}`,{headers:{Authorization:Token}})
          .then(response => {
            
            setForm(response.data)
          })
        }
        else if( usi !== "" && upc !== "" && status==="")
        {
          axios.get(`${BASE_URL}/api/v1/unit/getlistofunit?unitSiteId=${usi}&unitPhaseCode=${upc}`,{headers:{Authorization:Token}})
          .then(response => {
            
            setForm(response.data)
          })
        }
        else if( usi !== "" && upc !== "" && status !=="")
        {
          axios.get(`${BASE_URL}/api/v1/unit/getlistofunit?unitSiteId=${usi}&unitPhaseCode=${upc}&status=${status}`,{headers:{Authorization:Token}})
          .then(response => {
            console.log(response)
            setForm(response.data)
          })
        }

    },[status,usi,upc])

    return(
        <div className="row container-fluid px-0">
        <div className="col-12 mt-4">
        <MaterialTable
            data={form}
            title="Units"
            columns={
                [
                    { title: 'Status', field: 'status' },
                    { title: 'Unit Name', field: 'unitName' },
                    { title: 'Unit Type', field: 'unitTypeName' },
                    
                    { title: 'Unit Floor', field: 'unitFloor' },
                    { title: 'Unit Phase', field: 'unitPhaseName' },
                    { title: 'On Hold', field: 'unitOnHold' },
                    
                    
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
                    <InputLabel id="demo-simple-select-helper-label">Site Name</InputLabel>
                      <Select
                        value={usi}
                        onChange={(e)=>setUsi(e.target.value)}
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="" disabled>
                         Site Name
                        </MenuItem>
                        {siteData.map((t) => (
                            <MenuItem key={t.SiteId} value={t.SiteId}>{t.SiteName}</MenuItem>
                                        ))}

                      </Select>
                  
                    </FormControl>

                    <FormControl className={classes.formControl} style={{marginTop: "-65px"}}>
                    <InputLabel id="demo-simple-select-helper-label">Phase</InputLabel>
                      <Select
                        value={upc}
                        onChange={(e)=>setUpc(e.target.value)}
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                        disabled={usi===""?true:false}
                      >
                        <MenuItem value="all" disabled>
                          Phase
                        </MenuItem>
                        <MenuItem value="PI">Phase 1</MenuItem>
                        <MenuItem value="PII">Phase 2</MenuItem>
                        
                      </Select>
                    
                    </FormControl>

                    <FormControl className={classes.formControl} style={{marginTop: "-65px"}}>
                    <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                      <Select
                        value={status}
                        onChange={(e)=>setStatus(e.target.value)}
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                        disabled={upc===""?true:false}
                      >
                        <MenuItem value="all" disabled>
                          status
                        </MenuItem>
                        <MenuItem value="Available">Available</MenuItem>
                        <MenuItem value="onHold">On Hold</MenuItem>
                        <MenuItem value="Alloted">Alloted</MenuItem>
                        <MenuItem value="handOver">Hand Over</MenuItem>
                        <MenuItem value="saleAgreement ">Sale Agreement </MenuItem>
                        <MenuItem value="warranty">Maintainance</MenuItem>
                        <MenuItem value="closure">Closure</MenuItem>
                        
                        
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
            actions={[
              {
                  icon: 'remove_red_eye',
                  tooltip: 'View Unit',
                  onClick: (event, rowData) => {
                    Cookies.set('ActiveUnitKey', 'first')
                    navigate(`/dashboard/individualunit/${rowData.unitName}`)
                 }
              }

          ]}
    
           ></MaterialTable>
            
        </div>
        </div>
    );

}

export default ListofApplicationForm;