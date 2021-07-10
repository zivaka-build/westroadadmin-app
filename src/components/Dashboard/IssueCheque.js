import React, {useState, useEffect} from "react"
import { useParams , navigate} from "@reach/router"
import { Form } from "react-bootstrap";
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";
import {IoMdArrowBack} from 'react-icons/io'

function IssueCheque(){

    const [chequeNo, setChequeNo] = useState("")
    const [chequeBank, setChequeBank] = useState("")
    const [chequeAccount, setChequeAccount] = useState("")
    const [chequeDate, setChequeDate] = useState("")
    const [chequeAmount, setChequeAmount] = useState("")
    const [issuedTo, setIssuedTo] = useState("")
    const [issuedBy, setIssuedBy] = useState("")
    const [paymentCategory, setPaymentCategory] = useState("")

    const issueCheque = (e) => {
        const Token = 'bearer' + " " + Cookies.get('Token')
        e.preventDefault()
        axios
            .post(`${BASE_URL}/api/v1/cheque/issuecheque`,
            {
                chequeNo : chequeNo,
                chequeBankName : chequeBank,
                chequeAccountNo : chequeAccount,
                chequeDate : chequeDate,
                chequeAmount : chequeAmount,
                issuedTo : issuedTo,
                issuedBy : issuedBy,
                paymentCategory : paymentCategory,
                paymentType : "Debit"
            },
            { headers : { 'Authorization' : Token }})
            .then(response => {
                console.log(response)
                navigate("/dashboard/listofcheque")
               
            })

    }

    const back = () => {
        navigate("/dashboard/home")
    }

    return(
        <>
        <br />
        <div className="mt-3 row container-fluid justify-content-center">
            <div className="col-12">
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={back}><IoMdArrowBack />Back</button>
            </div>
        </div>
        <div className="row container-fluid justify-content-center">
            <div className="col-8">
            <h4>Issue Cheque</h4>
            </div>
        </div>
        <br />
        <form onSubmit={issueCheque}>
        <div className="row container-fluid justify-content-center">
        <div className="col-lg-4 col-sm-12">
            <label>Cheque No.</label>
            <input
            type="number"
            class="form-control"
            name="chequeNo"
            id="chequeNo"
            required
            onChange={(e)=>setChequeNo(e.target.value)}
            />
        </div>
        <div className="col-lg-4 col-sm-12">
            <label>Bank Name</label>
            <input
            type="text"
            class="form-control"
            name="bank"
            id="bank"
            required
            onChange={(e)=>setChequeBank(e.target.value)}
            />
        </div>
        </div>
        <br />
        <div className="row container-fluid justify-content-center">
        <div className="col-lg-4 col-sm-12">
            <label>Cheque Account No.</label>
            <input
            type="number"
            class="form-control"
            name="account"
            id="account"
            required
            onChange={(e)=>setChequeAccount(e.target.value)}
            />
        </div>
        <div className="col-lg-4 col-sm-12">
            <label>Cheque Date</label>
            <input
            type="date"
            class="form-control"
            name="chequeDate"
            id="chequeDate"
            required
            onChange={(e)=>setChequeDate(e.target.value)}
            />
        </div>
        </div>
        <br />
        <div className="row container-fluid justify-content-center">
        <div className="col-lg-4 col-sm-12">
            <label>Amount</label>
            <input
            type="number"
            class="form-control"
            name="amount"
            id="amount"
            required
            onChange={(e)=>setChequeAmount(e.target.value)}
            />
        </div>
        <div className="col-lg-4 col-sm-12">
            <label>Issued To</label>
            <input
            type="text"
            class="form-control"
            name="issuedTo"
            id="issuedTo"
            required
            onChange={(e)=>setIssuedTo(e.target.value)}
            />
        </div>
        </div>
        <br />
        <div className="row container-fluid justify-content-center">
        <div className="col-lg-4 col-sm-12">
            <label>Issued By</label>
            <input
            type="text"
            class="form-control"
            name="issuedBy"
            id="issuedBy"
            required
            onChange={(e)=>setIssuedBy(e.target.value)}
            />
        </div>
        <div className="col-lg-4 col-sm-12">
        <Form.Group controlId="paymentCategory">
            <Form.Label>Payment Category</Form.Label>
            <Form.Control  as="select" onChange={(e)=>setPaymentCategory(e.target.value)} required>
            <option value="">Select a Payment Category</option>   
            <option value="Vendor Payment">Vendor Payment</option>
            <option value="Contractor Payment">Contractor Payment</option>
            <option value="Others">Others</option>
            </Form.Control>
        </Form.Group>
        </div>
        </div>
        <br />
        <div className="row container-fluid justify-content-center">
        <div className="col-4 text-right">
            <button className="btn btn-secondary btn-user" type="reset"  style={{backgroundColor: "white", color: "black"}}>Reset</button>
        </div>
        <div className="col-4">
            <button className="btn btn-secondary btn-user" type="submit">Issue Cheque</button>                         
        </div>
    </div>

        </form>
        </>
    )
}

export default IssueCheque;