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

    const submit = (e) => {
        const Token = 'bearer' + " " + Cookies.get('Token')
        e.preventDefault()
        axios
            .post(`${BASE_URL}/api/v1/loan/addLoanBank`,{bankCode: bcode, bankName: bname, rateOfInterest: gi, rateOfInterestWomen: wi, rateOfInterestSenior: si},{ headers : { 'Authorization' : Token }})
            .then(response => {
                console.log(response)

               
            })
    }
    return(
        <>
        <div className="row mt-5 container-fluid justify-content-center">
            <div className="col-8">
            <h4>Add Loan Bank</h4>
            </div>
        </div>
        <form>
        <div className="row mt-5 container-fluid justify-content-center">
            <div className="col-lg-4 col-sm-12">
                <label>Bank Name</label>
                <input
                type="text"
                class="form-control"
                name="bankname"
                id="bankname"
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
                onChange={(e)=>setSi(e.target.value)}
            />
            </div>

        </div>
        <div className="row mt-4 container-fluid justify-content-center">
        <div className="col-4 text-right">
            <button className="btn btn-secondary btn-user" type="reset"  style={{backgroundColor: "white", color: "black"}}>Reset</button>

        </div>
        <div className="col-4">
            <button className="btn btn-secondary btn-user" onClick={submit}>Add</button>
                                        
        </div>
        </div>
        </form>
        </>
    )
}

export default AddLoanBank;