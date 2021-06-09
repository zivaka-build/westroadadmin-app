import React, {useState,useEffect} from "react"
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Form } from "react-bootstrap";
import { useParams } from "@reach/router"
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";
import MaterialTable from "material-table";
import { navigate } from "@reach/router";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {ReactComponent as Edit} from "./../../assets/icons/Vector.svg"

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  }));

function IndividualSite() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const [open1, setOpen1] = React.useState(false);

    const handleClose1 = () => {
        setOpen1(false);
    };


    const {siteID} = useParams()
    const [leads, setLeads] = useState([]);
    const [form,setForm] = useState([]);
    const [car, setCar] = useState([]);
    const [unitType, setUnitType] = useState([]);

    const [sn, setSn] = useState("")
    const [sc, setSc] = useState("")
    const [hr, setHr] = useState("")
    const [desc, setDesc] = useState("")
    const [adr, setAdr] = useState("")
    const [lm, setLm] = useState("")
    const [pc, setPc] = useState("")
    const [ct, setCt] = useState("")
    const [st, setSt] = useState("")
    const [fec, setFec] = useState("")
    const [buaf, setBuaf] = useState("")
    const [sbuaf, setSbuaf] = useState("")
    const [cpo, setCpo] = useState("")
    const [cpc, setCpc] = useState("")
    const [ugp, setUgp] = useState("")
    const [scn, setScn] = useState("")
    const [bpsn, setBpsn] = useState("")

    const [parking, setParking] = useState([])
    const [charges, setCharges] = useState([])
    const [lcharges, setLcharges] = useState([])
    const [pterms, setPterms] = useState([])
    const [pt, setPt] = useState([])
    const [ptbol, setPtbol] = useState(false)
    const [termId, setTermId] = useState("")

    const [disp, setDisp] = useState("none")

    const [phase, setPhase ] = useState([])

    const [un, setUn] = useState("")
    const [bhk, setBhk] = useState("")
    const [ca, setCa] = useState("")
    const [ba, setBa] = useState("")
    const [bua, setBua] = useState("")
    const [sbua, setSbua] = useState("")
    const [plc, setPlc] = useState("")
    const [rate, setRate ] = useState("")
    const [upc, setUpc ] = useState("")
    const [pn, setPn] = useState("")

    const [dvpc, setDvpc] = useState("")
  


    const addUnit = () => {
        navigate(`/dashboard/addunit/${siteID}`)
    }

    const addUnitType = () => {
        navigate(`/dashboard/addunittype/${siteID}`)
    }

    const AddCarParking = () => {
        navigate("/dashboard/addcarparking")
    }

    const changePhase = (e) => {
        const Token = "bearer" + " " + Cookies.get("Token");
        var termId = e.target.value
        setTermId(e.target.value)
        axios.get(`${BASE_URL}/api/v1/paymentTerms/getPaymentTermsById/${termId}`,{headers:{Authorization:Token}})
        .then(response => {
            console.log(response)
            setPtbol(true)
            setPterms(response.data.paymentTerms.termItems)
            })
    }

    const changePh = (e) => {
        var str = e.target.value
        setPn(str.substring(str.indexOf(' ') + 1))
        setUpc(str.substring(0, str.indexOf(' ')))
    }

    const editSite = (e) => {
        e.preventDefault()
        const Token = "bearer" + " " + Cookies.get("Token");
        axios.put(`${BASE_URL}/api/v1/site/updateSite/${siteID}`,
        { 
            siteName: sn,
            siteCode: sc,
            siteHIRANo: hr,
            siteCompanyName: scn,
            buildingPlanSanctionNo: bpsn,
            siteDescription: desc,
            siteAddress : {
                fullAddress : adr,
                landmark: lm,
                pinCode: pc,
                city: ct,
                state: st,
            },
           
        }
        ,{headers:{Authorization:Token}})
          .then(response => {
            setDisp("block")
            console.log(response)
          })
    }

    const updateUnitType = (e) => {
        const Token = "bearer" + " " + Cookies.get("Token");
        e.preventDefault()
        axios.put(`${BASE_URL}/api/v1/site/updateUnitTypeBySiteId`,
        { siteId : siteID,
          unitTypeName: un,
          bhk: bhk,
          carpetArea: ca,
          balconyArea: ba,
          builtUpArea: bua,
          preferredLocationCharge: plc,
          baseSqRate: rate,
          phaseCode: upc,
          phaseName: pn
        }
        ,{headers:{Authorization:Token}})
          .then(response => {
            axios.get(`${BASE_URL}/api/v1/site/getSiteBySiteId/${siteID}`,{headers:{Authorization:Token}})
            .then(response => { 
                setUnitType(response.data.site.unitTypes)
            })
            setOpen(false)
          })
    }

    const deleteUnitType = (e) => {
        const Token = "bearer" + " " + Cookies.get("Token");
        e.preventDefault()
        axios.post(`${BASE_URL}/api/v1/site/deleteUnitTypeBySiteId`,
        { siteId : siteID,
          unitTypeName: un,
        }
        ,{headers:{Authorization:Token}})
          .then(response => {
            axios.get(`${BASE_URL}/api/v1/site/getSiteBySiteId/${siteID}`,{headers:{Authorization:Token}})
            .then(response => { 
                setUnitType(response.data.site.unitTypes)
            })
            setOpen1(false)
          })
    }

    useEffect(() => {
        const Token = "bearer" + " " + Cookies.get("Token");
        axios.get(`${BASE_URL}/api/v1/unit/getlistofunit`,{headers:{Authorization:Token}})
          .then(response => {
        
            setForm(response.data)
          })

        axios.get(`${BASE_URL}/api/v1/parking/getListOfCarParking`,{headers:{Authorization:Token}})
          .then(response => {

            setCar(response.data)
          })

        axios.get(`${BASE_URL}/api/v1/site/getSiteBySiteId/${siteID}`,{headers:{Authorization:Token}})
        .then(response => {

            console.log(response.data.site.unitTypes)
            setUnitType(response.data.site.unitTypes)
            console.log(response.data)
            setSn(response.data.site.siteName)
            setSc(response.data.site.siteCode)
            setHr(response.data.site.siteHIRANo)
            setScn(response.data.site.siteCompanyName)
            setBpsn(response.data.site.buildingPlanSanctionNo)
            setDesc(response.data.site.siteDescription)
            setAdr(response.data.site.siteAddress.fullAddress)
            setLm(response.data.site.siteAddress.landmark)
            setPc(response.data.site.siteAddress.pinCode)
            setCt(response.data.site.siteAddress.city)
            setSt(response.data.site.siteAddress.state)
            setFec(response.data.site.floorEscalationCharge)
            setBuaf(response.data.site.builtUpAreaFactor)
            setSbuaf(response.data.site.superBuiltUpAreaFactor)
            setUgp(response.data.site.unitGSTPercentage)
            setParking(response.data.site.carParkingType)
            setCharges(response.data.site.otherCharges)
            setLcharges(response.data.site.legalCharges)
            setPt(response.data.site.paymentTerms)
            setPhase(response.data.site.phases)
            
        })


        
      }, []);
    return(
        <>
        <div className="mt-4 tabs-container" id="tabs-container">
        <Tab.Container id="left-tabs-example" defaultActiveKey={Cookies.get('ActiveKeySite')}>
            <Row>
                <Col sm={12}>
                <center>
                <Nav variant="pills" className="justify-content-center flex-row">
                    <Nav.Item onClick={()=>{Cookies.set('ActiveKeySite', 'first')}}>
                    <Nav.Link className="tabs" eventKey="first">Site Details</Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={()=>{Cookies.set('ActiveKeySite', 'second')}}>
                    <Nav.Link className="tabs" eventKey="second">Site Configurations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={()=>{Cookies.set('ActiveKeySite', 'third')}}>
                    <Nav.Link className="tabs" eventKey="third">Payment Terms</Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={()=>{Cookies.set('ActiveKeySite', 'fourth')}}>
                    <Nav.Link className="tabs" eventKey="fourth">Unit Types</Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={()=>{Cookies.set('ActiveKeySite', 'fifth')}}>
                    <Nav.Link className="tabs" eventKey="fifth">Unit</Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={()=>{Cookies.set('ActiveKeySite', 'sixth')}}>
                    <Nav.Link className="tabs" eventKey="sixth">Car Parking</Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={()=>{Cookies.set('ActiveKeySite', 'seventh')}}>
                    <Nav.Link className="tabs" eventKey="seventh">Reports</Nav.Link>
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
                    <div className="row">
                        <div className="col-3">
                         <h3 className="mt-3 pl-2" style={{backgroundColor : "#EE4B46", borderRadius : "33px", color: "white"}}>Site ID - {siteID} </h3>
                        </div>
                    </div>
                    <br />
                    <div className="row justify-content-center">
                        <div className="col-4">
                            <label>Site Code</label>
                            <input
                            type="text"
                            class="form-control"
                            name="sitecode"
                            id="sitecode"
                            value={sc}
                            onChange={(e)=>setSc(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label>Site Name</label>
                            <input
                            type="text"
                            class="form-control"
                            name="sitename"
                            id="sitename"
                            value={sn}
                            onChange={(e)=>setSn(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label>Site HIRA No.</label>
                            <input
                            type="text"
                            class="form-control"
                            name="hirano"
                            id="hirano"
                            value={hr}
                            onChange={(e)=>setHr(e.target.value)}
                            />
                        </div>
                    </div>
                    <br />
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <label>Site Company Name</label>
                            <input
                            type="text"
                            class="form-control"
                            name="scn"
                            id="scn"
                            value={scn}
                            onChange={(e)=>setScn(e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <label>Building Plan Sanction No.</label>
                            <input
                            type="text"
                            class="form-control"
                            name="bpsn"
                            id="sitename"
                            value={bpsn}
                            onChange={(e)=>setBpsn(e.target.value)}
                            />
                        </div>
                    </div>
                    <br />
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <label>Site Description</label>
                            <input
                            type="text"
                            class="form-control"
                            name="desc"
                            id="desc"
                            value={desc}
                            onChange={(e)=>setDesc(e.target.value)}
                            />
                        </div>
                       
                    </div>
                    <br />
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <label>Full Address</label>
                            <input
                            type="text"
                            class="form-control"
                            name="fulladdress"
                            id="fulladdress"
                            value={adr}
                            onChange={(e)=>setAdr(e.target.value)}
                            />
                        </div>
                       
                    </div>
                    <br />
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <label>Landmark</label>
                            <input
                            type="text"
                            class="form-control"
                            name="landmark"
                            id="landmark"
                            value={lm}
                            onChange={(e)=>setLm(e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <label>Pincode</label>
                            <input
                            type="number"
                            class="form-control"
                            name="pincode"
                            id="pincode"
                            value={pc}
                            onChange={(e)=>setPc(e.target.value)}
                            />
                        </div>
                    </div>
                    <br />
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <label>City</label>
                            <input
                            type="text"
                            class="form-control"
                            name="city"
                            id="city"
                            value={ct}
                            onChange={(e)=>setCt(e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <label>State</label>
                            <input
                            type="text"
                            class="form-control"
                            name="state"
                            id="state"
                            value={st}
                            onChange={(e)=>setSt(e.target.value)}
                            />
                        </div>
                    </div>
                    <br />
                    <div className="text-center" style={{display : disp}}><em>All details saved succesfully!</em></div>
                    <div className="row mt-2 justify-content-center">
    
                        <div className="col-12 text-center">

                            <button className="btn btn-secondary btn-user" onClick={editSite}>Save</button>
                                                        
                        </div>
                    </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                    <div className="row justify-content-center">
                        <div className="col-4">
                            <label>Floor Escalation Charge</label>
                            <input
                            type="number"
                            class="form-control"
                            name="fec"
                            id="fec"
                            value={fec}
                            onChange={(e)=>setFec(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label>Built Up Area Factor</label>
                            <input
                            type="number"
                            class="form-control"
                            name="buaf"
                            id="buaf"
                            value={buaf}
                            onChange={(e)=>setBuaf(e.target.value)}
                            />
                        </div>
                        
                    </div>
                    <br />
                    <div className="row justify-content-center">
                        <div className="col-4">
                            <label>Super Built Up Area Factor</label>
                            <input
                            type="number"
                            class="form-control"
                            name="sbuaf"
                            id="sbuaf"
                            value={sbuaf}
                            onChange={(e)=>setSbuaf(e.target.value)}
                            />
                        </div>
                        
                        <div className="col-4">
                            <label>Unit GST Percentage</label>
                            <input
                            type="number"
                            class="form-control"
                            name="ugp"
                            id="ugp"
                            value={ugp}
                            onChange={(e)=>setUgp(e.target.value)}
                            />
                        </div>
                    </div>
                    <br />
                    <div className="mt-2 container-fluid justify-content-center">
                    <h4>Car Parking</h4>
                    <br />
                    <table class="table">
                        <thead style={{backgroundColor : "#EE4B46", color : "#fff"}}>
                            <tr>
                            <th scope="col">Car Parking Type</th>
                            <th scope="col">Car Parking Type Code</th>
                            <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parking.map((p)=>(
                                <tr>
                                <td>{p.type}</td>
                                <td>{p.typeCode}</td>
                                <td>{p.price}</td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                    </div>
                    <br />
                    <div className="mt-2 container-fluid justify-content-center">
                    <h4>Other Charges</h4>
                    <br />
                    <table class="table">
                        <thead style={{backgroundColor : "#EE4B46", color : "#fff"}}>
                            <tr>
                            <th scope="col">Charge</th>
                            <th scope="col">Amount</th>
                            <th scope="col">GST</th>
                            <th scope="col">Charge Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {charges.map((c)=>(
                            <tr>
                            <td>{c.name}</td>
                            <td>{c.amount}</td>
                            <td>{c.gst}</td>
                            <td>{ c.perSqFt === true ? "Per Sq. Feet": "Fixed" }</td>
                            </tr>
                            ))}
                            
                        </tbody>
                    </table>
                    </div>
                    <br />
                    <div className="mt-2 container-fluid justify-content-center">
                    <h4>Legal Charges</h4>
                    <br />
                    <table class="table">
                        <thead style={{backgroundColor : "#EE4B46", color : "#fff"}}>
                            <tr>
                            <th scope="col">Description</th>
                            <th scope="col">BHK</th>
                            <th scope="col">Amount</th>
                            <th scope="col">GST</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lcharges.map((l)=>(
                                <tr>
                                <td>{l.description}</td>
                                <td>{l.bhk}</td>
                                <td>{l.amount}</td>
                                <td>{l.gst}</td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                    </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                    <div className="mt-2 row justify-content-center">
                        <div className="col-4">
                        <Form.Group controlId="paymentTerms">
                            <Form.Label>Phase Code</Form.Label>
                            <Form.Control  as="select" onChange={changePhase}>
                            <option>Select a Phase</option> 
                            {
                                pt.map((s)=>(
                                    <option value={s.termID}>{s.phaseCode}</option>
                                ))
                            }  
                        

                            </Form.Control>
                        </Form.Group>
                        </div>
                    </div>
                    { ptbol === false ?
                    null : 
                    <>
                    <div className="mt-2 row justify-content-center">
                        <div className="col-8">
                        <h4>Payment Term - {termId} </h4> 
                        <br />
                        <table class="table">
                            <thead style={{backgroundColor : "#EE4B46", color : "#fff"}}>
                                <tr>
                                <th scope="col">Sl. No.</th>
                                <th scope="col">Description</th>
                                <th scope="col">Percentage</th>
                                <th scope="col">Completion Status</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                {pterms.map((p)=>(
                                    <tr>
                                    <td>{p.serial}</td>
                                    <td>{p.description}</td>
                                    <td>{p.percentage}</td>
                                    <td>{p.completionStatus === true ? "Yes": "No"}</td>
                                    
                                    </tr>
                                ))}
                                
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </>
                    }
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                    <div className="mt-2">
                    <div className="col-12 text-center">
                    <button className="btn btn-secondary btn-user" onClick={addUnitType}>Add Unit Type</button>
                    </div>
                    <br />
                    <br />
                    <MaterialTable 
                        data={unitType}
                        title="Unit Types"
                        columns={
                            [
                                { title: 'Type Name', field: 'unitTypeName' },
                                { title: 'Phase Name', field: 'phaseName' },
                                { title: 'BHK', field: 'bhk' },
                                { title: 'Carpet', field: 'carpetArea' },
                                { title: 'Balcony', field: 'balconyArea' },
                                { title: 'Built Up', field: 'builtUpArea' },
                                { title: 'Super Built Up', field: 'superBuiltUpArea' },
                                { title: 'PLC', field: 'preferredLocationCharge' },
                                { title: 'Rate', field: 'baseSqFeetRate' },

                            ]
                        }
                        options={{
                            search: true,
                            actionsColumnIndex: -1,
                        }}
                        options={{

                            headerStyle: {
                                backgroundColor: '#EE4B46',
                                color: '#fff',
                            
                            }
                        }}
                        actions={[
                            rowData => ({
                                icon: 'edit',
                                tooltip: 'Update Unit Type',
                                onClick: (event, rowData) => {
                                  setOpen(true)
                                  setUn(rowData.unitTypeName)
                                  setBhk(rowData.bhk)
                                  setCa(rowData.carpetArea)
                                  setBa(rowData.balconyArea)
                                  setBua(rowData.builtUpArea)
                                  setSbua(rowData.superBuiltUpArea)
                                  setPlc(rowData.preferredLocationCharge)
                                  setRate(rowData.baseSqFeetRate)
                                  if(rowData.phaseName === "Phase 1"){
                                      setDvpc("PI Phase 1")
                                      setUpc("PI")
                                      setPn("Phase 1")
                                  }
                                  else if(rowData.phaseName === "Phase 2"){
                                    setDvpc("PII Phase 2")
                                    setUpc("PII")
                                    setPn("Phase 2")
                                  }

                                },
                              }),
                              rowData => ({
                                icon: 'delete',
                                tooltip: 'Delete Unit Type',
                                onClick: (event, rowData) => {
                                  setOpen1(true)
                                  setUn(rowData.unitTypeName)
                                },
                              })
                        ]}
                        ></MaterialTable>
                        <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                        >
                            <Fade in={open}>
                            <div className={classes.paper}>
                            <div className="row container-fluid justify-content-center">
                                <div className="col-6">
                                    <label>Unit Name</label>
                                    <input
                                    required
                                    type="text"
                                    class="form-control"
                                    name="unitname"
                                    id="unitname"
                                    value={un}
                                    onChange={(e)=>setUn(e.target.value)}
                                    />
                                </div>
                                <div className="col-6">
                                <Form.Group controlId="bhk">
                                    <Form.Label>BHK</Form.Label>
                                    <Form.Control required  as="select" value={bhk} onChange={(e)=>setBhk(e.target.value)}>
                                    <option value="">Select a BHK</option>   
                                    <option value="1BHK">1BHK</option> 
                                    <option value="2BHK">2BHK </option>
                                    <option value="3BHK">3BHK</option>
                                    </Form.Control>
                                </Form.Group>
                                </div>
                            </div>
                            <br />
                            <div className="row container-fluid justify-content-center">
                                <div className="col-6">
                                    <label>Carpet Area</label>
                                    <input
                                    required
                                    type="number"
                                    class="form-control"
                                    name="carpetarea"
                                    id="carpetarea"
                                    value={ca}
                                    onChange={(e)=>setCa(e.target.value)}
                                    />
                                </div>
                                <div className="col-6">
                                    <label>Balcony Area</label>
                                    <input
                                    required
                                    type="number"
                                    class="form-control"
                                    name="balconyarea"
                                    id="balconyarea"
                                    value={ba}
                                    onChange={(e)=>setBa(e.target.value)}
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="row container-fluid justify-content-center">
                                <div className="col-6">
                                    <label>Built Up Area</label>
                                    <input
                                    required
                                    type="number"
                                    class="form-control"
                                    name="builtuparea"
                                    id="builtuparea"
                                    value={bua}
                                    onChange={(e)=>setBua(e.target.value)}
                                    />
                                </div>
                                <div className="col-6">
                                    <label>Super Built Up Area</label>
                                    <input
                                    required
                                    type="number"
                                    class="form-control"
                                    name="sbuarea"
                                    id="sbuarea"
                                    value={sbua}
                                    onChange={(e)=>setSbua(e.target.value)}
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="row container-fluid justify-content-center">
                                <div className="col-6">
                                    <label>Preferred Location Charge</label>
                                    <input
                                    required
                                    type="number"
                                    class="form-control"
                                    name="plc"
                                    id="plc"
                                    value={plc}
                                    onChange={(e)=>setPlc(e.target.value)}
                                    />
                                </div>
                                <div className="col-6">
                                    <label>Base Sq. Ft. Rate</label>
                                    <input
                                    required
                                    type="number"
                                    class="form-control"
                                    name="rate"
                                    id="rate"
                                    value={rate}
                                    onChange={(e)=>setRate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="row container-fluid justify-content-center">
                                <div className="col-6">
                                <Form.Group controlId="phasename">
                                    <Form.Label>Phase Name</Form.Label>
                                    <Form.Control required  as="select" defaultValue={dvpc} onChange={changePh}>
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
                            <div className="col-6 text-center">
                                <button className="btn btn-secondary btn-user" onClick={updateUnitType}>Save</button>           
                            </div>
                            </div>

                            </div>
                            
                            </Fade>
                        </Modal>
                        <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open1}
                        onClose={handleClose1}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                        >
                            <Fade in={open1}>
                            <div className={classes.paper}>
                            <h6>Are you sure you want to delete ?</h6>
                            <br />
                            <div className="row container-fluid justify-content-center">
                                
                                <div className="col-4 text-right">
                                    <button className="btn btn-secondary btn-user" onClick={handleClose1}  style={{backgroundColor: "white", color: "black"}}>No</button>

                                </div>
                                <div className="col-4">
                                    <button type="submit" className="btn btn-secondary btn-user" onClick={deleteUnitType}>Yes</button>
                                                                
                                </div>
                            </div>
                            </div>
                            </Fade>
                    </Modal>
                    </div>
                    
                    </Tab.Pane>
                    <Tab.Pane eventKey="fifth">
                    <div className="mt-2 container-fluid px-0">
                    <center>
                    <div className="col-4">
                    <button className="btn btn-secondary btn-user" onClick={addUnit}>Add Unit</button>
                    </div>
                    <div className="col-lg-12 col-sm-12">
                        <br />
                        <br />
                    <MaterialTable data={form}

                        title="Units"
                        columns={
                            [
                                { title: 'Status', field: 'status' },
                                { title: 'Unit Name', field: 'unitName' },
                                { title: 'Unit Type', field: 'unitTypeName' },
                                
                                { title: 'Unit Floor', field: 'unitFloor' },
                                { title: 'Unit Phase', field: 'unitPhaseName' },
                                { title: 'On Hold', field: 'unitOnHold' },

                            ]
                        }
                        options={{
                            search: true,
                            actionsColumnIndex: -1,
                        }}
                        options={{

                            headerStyle: {
                                backgroundColor: '#EE4B46',
                                color: '#fff',
                            
                            }
                        }}

                        actions={[
                            {
                                icon: 'remove_red_eye',
                                tooltip: 'View Unit',
                                onClick: (event, rowData) => {
                                  navigate(`/dashboard/individualunit/${rowData.unitName}`)
                               }
                            }
              
                        ]}
                        ></MaterialTable>
                        </div>
                    </center>
                    </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="sixth">
                    <div className="mt-2 container-fluid px-0">
                    <center>
                    <div className="col-4">
                    <button className="btn btn-secondary btn-user" onClick={AddCarParking}>Add Car Parking</button>
                    </div>
                    <div className="col-lg-12 col-sm-12">
                        <br />
                        <br />
                    <MaterialTable data={car}

                        title="Car Parking"
                        columns={
                            [
                                { title: 'Car Parking Name', field: 'carParkingName' },
                                { title: 'Phase Name', field: 'phaseCode' },
                                { title: 'Parking Type', field: 'parkingType' },
                                { title: 'Status', field: 'status' },

                            ]
                        }
                        options={{
                            search: true,
                            actionsColumnIndex: -1,
                        }}
                        options={{

                            headerStyle: {
                                backgroundColor: '#EE4B46',
                                color: '#fff',
                            
                            }
                        }}
                        ></MaterialTable>
                        </div>
                    </center>
                    </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="seventh">
                    
                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>
        </div>
        </>
    )
}

export default IndividualSite;