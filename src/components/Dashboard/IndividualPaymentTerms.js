import React, {useState, useEffect} from "react"
import { useParams , navigate} from "@reach/router"
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Form, useAccordionToggle } from "react-bootstrap";
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";
import {IoMdArrowBack} from 'react-icons/io'
import Switch from '@material-ui/core/Switch';

function IndividualPaymentTerms(){
    const {termId} = useParams()
    const [pterms, setPterms] = useState([])

    const [ bool, setBool] = useState(false)
    
    const handleChange = (event) => {
        if(bool === false) {
            setBool(true)
        }
        else if(bool === true){
            setBool(false)
        }
    };

    console.log(bool)

    useEffect(() => { 
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/paymentTerms/getPaymentTermsById/${termId}`,{headers:{Authorization:Token}})
        .then(response => {
            console.log(response)
            setPterms(response.data.paymentTerms.termItems)
        })
    }, [])

    return(
        <>
       <div className="mt-2 row justify-content-center">
            <div className="col-12">
            <h4>Payment Term - {termId} </h4> 
            <br />
            <table class="table">
                <thead style={{backgroundColor : "#EE4B46", color : "#fff"}}>
                    <tr>
                    <th scope="col">Sl. No.</th>
                    <th scope="col">Description</th>
                    <th scope="col">Percentage</th>
                    <th scope="col">Completion Status</th>
                    <th scope="col">Milestone Completion Date</th>
                    <th scope="col">Completion Marked By</th>
                    <th scope="col">Action</th>
                    <th scope="col">Completion Picture</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {pterms.map((p)=>(
                        <tr>
                        <td>{p.serial}</td>
                        <td>{p.description}</td>
                        <td>{p.percentage}</td>
                        <td>{p.completionStatus === true ? "Yes": "No"}</td>
                        <td>{p.milestoneCompletionDate !== null? p.milestoneCompletionDate.substring(8,10)+"-"+p.milestoneCompletionDate.substring(5,7)+"-"+p.milestoneCompletionDate.substring(0,4) : null}</td>
                        <td>{p.completionMarkedBy}</td>
                        <td><Switch
                            checked={p.completionStatus}
                            onChange={handleChange}
                            name="bool"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        /></td>
                        <td></td>
                        
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            </div>
        </div>
        </>
    )
}

export default IndividualPaymentTerms;