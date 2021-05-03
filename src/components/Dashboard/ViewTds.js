import React,{useState,useEffect} from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { BASE_URL } from "./../../config/url";
import Cookies from 'js-cookie';

function ViewTds(){
    const [ tds, setTds ] = useState([])

    useEffect(() => {
       
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios
            .get(`${BASE_URL}/api/v1/tds/getlistoftds`,{ headers : { 'Authorization' : Token }})
            .then(response=>{
                const tds = response.data.map((t)=>{
                    const {TDSId, TDSsection, entityType, entityName, entityPAN, taxSlab, TDSAmount, TDSBookingDate, TDSPaid} = t
                    const formattedDate = TDSBookingDate.substring(8,10)+"-"+TDSBookingDate.substring(5,7)+"-"+TDSBookingDate.substring(0,4)
  
                    return {
                        TDSId, 
                        TDSsection, 
                        entityType,
                        entityName,
                        entityPAN, 
                        taxSlab, 
                        TDSAmount, 
                        TDSBookingDate : formattedDate, 
                        TDSPaid
                        
                      };
                })
                setTds(tds.reverse());          
            })
    }, [])

    return(
        <>
        <div className="container-fluid mt-5">
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
                    { title: 'TDS Booking Date', field: 'TDSBookingDate' },
                    { title: 'TDS Paid', field: 'TDSPaid' },
            
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
           ></MaterialTable>
        </div>
        </>
    );

}

export default ViewTds;