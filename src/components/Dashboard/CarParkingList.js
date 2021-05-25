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
 
function CarParkingList(){
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
    const [ ptc, setPtc] = useState("")
    const [ stat, setStat] = useState([])
    const [ ptca, setPtca] = useState([])
    
   

    const reset = (e) => {
        setStatus("");
        setPtc("");
        
        
    }


    
    

    useEffect(() => {
       
        const Token = 'bearer' + " " + Cookies.get('Token')
        if(status==="" && ptc === ""){
            axios.get(`${BASE_URL}/api/v1/parking/getListOfCarParking`,{headers:{Authorization:Token}})
          .then(response => {
            
            setForm(response.data)
          })
        }
        else if(status !=="" && ptc === ""){
            axios.get(`${BASE_URL}/api/v1/parking/getListOfCarParking?status=${status}`,{headers:{Authorization:Token}})
          .then(response => {
            if(response.data.message == "no parking found")
            {
              setForm([])
            }
            else{
              setForm(response.data)
            }
          })
        }
        else if(status ==="" && ptc !== ""){
            axios.get(`${BASE_URL}/api/v1/parking/getListOfCarParking?parkingTypeCode=${ptc}`,{headers:{Authorization:Token}})
          .then(response => {
            if(response.data.message == "no parking found")
            {
              setForm([])
            }
            else{
              setForm(response.data)
            }
            
          })
        }
        else if(ptc!=="" && status!==""){
          axios.get(`${BASE_URL}/api/v1/parking/getListOfCarParking?parkingTypeCode=${ptc}&status=${status}`,{headers:{Authorization:Token}})
        .then(response => {
          if(response.data.message == "no parking found")
          {
            setForm([])
          }
          else{
            setForm(response.data)
          }
        })
      }
        
          
          
        
    },[status,ptc])

    return(
        <div className="row container-fluid px-0">
        <div className="col-12 mt-4">
        <MaterialTable
            data={form}
            title="Car Parkings"
            columns={
                [
                    { title: 'Car Parking Name', field: 'carParkingName' },
                    { title: 'Phase Name', field: 'phaseCode' },
                    { title: 'Parking Type', field: 'parkingType' },
                    { title: 'Status', field: 'status' },
                    
                    
                    
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
                    <InputLabel id="demo-simple-select-helper-label">Parking Type</InputLabel>
                      <Select
                        value={ptc}
                        onChange={(e)=>setPtc(e.target.value)}
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="" disabled>
                         Parking type
                        </MenuItem>
                        <MenuItem value="GB" >
                        Ground Basement
                        </MenuItem><MenuItem value="GC" >
                        Ground Covered
                        </MenuItem><MenuItem value="OP" >
                        Open Parking
                        </MenuItem>
                       

                      </Select>
                  
                    </FormControl>

                    <FormControl className={classes.formControl} style={{marginTop: "-65px"}}>
                    <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                      <Select
                        value={status}
                        onChange={(e)=>setStatus(e.target.value)}
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                        
                      >
                        <MenuItem value="all" disabled>
                          Phase
                        </MenuItem>
                        <MenuItem value="Available" >
                        Available
                        </MenuItem><MenuItem value="OnHold" >
                        On Hold
                        </MenuItem><MenuItem value="Alloted" >
                        Alloted
                        </MenuItem>

                        
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
    );

}

export default CarParkingList;