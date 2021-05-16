import React,{useState,useEffect} from "react";
import axios from "axios";
import { BASE_URL } from "./../../config/url";
import Cookies from 'js-cookie';
import MaterialTable, { MTableToolbar } from "material-table";
import { navigate } from "@reach/router";

function ViewLoanBank(){
    const [banks, setBanks] = useState([])

    function add() {
        navigate("/dashboard/addloanbank")
    }
    useEffect(() => { 
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/loan/getListOfLoanBank`,{ headers : { 'Authorization' : Token }})
        .then(response => {
            console.log(response)
            setBanks(response.data.loan)
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
                }

            ]}
            
           ></MaterialTable>
        </div>
        </>
    )
}

export default ViewLoanBank;