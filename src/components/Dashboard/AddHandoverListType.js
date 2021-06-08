import React, {useState, useEffect} from "react"
import { useParams , navigate} from "@reach/router"
import { Form } from "react-bootstrap";
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from 'sweetalert2';
import {IoMdArrowBack} from 'react-icons/io'

function AddHandoverListType(){

    const [site, setSite ] = useState([]);
    const [scode, setScode ] = useState("")
    const [bhk, setBhk] = useState("")
    const [listItems, setListItems] = useState([
        {serial: "", category: "", description: ""}
    ])

    console.log(listItems)

    const handleLI = (e) => {
        const values = [...listItems];
        values.push({serial: "", category: "", description: ""})
        setListItems(values);
       
    }

    const deleteLI = (e) => {
        const values = [...listItems];
        values.pop()
        setListItems(values);
    }

    const handleLIChange = (index, event) => {
        const values = [...listItems];
        if (event.target.name === "slno") {
            values[index].serial = parseInt(event.target.value);
        }
        else if (event.target.name === "desc") {
            values[index].description = event.target.value;
        }
        else if (event.target.name === "category") {
            values[index].category = event.target.value;
        }
        setListItems(values);
    }

    const reset = (e) => {
        window.location.reload()
    }

    const submit = (e) => {
        e.preventDefault()
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios
        .post(`${BASE_URL}/api/v1/handover/createHandOverListType`,{siteId: scode,bhk: bhk+"BHK",listItems : listItems},{ headers : { 'Authorization' : Token }})
        .then(response => { 
            console.log(response)
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
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={()=>navigate(-1)}><IoMdArrowBack />Back</button>
            </div>
        </div>
        <div className="row mt-4 justify-content-center">
            <div className="col-lg-8 col-sm-12">
            <h4>Add Handover List Type</h4>
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
                <label>BHK</label>
                <input
                type="number"
                class="form-control"
                name="bhk"
                onChange={(e)=>setBhk(e.target.value)}
                required
                />
            </div>
        </div>
        <br />
        <div className="row pt-3 justify-content-center">
            <div className="col-lg-12 col-sm-12">
            <h5 className="pl-4">List Items</h5>
            <br />
            { 
                listItems.map((listItems,index)=> {
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
                                value={listItems.serial}
                                onChange={(event) => handleLIChange(index, event)}
                                />
                                </div>
                                <div className="col-2">
                                <label>Category</label>
                                <input
                                type="text"
                                class="form-control"
                                name="category"
                                id="category"
                                required
                                value={listItems.category}
                                onChange={(event) => handleLIChange(index, event)}
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
                                value={listItems.description}
                                onChange={(event) => handleLIChange(index, event)}
                                />
                                </div>
                                
                            </div>
                        </div>
                        <div className="col-3">
                            <button className="add-btn mt-4" onClick={handleLI}>Add Row</button>
                            &nbsp;&nbsp;
                            <button className="add-btn mt-4" onClick={deleteLI} style={{display : index === 0 ? "none": "inline-block"}}>Delete</button>
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

export default AddHandoverListType;