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
import { TrendingUpTwoTone } from "@material-ui/icons"

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

    const [open2, setOpen2] = React.useState(false);

    const handleClose2 = () => {
        setOpen2(false);
    };

    const [open3, setOpen3] = React.useState(false);

    const handleClose3 = () => {
        setOpen3(false);
    };

    const [open4, setOpen4] = React.useState(false);

    const handleClose4 = () => {
        setOpen4(false);
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
    const [lclength, setLclength] = useState(0)
    const [pterms, setPterms] = useState([])
    const [pt, setPt] = useState([])
    const [ptbol, setPtbol] = useState(false)
    const [termId, setTermId] = useState("")

    const [disp, setDisp] = useState("none")
    const [disp1, setDisp1] = useState("none")

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

    const [oldcptype, setOldcptype] = useState("")
    const [cptype, setCptype] = useState("")
    const [cptypecode, setCptypecode] = useState("")
    const [cpprice, setCpprice] = useState(0)
    const [cptotal, setCptotal] = useState(0)
    const [addCarParking, setAddCarParking] = useState(0)

    const [oldocname, setOldocname] = useState("")
    const [ocname, setOcname] = useState("")
    const [ocamount, setOcamount] = useState(0)
    const [ocgst, setOcgst] = useState(0)
    const [ocps, setOcps] = useState()
    const [ocf, setOcf] = useState()
    const [addOtherCharges, setAddOtherCharges] = useState(0)

    const [lcserial, setLcserial] = useState("")
    const [oldbhk, setOldbhk] = useState("")
    const [lcdesc, setLcdesc] = useState("")
    const [lcbhk, setLcbhk] = useState("")
    const [lcamount, setLcamount] = useState(0)
    const [lcgst, setLcgst] = useState(0)
    const [addLegalCharges, setAddLegalCharges] = useState(0)

    const updateCarParking = (e) => {
        e.preventDefault()
        const Token = "bearer" + " " + Cookies.get("Token");
        if(addCarParking === 0) {
        axios.put(`${BASE_URL}/api/v1/site/updateCarParkingType`,{siteId : siteID, typeCode : oldcptype, newtypeCode: cptypecode,type : cptype, totalCount : cptotal, price: cpprice*1},{headers:{Authorization:Token}})
        .then(response => {
            axios.get(`${BASE_URL}/api/v1/site/getSiteBySiteId/${siteID}`,{headers:{Authorization:Token}})
                .then(response => { 
                    setParking(response.data.site.carParkingType)
                    setOpen2(false)
                })
            })
        }
        else if(addCarParking === 1){
        axios.post(`${BASE_URL}/api/v1/site/addCarparkingTypes`,{siteId : siteID, typeCode : cptypecode, type : cptype, totalCount : cptotal, price: cpprice*1},{headers:{Authorization:Token}})
        .then(response => {
            axios.get(`${BASE_URL}/api/v1/site/getSiteBySiteId/${siteID}`,{headers:{Authorization:Token}})
                .then(response => { 
                    setParking(response.data.site.carParkingType)
                    setAddCarParking(0)
                    setOpen2(false)
                })
            })
        }
    }

    const updateOtherCharges = (e) => {
        e.preventDefault()
        if(addOtherCharges === 0){
        const Token = "bearer" + " " + Cookies.get("Token");
        axios.put(`${BASE_URL}/api/v1/site/updateOtherCharges`,{siteId : siteID, otherChargesName : oldocname, newotherChargesName: ocname,amount : ocamount*1, gst : ocgst*1, fixed: ocf, perSqFt : ocps},{headers:{Authorization:Token}})
        .then(response => {
            axios.get(`${BASE_URL}/api/v1/site/getSiteBySiteId/${siteID}`,{headers:{Authorization:Token}})
                .then(response => { 
                    setCharges(response.data.site.otherCharges)
                    setOpen3(false)
                })
            })
        }
        else if(addOtherCharges === 1){
            const Token = "bearer" + " " + Cookies.get("Token");
            axios.post(`${BASE_URL}/api/v1/site/addOtherCharges`,{siteId : siteID, name: ocname,amount : ocamount*1, gst : ocgst*1, fixed: ocf, perSqFt : ocps},{headers:{Authorization:Token}})
            .then(response => {
                axios.get(`${BASE_URL}/api/v1/site/getSiteBySiteId/${siteID}`,{headers:{Authorization:Token}})
                    .then(response => { 
                        setCharges(response.data.site.otherCharges)
                        setOpen3(false)
                        setAddOtherCharges(0)
                    })
                })
            }
    }

    const updateLegalCharges = (e) => {
        e.preventDefault()
        const Token = "bearer" + " " + Cookies.get("Token");
        if(addLegalCharges === 0){
        axios.put(`${BASE_URL}/api/v1/site/updateLegalCharges`,{siteId : siteID, serial: lcserial, newserial: lcserial, bhk: oldbhk, newbhk : lcbhk, gst : lcgst*1, amount : lcamount*1, description: lcdesc},{headers:{Authorization:Token}})
        .then(response => {
            axios.get(`${BASE_URL}/api/v1/site/getSiteBySiteId/${siteID}`,{headers:{Authorization:Token}})
                .then(response => { 
                    setLcharges(response.data.site.legalCharges)
                    setOpen4(false)
                })
            })
        }
        else if(addLegalCharges === 1){
            axios.post(`${BASE_URL}/api/v1/site/addLegalCharges`,{siteId : siteID, serial: lcserial, bhk: lcbhk, gst : lcgst*1, amount : lcamount*1, description: lcdesc},{headers:{Authorization:Token}})
            .then(response => {
            axios.get(`${BASE_URL}/api/v1/site/getSiteBySiteId/${siteID}`,{headers:{Authorization:Token}})
                .then(response => { 
                    setLcharges(response.data.site.legalCharges)
                    setOpen4(false)
                    setLclength(response.data.site.legalCharges.length)
                })
            })

        }
    }
  


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

    const editSite1 = (e) => {
        e.preventDefault()
        const Token = "bearer" + " " + Cookies.get("Token");
        axios.put(`${BASE_URL}/api/v1/site/updateSite/${siteID}`,
        { 
            floorEscalationCharge: fec,
            builtUpAreaFactor: buaf,
            superBuiltUpAreaFactor: sbuaf,
            unitGSTPercentage: ugp
           
        }
        ,{headers:{Authorization:Token}})
          .then(response => {
            setDisp1("block")
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
            setLclength(response.data.site.legalCharges.length)
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
                    <div className="text-center" style={{display : disp1}}><em>All details saved succesfully!</em></div>
                    <div className="row mt-2 justify-content-center">
    
                        <div className="col-12 text-center">

                            <button className="btn btn-secondary btn-user" onClick={editSite1}>Save</button>
                                                        
                        </div>
                    </div>
                    <br />
                    <div className="mt-2 container-fluid justify-content-center">
                    <h4>Car Parking<button className="btn btn-secondary btn-user float-right" onClick={()=> {setAddCarParking(1);setCptype(""); setCptypecode(""); setCpprice(""); setCptotal(""); setOpen2(true)}}>Add</button></h4>
                    <br />
                    <table class="table">
                        <thead style={{backgroundColor : "#EE4B46", color : "#fff"}}>
                            <tr>
                            <th scope="col">Car Parking Type</th>
                            <th scope="col">Car Parking Type Code</th>
                            <th scope="col">Price</th>
                            <th scope="col">Total Count</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parking.map((p)=>(
                                <tr>
                                <td>{p.type}</td>
                                <td>{p.typeCode}</td>
                                <td>{p.price}</td>
                                <td>{p.totalCount}</td>
                                <td><button className="btn btn-secondary btn-user" onClick={()=> {setAddCarParking(0);setOldcptype(p.typeCode);setCptype(p.type); setCptypecode(p.typeCode); setCpprice(p.price); setCptotal(p.totalCount); setOpen2(true)}}>Edit</button></td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open2}
                        onClose={handleClose2}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                        >
                            <Fade in={open2}>
                            <div className={classes.paper}>
                            <form onSubmit={updateCarParking}>
                            <div className="row container-fluid justify-content-center">
                                <div className="col-6">
                                    <label>Car Parking Type</label>
                                    <input
                                    type="text"
                                    class="form-control"
                                    name="cptype"
                                    id="cptype"
                                    value={cptype}
                                    onChange={(e)=>setCptype(e.target.value)}
                                    required
                                    />
                                </div>
                                <div className="col-6">
                                    <label>Car Parking Type Code</label>
                                    <input
                                    type="text"
                                    class="form-control"
                                    name="cptypecode"
                                    id="cptypecode"
                                    value={cptypecode}
                                    onChange={(e)=>setCptypecode(e.target.value)}
                                    required
                                    />
                                
                                </div>
                            </div>
                            <br />
                            <div className="row container-fluid justify-content-center">
                                <div className="col-6">
                                    <label>Car Parking Price</label>
                                    <input
                                    type="number"
                                    class="form-control"
                                    name="cpprice"
                                    id="cpprice"
                                    value={cpprice}
                                    onChange={(e)=>setCpprice(e.target.value)}
                                    required
                                    />
                                </div>
                                <div className="col-6">
                                    <label>Total</label>
                                    <input
                                    type="number"
                                    class="form-control"
                                    name="cptotal"
                                    id="cptotal"
                                    value={cptotal}
                                    onChange={(e)=>setCptotal(e.target.value)}
                                    required
                                    />
                                
                                </div>
                            </div>
                            <br />
                            <div className="row container-fluid justify-content-center">
                            <div className="col-6 text-right">
                                <button className="btn btn-secondary btn-user" type="submit">Save</button>           
                            </div>
                            <div className="col-6 text-left">
                                <button className="btn btn-secondary btn-user" onClick={handleClose2} style={{backgroundColor: "white", color: "black"}}>Close</button>
                            </div>
                            </div>
                            </form>
                            
                            </div>
                            
                            </Fade>
                        </Modal>
                    </div>
                    <br />
                    <div className="mt-2 container-fluid justify-content-center">
                    
                    <h4>Other Charges <button className="btn btn-secondary btn-user float-right" onClick={() => {setAddOtherCharges(1); setOcname(""); setOcamount(""); setOcgst(); setOcps(false); setOcf(false) ;setOpen3(true)}}>Add</button></h4>
                  
                    <br />
                    <table class="table">
                        <thead style={{backgroundColor : "#EE4B46", color : "#fff"}}>
                            <tr>
                            <th scope="col">Charge</th>
                            <th scope="col">Amount</th>
                            <th scope="col">GST</th>
                            <th scope="col">Charge Type</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {charges.map((c)=>(
                            <tr>
                            <td>{c.name}</td>
                            <td>{c.amount}</td>
                            <td>{c.gst}</td>
                            <td>{ c.perSqFt === true ? "Per Sq. Feet": "Fixed" }</td>
                            <td><button className="btn btn-secondary btn-user" onClick={()=> {setAddOtherCharges(0); setOldocname(c.name); setOcname(c.name); setOcamount(c.amount); setOcgst(c.gst); if(c.perSqFt === true) { setOcps(true); setOcf(false)} else if(c.perSqFt === false){ setOcps(false); setOcf(true)} ;setOpen3(true)}}>Edit</button></td>
                            </tr>
                            ))}
                            
                        </tbody>
                    </table>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open3}
                        onClose={handleClose3}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                        >
                            <Fade in={open3}>
                            <div className={classes.paper}>
                            <form onSubmit={updateOtherCharges}>
                            <div className="row container-fluid justify-content-center">
                                <div className="col-12">
                                    <label>Charge Name</label>
                                    <input
                                    type="text"
                                    class="form-control"
                                    name="ocname"
                                    id="ocname"
                                    value={ocname}
                                    onChange={(e)=>setOcname(e.target.value)}
                                    required
                                    />
                                </div>
                                
                            </div>
                            <br />
                            <div className="row container-fluid justify-content-center">
                                <div className="col-6">
                                    <label>Amount</label>
                                    <input
                                    type="text"
                                    class="form-control"
                                    name="ocamount"
                                    id="ocamount"
                                    value={ocamount}
                                    onChange={(e)=>setOcamount(e.target.value)}
                                    required
                                    />
                                
                                </div>
                                <div className="col-6">
                                    <label>GST</label>
                                    <input
                                    type="number"
                                    class="form-control"
                                    name="ocgst"
                                    id="ocgst"
                                    value={ocgst}
                                    onChange={(e)=>setOcgst(e.target.value)}
                                    required
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="row container-fluid justify-content-center">
                                <div className="col-12 control">
                                <label class="text-align left">Charge Type : </label>
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="octype"
                                    checked={ocps === true ? true : null}
                                    onChange={(e)=>{setOcps(true); setOcf(false)}}
                                    required
                                    />
                                <label class="form-check-label pl-5">
                                    Per Sq. Feet
                                </label>
                                
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="octype"
                                    checked={ocf === true ? true : null}
                                    onChange={(e)=>{setOcf(true); setOcps(false)}}
                                    required
                                    />
                                <label class="form-check-label pl-5">
                                    Fixed
                                </label>

                                </div>
                            </div>
                            <br />
                            <div className="row container-fluid justify-content-center">
                            <div className="col-6 text-right">
                                <button className="btn btn-secondary btn-user" type="submit">Save</button>           
                            </div>
                            <div className="col-6 text-left">
                                <button className="btn btn-secondary btn-user" onClick={handleClose3} style={{backgroundColor: "white", color: "black"}}>Close</button>
                            </div>
                            </div>
                            </form>
                            </div>
                            
                            </Fade>
                        </Modal>
                    </div>
                    <br />
                    <div className="mt-2 container-fluid justify-content-center">
                    <h4>Legal Charges<button className="btn btn-secondary btn-user float-right" onClick={()=> {setAddLegalCharges(1); setLcserial(lclength + 1); setLcdesc(""); setLcbhk(""); setLcamount(""); setLcgst(""); setOpen4(true)}}>Add</button></h4>
                    <br />
                    <table class="table">
                        <thead style={{backgroundColor : "#EE4B46", color : "#fff"}}>
                            <tr>
                            <th scope="col">Description</th>
                            <th scope="col">BHK</th>
                            <th scope="col">Amount</th>
                            <th scope="col">GST</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lcharges.map((l)=>(
                                <tr>
                                <td>{l.description}</td>
                                <td>{l.bhk}</td>
                                <td>{l.amount}</td>
                                <td>{l.gst}</td>
                                <td><button className="btn btn-secondary btn-user" onClick={()=> {setAddLegalCharges(0); setLcserial(l.serial); setOldbhk(l.bhk); setLcdesc(l.description); setLcbhk(l.bhk); setLcamount(l.amount); setLcgst(l.gst); setOpen4(true)}}>Edit</button></td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open4}
                        onClose={handleClose4}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                        >
                            <Fade in={open4}>
                            <div className={classes.paper}>
                            <form onSubmit={updateLegalCharges}>
                            <div className="row container-fluid justify-content-center">
                                <div className="col-12">
                                    <label>Description</label>
                                    <input
                                    type="text"
                                    class="form-control"
                                    name="lcdesc"
                                    id="lcdesc"
                                    value={lcdesc}
                                    onChange={(e)=>setLcdesc(e.target.value)}
                                    required
                                    />
                                </div>
                                
                            </div>
                            <br />
                            <div className="row container-fluid justify-content-center">
                                <div className="col-6">
                                    <label>BHK</label>
                                    <input
                                    type="text"
                                    class="form-control"
                                    name="lcbhk"
                                    id="lcbhk"
                                    value={lcbhk}
                                    onChange={(e)=>setLcbhk(e.target.value)}
                                    required
                                    />
                                
                                </div>
                                <div className="col-6">
                                    <label>Amount</label>
                                    <input
                                    type="number"
                                    class="form-control"
                                    name="lcamount"
                                    id="lcamount"
                                    value={lcamount}
                                    onChange={(e)=>setLcamount(e.target.value)}
                                    required
                                    />
                                </div>
                                
                            </div>
                            <br />
                            <div className="row justify-content-center">
                                <div className="col-6">
                                    <label>GST</label>
                                    <input
                                    type="number"
                                    class="form-control"
                                    name="lcgst"
                                    id="lcgst"
                                    value={lcgst}
                                    onChange={(e)=>setLcgst(e.target.value)}
                                    required
                                    />
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className="row container-fluid justify-content-center">
                            <div className="col-6 text-right">
                                <button className="btn btn-secondary btn-user" type="submit">Save</button>           
                            </div>
                            <div className="col-6 text-left">
                                <button className="btn btn-secondary btn-user" onClick={handleClose4} style={{backgroundColor: "white", color: "black"}}>Close</button>
                            </div>
                            </div>
                            </form>
                            </div>
                            
                            </Fade>
                        </Modal>
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
                                Cookies.set('ActiveUnitKey', 'first')
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