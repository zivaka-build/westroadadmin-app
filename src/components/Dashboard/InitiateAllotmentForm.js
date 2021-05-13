import { Form} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useParams , navigate} from "@reach/router"
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../config/url";
import "./../../assets/css/form.css";

function InitiateAllotmentForm(){
    const {siteID} = useParams()
    const [name, setName ] = useState("");
    const [site, setSite ] = useState([]);
    const [phase, setPhase ] = useState([]);
    const [flatno, setFlatno ] = useState([]);
    const [flatname, setFlatname ] = useState("");
    const [carParking, setCarParking] = useState([]);
    const [email, setEmail ] = useState("");
    const [phno, setPhno ] = useState("");
    const [leadId, setLeadId ] = useState([]);
    const [lead, setLead ] = useState("");
    const [sitename, setSitename ] = useState("");
    const [phasename, setPhasename ] = useState("");
    const [type, setType ] = useState("Hot");
   
    

    // const submit = (e) => {
    //     e.preventDefault();
    //     const Token = 'bearer' + " " + Cookies.get('Token')
    //     axios
    //   .post(`${BASE_URL}/api/v1/lead/addLead`, {
    //     name: name,
    //     phone: mobile,
    //     whatsapp: whatsapp,
    //     email: email,
    //     address: address,
    //     city: city,
    //     pincode: pincode,
    //     leadSource: source,
    //     subType: subType,
    //     leadWeightage: type,
    //     siteName: siteName,
    //     leadBudget: budget,
    //     leadReq: requirement,
    //   },
    //   { headers : { 'Authorization' : Token }})
    //   .then((response) => {
    //     console.log(response);
    //     navigate("/dashboard/viewlead")
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // }
    
    useEffect(()=>{
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/site/getAllSiteNames`,{headers:{Authorization:Token}})
        .then(response=>{
            
            setSite(response.data.siteMap)
            console.log(site)
        })

        axios.get(`${BASE_URL}/api/v1/site/getSiteBySiteId/${siteID}`,{headers:{Authorization:Token}})
        .then(response=>{
            console.log(response)
            
        })

        axios.get(`${BASE_URL}/api/v1/lead/getAllLeads`,{headers:{Authorization:Token}})
        .then(response=>{
           
            setLeadId(response.data.leads)
            
        })
    

       
    },[])
    

    return(
        <div className="pt-5">
        <div className="row pt-3 justify-content-center">
        <div className="col-lg-8 col-sm-12">
        <h4>Initiate Allotment</h4>
        <br />
        <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Site ID</Form.Label>
            <Form.Control onChange={(e)=>setSitename(e.target.value)} as="select">
                {site.map((t)=>{
                    <option key = {t.SiteId}>{t.SiteName}</option>
                })}
               
            
            </Form.Control>
            </Form.Group>
        </div>
        </div>
        <br />
        <div className="row justify-content-center">
        <div className="col-lg-4 col-sm-6">
            <label>Phase</label>
            <input
            type="number"
            class="form-control"
            name="contact"
            id="outlined-basic"
            onChange={(e)=>setPhasename(e.target.value)}
            />
        </div>
        <div className="col-lg-4 col-sm-6">
            <label>Flat Number</label>
            <input
            type="number"
            class="form-control"
            name="whatsapp"
            id="outlined-basic"
           onChange={(e)=>setFlatname(e.target.value)}
            />
        </div>
        </div>
        <br />
        <div className="row justify-content-center">
        <div className="col-lg-8 col-sm-12">
            <label>Email</label>
            <input
            type="email"
            class="form-control"
            name="email"
            id="outlined-basic"
           onChange={(e)=>setEmail(e.target.value)}
            />
        </div>
        </div>
        <br />
        <div className="row justify-content-center">
        <div className="col-lg-8 col-sm-12">
            <label>Mobile Number</label>
            <input
            type="number"
            class="form-control"
            name="Number"
            id="outlined-basic"
           onChange={(e)=>setPhno(e.target.value)}
            />
        </div>
        </div>
        <br />
        <div className="row justify-content-center">
        <div className="col-lg-4 col-sm-6">
            <label>Lead ID</label>
            <input
            type="text"
            class="form-control"
            name="city"
            id="outlined-basic"
           onChange={(e)=>setLead(e.target.value)}
            />
        </div>
        
        </div>
        <br />
        <div className="row justify-content-center">
        {/* <div className="col-lg-4 col-sm-6">
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
        </div> */}
        
        
        </div>
        
       
       
        <br />
        
        <br />
        <div className="row justify-content-center">
        <div className="col-lg-2 col-sm-3">
                  <button
                    className="btn btn-secondary btn-user btn-block"
                   
                  >
                    Submit
                  </button>
                </div>
        </div>

       
        
        </div>
       
        
        
    );
}

export default InitiateAllotmentForm;