import React, {useState, useEffect} from "react"
import { useParams , navigate} from "@reach/router"
import { Form } from "react-bootstrap";
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from 'sweetalert2';
import {IoMdArrowBack} from 'react-icons/io'
import {AiOutlineDownload} from 'react-icons/ai'


function AddCreditVoucher() {
    const [customers, setCustomers] = useState([])
    const [customerId, setCustomerId] = useState("")
    const [amount, setAmount] = useState("")

    const [disp, setDisp] = useState("none")
    const [resultAmount, setResultAmount] = useState("")
    const [resultCustomerId, setResultCustomerId] = useState("")
    const [resultCouponId, setResultCouponId] = useState("")
    const [resultLink, setResultLink] = useState("")
    
    const submit = (e) => {
        e.preventDefault()
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.post(`${BASE_URL}/api/v1/cashback/createcashbackcoupon`,{customerId : customerId, amount : amount*1},{ headers : { 'Authorization' : Token }})
        .then(response =>{
            if(response.status === 200){
                setResultAmount(response.data.amount)
                setResultCustomerId(response.data.customerId)
                setResultCouponId(response.data.couponId)
                setResultLink(response.data.couponS3Link)
                setDisp("block")
                setCustomerId("")
                setAmount("")
            }
            else if(response.status !== 200){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    },
                    text: response.data.message
                  })
            }
        })
    }

    useEffect(()=>{
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/customer/getListOfCustomers`,{ headers: { Authorization: Token }})
        .then(response => {
            console.log(response)
            setCustomers(response.data)
        })

    },[])

    return(
        <>
        <div className="mt-3 row container-fluid justify-content-center px-2" >
            <div className="col-12">
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={()=>navigate(-1)}><IoMdArrowBack />Back</button>
            </div>
        </div>
        <div className="row mt-4 justify-content-center">
            <div className="col-lg-8 col-sm-12">
            <h4>Add Cashback Coupon</h4>
            </div>
        </div>
        <form onSubmit={submit}>
        <div className="row mt-4 justify-content-center">
            <div className="col-lg-4 col-sm-12">
                <Form.Group controlId="customerId">
                <Form.Label>Customer ID</Form.Label>
                <Form.Control  as="select" onChange={(e)=>setCustomerId(e.target.value)} value={customerId} required>
                <option value="">Select a Customer Id</option>  
                {customers.map((c)=>(
                <option value={c.customerId}>{c.customerId}</option>
                ))}
                </Form.Control>
                </Form.Group>
            </div>
            <div className="col-lg-4 col-sm-12">
            <Form.Group controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control  as="select" onChange={(e)=>setAmount(e.target.value)} value={amount} required>
                <option value="">Select a amount</option>
                <option value="5000">5000</option>  
                <option value="1000">1000</option>
                
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
                <button className="btn btn-secondary btn-user" type="submit">Generate</button>                          
            </div>
        </div>
        </form>
        <br />

        <div className="row mt-4" style={{display : disp}}>
            <center>
            <div className="col-6">
            <h6>Coupon ID : {resultCouponId}</h6>
            <h6>Customer ID : {resultCustomerId}</h6>
            <h6>Amount : {resultAmount}</h6>
            <a href={resultLink} target="_blank" rel="noopener noreferrer"><button className="btn btn-light" style={{backgroundColor : "white"}} >Download Coupon<AiOutlineDownload ></AiOutlineDownload></button></a>
            </div>
            </center>
        </div>

        </>
    )
}

export default AddCreditVoucher;