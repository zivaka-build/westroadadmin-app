import React, {useState, useEffect} from "react"
import { useParams , navigate} from "@reach/router"
import { Form } from "react-bootstrap";
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";
import {IoMdArrowBack} from 'react-icons/io'

function AddUnit() {
    const {siteID} = useParams()
    const [ uname, setUname ] = useState("")
    const [ sid, setSid ] = useState("")
    const [ scode, setScode] = useState("")
    const [ utype, setUtype ] = useState("")
    const [ uphase, setUphase ] = useState("")
    const [ ufloor, setUfloor ] = useState("")
    const [ site, setSite ] = useState([])

    const changeUnitName = (e) => {
        var str = e.target.value
        setScode(str.substring(str.indexOf(' ') + 1))
        setSid(str.substring(0, str.indexOf(' ')))
    }

    const back = () => {
        navigate(`/dashboard/individualsite/${siteID}`)
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

    const addUnit = (e) => {
        const Token = 'bearer' + " " + Cookies.get('Token')
        e.preventDefault()
        axios
            .post(`${BASE_URL}/api/v1/unit/addNewUnit`,{unitName: scode+"-"+ufloor+"-"+utype, unitSiteId: sid,unitTypeName: utype,unitPhase: uphase,unitFloor: ufloor*1},{ headers : { 'Authorization' : Token }})
            .then(response => {
                console.log(response)
                navigate(`/dashboard/individualsite/${siteID}`)
               
            })
    }
    return(
        <>
        <div className="mt-3 row container-fluid justify-content-center">
            <div className="col-12">
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={back}><IoMdArrowBack />Back</button>
            </div>
        </div>
        <div className="row container-fluid justify-content-center">
            <div className="col-8">
            <h4>Add Unit</h4>
            </div>
        </div>
        <br />
        <form onSubmit={addUnit}>
        <div className="row container-fluid justify-content-center">
        <div className="col-4">
        <Form.Group controlId="sitename">
            <Form.Label>Site Name</Form.Label>
            <Form.Control  as="select" onChange={changeUnitName} required>
            <option value="">Select a Site Name</option> 
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
            <Form.Control  as="select" onChange={(e)=>setUtype(e.target.value)} required>
            <option value="">Select a Unit Type</option>   
            <option value="A">Flat A</option>
            <option value="B">Flat B</option>
            <option value="C">Flat C</option>
            <option value="D">Flat D</option>
            <option value="E">Flat E</option>
            <option value="F">Flat F</option>
            <option value="G">Flat G</option>
            <option value="H">Flat H</option>
            <option value="I">Flat I</option>
            <option value="J">Flat J</option>

            </Form.Control>
        </Form.Group>
        </div>
    </div>
    <br />
    <div className="row container-fluid justify-content-center">
        <div className="col-4">
        <Form.Group controlId="unitphase">
            <Form.Label>Unit Phase</Form.Label>
            <Form.Control  as="select" onChange={(e)=>setUphase(e.target.value)} required>
            <option value="">Select a Unit Phase</option>   
            <option value="PI">Phase 1</option>
            <option value="PII">Phase 2</option>
            </Form.Control>
        </Form.Group>
        </div>
        <div className="col-4">
            <label>Unit Floor</label>
            <input
            type="number"
            class="form-control"
            name="unitfloor"
            id="unitfloor"
            required
            onChange={(e)=>setUfloor(e.target.value)}
            />
        </div>
    </div>
    <div className="row container-fluid justify-content-center">
        <div className="col-4 text-right">
            <button className="btn btn-secondary btn-user" type="reset"  style={{backgroundColor: "white", color: "black"}}>Reset</button>

        </div>
        <div className="col-4">
            <button className="btn btn-secondary btn-user" type="submit">Add Unit</button>
                                        
        </div>
    </div>
    </form>
        </>
    );
}

export default AddUnit;