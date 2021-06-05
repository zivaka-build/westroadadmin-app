import { Form} from "react-bootstrap";
import React, { useState } from "react";
import { navigate } from "@reach/router";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../config/url";
import "./../../assets/css/form.css";
import {IoMdArrowBack} from 'react-icons/io'

function AddLeadForm(){
    const [name, setName ] = useState("");
    const [mobile, setMobile ] = useState("");
    const [whatsapp, setWhatsapp ] = useState("");
    const [email, setEmail ] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity ] = useState("");
    const [pincode, setPincode ] = useState("");
    const [source, setSource ] = useState("");
    const [status, setStatus ] = useState("New Lead");
    const [type, setType ] = useState("Hot");
    const [siteName, setSiteName ] = useState("");
    const [requirement, setRequirement ] = useState("");
    const [budget, setBudget ] = useState("");
    const [subType, setSubType] = useState("");
    const [emailValidated, setEmailValidated] = useState(true)
    const [phoneValidated, setPhoneValidated] = useState(true)
    const [wpValidated, setWpValidated] = useState(true)
    

    const submit = (e) => {
        e.preventDefault();
        if(emailValidated===true && phoneValidated ===true && wpValidated===true){
            const Token = 'bearer' + " " + Cookies.get('Token')
            axios
          .post(`${BASE_URL}/api/v1/lead/addLead`, {
            name: name,
            phone: mobile,
            whatsapp: whatsapp,
            email: email,
            address: address,
            city: city,
            pincode: pincode,
            leadSource: source,
            subType: subType,
            leadWeightage: type,
            siteName: siteName,
            leadBudget: budget,
            leadReq: requirement,
          },
          { headers : { 'Authorization' : Token }})
          .then((response) => {
            console.log(response);
            navigate("/dashboard/viewlead")
          })
          .catch((error) => {
            console.log(error);
          });
        }
    }
        

    const PhNo = (e) =>{
        var val = e.target.value
        setMobile(val)
        
        var element = document.getElementById('outlined-basic-phno');
        var message = document.getElementById('phnoMessage');
        if(val.length == 10){
            message.classList.remove('d-block');
            message.classList.add('d-none');
          
            setPhoneValidated(true)
            
        }
        else{
            
            message.classList.remove('d-none');
            message.classList.add('d-block');
            setPhoneValidated(false)

        }


    }

    const wpno = (e) =>{
        var val = e.target.value
        setWhatsapp(val)
        
        var element = document.getElementById('outlined-basic-wpno');
        var message = document.getElementById('wpnoMessage');
        if(val.length == 10){
            message.classList.remove('d-block');
            message.classList.add('d-none');
          
            setPhoneValidated(true)
            
        }
        else{
            
            message.classList.remove('d-none');
            message.classList.add('d-block');
            setPhoneValidated(false)

        }


    }

    const EmailVal = (e) =>{
        var val1 = e.target.value
        setEmail(val1)
        var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        var element = document.getElementById('outlined-basic-email');
        var message = document.getElementById('emailMessage');
        if( regex.test(val1)){
           
            message.classList.remove('d-block');
            message.classList.add('d-none');
            setEmailValidated(true)
            
        }
        else {
            
            message.classList.remove('d-none');
            message.classList.add('d-block');
            setEmailValidated(false)

            
            
        }

    }
    
    

    return(
        <>
        <div className="mt-3 row container-fluid justify-content-center">
            <div className="col-12">
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={()=>navigate("/dashboard/home")}><IoMdArrowBack />Back</button>
            </div>
        </div>
        <form onSubmit={submit}>
        <div className="row justify-content-center">
        <div className="col-lg-8 col-sm-12">
        <h4>Add a Lead</h4>
        <br />
            <label>Name</label>
            <input
            type="text"
            class="form-control"
            name="name"
            id="outlined-basic"
            onChange={(e)=>setName(e.target.value)}
            required/>
        </div>
        </div>
        <br />
        <div className="row justify-content-center">
        <div className="col-lg-4 col-sm-6">
            <label>Contact No.</label>
            <input
            type="number"
            class="form-control"
            name="contact"
            id="outlined-basic-phno"
            onChange={PhNo}
            required/>
            <small id="phnoMessage" className="text-danger d-none">
                Must be of 10 characters with numbers only
               
            </small>   
        </div>
        <div className="col-lg-4 col-sm-6">
            <label>Whatsapp No.</label>
            <input
            type="number"
            class="form-control"
            name="whatsapp"
            id="outlined-basic-wpno"
           onChange={wpno}
            required/>
            <small id="wpnoMessage" className="text-danger d-none">
                Must be of 10 characters with numbers only
               
            </small>   
        </div>
        </div>
        <br />
        <div className="row justify-content-center">
        <div className="col-lg-8 col-sm-12">
            <label>Email ID</label>
            <input
            type="email"
            class="form-control"
            name="email"
            id="outlined-basic-email"
           onChange={EmailVal}
            required/>
            <small id="emailMessage" className="text-danger d-none">
               Enter Valid Email
            </small> 
        </div>
        </div>
        <br />
        <div className="row justify-content-center">
        <div className="col-lg-8 col-sm-12">
            <label>Address</label>
            <input
            type="text"
            class="form-control"
            name="address"
            id="outlined-basic"
           onChange={(e)=>setAddress(e.target.value)}
            />
        </div>
        </div>
        <br />
        <div className="row justify-content-center">
        <div className="col-lg-4 col-sm-6">
            <label>City</label>
            <input
            type="text"
            class="form-control"
            name="city"
            id="outlined-basic"
           onChange={(e)=>setCity(e.target.value)}
            />
        </div>
        <div className="col-lg-4 col-sm-6">
            <label>Pincode</label>
            <input
            type="number"
            class="form-control"
            name="pincode"
            id="outlined-basic"
           onChange={(e)=>setPincode(e.target.value)}
           required />
        </div>
        </div>
        <br />
        <div className="row justify-content-center">
        <div className="col-lg-4 col-sm-6">
            <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Lead Source</Form.Label>
            <Form.Control onChange={(e)=>setSource(e.target.value)} as="select">
            <option>Select a source</option>   
            <option>99Acres</option>
            <option>Newspaper</option>
            <option>Hoarding</option>
            <option>Website</option>
            <option>Facebook</option>
            <option>Referral</option>
            </Form.Control>
            </Form.Group>
        </div>
        <div className="col-lg-4 col-sm-6">
            <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Lead Status</Form.Label>
            <Form.Control as="select" disabled="disabled">
            <option selected>New Lead</option>
        
            </Form.Control>
            </Form.Group>
        </div>
        
        </div>
        <div className="row justify-content-center">
        { source === "Newspaper" ? 
        <>
        <div className="col-lg-8 col-sm-12">
            <Form.Group controlId="exampleForm.ControlSelect3">
            <Form.Label>Newspaper Name</Form.Label>
            <Form.Control as="select" onChange={(e)=>setSubType(e.target.value)}>
            <option>Times Of India</option>
            <option>Anandabazar Patrika</option>
            </Form.Control>
            </Form.Group>
        </div>
        </> : null
       }
       
        { source === "99Acres" ? 
           <>
           <div className="col-lg-8 col-sm-12">
               <Form.Group controlId="exampleForm.ControlSelect4">
               <Form.Label>Type</Form.Label>
               <Form.Control as="select" onChange={(e)=>setSubType(e.target.value)}>
               <option>Conventional</option>
               <option>Omni</option>
               </Form.Control>
               </Form.Group>
           </div>
           </> : null
        }
       { source === "Referral" ? 
           <>
           <div className="col-lg-8 col-sm-12">
           <label>Details</label>
            <input
            type="text"
            class="form-control"
            name="details"
            id="outlined-basic"
           onChange={(e)=>setSubType(e.target.value)}
            />
            <br />
           </div>
           
           </> : null
        }
        </div>
        
        <div className="row justify-content-center">
        <div className="col-lg-4 col-sm-6">
        <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Lead Type</Form.Label>
            <Form.Control onChange={(e)=>setType(e.target.value)} as="select">
            <option selected>Hot</option>
            <option>Normal</option>
            <option>Cold</option>
        
            </Form.Control>
            </Form.Group>
        </div>
        <div className="col-lg-4 col-sm-6">
        <label>Site Name</label>
            <input
            type="text"
            class="form-control"
            name="sitename"
            id="outlined-basic"
            onChange={(e)=>setSiteName(e.target.value)}
            />
        </div>
        </div>
        <br />
        <div className="row justify-content-center">
        <div className="col-lg-4 col-sm-6">
        <label>Requirement</label>
            <input
            type="text"
            class="form-control"
            name="requirement"
            id="outlined-basic"
           onChange={(e)=>setRequirement(e.target.value)}
            />
        </div>
        <div className="col-lg-4 col-sm-6">
        <label>Budget</label>
            <input
            type="text"
            class="form-control"
            name="budget"
            id="outlined-basic"
           onChange={(e)=>setBudget(e.target.value)}
            />
        </div>
        </div>
        <br />
        <div className="row justify-content-center">
        <div className="col-lg-2 col-sm-3">
                  <button
                  type="submit"
                    className="btn btn-secondary btn-user btn-block"
                   
                  >
                    Submit
                  </button>
                </div>
        </div>
        </form>
        </>
    )
}

export default AddLeadForm;