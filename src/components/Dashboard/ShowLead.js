import React, {useState, useEffect} from 'react'
import MaterialTable from "material-table";
import {ReactComponent as Edit} from "./../../assets/icons/Vector.svg"
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../config/url";
import { navigate } from "@reach/router";

const ShowLead = () => {
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        const Token = "bearer" + " " + Cookies.get("Token");
        axios.get(
          `${BASE_URL}/api/v1/lead/getAllLeads`,
          { headers: { Authorization: Token } }
        ).then((result) => {
          console.log(result.data);
          const arr = result.data
          const leads = arr.leads.map((lead)=>{
            const {leadID,name,phone,creationdate,leadWeightage,leadStatus} = lead
            const formattedDate = creationdate.substring(11,13)+":"+creationdate.substring(14,16)+", "+creationdate.substring(8,10)+"-"+creationdate.substring(5,7)+"-"+creationdate.substring(0,4)
            
    
            
            
           
            
            return {
                leadID,
                name,
                phone,
                creationdate: formattedDate,
                leadWeightage,
                leadStatus
                
              };
        })
        setLeads(leads)
      
     
          
        });
      }, []);

    return (
        <div>
            <center>
                <div className="col-lg-11">
                    <br />
                    <br />
                    <MaterialTable data={leads}

                        title="Leads"
                        columns={
                            [
                                { title: 'Lead Id', field: 'leadID' },
                                { title: 'Name', field: 'name' },
                                { title: 'Phone No', field: 'phone' },
                                { title: 'Created At', field: 'creationdate' },
                                { title: 'Lead Type', field: 'leadWeightage' },
                                { title: 'Lead Status', field: 'leadStatus' },
                                { title: 'Assigned To', field: 'assignedTo' },

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
                                icon: ()=> <Edit />,
                                tooltip: 'Edit Lead',
                                onClick: (event, rowData) => {
                                navigate(`/dashboard/individuallead/${rowData.leadID}`);
                                Cookies.set('ActiveKey','first')}
                            }

                        ]}></MaterialTable>
                </div>
            </center>
        </div>
    )
}

export default ShowLead







