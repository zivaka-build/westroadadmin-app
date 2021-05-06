import React,{useState,useEffect} from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { BASE_URL } from "./../../config/url";
import Cookies from 'js-cookie';

function ViewTdsRates(){
    const [ rates, setRates ] = useState([])

    useEffect(() => {
       
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios
            .get(`${BASE_URL}/api/v1/tdsrates/gettdsrates`,{ headers : { 'Authorization' : Token }})
            .then(response=>{
                setRates(response.data.reverse());          
            })
    }, [])

    return(
        <>
        <div className="container-fluid mt-5">
        <MaterialTable
            data={rates}
            title="TDS Rates"
            columns={
                [
                    { title: 'TDS Section', field: 'TDSsection' },
                    { title: 'Entity Type', field: 'entityType' },
                    { title: 'Description', field: 'description' },
                    { title: 'Tax Slab', field: 'taxSlab' },
            
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

export default ViewTdsRates;