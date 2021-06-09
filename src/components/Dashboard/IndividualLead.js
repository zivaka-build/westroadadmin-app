import React, {useState,useEffect} from "react"
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Form } from "react-bootstrap";
import { useParams, navigate } from "@reach/router"
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";
import MaterialTable from "material-table";
import {IoMdArrowBack} from 'react-icons/io'
import {ReactComponent as Edit} from "./../../assets/icons/Vector.svg"
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';

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

function IndividualLead() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
        setSvStatus("")
        setSiteVisitStatus("")
    };

    const {leadID}=useParams()
    const [name, setName ] = useState("");
    const [mobile, setMobile ] = useState("");
    const [whatsapp, setWhatsapp ] = useState("");
    const [email, setEmail ] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity ] = useState("");
    const [pincode, setPincode ] = useState("");
    const [source, setSource ] = useState("");
    const [status, setStatus ] = useState("New Lead");
    const [type, setType ] = useState("Hot");
    const [siteName, setSiteName ] = useState("");
    const [requirement, setRequirement ] = useState("");
    const [budget, setBudget ] = useState("");
    const [subType, setSubType] = useState("");
    const [comments, setComments] = useState([])
    const [sites, setSites ] = useState([])
    const [users, setUsers] = useState([])
    const [comment, setComment] = useState("")
    const [toggle, setToggle] = useState(0)

    const [contactPerson, setContactPerson] = useState("")
    const [contactPersonNo, setContactPersonNo] = useState("")
    const [dateTime, setDateTime] = useState("")
    const [sn, setSn] = useState("")
    const [sid, setSid] = useState("")
    const [sv, setSv] = useState([])

    const [svid, setSvid] = useState("")
    const [ svStatus, setSvStatus] = useState("")
    const [ siteVisitStatus, setSiteVisitStatus] = useState("")
    const [ remarks, setRemarks] = useState("")
    const [ creason, setCreason] = useState("")
    const [ rdate, setRdate] = useState("")
    const [phoneValidated, setPhoneValidated] = useState(true)


    const toggleDiv = () => {
        if(toggle === 0) {
            setToggle(1)
        }
        else {
            setToggle(0)
        }

    }

    const changeCperson = (e) => {
        const cp = e.target.value
        setContactPerson(cp.substring(cp.indexOf(' ') + 1))
        
        const id = cp.substring(0, cp.indexOf(' '))
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios
            .get(`${BASE_URL}/api/v1/user/getListOfUsers`,{ headers : { 'Authorization' : Token }})
            .then(response =>{
                const arr = response.data
                
                for(var i=0;i<=arr.users.length - 1;i++) {
                    if(arr.users[i].userId === id){
                        setContactPersonNo(arr.users[i].userMobile)
                    }
                }           
            })
    }

    const changeSiteName = (e) => {
        const sn = e.target.value
        setSn(sn.substring(sn.indexOf(' ') + 1))
        setSid(sn.substring(0, sn.indexOf(' ')))
    }

    const scheduleVisit = (e) => {
        e.preventDefault()
        if(phoneValidated==true){
            const Token = 'bearer' + " " + Cookies.get('Token')
        axios
        .post(`${BASE_URL}/api/v1/siteVisit/addSitevisitByLeadId`,{siteVisitDate: dateTime, contactPerson: contactPerson,contactPersonMobile:contactPersonNo,leadID: leadID,siteID: sid,siteName: sn},{ headers : { 'Authorization' : Token }})
        .then(response => {
            console.log(response)
            window.location.reload()
        })
        }
        
    }

    const addComment = (e) => {
        const Token = 'bearer' + " " + Cookies.get('Token')
        e.preventDefault()
        axios
            .post(`${BASE_URL}/api/v1/lead/addCommentByLeadID`,{comment: comment, commentedBy: Cookies.get('FullName'),commentType:"User",leadID: leadID},{ headers : { 'Authorization' : Token }})
            .then(response => {
                console.log(response)
                window.location.reload()
            })

    }

    const editSv = () => {
        const Token = 'bearer' + " " + Cookies.get('Token')
        if(svStatus === "Completed") {
           
                axios
                .post(`${BASE_URL}/api/v1/siteVisit/completeSiteVisit`,{siteVisitId: svid, siteVisitStatus: siteVisitStatus, siteVisitRemarks : remarks},{ headers : { 'Authorization' : Token }})
                .then(response => {
                    console.log(response)
                    window.location.reload()
                })
           
            
        }

        else if(svStatus === "Cancelled"){
            axios
                .post(`${BASE_URL}/api/v1/siteVisit/cancelSiteVisit`,{siteVisitId: svid, cancellationReason: creason},{ headers : { 'Authorization' : Token }})
                .then(response => {
                    console.log(response)
                    window.location.reload()
                })
        }

        else if(svStatus === "Rescheduled"){
            axios
                .put(`${BASE_URL}/api/v1/siteVisit/rescheduleSiteVisitByLeadId`,{siteVisitId: svid, siteVisitDate: rdate},{ headers : { 'Authorization' : Token }})
                .then(response => {
                    console.log(response)
                    window.location.reload()
                })
        }
    }

    const PhNo = (e) =>{
        var val = e.target.value
        setContactPersonNo(val)
        
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

    useEffect(() => {
       
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios
            .get(`${BASE_URL}/api/v1/lead/getLeadByLeadId/${leadID}`,{ headers : { 'Authorization' : Token }})
            .then(response=>{
                console.log(response.data)
                setName(response.data.lead.name)
                setMobile(response.data.lead.phone)
                setWhatsapp(response.data.lead.whatsapp)
                setEmail(response.data.lead.email)
                setAddress(response.data.lead.address)
                setCity(response.data.lead.city)
                setPincode(response.data.lead.pincode)
                setSource(response.data.lead.leadSource)
                setSubType(response.data.lead.subType)
                setSiteName(response.data.lead.siteName)
                setType(response.data.lead.leadWeightage)
                setRequirement(response.data.lead.leadReq)
                setBudget(response.data.lead.leadBudget)

                
                const comments = response.data.lead.comments.map((cmt)=>{
                    const {comment,commentTime,commentType,commentedBy} = cmt
                    const formattedTime = commentTime.substring(11,13)+":"+commentTime.substring(14,16)+", "+commentTime.substring(8,10)+"-"+commentTime.substring(5,7)+"-"+commentTime.substring(0,4)
                    
                    return {
                        comment,
                        commentTime: formattedTime,
                        commentType,
                        commentedBy
                        
                      };
                })
                setComments(comments.reverse())

        axios
            .get(`${BASE_URL}/api/v1/lead/getlistofsitevisitbyleadid/${leadID}`,{ headers : { 'Authorization' : Token }})
            .then(response => {
                console.log(response.data)
                setSv(response.data.reverse())
            })
            })

            axios
            .get(`${BASE_URL}/api/v1/site/getAllSiteNames`,{ headers : { 'Authorization' : Token }})
            .then(response => {
                setSites(response.data.siteMap)
            })

            axios
            .get(`${BASE_URL}/api/v1/user/getListOfUserNames`,{ headers : { 'Authorization' : Token }})
            .then(response => {
                setUsers(response.data.userMap)
            })
    }, [])

    return(
        <div>
        <div className="mt-3 row container-fluid justify-content-center px-1" >
            <div className="col-12">
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={()=>navigate("/dashboard/viewlead")}><IoMdArrowBack />Back</button>
            </div>
        </div>
        <div className="tabs-container" id="tabs-container">

        <Tab.Container id="left-tabs-example" defaultActiveKey={Cookies.get('ActiveKey')}>
            <Row>
                <Col sm={12}>
                <center>
                <Nav variant="pills" className="justify-content-center flex-row">
                    <Nav.Item onClick={()=>{Cookies.set('ActiveKey', 'first')}}>
                    <Nav.Link className="tabs" eventKey="first">Lead Details</Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={()=>{Cookies.set('ActiveKey', 'second')}}>
                    <Nav.Link className="tabs" eventKey="second">Site Visit</Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={()=>{Cookies.set('ActiveKey', 'third')}}>
                    <Nav.Link className="tabs" eventKey="third">Quotation</Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={()=>{Cookies.set('ActiveKey', 'fourth')}}>
                    <Nav.Link className="tabs" eventKey="fourth">Comments</Nav.Link>
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
                  
                        <div className="tab-card container-fluid">
                          <div className="row pt-3 justify-content-center">

                                <div className="col-8">
                                <div className="row">
                                    <div className="col-4">
                                        <h3 className="mt-3 pl-2" style={{backgroundColor : "#EE4B46", borderRadius : "33px", color: "white"}}>Lead ID - {leadID} </h3>
                                    </div>
                                </div>
                                <br />
                                    <label>Name</label>
                                    <input
                                    type="text"
                                    class="form-control"
                                    name="name"
                                    id="outlined-basic"
                                    onChange={(e)=>setName(e.target.value)}
                                    value={name}
                                    />
                                </div>
                                </div>
                                <br />
                                <div className="row justify-content-center">
                                <div className="col-4">
                                    <label>Contact No.</label>
                                    <input
                                    type="number"
                                    class="form-control"
                                    name="contact"
                                    id="outlined-basic"
                                    onChange={(e)=>setMobile(e.target.value)}
                                    value={mobile}
                                    />
                                </div>
                                <div className="col-4">
                                    <label>Whatsapp No.</label>
                                    <input
                                    type="number"
                                    class="form-control"
                                    name="whatsapp"
                                    id="outlined-basic"
                                    onChange={(e)=>setWhatsapp(e.target.value)}
                                    value={whatsapp}
                                    />
                                </div>
                                </div>
                                <br />
                                <div className="row justify-content-center">
                                <div className="col-8">
                                    <label>Email ID</label>
                                    <input
                                    type="email"
                                    class="form-control"
                                    name="email"
                                    id="outlined-basic"
                                    onChange={(e)=>setEmail(e.target.value)}
                                    value={email}
                                    />
                                </div>
                                </div>
                                <br />
                                <div className="row justify-content-center">
                                <div className="col-8">
                                    <label>Address</label>
                                    <input
                                    type="text"
                                    class="form-control"
                                    name="address"
                                    id="outlined-basic"
                                    onChange={(e)=>setAddress(e.target.value)}
                                    value={address}
                                    />
                                </div>
                                </div>
                                <br />
                                <div className="row justify-content-center">
                                <div className="col-4">
                                    <label>City</label>
                                    <input
                                    type="text"
                                    class="form-control"
                                    name="city"
                                    id="outlined-basic"
                                    onChange={(e)=>setCity(e.target.value)}
                                    value={city}
                                    />
                                </div>
                                <div className="col-4">
                                    <label>Pincode</label>
                                    <input
                                    type="number"
                                    class="form-control"
                                    name="pincode"
                                    id="outlined-basic"
                                    onChange={(e)=>setPincode(e.target.value)}
                                    value={pincode}
                                    />
                                </div>
                                </div>
                                <br />
                                <div className="row justify-content-center">
                                <div className="col-4">
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Lead Source</Form.Label>
                                    <Form.Control onChange={(e)=>setSource(e.target.value)} value={source} as="select">
                                    <option>Select a source</option>   
                                    <option>99Acres</option>
                                    <option>Newspaper</option>
                                    <option>Hoarding</option>
                                    <option>Website</option>
                                    <option>Facebook</option>
                                    <option>Referral</option>
                                    </Form.Control>
                                    </Form.Group>
                                </div>
                                <div className="col-4">
                                    <Form.Group controlId="exampleForm.ControlSelect2">
                                    <Form.Label>Lead Status</Form.Label>
                                    <Form.Control as="select" disabled="disabled">
                                    <option selected>New Lead</option>
                                
                                    </Form.Control>
                                    </Form.Group>
                                </div>
                                
                                </div>
                                <div className="row justify-content-center">
                                { source === "Newspaper" ? 
                                <>
                                <div className="col-8">
                                    <Form.Group controlId="exampleForm.ControlSelect3">
                                    <Form.Label>Newspaper Name</Form.Label>
                                    <Form.Control as="select" onChange={(e)=>setSubType(e.target.value)} value={subType}>
                                    <option>Times Of India</option>
                                    <option>Anandabazar Patrika</option>
                                    </Form.Control>
                                    </Form.Group>
                                </div>
                                </> : null
                            }
                            
                                { source === "99Acres" ? 
                                <>
                                <div className="col-8">
                                    <Form.Group controlId="exampleForm.ControlSelect4">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control as="select" onChange={(e)=>setSubType(e.target.value)} value={subType}>
                                    <option>Conventional</option>
                                    <option>Omni</option>
                                    </Form.Control>
                                    </Form.Group>
                                </div>
                                </> : null
                                }
                            { source === "Referral" ? 
                                <>
                                <div className="col-8">
                                <label>Details</label>
                                    <input
                                    type="text"
                                    class="form-control"
                                    name="details"
                                    id="outlined-basic"
                                    onChange={(e)=>setSubType(e.target.value)}
                                    value={subType}
                                    />
                                    <br />
                                </div>
                                
                                </> : null
                                }
                                </div>
                                
                                <div className="row justify-content-center">
                                <div className="col-4">
                                <Form.Group controlId="exampleForm.ControlSelect2">
                                    <Form.Label>Lead Type</Form.Label>
                                    <Form.Control onChange={(e)=>setType(e.target.value)} value={type} as="select">
                                    <option>Hot</option>
                                    <option>Normal</option>
                                    <option>Cold</option>
                                    <option>Walk In</option>
                                
                                    </Form.Control>
                                    </Form.Group>
                                </div>
                                <div className="col-4">
                                <label>Site Name</label>
                                    <input
                                    type="text"
                                    class="form-control"
                                    name="sitename"
                                    id="outlined-basic"
                                    onChange={(e)=>setSiteName(e.target.value)}
                                    value={siteName}
                                    />
                                </div>
                                </div>
                                <br />
                                <div className="row justify-content-center">
                                <div className="col-4">
                                <label>Requirement</label>
                                    <input
                                    type="text"
                                    class="form-control"
                                    name="requirement"
                                    id="outlined-basic"
                                    onChange={(e)=>setRequirement(e.target.value)}
                                    value={requirement}
                                    />
                                </div>
                                <div className="col-4">
                                <label>Budget</label>
                                    <input
                                    type="text"
                                    class="form-control"
                                    name="budget"
                                    id="outlined-basic"
                                    onChange={(e)=>setBudget(e.target.value)}
                                    value={budget}
                                    />
                                </div>
                                </div>
                                <br />
                                <div className="row justify-content-center">
                                <div className=" col-2">
                                        <button
                                            className="btn btn-secondary btn-user btn-block"
                                        
                                        >
                                            Save
                                        </button>
                                        </div>
                                </div>
                        </div>
                 
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                    <div className="tab-card container-fluid">
                        <div className="row pt-3 pb-3 justify-content-center">
                            <div className="col-12 text-center">
                            <button className="btn btn-secondary btn-user" onClick={toggleDiv} style={{borderRadius : "10px"}}>Schedule A Visit</button>
                            </div>
                            {toggle === 1 ?
                            <>
                            <div className="col-12 pt-4 scheduleVisit">
                            <form onSubmit={scheduleVisit}>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        <label for="dateTime">Date & Time</label>
                                        <input required className="form-control" type="datetime-local" id="dateTime" name="dateTime" onChange={(e)=>{setDateTime(e.target.value)}}/>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Contact Person</Form.Label>
                                        <Form.Control required as="select" onChange={changeCperson}>
                                        <option value="">Select a Contact Person</option>   
                                        {users.map((user) => (
                                        <option value={user.userId+" "+user.userFullName}>{user.userFullName}</option> 
                                        ))}
                                        
                                        </Form.Control>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        <Form.Group controlId="exampleForm.ControlSelect2">
                                        <Form.Label>Site Name</Form.Label>
                                        <Form.Control required as="select" onChange={changeSiteName}>
                                        <option value="">Select a Site</option> 
                                        {sites.map((site) => (
                                        <option value={site.SiteId+" "+site.SiteName}>{site.SiteName}</option> 
                                        ))}
                                          
                                        
                                        </Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <label>Contact Person No.</label>
                                        <input
                                        type="number"
                                        class="form-control"
                                        name="contactPersonNo"
                                        id="outlined-basic-phno"
                                        onChange={PhNo}
                                        value={contactPersonNo}
                                        required/>
                                        <small id="phnoMessage" className="text-danger d-none">
                                            Must be of 10 characters with numbers only
                                        </small>   
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4 text-right">
                                    <button className="btn btn-secondary btn-user" type="reset" style={{borderRadius : "10px", backgroundColor: "white", color: "black"}}>Reset</button>

                                    </div>
                                    <div className="col-4">
                                    <button className="btn btn-secondary btn-user" type="submit" style={{borderRadius : "10px"}}>Schedule</button>
                                    
                                    </div>
                                </div>
                                </form>
                                
                            </div>
                            </>
                            : null}
                        <div className="col-12 pt-4">
                            <MaterialTable
                                    title="Site Visit Details"sv
                                    data={sv}
                                    columns={
                                        [
                                            { title: 'Site Visit ID', field: 'siteVisitId' },
                                            { title: 'Site ID', field: 'siteID'},
                                            { title: 'Site Name', field: 'siteName' },
                                            { title: 'Contact Person', field: 'contactPerson' },
                                            { title: 'Contact Person No.', field: 'contactPersonMobile' },
                                            { title: 'Date & Time', render: (rowData) => rowData.siteVisitDate.substring(8,10)+"-"+rowData.siteVisitDate.substring(5,7)+"-"+rowData.siteVisitDate.substring(0,4)+", "+rowData.siteVisitDate.substring(11,16) },
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
                                    actions={[
                                        {
                                            icon: () => <Edit />,
                                            tooltip: 'Edit',
                                            onClick: (event, rowData) => {
                                                setOpen(true)
                                                setSvid(rowData.siteVisitId)
                                           }
                                        }
            
                                    ]}
                                ></MaterialTable>
                        </div>
                        </div>
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
                               
                                    <Form.Group controlId="status">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control  as="select" onChange={(e)=> setSvStatus(e.target.value)}>
                                        <option>Select a Status</option>
                                        <option value="Completed">Completed</option>    
                                        <option value="Cancelled">Cancelled</option> 
                                        <option value="Rescheduled">Rescheduled</option> 
                                        </Form.Control>
                                    </Form.Group>
                                    
                                    { 
                                    svStatus === "Completed" ?
                                    <>
                                    <Form.Group controlId="status">
                                        <Form.Label>Site Visit Status</Form.Label>
                                        <Form.Control  as="select" onChange={(e)=>setSiteVisitStatus(e.target.value)}>
                                        <option>Select a Site Visit Status</option>
                                        <option value="Interested">Interested</option>    
                                        <option value="Not Interested">Not Interested</option>
                                        </Form.Control>
                                    </Form.Group>
                                    { 
                                    siteVisitStatus === "Interested" || siteVisitStatus === "Not Interested"?
                                    <>
                                     <label>Remarks</label>
                                     <input
                                    type="text"
                                    class="form-control"
                                    name="remarks"
                                    onChange={(e)=>setRemarks(e.target.value)}
                                    />
                                    </> 
                                    : null
                                    }
                                    <br />
                                    <div className="text-center">
                                    <button className="btn btn-secondary btn-user" onClick={editSv}>
                                    Save
                                    </button>
                                    &nbsp;&nbsp;
                                    <button className="btn btn-secondary btn-user" onClick={handleClose} style={{backgroundColor : "white", color : "black"}}>
                                    Cancel
                                    </button>
                                    </div>
                                    </>
                                    : null
                                    }

                                    { 
                                        svStatus === "Cancelled" ?
                                        <>
                                        <label>Reason for cancellation</label>
                                        <input
                                        type="text"
                                        class="form-control"
                                        name="reason"
                                        onChange={(e)=>setCreason(e.target.value)}
                                        />

                                        <br />
                                        <div className="text-center">
                                        <button className="btn btn-secondary btn-user" onClick={editSv}>
                                        Save
                                        </button>
                                        &nbsp;&nbsp;
                                        <button className="btn btn-secondary btn-user" onClick={handleClose} style={{backgroundColor : "white", color : "black"}}>
                                        Cancel
                                        </button>
                                        </div>
                                        </> : null
                                    }

                                    { 
                                        svStatus === "Rescheduled" ?
                                        <>
                                        <label>Reschedule on</label>
                                        <input
                                        type="datetime-local"
                                        class="form-control"
                                        name="rdate"
                                        onChange={(e)=>setRdate(e.target.value)}
                                        />

                                        <br />
                                        <div className="text-center">
                                        <button className="btn btn-secondary btn-user" onClick={editSv}>
                                        Save
                                        </button>
                                        &nbsp;&nbsp;
                                        <button className="btn btn-secondary btn-user" onClick={handleClose} style={{backgroundColor : "white", color : "black"}}>
                                        Cancel
                                        </button>
                                        </div>
                                        </> : null
                                    }
                            </div>
                            </Fade>
                    </Modal>
                    </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                    
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                    <div className="tab-card pb-4 container-fluid">
                        <form onSubmit={addComment}>
                        <div className="row pt-4 justify-content-center">
                            <div className="col-8">
                            <input
                                type="text"
                                class="form-control"
                                name="comment"
                                id="outlined-basic"
                                onChange={(e)=>setComment(e.target.value)}
                                required
                            />    
                            </div>
                            <div className="col-8 text-right pt-2 px-2">
                            <button
                            className="btn btn-secondary btn-user">
                            Add Comment
                            </button>
                            </div>
                        </div>
                        </form>
                        <div className="row justify-content-center">
 
                        <div className="pt-3 col-lg-11" style={{ paddingTop: "10px" }}>
        
                            <MaterialTable 
                                data={comments}
                                title="Comments"
                                columns={
                                    [
                                        { title: 'Comment', field: 'comment' },
                                        { title: 'Commented At', field: 'commentTime'},
                                        { title: 'Commented By', field: 'commentedBy' },
                                        { title: 'Comment Type', field: 'commentType' },
                                       

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
                                </div>
                        
                            
                    </div>
                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>
        </div>
    </div>
    )
}

export default IndividualLead;