import { Form} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useParams , navigate} from "@reach/router"
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../config/url";
import "./../../assets/css/form.css";
import Swal from 'sweetalert2';
import {IoMdArrowBack} from 'react-icons/io'
var arraySort = require('array-sort');


function InitiateAllotmentForm(){
    var date = new Date();

    var today = new Date();

    var tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    var dd = tomorrow.getDate();
    var mm = tomorrow.getMonth() + 1; //January is 0!
    var yyyy = tomorrow.getFullYear();
    if (dd < 10) {
    dd = '0' + dd
    }
    if (mm < 10) {
    mm = '0' + mm
    }

    tomorrow = yyyy + '-' + mm + '-' + dd;

    var maxdate = new Date(today)
    maxdate.setDate(maxdate.getDate() + 7)
    var dd2 = maxdate.getDate()
    var mm2 = maxdate.getMonth() + 1;
    var yyyy2 = maxdate.getFullYear();
    if(dd2 < 10){
    dd2 = '0' + dd2
    }
    if(mm2 < 10){
    mm2 = '0' + mm2
    }

    maxdate = yyyy2 + '-' + mm2 + '-' + dd2;

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
    const [appointmentDate, setAppointmentDate] = useState("")
    const [leads, setLeads] = useState([])
    const [paymentTerms, setPaymentTerms] = useState("")
    const [emailValidated, setEmailValidated] = useState(true)
    const [phoneValidated, setPhoneValidated] = useState(true)
   
    const changeSite = (e) => {
        setSitename(e.target.value)

        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/parking/getListOfCarParkingTypes/${e.target.value}`,{headers:{Authorization:Token}})
        .then(response=>{ 
            setCarParking(response.data.carParkingType)
        })

    }

    const changePhase = (e) => {
        setPhasename(e.target.value)
        var pn = e.target.value

        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/unit/getlistofunit?unitSiteId=${sitename}&unitPhaseCode=${pn}&status=Available`,{headers:{Authorization:Token}})
        .then(response=>{
            console.log(response.data)
            setUnit(arraySort(response.data, "unitName"))
        })

        axios.get(`${BASE_URL}/api/v1/paymentterms/getpaymenttermsid?siteId=${sitename}&phaseCode=${pn}`,{headers:{Authorization:Token}})
        .then(response=>{
            console.log(response.data)
            setPaymentTerms(response.data[0].paymentTermsId)
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

    const changeLead = (e) => {
        setLead(e.target.value)
        const Token = 'bearer' + " " + Cookies.get('Token');
        axios.get(`${BASE_URL}/api/v1/lead/getLeadByLeadId/${e.target.value}`,{headers:{Authorization:Token}})
        .then(response=>{
            console.log(response)
            setEmail(response.data.lead.email)
            setPhno(response.data.lead.phone)
        
        })

    }
    const PhNo = (e) =>{
        var val = e.target.value
        setPhno(val)
        
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

    const submit = (e) => {
        e.preventDefault()
        console.log(emailValidated, phoneValidated)
        if(emailValidated===true && phoneValidated===true){
            const Token = 'bearer' + " " + Cookies.get('Token');
            axios.post(`${BASE_URL}/api/v1/applicationform/createapplicationform`, 
        { 
            siteId: sitename,
            unitName: unitName,
            carParkings: addCarParking ,
            bookingBy: Cookies.get('FullName'),
            isBankLoan: bankLoan,
            registeredMobile: phno,
            registeredEmail: email,
            leadId: lead,
            paymentTerms: paymentTerms,
            applicationCreateDate: date,
            bookingAppointmentDate: appointmentDate,
        }
        ,
        {headers:{Authorization:Token}} )
        .then(response => {
            console.log(response)
        })
        navigate("/dashboard/listofapplicationform")

        }

    }

   
    
    useEffect(()=>{
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/site/getAllSiteNames`,{headers:{Authorization:Token}})
        .then(response=>{
            setSite(response.data.siteMap)
        })

        axios.get(`${BASE_URL}/api/v1/lead/getAllLeads`,{ headers: { Authorization: Token } }) 
        .then((response) => {
            setLeads(response.data.leads)
        })
          

    },[])
    

    return(
        <div>
        <div className="mt-3 row container-fluid justify-content-center">
            <div className="col-12">
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={()=>navigate("/dashboard/home")}><IoMdArrowBack />Back</button>
            </div>
        </div>
        <div className="row pt-3 justify-content-center">
            <div className="col-lg-8 col-sm-12">
            <h4>Initiate Booking</h4>
            </div>
        </div>
        <form onSubmit={submit}>
        <div className="row pt-3 justify-content-center">
        <div className="col-lg-8 col-sm-12">
        
        <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Site Name</Form.Label>
            <Form.Control required onChange={changeSite} as="select">
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
            <Form.Control required onChange={(e)=>setUnitName(e.target.value)} as="select">
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
                        <Form.Control   as="select" onChange={(event) => handleCPChange(index, event)}>
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
            <Form.Group controlId="leadid">
            <label>Lead ID</label>
            <Form.Control   as="select" onChange={changeLead}>
            <option value="">Select a Lead</option>
            {
                leads.map((l)=>(
                    <option value={l.leadID}>{l.leadID}</option>
                ))
            }
            </Form.Control>
            </Form.Group>
            </div>
            <div className="col-lg-4 col-sm-12">
            <label>Mobile Number</label>
            <input
            type="number"
            class="form-control"
            name="Number"
            id="outlined-basic-phno"
            value={phno}
           onChange={PhNo}
           required
            />
            <small id="phnoMessage" className="text-danger d-none">
                Must be of 10 characters with numbers only
               
            </small>   
        </div>
        </div>
        <br />
        
        <div className="row justify-content-center">
    
        <div className="col-lg-4 col-sm-12">
            <label>Email</label>
            <input
            type="email"
            class="form-control"
            name="email"
            id="outlined-basic-email"
            value={email}
           onChange={EmailVal}
           required
            />
            <small id="emailMessage" className="text-danger d-none">
               Enter Valid Email
            </small>  
        </div>
        <div className="col-lg-4 col-sm-12">
            <label>Appointment Date</label>
            <input
            type="date"
            class="form-control"
            name="adate"
            min={tomorrow}
            max={maxdate}
            onChange={(e)=>setAppointmentDate(e.target.value)}
            required
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
                  type="submit"
                    className="btn btn-secondary btn-user btn-block"
                   
                  >
                    Create
                  </button>
                </div>
        </div>
        
        </form>
        
        </div>
       
        
        
    );
}

export default InitiateAllotmentForm;