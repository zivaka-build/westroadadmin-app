import React, {useState, useEffect} from "react"
import { useParams , navigate} from "@reach/router"
import { Form } from "react-bootstrap";
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from 'sweetalert2';
import {IoMdArrowBack} from 'react-icons/io'

function AddPaymentTerm(){

    const [site, setSite ] = useState([]);

    const [scode, setScode] = useState("")
    const [pcode, setPcode] = useState("")
    const [termItems, setTermItems] = useState([
        {serial: "", description: "", percentage: ""}
    ])

    console.log(termItems)

    const handleTI = (e) => {
        const values = [...termItems];
        values.push({serial: "", description: "", percentage: ""})
        setTermItems(values);
       
    }

    const deleteTI = (e) => {
        const values = [...termItems];
        values.pop()
        setTermItems(values);
    }

    const handleTIChange = (index, event) => {
        const values = [...termItems];
        if (event.target.name === "slno") {
            values[index].serial = parseInt(event.target.value);
        }
        else if (event.target.name === "desc") {
            values[index].description = event.target.value;
        }
        else if (event.target.name === "percentage") {
            values[index].percentage = parseInt(event.target.value);
        }
        setTermItems(values);
    }

    const reset = (e) => {
        window.location.reload()
    }

    const submit = (e) => {
        e.preventDefault()
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios
        .post(`${BASE_URL}/api/v1/paymentTerms/generatePaymentTermsBySiteId`,{siteId: scode, phaseCode: pcode, termItems : termItems},{ headers : { 'Authorization' : Token }})
        .then(response => {
            console.log(response)
            if(response.status === 200) {
                
                if(response.data.message === "Payment terms not complete for WRS-1. Summation of all Term Items must be equal to 100%"){
                Swal.fire({
                    icon: 'error',
                    title: 'Ooops',
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    },
                    text: response.data.message
                  })
                }
                else {
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
                      setScode("")
                      setPcode("")
                      setTermItems([
                        {serial: "", description: "", percentage: ""}
                    ])
                }
            }
        })
    }

    useEffect(()=>{
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/site/getAllSiteNames`,{headers:{Authorization:Token}})
        .then(response=>{
            setSite(response.data.siteMap)
        })

    },[])

    return(
        <>
        <div className="mt-3 row container-fluid justify-content-center px-2" >
            <div className="col-12">
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={()=>navigate("/dashboard/home")}><IoMdArrowBack />Back</button>
            </div>
        </div>
        <div className="row mt-4 justify-content-center">
            <div className="col-lg-8 col-sm-12">
            <h4>Add Payment Term</h4>
            </div>
        </div>
        <br />
        <form onSubmit={submit}>
        <div className="row pt-3 justify-content-center">
            <div className="col-lg-4 col-sm-12">
                <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Site Name</Form.Label>
                <Form.Control required as="select" onChange={(e)=>setScode(e.target.value)} value={scode}>
                    <option value="">Select a site</option>
                    {site.map((t)=>(
                        <option value={t.SiteId}>{t.SiteName}</option>
                    ))}
                </Form.Control>
                </Form.Group>
            </div>
            <div className="col-lg-4 col-sm-12">
                <label>Phase Code</label>
                <input
                type="text"
                class="form-control"
                name="phaseCode"
                onChange={(e)=>setPcode(e.target.value)}
                required
                value={pcode}
                />
            </div>
        </div>
        <br />
        <div className="row pt-3 justify-content-center">
            <div className="col-lg-12 col-sm-12">
            <h5 className="pl-4">Term Items</h5>
            <br />
            { 
                termItems.map((termItems,index)=> {
                    return(
                        <div className="row pl-4">
                        <div className="col-9">
                            <div className="row">
                                <div className="col-2">
                                <label>Serial No.</label>
                                <input
                                type="number"
                                class="form-control"
                                name="slno"
                                id="slno"
                                required
                                value={termItems.serial}
                                onChange={(event) => handleTIChange(index, event)}
                                />
                                </div>
                                <div className="col-8">
                                <label>Description</label>
                                <input
                                type="text"
                                class="form-control"
                                name="desc"
                                id="desc"
                                required
                                value={termItems.description}
                                onChange={(event) => handleTIChange(index, event)}
                                />
                                </div>
                                <div className="col-2">
                                <label>Percentage</label>
                                <input
                                type="number"
                                class="form-control"
                                name="percentage"
                                id="percentage"
                                required
                               value={termItems.percentage}
                                onChange={(event) => handleTIChange(index, event)}
                                />
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <button className="add-btn mt-4" onClick={handleTI}>Add Row</button>
                            &nbsp;&nbsp;
                            <button className="add-btn mt-4" onClick={deleteTI} style={{display : index === 0 ? "none": "inline-block"}}>Delete</button>
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

export default AddPaymentTerm;