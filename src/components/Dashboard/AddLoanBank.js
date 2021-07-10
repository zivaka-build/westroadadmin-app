import React, {useState, useEffect} from "react"
import { useParams , navigate} from "@reach/router"
import { Form } from "react-bootstrap";
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";
import {IoMdArrowBack} from 'react-icons/io'

function AddLoanBank() {

    const [bname, setBname] = useState("")
    const [bcode, setBcode] = useState("")
    const [gi, setGi] = useState("")
    const [wi, setWi] = useState("")
    const [si, setSi] = useState("")
    const [branch, setBranch] = useState("")
    const [validated, setValidated] = useState(true)
    const [disp, setDisp] = useState("none")
    const [agent, setAgent] = useState([
        {name: "", contactNumber: "", whatsappNumber: "", emailId: ""}
    ])

    

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

    const changeBcode = (e) => {
        setDisp('none')
        var value = e.target.value
        setBcode(e.target.value)
        var regex = /^[A-Z0-9]{11}$/

        var message = document.getElementById('bcodeMessage')
        if( regex.test(value)){
            
            message.classList.remove('d-block');
            message.classList.add('d-none');
            setValidated(true)
        }
        else {
            message.classList.remove('d-none');
            message.classList.add('d-block');
            setValidated(false)
            
        }

    }

    const submit = (e) => {
        const Token = 'bearer' + " " + Cookies.get('Token')
        e.preventDefault()
        if( validated === true) {
        axios
            .post(`${BASE_URL}/api/v1/loan/addLoanBank`,{bankCode: bcode, bankBranch: branch, bankName: bname, rateOfInterest: gi, rateOfInterestWomen: wi, rateOfInterestSenior: si, agent: agent},{ headers : { 'Authorization' : Token }})
            .then(response => {
                console.log(response)

                if(response.data.branchExists===true){
                    setDisp("block")
                    

                }
                if(response.data.branchExists===false){
                    setDisp("none")
                    navigate("/dashboard/listofbanks")
                }
                
                
                // if(response.status == 200) {
                //     navigate("/dashboard/listofbanks")
                // }
            })
        }
    }
    return(
        <>
        <div className="mt-3 row container-fluid justify-content-center px-2" >
            <div className="col-12">
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={()=>navigate("/dashboard/home")}><IoMdArrowBack />Back</button>
            </div>
        </div>
        <form onSubmit={submit}>
        <div className="row mt-5 container-fluid justify-content-center">
            <div className="col-12">
            <h4>Add Loan Bank</h4>
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
                required
                onChange={(e)=>{setBname(e.target.value)
                    setDisp('none')
                }}
            />
            </div>
            <div className="col-lg-4 col-sm-12">
                <label>IFS Code</label>
                <input
                type="text"
                class="form-control"
                name="bankcode"
                id="bankcode"
                value={bcode}
                required
                onChange={changeBcode}
            />
            <small id="bcodeMessage" className="text-danger d-none">
                Must be of 11 digits with capital letters and numbers only
                <br />
            </small>  
            </div>
            <div className="col-lg-4 col-sm-12">
                <label>Branch Name</label>
                <input
                type="text"
                class="form-control"
                name="bankBranch"
                id="bankBranch"
                value={branch}
                required
                onChange={(e)=>setBranch(e.target.value)}
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
                required
                onChange={(e)=>{
                    setGi(e.target.value)
                }}
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
                required
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
                required
                onChange={(e)=>setSi(e.target.value)}
            />
            </div>

        </div>
        <br />
        <div className="row justify-content-center">
        <div className="col-lg-12 col-sm-12">
            <h5 className="pl-4">Agents</h5>
            <br />
        { 
                agent.map((agent,index)=> {
                    return(
                        <div className="row pl-4">
                        <div className="col-9">
                            <div className="row">
                                <div className="col-3">
                                <label>Name</label>
                                <input
                                type="text"
                                class="form-control"
                                name="name"
                                id="name"
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
        <div className="row mt-4 container-fluid justify-content-center">
        <div className="text-center" style={{display : disp}}><em>IFSC Code already exists</em></div>
        <div className="col-4 text-right">
            <button className="btn btn-secondary btn-user" type="reset" onClick={reset}style={{backgroundColor: "white", color: "black"}}>Reset</button>

        </div>
        
        <div className="col-4">
            <button className="btn btn-secondary btn-user" type="submit">Add</button>
                                        
        </div>
        </div>
        </form>
       
        </>
    )
}

export default AddLoanBank;