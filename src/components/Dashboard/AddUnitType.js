import React, {useState, useEffect} from "react"
import { navigate, useParams } from "@reach/router"
import { Form } from "react-bootstrap";
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";
import {IoMdArrowBack} from 'react-icons/io'

function AddUnitType() {
    const {siteID} = useParams()
    const [phase, setPhase ] = useState([])

    const [un, setUn] = useState("")
    const [bhk, setBhk] = useState("")
    const [ca, setCa] = useState("")
    const [ba, setBa] = useState("")
    const [bua, setBua] = useState("")
    const [sbua, setSbua] = useState("")
    const [plc, setPlc] = useState("")
    const [rate, setRate ] = useState("")
    const [pc, setPc ] = useState("")
    const [pn, setPn] = useState("")

    const changePhase = (e) => {
        var str = e.target.value
        setPn(str.substring(str.indexOf(' ') + 1))
        setPc(str.substring(0, str.indexOf(' ')))
    }

    const back = () => {
        navigate(`/dashboard/individualsite/${siteID}`)
    }

    const addUnitType = (e) => {
        const Token = "bearer" + " " + Cookies.get("Token");

        e.preventDefault()
        axios
            .post(`${BASE_URL}/api/v1/site/addUnitTypeBySiteId`,
            {
                siteId : siteID,
                unitTypeName: un,
                bhk: bhk,
                carpetArea: ca,
                balconyArea: ba,
                builtUpArea: bua,
                superBuiltUpArea: sbua,
                preferredLocationCharge: plc,
                baseSqFeetRate: rate,
                phaseCode: pc,
                phaseName: pn
            },
            { headers : { 'Authorization' : Token }})
            .then(response => {
                navigate(`/dashboard/individualsite/${siteID}`)
               
            })
    }


    useEffect(() => { 
        const Token = "bearer" + " " + Cookies.get("Token");

        axios.get(`${BASE_URL}/api/v1/site/getSiteBySiteId/${siteID}`,{headers:{Authorization:Token}})
        .then(response => {
            console.log(response.data.site.phases)
            setPhase(response.data.site.phases)
           
        })
       
    }, [])

    return(
        <>
        <div className="mt-3 row container-fluid justify-content-center">
            <div className="col-12">
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={back}><IoMdArrowBack />Back</button>
            </div>
        </div>
        <div className="row container-fluid justify-content-center">
            <div className="col-8">
            <h4>Add Unit Type</h4>
            </div>
        </div>
        <br />
        <form onSubmit={addUnitType}>
        <div className="row container-fluid justify-content-center">
            <div className="col-4">
                <label>Unit Name</label>
                <input
                type="text"
                class="form-control"
                name="unitname"
                id="unitname"
                onChange={(e)=>setUn(e.target.value)}
                required/>
            </div>
            <div className="col-4">
            <Form.Group controlId="bhk">
                <Form.Label>BHK</Form.Label>
                <Form.Control required  as="select" onChange={(e)=>setBhk(e.target.value)}>
                <option value="">Select a BHK</option>   
                <option value="1BHK">1BHK</option>
                <option value="2BHK">2BHK</option>
                <option value="3BHK">3BHK</option>
                </Form.Control>
            </Form.Group>
            </div>
        </div>
        <br />
        <div className="row container-fluid justify-content-center">
            <div className="col-4">
                <label>Carpet Area</label>
                <input
                type="number"
                class="form-control"
                name="carpetarea"
                id="carpetarea"
                onChange={(e)=>setCa(e.target.value)}
                required/>
            </div>
            <div className="col-4">
                <label>Balcony Area</label>
                <input
                type="number"
                class="form-control"
                name="balconyarea"
                id="balconyarea"
                onChange={(e)=>setBa(e.target.value)}
                required/>
            </div>
        </div>
        <br />
        <div className="row container-fluid justify-content-center">
            <div className="col-4">
                <label>Built Up Area</label>
                <input
                type="number"
                class="form-control"
                name="builtuparea"
                id="builtuparea"
                onChange={(e)=>setBua(e.target.value)}
                required/>
            </div>
            <div className="col-4">
                <label>Super Built Up Area</label>
                <input
                type="number"
                class="form-control"
                name="sbuarea"
                id="sbuarea"
                onChange={(e)=>setSbua(e.target.value)}
                required/>
            </div>
        </div>
        <br />
        <div className="row container-fluid justify-content-center">
            <div className="col-4">
                <label>Preferred Location Charge</label>
                <input
                type="number"
                class="form-control"
                name="plc"
                id="plc"
                onChange={(e)=>setPlc(e.target.value)}
                required/>
            </div>
            <div className="col-4">
                <label>Base Sq. Ft. Rate</label>
                <input
                type="number"
                class="form-control"
                name="rate"
                id="rate"
                onChange={(e)=>setRate(e.target.value)}
                required/>
            </div>
        </div>
        <br />
        <div className="row container-fluid justify-content-center">
            <div className="col-4">
            <Form.Group controlId="phasename">
                <Form.Label>Phase Name</Form.Label>
                <Form.Control required  as="select" onChange={changePhase}>
                <option value="">Select a Phase Name</option>   
                { 
                    phase.map((p)=>(
                        <option value={p.phaseCode+" "+p.phaseName}>{p.phaseName}</option>
                    ))
                }
                </Form.Control>
            </Form.Group>
            </div>
        </div>
        <div className="row container-fluid justify-content-center">
            <div className="col-4 text-right">
                <button className="btn btn-secondary btn-user" type="reset"  style={{backgroundColor: "white", color: "black"}}>Reset</button>

            </div>
            <div className="col-4">
                <button type="submit" className="btn btn-secondary btn-user" >Add Unit</button>
                                            
            </div>
        </div>

        </form>
        
        </>
    )
}

export default AddUnitType;