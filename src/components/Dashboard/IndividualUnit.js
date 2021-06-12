import React, {useState, useEffect} from "react"
import { useParams , navigate} from "@reach/router"
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Form, useAccordionToggle } from "react-bootstrap";
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
    const [ugrossprice, setUgrossprice ] = useState("")
    const [gstamount, setGstamount ] = useState("")
    const [uprice, setUprice ] = useState("")
    const [obsqf, setObsqf ] = useState(false)
    const [bsqf, setBsqf] = useState("")
    const [oplc, setOplc] = useState(false)
    const [plc, setPlc] = useState("")
    const [disp, setDisp] = useState("none")
    const [uca, setUca] = useState("")
    const [uba, setUba] = useState("")
    const [ubua, setUbua] = useState("")
    const [usbua, setUsbua] = useState("")
    const [ca, setCa] = useState("")
    const [ua, setUa ] = useState("")
    const [gstpercent, setGstpercent] = useState("")
    const [discount, setDiscount] = useState("")
    const [ucsqf, setUcsqf] = useState("")

    const save = (e) => {
        const Token = 'bearer' + " " + Cookies.get('Token')
        if(obsqf === true && oplc === false){
        axios.put(`${BASE_URL}/api/v1/unit/updateUnitprice`,
        { 
            unitName: uname,
            overrideBaseSqft: obsqf,
            baseSqFtRate: bsqf*1,
            overridePLC: oplc
        }
        ,{ headers : { 'Authorization' : Token }})
        .then(response => { 
            console.log(response)
            setDisp("block")
        })
        }

        else if(obsqf === false && oplc === true){
        axios.put(`${BASE_URL}/api/v1/unit/updateUnitprice`,
        { 
            unitName: uname,
            overrideBaseSqft: obsqf,
            overridePLC: oplc,
            newPLC: plc*1,
        }
        ,{ headers : { 'Authorization' : Token }})
        .then(response => { 
            console.log(response)
            setDisp("block")
        })
        }

        else if(obsqf === true && oplc === true){
        axios.put(`${BASE_URL}/api/v1/unit/updateUnitprice`,
        { 
            unitName: uname,
            overrideBaseSqft: obsqf,
            baseSqFtRate: bsqf*1,
            overridePLC: oplc,
            newPLC: plc*1,
        }
        ,{ headers : { 'Authorization' : Token }})
        .then(response => { 
            console.log(response)
            setDisp("block")
        })
        }
    }

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
            setUgrossprice(response.data.unitGrossPrice)
            setGstamount(response.data.gstAmount)
            setUprice(response.data.unitPrice)
            setBsqf(response.data.baseSqFeetRate)
            setPlc(response.data.preferredLocationCharge)
            setUca(response.data.carpetArea)
            setUba(response.data.balconyArea)
            setUbua(response.data.builtUpArea)
            setUsbua(response.data.superBuiltUpArea)
            setCa(response.data.createdAt)
            setUa(response.data.updatedAt)
            setGstpercent(response.data.gstPercentage)
            setDiscount(response.data.discount)
            setUcsqf(response.data.chargeableSqFeetRate )
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
        <div className="tabs-container" id="tabs-container" style={{paddingTop: "10px"}}>
        <Tab.Container id="left-tabs-example" defaultActiveKey={Cookies.get('ActiveUnitKey')}>
        <Row>
        <Col sm={12}>
        <center>
        <Nav variant="pills" className="justify-content-center flex-row">
            <Nav.Item onClick={()=>{Cookies.set('ActiveUnitKey', 'first')}}>
            <Nav.Link className="tabs" eventKey="first">Flat/Unit Details</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={()=>{Cookies.set('ActiveUnitKey', 'second')}}>
            <Nav.Link className="tabs" eventKey="second">Flat/Unit Price Details</Nav.Link>
            </Nav.Item>
        </Nav>
        </center>
        </Col>
        </Row>
        <br />

        <Row>
        <Col sm={12}>
            <Tab.Content>
                <Tab.Pane eventKey="first">
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
                
                <div className="col-4">
                <label>Carpet Area</label>
                    <input
                    type="text"
                    class="form-control"
                    name="uca"
                    id="uca"
                    value={uca}
                // onChange={(e)=>setUca(e.target.value)}
                    />
                </div>
                <div className="col-4">
                <label>Balcony Area</label>
                    <input
                    type="text"
                    class="form-control"
                    name="uba"
                    id="uba"
                    value={uba}
                // onChange={(e)=>setUba(e.target.value)}
                    />
                </div>
                <div className="col-4">
                <label>Built Up Area</label>
                    <input
                    type="number"
                    class="form-control"
                    name="ubua"
                    id="ubua"
                    value={ubua}
                // onChange={(e)=>setUbua(e.target.value)}
                    />
                </div>
                </div>

                <br />
                <div className="row container-fluid justify-content-center">
                
                <div className="col-4">
                <label>Super Built Up Area</label>
                    <input
                    type="text"
                    class="form-control"
                    name="usbua"
                    id="usbua"
                    value={usbua}
                // onChange={(e)=>setUsbua(e.target.value)}
                    />
                </div>
                <div className="col-4">
                <label>Created At</label>
                    <input
                    type="date"
                    class="form-control"
                    name="ca"
                    id="ca"
                    value={ca.substring(0,10)}
                // onChange={(e)=>setCa(e.target.value)}
                    />
                </div>
                <div className="col-4">
                <label>Updated At</label>
                    <input
                    type="date"
                    class="form-control"
                    name="ua"
                    id="ua"
                    value={ua.substring(0,10)}
                // onChange={(e)=>setUa(e.target.value)}
                    />
                </div>
                </div>
                

                </Tab.Pane>
                <Tab.Pane eventKey="second">
                <br />
                <div className="row container-fluid justify-content-center">
                <div className="col-4">
                <label>Unit Gross Price</label>
                    <input
                    type="number"
                    class="form-control"
                    name="ugrossprice"
                    id="ugrossprice"
                    value={ugrossprice}
                // onChange={(e)=>setUgrossprice(e.target.value)}
                    />
                </div>
                <div className="col-4">
                <label>GST Amount</label>
                    <input
                    type="number"
                    class="form-control"
                    name="gstamount"
                    id="gstamount"
                    value={gstamount}
                // onChange={(e)=>setGstamount(e.target.value)}
                    />
                </div>
                <div className="col-4">
                <label>Unit Price</label>
                    <input
                    type="number"
                    class="form-control"
                    name="uprice"
                    id="uprice"
                    value={uprice}
                // onChange={(e)=>setSname(e.target.value)}
                    />
                </div>
                </div>
                <br />
                <div className="row container-fluid justify-content-center">
                
                <div className="col-4">
                <label>GST Percentage</label>
                    <input
                    type="number"
                    class="form-control"
                    name="gstpercent"
                    id="gstpercent"
                    value={gstpercent}
                // onChange={(e)=>setGstpercent(e.target.value)}
                    />
                </div>
                <div className="col-4">
                <label>Base Sq. Feet Rate</label>
                    <input
                    type="number"
                    class="form-control"
                    value={bsqf}
                // onChange={(e)=>setDiscount(e.target.value)}
                    />
                </div>
                <div className="col-4">
                <label>Chargeable Sq. Feet Rate</label>
                    <input
                    type="number"
                    class="form-control"
                    name="ucsqf"
                    id="ucsqf"
                    value={ucsqf}
                // onChange={(e)=>setUcsqf(e.target.value)}
                    />
                </div>
                </div>
                <br />
                <div className="row container-fluid">
                    <div className="col-6 mt-auto">
                        <label>Override Base Sq. Feet Rate:</label>
                    
                        <input type="radio" className="form-check-input" name="obsf" value={true} onChange={(e)=>setObsqf(true)}/>
                        <label className="pl-5">Yes</label>

                        <input type="radio" className="form-check-input" name="obsf" value={false}  onChange={(e)=>setObsqf(false)}/>
                        <label className="pl-5">No</label>
                        
                    </div>
                    { obsqf === true ?
                    <>
                    <div className="col-6">
                        <label>Base Sq. Feet Rate</label>
                        <input
                            type="number"
                            class="form-control"
                            name="bsqf"
                            id="bsqf"
                            value={bsqf}
                            onChange={(e)=>setBsqf(e.target.value)}
                            />
                    </div>
                    </>
                    : 
                    null
                    }
                </div>
            
                <div className="row mt-3 container-fluid">
                    <div className="col-6 mt-auto">
                        <label>Override PLC:</label>
                    
                        <input type="radio" className="form-check-input" name="oplc" value={true} onChange={(e)=>setOplc(true)}/>
                        <label className="pl-5">Yes</label>

                        <input type="radio" className="form-check-input" name="oplc" value={false}  onChange={(e)=>setOplc(false)}/>
                        <label className="pl-5">No</label>
                        
                    </div>
                    { oplc === true ?
                    <>
                    <div className="col-6">
                        <label>PLC</label>
                        <input
                            type="number"
                            class="form-control"
                            name="plc"
                            id="plc"
                            value={plc}
                            onChange={(e)=>setPlc(e.target.value)}
                            />
                    </div>
                    </>
                    : 
                    null
                    }
                </div>
                <br />
                <div className="text-center" style={{display : disp}}><em>All details saved succesfully!</em></div>
                <br />
                <div className="row container-fluid justify-content-center">

                <div className="col-4 text-center">
                    <button className="btn btn-secondary btn-user" style={{ display : obsqf === true || oplc === true ? "inline-block": "none"}} onClick={save}>Save</button>
                                                
                </div>
                </div> 
                </Tab.Pane>
            </Tab.Content>
        </Col>
        </Row>
        </Tab.Container>
        </div>
       
        </>
    )
}

export default IndividualUnit;