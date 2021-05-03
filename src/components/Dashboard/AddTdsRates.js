import React,{useState} from "react";
import axios from "axios";
import { BASE_URL } from "./../../config/url";
import Cookies from 'js-cookie'; 
import { navigate } from "@reach/router";


function AddTdsRates() {
    const [ ts, setTs ] = useState("");
    const [ et, setEt ] = useState("");
    const [ desc, setDesc ] = useState("");
    const [ taxs, setTaxs ] = useState("");

    const submit = (e) => {
        const Token = 'bearer' + " " + Cookies.get('Token')
        e.preventDefault()
        axios
            .post(`${BASE_URL}/api/v1/tdsrates/addtdsrate`,{TDSsection: ts,entityType: et,description: desc,taxSlab: taxs},{ headers : { 'Authorization' : Token }})
            .then(response => {
                console.log(response)
                navigate("/dashboard/viewtdsrates")
            })
    }


    return(
    <>
    <div className="mt-5 row container-fluid justify-content-center">
        <div className="col-8">
        <h4>Add TDS Rate</h4>
        </div>
    </div>
    <form>
    <div className="mt-5 row container-fluid justify-content-center">
        <div className="col-4">
            <label>TDS Section</label>
            <input
            type="text"
            class="form-control"
            name="tdssection"
            id="tdssection"
            onChange={(e)=>setTs(e.target.value)}
            />
        </div>
        <div className="col-4">
            <label>Entity Type</label>
            <input
            type="text"
            class="form-control"
            name="entitytype"
            id="entitytype"
            onChange={(e)=>setEt(e.target.value)}
            />
        </div>
    </div>
    <div className="mt-3 row container-fluid justify-content-center">
        <div className="col-6">
            <label>Description</label>
            <input
            type="text"
            class="form-control"
            name="description"
            id="description"
            onChange={(e)=>setDesc(e.target.value)}
            />
        </div>
        <div className="col-2">
            <label>Tax Slab</label>
            <input
            type="number"
            class="form-control"
            name="taxslab"
            id="taxslab"
            onChange={(e)=>setTaxs(e.target.value)}
            />
        </div>
    </div>
    <div className="mt-5 row container-fluid justify-content-center">
        <div className="col-4 text-right">
            <button className="btn btn-secondary btn-user" type="reset" style={{backgroundColor: "white", color: "black"}}>Reset</button>

        </div>
        <div className="col-4">
            <button className="btn btn-secondary btn-user" onClick={submit}>Add TDS Rate</button>
                                    
        </div>
    </div>
    </form>
    
    </>
    );
}

export default AddTdsRates;

