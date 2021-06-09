import React, {useState, useEffect} from "react"
import { useParams , navigate} from "@reach/router"
import { Form } from "react-bootstrap";
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from 'sweetalert2';
import {IoMdArrowBack} from 'react-icons/io'

function AddCreditVoucher() {

    const [cust, setCust] = useState([])
    const [customerId, setCustomerId] = useState("")
    const [items, setItems] = useState([
        {description: "", amount: ""}
    ])

   

    const handleI = (e) => {
        const values = [...items];
        values.push({description: "", amount: ""})
        setItems(values);
       
    }

    const deleteI = (e) => {
        const values = [...items];
        values.pop()
        setItems(values);
    }

    const handleIChange = (index, event) => {
        const values = [...items];
        if (event.target.name === "desc") {
            values[index].description = event.target.value;
        }
        else if (event.target.name === "amount") {
            values[index].amount = parseInt(event.target.value);
        }
        setItems(values);
    }

    const reset = (e) => {
        window.location.reload()
    }

    const submit = (e) => {
        e.preventDefault()
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios
        .post(`${BASE_URL}/api/v1/finance/createcreditvoucher`,{customerId : customerId, items : items},{ headers : { 'Authorization' : Token }})
        .then(response => { 
            console.log(response)
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
                    text: 'Successfully created Credit Voucher!'
                  })
                  setCustomerId("")
                  setItems([{description: "", amount: ""}])
            }
        })
    }

    useEffect(()=>{
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/customer/getlistofcustomers`,{headers:{Authorization:Token}})
        .then(response => {
          console.log(response)
          setCust(response.data)
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
            <h4>Add Credit Voucher</h4>
            </div>
        </div>
        <form onSubmit={submit}>
        <div className="row pt-3 justify-content-center">
            <div className="col-lg-4 col-sm-12">
                <Form.Group controlId="customerId">
                <Form.Label>Customer Id</Form.Label>
                <Form.Control required as="select" value={customerId} onChange={(e)=> setCustomerId(e.target.value)}>
                    <option value="">Select a Customer Id</option>
                    {cust.map((t)=>(
                        <option value={t.customerId}>{t.customerId}</option>
                    ))}
                </Form.Control>
                </Form.Group>
            </div>
        </div>
        <br />
        <div className="row pt-3 justify-content-center">
            <div className="col-lg-12 col-sm-12">
            <h5 className="pl-4">Term Items</h5>
            <br />
            { 
                items.map((items,index)=> {
                    return(
                        <div className="row pl-4">
                        <div className="col-9">
                            <div className="row">
                                <div className="col-8">
                                <label>Description</label>
                                <input
                                type="text"
                                class="form-control"
                                name="desc"
                                id="desc"
                                required
                                value={items.description}
                                onChange={(event) => handleIChange(index, event)}
                                />
                                </div>
                                <div className="col-4">
                                <label>Amount</label>
                                <input
                                type="number"
                                class="form-control"
                                name="amount"
                                id="amount"
                                required
                                value={items.amount}
                                onChange={(event) => handleIChange(index, event)}
                                />
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <button className="add-btn mt-4" onClick={handleI}>Add Row</button>
                            &nbsp;&nbsp;
                            <button className="add-btn mt-4" onClick={deleteI} style={{display : index === 0 ? "none": "inline-block"}}>Delete</button>
                        </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
        <div className="row mt-4 container-fluid justify-content-center">
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

export default AddCreditVoucher;