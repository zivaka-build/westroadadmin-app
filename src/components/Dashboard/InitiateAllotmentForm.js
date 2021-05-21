import { Form} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useParams , navigate} from "@reach/router"
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../config/url";
import "./../../assets/css/form.css";
import qs from 'qs';
import Swal from 'sweetalert2';
var arraySort = require('array-sort');

function InitiateAllotmentForm(){
    
    const [name, setName ] = useState("");
    const [site, setSite ] = useState([]);
    const [phase, setPhase ] = useState([]);
    const [unit,setUnit] = useState([]);
    const [flat, setFlat ] = useState([]);
    const [flatname, setFlatname ] = useState("");
    const [carParking, setCarParking] = useState([])
    const [addCarParking, setAddCarParking] = React.useState([
         {parkingTypeCode: "", parkingType: "", carParkingPrice: "" },
      ]);
    const [email, setEmail ] = useState("");
    const [phno, setPhno ] = useState("");
    const [leadId, setLeadId ] = useState([]);
    const [lead, setLead ] = useState("");
    const [sitename, setSitename ] = useState("");
    const [phasename, setPhasename ] = useState("");
    const [type, setType ] = useState("Hot");
    const [bankLoan, setBankLoan] = useState()
    const [unitName, setUnitName] = useState("")
  
    
   
    const changeSite = (e) => {
        setSitename(e.target.value)

    }

    const changePhase = (e) => {
        setPhasename(e.target.value)
        var pn = e.target.value

        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/unit/getlistofunit?unitSiteId=${sitename}&unitPhaseCode=${pn}&status=Available`,{headers:{Authorization:Token}})
        .then(response=>{
            console.log(response.data)
            setUnit(arraySort(response.data, "unitName"))
            // setCarParking(response.data.site.carParkingType)
            // console.log(response)
        })
    }

    const handleCP = (e) => {
        const values = [...addCarParking];
        values.push({ parkingTypeCode: "", parkingType: "", carParkingPrice: "" })
        setAddCarParking(values)
       
    }

    const deleteCP = (e) => {
        const values = [...addCarParking];
        values.pop()
        setAddCarParking(values)
    }

    const handleCPChange = (index, event) => {
        const values = [...addCarParking];
        const str = event.target.value;
        values[index].parkingType = str.substring(0, str.indexOf(' '))
        values[index].parkingTypeCode = str.substring(str.indexOf(' ')+1,str.lastIndexOf(' '))
        values[index].carParkingPrice = str.substring(str.lastIndexOf(' ')+1)
        console.log(str)
    }

    const submit = (e) => {
        e.preventDefault()
        const Token = 'bearer' + " " + Cookies.get('Token');
        axios.post(`${BASE_URL}/api/v1/applicationform/createapplicationform`, 
        { 
            siteId: sitename,
            unitName: unitName,
            carParkings: addCarParking ,
            bookingBy: Cookies.get('FullName'),
            isBankLoan: bankLoan,
            registeredMobile: phno,
            registeredEmail: email
        }
        ,
        {headers:{Authorization:Token}} )
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Ooops',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                },
                text: "Unit already alloted!"
              })
        })
        navigate("/dashboard/listofapplicationform")
    }

   
    
    useEffect(()=>{
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/site/getAllSiteNames`,{headers:{Authorization:Token}})
        .then(response=>{
            setSite(response.data.siteMap)
        })

    },[])
    

    return(
        <div className="">
        <div className="row pt-3 justify-content-center">
            <div className="col-lg-8 col-sm-12">
            <h4>Create Application</h4>
            </div>
        </div>
        <div className="row pt-3 justify-content-center">
        <div className="col-lg-8 col-sm-12">
        
        <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Site Name</Form.Label>
            <Form.Control onChange={changeSite} as="select">
                <option value="">Select a site</option>
                {site.map((t)=>(
                    <option value={t.SiteId}>{t.SiteName}</option>
                ))}
               
            
            </Form.Control>
            </Form.Group>
        </div>
        </div>
        <div className="row pt-3 justify-content-center">
       
        <div className="col-lg-4 col-sm-12">
        
        <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Phase</Form.Label>
            <Form.Control onChange={changePhase} as="select">
                <option value="">Select a phase</option>
                <option value="PI">Phase 1</option>
                <option value="PII">Phase 2</option>
            </Form.Control>
            </Form.Group>
        </div>
        <div className="col-lg-4 col-sm-12">
        
        <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Unit</Form.Label>
            <Form.Control onChange={(e)=>setUnitName(e.target.value)} as="select">
                <option value="">Select a unit</option>
                {unit.map((t)=>(
                    <option value={t.unitName}>{t.unitName}</option>
                ))}
               
            
            </Form.Control>
            </Form.Group>
        </div>
        </div>
        <br />
        <div className="row justify-content-center">
        <div className="col-lg-8 col-sm-12"><h4>Car Parking</h4></div>
        </div>
        <br />
        <div className="row justify-content-center">
        <div className="col-lg-8 col-sm-12">
        
            { 
                addCarParking.map((addCarParking,index)=> {
                    return(
                        <div className="row d-flex">
                        <div className="col-6">
                        <Form.Group controlId="exampleForm.ControlSelect2">
                        <label>Car Parking Type</label>
                        <Form.Control  as="select" onChange={(event) => handleCPChange(index, event)}>
                        <option value="">Select a Car Parking Type</option>
                        { 
                        carParking.map((c)=>(
                            <option value={c.type+" "+c.typeCode+" "+c.price}>{c.type}</option>
                        ))}
                        </Form.Control>
                        </Form.Group>
                        </div>
                        <div className="col-6">
                            <button className="add-btn mt-4" onClick={()=>handleCP()} style={{display : index === 2 ? "none": "inline-block"}}>Add Row</button>
                            &nbsp;&nbsp;
                            <button className="add-btn mt-4" onClick={()=>deleteCP()} style={{display : index === 0 ? "none": "inline-block"}}>Delete</button>
                        </div>
                        </div>
                    )
                })
            }
        
        </div>
        </div>
        <br />
        <div className="row justify-content-center">
        <div className="col-lg-4 col-sm-12">
            <label>Mobile Number</label>
            <input
            type="number"
            class="form-control"
            name="Number"
            id="outlined-basic"
           onChange={(e)=>setPhno(e.target.value)}
            />
        </div>
        <div className="col-lg-4 col-sm-12">
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
            
                  <div className="col-lg-2 col-sm-4">
                    <label class="text-align left">Bank Loan : </label>
                  </div>
                  <div className="col-lg-6 col-sm-8">
                    <label class="form-check-label px-4">
                      Yes
                      <input
                        type="radio"
                        className="form-check-input"
                        id="yes"
                        name="bankloan"
                        onClick={(e)=>setBankLoan(true)}
                      />
                    </label>

                    <label class="form-check-label px-4">
                      No
                      <input
                        type="radio"
                        className="form-check-input"
                        id="no"
                        name="bankloan"
                        onClick={(e)=>setBankLoan(false)}
                      />
                    </label>
                    </div>
                   
            
        </div>
        <br />
        <div className="row justify-content-center">
        <div className="col-lg-2 col-sm-3">
                  <button
                    className="btn btn-secondary btn-user btn-block"
                   onClick={submit}
                  >
                    Create
                  </button>
                </div>
        </div>

       
        
        </div>
       
        
        
    );
}

export default InitiateAllotmentForm;