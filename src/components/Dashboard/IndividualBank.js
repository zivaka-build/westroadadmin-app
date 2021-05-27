import React, {useState, useEffect} from "react"
import { useParams , navigate} from "@reach/router"
import { Form } from "react-bootstrap";
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";
import {IoMdArrowBack} from 'react-icons/io'

function IndividualLoanBank() {
    const {bankCode} = useParams()
    const [bname, setBname] = useState("")
    const [bcode, setBcode] = useState("")
    const [gi, setGi] = useState("")
    const [wi, setWi] = useState("")
    const [si, setSi] = useState("")
    const [agent, setAgent] = useState([
        {name: "", contactNumber: "", whatsappNumber: "", emailId: ""}
    ])

console.log(agent)

    const handleAG = (e) => {
        const values = [...agent];
        values.push({name: "", contactNumber: "", whatsappNumber: "", emailId: ""})
        setAgent(values)
       
    }

    const deleteAG = (e) => {
        const values = [...agent];
        values.pop()
        setAgent(values)
    }

    const handleAGChange = (index, event) => {
        const values = [...agent];
        if (event.target.name === "name") {
            values[index].name = event.target.value;
        }
        else if (event.target.name === "phone") {
            values[index].contactNumber = event.target.value;
        }
        else if (event.target.name === "whatsapp") {
            values[index].whatsappNumber = event.target.value;
        }
        else if (event.target.name === "email") {
            values[index].emailId = event.target.value;
        }
        setAgent(values);
    }

    const reset = (e) => {
        window.location.reload()
    }

    const back = (e) => {
        navigate("/dashboard/listofbanks")
    }

    useEffect(() => { 
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/loan/getLoanBankByBankCode/${bankCode}`,{ headers : { 'Authorization' : Token }})
        .then(response => {
            console.log(response)
            setBname(response.data.bankName)
            setBcode(response.data.bankCode)
            setGi(response.data.rateOfInterest)
            setWi(response.data.rateOfInterestWomen)
            setSi(response.data.rateOfInterestSenior)
            setAgent(response.data.agent)
        })
    }, [])


    const submit = (e) => {
        const Token = 'bearer' + " " + Cookies.get('Token')
        e.preventDefault()
        axios
            .put(`${BASE_URL}/api/v1/loan/updateLoanBank`,{bankCode: bcode, bankName: bname, rateOfInterest: gi, rateOfInterestWomen: wi, rateOfInterestSenior: si, agent: agent},{ headers : { 'Authorization' : Token }})
            .then(response => {
                console.log(response)
                var saved = document.getElementById('saved')
                saved.classList.remove('d-none');
            })
    }
    return(
        <>
        <div className="mt-3 row container-fluid justify-content-center px-2">
            <div className="col-12">
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={back}><IoMdArrowBack />Back</button>
            </div>
        </div>
        <br />
        <div className="tab-card pt-4 pb-4">
        <div className="row justify-content-center">
        <div className="col-lg-12 col-sm-12">
            <h5 className="pl-4">Bank Details</h5>
        </div>
        </div>
        <div className="row mt-3 container-fluid justify-content-center">
            <div className="col-lg-4 col-sm-12">
                <label>Bank Name</label>
                <input
                type="text"
                class="form-control"
                name="bankname"
                id="bankname"
                value={bname}
                onChange={(e)=>setBname(e.target.value)}
            />
            </div>
            <div className="col-lg-4 col-sm-12">
                <label>Bank Code</label>
                <input
                type="text"
                class="form-control"
                name="bankcode"
                id="bankcode"
                value={bcode}
                onChange={(e)=>setBcode(e.target.value)}
            />
            </div>
        </div>
        <div className="row mt-3 container-fluid justify-content-center">
            <div className="col-lg-4 col-sm-12">
                <label>General Rate of Interest</label>
                <input
                type="number"
                class="form-control"
                name="gi"
                id="gi"
                value={gi}
                onChange={(e)=>setGi(e.target.value)}
            />
            </div>
            <div className="col-lg-4 col-sm-12">
                <label>Rate of Interest for Women</label>
                <input
                type="number"
                class="form-control"
                name="wi"
                id="wi"
                value={wi}
                onChange={(e)=>setWi(e.target.value)}
            />
            </div>
            <div className="col-lg-4 col-sm-12">
                <label>Rate of Interest for Senior Citizen</label>
                <input
                type="number"
                class="form-control"
                name="si"
                id="si"
                value={si}
                onChange={(e)=>setSi(e.target.value)}
            />
            </div>

        </div>
        </div>
        <br />
        <div className="tab-card pt-4 pb-4">
        <div className="row justify-content-center">
        <div className="col-lg-12 col-sm-12">
            <h5 className="pl-4">Agents</h5>
            <br />
        { 
                agent.map((agent,index)=> {
                    return(
                        <div className="row pl-4 mb-2">
                        <div className="col-9">
                            <div className="row">
                                <div className="col-3">
                                <label>Name</label>
                                <input
                                type="text"
                                class="form-control"
                                name="name"
                                id="name"
                                value={agent.name}
                                onChange={(event) => handleAGChange(index, event)}
                                />
                                </div>
                                <div className="col-3">
                                <label>Phone No.</label>
                                <input
                                type="number"
                                class="form-control"
                                name="phone"
                                id="phone"
                                value={agent.contactNumber}
                                onChange={(event) => handleAGChange(index, event)}
                                />
                                </div>
                                <div className="col-3">
                                <label>Whatsapp</label>
                                <input
                                type="number"
                                class="form-control"
                                name="whatsapp"
                                id="whatsapp"
                                value={agent.whatsappNumber}
                                onChange={(event) => handleAGChange(index, event)}
                                />
                                </div>
                                <div className="col-3">
                                <label>Email</label>
                                <input
                                type="email"
                                class="form-control"
                                name="email"
                                id="email"
                                value={agent.emailId}
                                onChange={(event) => handleAGChange(index, event)}
                                />
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <button className="add-btn mt-4" onClick={()=>handleAG()} >Add Row</button>
                            &nbsp;&nbsp;
                            <button className="add-btn mt-4" onClick={()=>deleteAG()} style={{display : index === 0 ? "none": "inline-block"}}>Delete</button>
                        </div>
                        </div>
                    )
                })
            }
        </div>
        </div>
        <br />
        <div className="text-center pr-4 d-none" id="saved"><em>All details saved succesfully!</em></div>
        <div className="row mt-4 container-fluid justify-content-center">
        <div className="col-4 text-right">
            <button className="btn btn-secondary btn-user" type="reset" onClick={reset}style={{backgroundColor: "white", color: "black"}}>Reset</button>

        </div>
        <div className="col-4">
            <button className="btn btn-secondary btn-user" onClick={submit}>Save</button>                           
        </div>
        </div>
        </div>
        </>
    )
}

export default IndividualLoanBank;