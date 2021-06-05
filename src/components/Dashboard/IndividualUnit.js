import React, {useState, useEffect} from "react"
import { useParams , navigate} from "@reach/router"
import { Form } from "react-bootstrap";
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";
import {IoMdArrowBack} from 'react-icons/io'

function IndividualUnit(){
    const {unitName} = useParams()
    const [ uname, setUname ] = useState("")
    const [ ustatus, setUstatus ] = useState("")
    const [ sname, setSname] = useState("")
    const [ utype, setUtype ] = useState("")
    const [ uphase, setUphase ] = useState("")
    const [ ufloor, setUfloor ] = useState("")

    useEffect(() => { 
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/unit/getunitbyunitname/${unitName}`,{ headers : { 'Authorization' : Token }})
        .then(response => {
            console.log(response)
            setSname(response.data.unitSiteId)
            setUstatus(response.data.status)
            setUname(response.data.unitName)
            setUphase(response.data.unitPhaseName)
            setUtype(response.data.unitTypeName)
            setUfloor(response.data.unitFloor)
        })
    }, [])

    return(
        <>
       <div className="mt-3 row container-fluid justify-content-center">
            <div className="col-12">
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={() => navigate(-1)}><IoMdArrowBack />Back</button>
            </div>
        </div>
        <br />
        <div className="row container-fluid justify-content-center">
        <div className="col-4">
        <label>Site</label>
            <input
            type="text"
            class="form-control"
            name="site"
            id="site"
            value={sname}
           // onChange={(e)=>setSname(e.target.value)}
            />
        </div>
        <div className="col-4">
        <label>Status</label>
            <input
            type="text"
            class="form-control"
            name="status"
            id="status"
            value={ustatus}
           // onChange={(e)=>setSname(e.target.value)}
            />
        </div>
        <div className="col-4">
        <label>Unit Name</label>
            <input
            type="text"
            class="form-control"
            name="uname"
            id="uname"
            value={uname}
           // onChange={(e)=>setSname(e.target.value)}
            />
        </div>

        </div>
        <br />
        <div className="row container-fluid justify-content-center">
        
        <div className="col-4">
        <label>Unit Phase</label>
            <input
            type="text"
            class="form-control"
            name="uphase"
            id="uphase"
            value={uphase}
           // onChange={(e)=>setSname(e.target.value)}
            />
        </div>
        <div className="col-4">
        <label>Unit Type</label>
            <input
            type="text"
            class="form-control"
            name="utype"
            id="utype"
            value={"Flat " + utype}
           // onChange={(e)=>setSname(e.target.value)}
            />
        </div>
        <div className="col-4">
        <label>Unit Floor</label>
            <input
            type="number"
            class="form-control"
            name="ufloor"
            id="ufloor"
            value={ufloor}
           // onChange={(e)=>setSname(e.target.value)}
            />
        </div>
        </div>
        <br />
        <div className="row container-fluid justify-content-center">
        
        </div>
        <br />
      {/*  <div className="row container-fluid justify-content-center">
        <div className="col-4 text-right">
            <button className="btn btn-secondary btn-user" type="reset"  style={{backgroundColor: "white", color: "black"}}>Reset</button>

        </div>
        <div className="col-4">
            <button className="btn btn-secondary btn-user" >Save</button>
                                        
        </div>
    </div> */}
        </>
    )
}

export default IndividualUnit;