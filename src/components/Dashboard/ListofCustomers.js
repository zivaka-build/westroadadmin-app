import React,{useState,useEffect} from "react";
import axios from "axios";
import { BASE_URL } from "./../../config/url";
import Cookies from 'js-cookie';
import {ReactComponent as Edit} from "./../../assets/icons/Vector.svg"
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar } from "material-table";
import { navigate } from "@reach/router";
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

function ListofCustomers(){
    const classes = useStyles();
    const [cust, setCust] = useState([])
    const [active, setActive] = useState("")
    const [site, setSite] = useState("")
    const [sites, setSites] = useState([])

    const reset = (e) => {
        setActive("");
        setSite("")
    }

    useEffect(() => {
       
        const Token = 'bearer' + " " + Cookies.get('Token')
        
        axios.get(`${BASE_URL}/api/v1/site/getAllSiteNames`,{headers:{'Authorization':Token}})
        .then(response=>{
            setSites(response.data.siteMap)
        })

        if(active === "" && site === ""){
        axios.get(`${BASE_URL}/api/v1/customer/getlistofcustomers`,{headers:{Authorization:Token}})
        .then(response => {
          console.log(response)
          setCust(response.data)
        })
    }
    else if(active === "" && site !== ""){
        axios.get(`${BASE_URL}/api/v1/customer/getlistofcustomers?siteCode=${site}`,{headers:{Authorization:Token}})
        .then(response => {
          console.log(response)
          setCust(response.data)
        })
    }

    else if(active !== "" && site === ""){
        axios.get(`${BASE_URL}/api/v1/customer/getlistofcustomers?isActive=${active}`,{headers:{Authorization:Token}})
        .then(response => {
          console.log(response)
          setCust(response.data)
        })
    }

    else if(active !== "" && site !== ""){
        axios.get(`${BASE_URL}/api/v1/customer/getlistofcustomers?siteCode=${site}&isActive=${active}`,{headers:{Authorization:Token}})
        .then(response => {
          console.log(response)
          setCust(response.data)
        })
    }
     
    },[active , site])

    return(
        <>
        <div className="row container-fluid px-0">
        <div className="col-12 mt-4">
        <MaterialTable
            data={cust}
            title="Customers"
            columns={
                [
                    { title: 'Customer ID', field: 'customerId' },
                    { title: 'Customer Name', render: (rowData) => rowData.custFirstName + " " + rowData.custLastName },
                    { title: 'Mobile', field: 'custRegMobile' },
                    { title: 'Whatsapp', field: 'custRegWhatsapp' },
                    { title: 'Email', field: 'custRegEmail' },
                    //{ title: 'Application ID', field: 'applicationId' },
                    { title: 'Active', render: (rowData) => rowData.isActive === true ? "Yes" : "No" },
                  
                    
                    
                    
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
                    <InputLabel id="demo-simple-select-helper-label">Active</InputLabel>
                      <Select
                        value={active}
                        onChange={(e)=>setActive(e.target.value)}
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="" disabled>
                        Active
                        </MenuItem>
                        <MenuItem value={true} >
                        Yes
                        </MenuItem><MenuItem value={false} >
                        No
                        </MenuItem>
                      </Select>
                  
                    </FormControl>

                    <FormControl className={classes.formControl} style={{marginTop: "-65px"}}>
                    <InputLabel id="demo-simple-select-helper-label">Site</InputLabel>
                      <Select
                        value={site}
                        onChange={(e)=>setSite(e.target.value)}
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                        
                      >
                        <MenuItem value="all" disabled>
                         Site
                        </MenuItem>
                        <MenuItem value="WH">
                         Westroad Heights
                        </MenuItem>
                        {/*{ 
                        sites.map((s)=> (
                        <MenuItem value={s.SiteId} >
                        {s.SiteName}
                        </MenuItem>
                        ))
                        }*/}
                        
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
                    icon: ()=> <Edit />,
                    tooltip: 'Edit Customer',
                    onClick: (event, rowData) => {
                      Cookies.set('ActiveCustKey', 'first')
                      Cookies.set('CustomerId', rowData.customerId)
                      navigate("/dashboard/individualcustomer")
                    }
                }

            ]}
            
           ></MaterialTable>
            
        </div>
        </div>
        </>
    )
}

export default ListofCustomers; 