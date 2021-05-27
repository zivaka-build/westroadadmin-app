import React, {useState, useEffect} from "react"
import { useParams , navigate} from "@reach/router"
import { Form } from "react-bootstrap";
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from 'sweetalert2';
import {IoMdArrowBack} from 'react-icons/io'

function AddCarParking() {
   
    const [ uname, setUname ] = useState("")
    const [ sid, setSid ] = useState("")
    const [ scode, setScode] = useState("")
    const [ pt, setPt ] = useState("")
    const [ ptc, setPtc ] = useState("")
    const [ pn, setPn ] = useState(0)
    const [ uphase, setUphase ] = useState("")
    const [ site, setSite ] = useState([])

    const changeUnitName = (e) => {
        var str = e.target.value
        setScode(str.substring(str.indexOf(' ') + 1))
        setSid(str.substring(0, str.indexOf(' ')))
    }

    const changeParking = (e) => {
        var ptc = e.target.value.substring(0, e.target.value.indexOf(' '))
        var pt = e.target.value.substring(e.target.value.indexOf(' ') + 1)
        setPt(pt)
        setPtc(ptc)
        console.log(ptc)
    }

    useEffect(() => { 
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/site/getAllSites`,{ headers : { 'Authorization' : Token }})
        .then(response => {
            console.log(response)
            const sites = response.data.siteArray.map((site)=>{
                const {siteId, siteName,siteCode } = site
                
                return {
                    siteId, 
                    siteName, 
                    siteCode
                    
                  };
            })
            setSite(sites)
        })
    }, [])

    const addCarParking = (e) => {
        const Token = 'bearer' + " " + Cookies.get('Token')
        e.preventDefault()
        console.log(ptc)
        axios
            .post(`${BASE_URL}/api/v1/parking/addNewCarParking`,{ siteId: sid, phaseCode: uphase, parkingType:pt, parkingTypeCode: ptc, parkingNumber:pn*1},{ headers : { 'Authorization' : Token }})
            .then(response => {
                console.log(response)
                if(response.data.parkingExists === true){
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
                    navigate(`/dashboard/individualsite/${sid}`)
                }
            })
    }
    return(
        <>
         <div className="mt-3 row container-fluid justify-content-center">
            <div className="col-12">
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={()=> navigate(-1)}><IoMdArrowBack />Back</button>
            </div>
        </div>
        <div className="mt-5 row container-fluid justify-content-center">
            <div className="col-8">
            <h4>Add Car Parking</h4>
            </div>
        </div>
        <br />
        <form>
        <div className="row container-fluid justify-content-center">
        <div className="col-4">
        <Form.Group controlId="sitename">
            <Form.Label>Site Name</Form.Label>
            <Form.Control  as="select" onChange={changeUnitName}>
            <option>Select a Site Name</option> 
            {
                site.map((s)=>(
                    <option value={s.siteId+" "+s.siteCode}>{s.siteName}</option>
                ))
            }  
           

            </Form.Control>
        </Form.Group>
        </div>
        <div className="col-4">
        <Form.Group controlId="unittype">
            <Form.Label>Parking Type</Form.Label>
            <Form.Control  as="select" onChange={changeParking}>
            <option>Select a Parking Type</option>   
            <option value="OP Open-Parking">Open Parking</option>
            <option value="GB Ground-Basement">Ground Basement</option>
            <option value="GC Ground-Covered">Ground Covered</option>
              
            </Form.Control>
        </Form.Group>
        </div>
    </div>
    <br />
    <div className="row container-fluid justify-content-center">
        <div className="col-4">
        <Form.Group controlId="unitphase">
            <Form.Label>Parking Phase</Form.Label>
            <Form.Control  as="select" onChange={(e)=>setUphase(e.target.value)}>
            <option>Select a Unit Phase</option>   
            <option value="PI" style={{display : ptc === "GC" || ptc === "" ? "block": "none"}}>Phase 1</option>
            <option value="PII" style={{display : ptc === "GC" || ptc === "" || ptc ==="GB" ? "block": "none"}}>Phase 2</option>
            <option value="Common" style={{display : ptc === "OP" || ptc === "" ? "block": "none"}}>Common</option>
            </Form.Control>
        </Form.Group>
        </div>

        <div className="col-4">

        
        <label>Parking Number</label>
            
        <input type="number" class="form-control" onChange={(e)=>setPn(e.target.value)}/>
            

        </div>
        
        
    </div>
    
       
    
    <div className="row container-fluid justify-content-center">
        <div className="col-4 text-right">
            <button className="btn btn-secondary btn-user" type="reset"  style={{backgroundColor: "white", color: "black"}}>Reset</button>

        </div>
        <div className="col-4">
            <button className="btn btn-secondary btn-user" onClick={addCarParking}>Add Parking </button>
                                        
        </div>
    </div>
    </form>
        </>
    );
}

export default AddCarParking;