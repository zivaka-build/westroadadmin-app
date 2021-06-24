import { Form} from "react-bootstrap";
import React, { useState , useEffect} from "react";
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
    const [sites, setSites] = useState([])
    const [site, setSite] = useState([
        { siteID:"",siteName: ""}
    ])

    const [brokerName, setBrokerName] = useState("")
    const [brokerCompany, setBrokerCompany] = useState("")
    const [brokerPan, setBrokerPan] = useState("")
    const [brokerAddress, setBrokerAddress] = useState("")
    const [brokerRera, setBrokerRera] = useState("")

    const addSite = (index, event) => {
        const values = [...site];
        values.push({ siteID:"", siteName: "" })
        setSite(values)
    }

    const handleSiteChange = (index, event) => {
        const values = [...site];
        const str = event.target.value + " ";
        values[index].siteID = str.split(' ')[0]
        values[index].siteName = str.substring(str.indexOf(' ')+1, str.lastIndexOf(' '))
        setSite(values)
    }

    const deleteSite = (index, event) => {
        const values = [...site];
        values.pop()
        setSite(values)
    }

    const changeBrokerPan = (e) => {
        var val = e.target.value
        setBrokerPan(e.target.value)
        var regex = /^[A-Z0-9]{10}$/
        var message = document.getElementById('panMessage');
          if(regex.test(val)){
              message.classList.remove('d-block');
              message.classList.add('d-none');
          }
          else{
              
              message.classList.remove('d-none');
              message.classList.add('d-block');
          }
      }
    

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
            site: site,
            leadBudget: budget,
            leadReq: requirement,
            broker: {
                brokerName : brokerName,
                brokerCompany : brokerCompany,
                brokerPAN : brokerPan,
                brokerAddress : brokerAddress,
                brokerRERA : brokerRera
            }
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

    useEffect(() => { 
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios
            .get(`${BASE_URL}/api/v1/site/getAllSiteNames`,{ headers : { 'Authorization' : Token }})
            .then(response => {
                setSites(response.data.siteMap)
            })
    }, [])
    
    

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
            <label>City/District</label>
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
            <option>Walk In</option>
            <option>Real Estate Broker</option>
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

        {
            source === "Real Estate Broker" ?
            <>
            <div className="row justify-content-center">
                <div className="col-lg-4 col-sm-6">
                    <label>Broker Name</label>
                    <input
                    type="text"
                    class="form-control"
                    name="BrokerName"
                    id="outlined-basic"
                    onChange={(e)=>setBrokerName(e.target.value)}
                    />
                </div>
                <div className="col-lg-4 col-sm-6">
                <label>Broker Company</label>
                    <input
                    type="text"
                    class="form-control"
                    name="BrokerCompany"
                    id="outlined-basic"
                    onChange={(e)=>setBrokerCompany(e.target.value)}
                    />
                </div>
                
            </div>
            <br />
            <div className="row justify-content-center">
                <div className="col-lg-4 col-sm-6">
                    <label>Broker PAN</label>
                    <input
                    type="text"
                    class="form-control"
                    name="BrokerPan"
                    id="outlined-basic"
                    onChange={changeBrokerPan}
                    />
                     <small id="panMessage" className="text-danger d-none">
                        Must be 10 characters with capitals and numbers only
                    </small>
                </div>
                <div className="col-lg-4 col-sm-6">
                <label>Broker RERA</label>
                    <input
                    type="text"
                    class="form-control"
                    name="BrokerRera"
                    id="outlined-basic"
                    onChange={(e)=>setBrokerRera(e.target.value)}
                    />
                </div>
                
            </div>
            <br />
            <div className="row justify-content-center">
                <div className="col-lg-8 col-sm-12">
                    <label>Broker Address</label>
                    <input
                    type="text"
                    class="form-control"
                    name="BrokerAddress"
                    id="outlined-basic"
                    onChange={(e)=>setBrokerAddress(e.target.value)}
                    />
                </div>
            </div>
            <br />
            </> : null
        }

        <div className="row justify-content-center">
        <div className="col-lg-8 col-sm-12">
        { site.map((s, index) =>{
            return(
                <div className="row d-flex">
                    <div className="col-6">
                        <Form.Group controlId="sites">
                        <Form.Label>Site</Form.Label>
                        <Form.Control  required onChange={(event) => handleSiteChange(index, event)} as="select">
                        <option value="">Select a site</option>
                        {sites.map((s)=>(
                            <option value={s.SiteId+" "+s.SiteName}>{s.SiteName}</option>
                        ))}
                        </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col-6">
                    <button className="add-btn mt-4 mr-4" onClick={()=>addSite()} style={{display : index === 1 ? "none": "inline-block"}}>Add Row</button>
                            
                    <button className="add-btn mt-4" onClick={()=>deleteSite()} style={{display : index === 0 ? "none": "inline-block"}}>Delete</button>
                    </div>
                </div>
            )
        })
        }
        </div>
        </div>
        
        <div className="row justify-content-center">
        <div className="col-lg-4 col-sm-6">
        <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Lead Priority</Form.Label>
            <Form.Control onChange={(e)=>setType(e.target.value)} as="select">
            <option selected>Hot</option>
            <option>Normal</option>
            <option>Cold</option>
            
        
            </Form.Control>
            </Form.Group>
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