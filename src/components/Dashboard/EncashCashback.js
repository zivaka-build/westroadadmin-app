import React, {useState, useEffect} from "react"
import { useParams , navigate} from "@reach/router"
import { Form } from "react-bootstrap";
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from 'sweetalert2';
import {IoMdArrowBack} from 'react-icons/io'

function EncashCashback() {
    const [customers, setCustomers] = useState([])
    const [customerId, setCustomerId] = useState("")
    const [couponSecret, setCouponSecret] = useState("")
    const [encashedBy, setEncashedBy] = useState("")
    const [encashedDesc, setEncashedDesc] = useState("")
    const [coupons, setCoupons] = useState([])
    const [coupon, setCoupon] = useState("")

    console.log(customerId)
    console.log(couponSecret)
    
    const changeCoupon = (e) => {
        const value = e.target.value+" ";
        setCoupon(e.target.value)
        setCustomerId(value.split(' ')[0])
        setCouponSecret(value.split(' ')[1])
    }
     
    const submit = (e) => {
        e.preventDefault()
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.post(`${BASE_URL}/api/v1/cashback/encashcoupon`,{customerId : customerId, couponSecret : couponSecret, encashedBy : encashedBy, encashedDescription: encashedDesc},{ headers : { 'Authorization' : Token }})
        .then(response =>{
            if(response.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    },
                    text: response.data.message
                  })
                setCoupon("")
                setEncashedBy("")
                setEncashedDesc("")
            }
            else if(response.status !== 422){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    },
                    text: "Coupon already encashed"
                  })

            }
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                },
                text: error.message
              })
        })
    }

    useEffect(()=>{
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/customer/getListOfCustomers`,{ headers: { Authorization: Token }})
        .then(response => {
            console.log(response)
            setCustomers(response.data)
        })

        axios.get(`${BASE_URL}/api/v1/cashback/getlistofcashbackcoupons`,{ headers: { Authorization: Token }})
        .then(response => {
            console.log(response)
            setCoupons(response.data)
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
            <h4>Encash Cashback Coupon</h4>
            </div>
        </div>
        <form onSubmit={submit}>
        <div className="row mt-4 justify-content-center">
            <div className="col-lg-4 col-sm-12">
                <Form.Group controlId="couponId">
                <Form.Label>Coupon ID</Form.Label>
                <Form.Control  as="select" onChange={changeCoupon} value={coupon} required>
                <option value="">Select a Coupon Id</option>  
                {coupons.map((c)=>(
                <option value={c.customerId+" "+c.couponSecret}>{c.couponId}</option>
                ))}
                </Form.Control>
                </Form.Group>
            </div>
        </div>
        <div className="row mt-4 justify-content-center">
            <div className="col-lg-4 col-sm-12">
                <label>Encashed By</label>
                <input
                type="text"
                class="form-control"
                name="encashedBy"
                id="encashedBy"
                required
                value={encashedBy}
                onChange={(e)=>setEncashedBy(e.target.value)}
                />
            </div>
            <div className="col-lg-4 col-sm-12">
                <label>Encashed Description</label>
                <input
                type="text"
                class="form-control"
                name="encashedDesc"
                id="encashedDesc"
                required
                value={encashedDesc}
                onChange={(e)=>setEncashedDesc(e.target.value)}
                />
            </div>
        </div>
        <br />
        <div className="row container-fluid mt-2 justify-content-center">
            <div className="col-4 text-right">
                <button className="btn btn-secondary btn-user" type="reset"  style={{backgroundColor: "white", color: "black"}}>Reset</button>
            </div>
            <div className="col-4">
                <button className="btn btn-secondary btn-user" type="submit">Encash</button>                          
            </div>
        </div>
        </form>
        
        </>
    )
}

export default EncashCashback;