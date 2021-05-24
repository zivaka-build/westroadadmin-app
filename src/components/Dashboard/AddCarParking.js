import React, {useState, useEffect} from "react"
import { useParams , navigate} from "@reach/router"
import { Form } from "react-bootstrap";
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";

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
        axios
            .post(`${BASE_URL}/api/v1/parking/addNewCarParking`,{ siteId: sid, phaseCode: uphase, parkingType:pt, parkingTypeCode: ptc, parkingNumber:pn*1},{ headers : { 'Authorization' : Token }})
            .then(response => {
                console.log(response)
                navigate(`/dashboard/individualsite/${sid}`)
               
            })
    }
    return(
        <>
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
            <Form.Label>Unit Type Name</Form.Label>
            <Form.Control  as="select" onChange={changeParking}>
            <option>Parking Type</option>   
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
            <Form.Label>Unit Phase</Form.Label>
            <Form.Control  as="select" onChange={(e)=>setUphase(e.target.value)}>
            <option>Select a Unit Phase</option>   
            <option value="PI">Phase 1</option>
            <option value="PII">Phase 2</option>
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