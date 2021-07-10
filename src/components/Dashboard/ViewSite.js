import React,{useState,useEffect} from "react";
import axios from "axios";
import { BASE_URL } from "./../../config/url";
import Cookies from 'js-cookie';
import MaterialTable, { MTableToolbar } from "material-table";
import { navigate } from "@reach/router";
import {IoMdArrowBack} from 'react-icons/io'


function ViewSite(){

    const [ site, setSite ] = useState([])

    useEffect(() => { 
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/site/getAllSites`,{ headers : { 'Authorization' : Token }})
        .then(response => {
            console.log(response)
            const sites = response.data.siteArray.map((site)=>{
                const {siteId, siteName, siteHIRANo,siteActive, siteAddress } = site
                var modifiedActive = ""
                if(siteActive == true){
                    modifiedActive = "Yes"
                }
                else if(siteActive == false){
                    modifiedActive = "No"
                }

                var modifiedAddress = siteAddress.fullAddress+", "+siteAddress. landmark+", "+siteAddress.city+"-"+siteAddress.pinCode+", "+siteAddress.state
                
                return {
                    siteId, 
                    siteName, 
                    siteHIRANo,
                    siteActive: modifiedActive,
                    siteAddress: modifiedAddress,
                    
                  };
            })
            setSite(sites)
        })
    }, [])

    return(
        <>
        <div className="mt-3 row container-fluid justify-content-center">
            <div className="col-12">
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={()=> navigate("/dashboard/home")}><IoMdArrowBack />Back</button>
        </div>
        </div>
        <div className="container-fluid mt-4">
        
        <MaterialTable
            data={site}
            title="Sites"
            columns={
                [
                    { title: 'Site ID', field: 'siteId'},
                    { title: 'Site Name ', field: 'siteName' },
                    { title: 'HIRA ID ', field: 'siteHIRANo' },
                    { title: 'Full Address', field: 'siteAddress', cellStyle: {
                        width: 350,
                        minWidth: 350
                        },
                        headerStyle: {
                        width: 350,
                        minWidth: 350
                        } },
                    { title: 'Site Active', field: 'siteActive' },
                    
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
                    tooltip: 'View Site',
                    onClick: (event, rowData) => {
                        navigate(`/dashboard/individualsite/${rowData.siteId}`);
                        Cookies.set('ActiveKeySite', 'first')
                    }
                }

            ]}
            
           ></MaterialTable>
        </div>

        </>
    );

}

export default ViewSite;