import React, {useState,useEffect} from "react"
import { Form } from "react-bootstrap";
import { useParams } from "@reach/router"
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";
import MaterialTable from "material-table";
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from '@material-ui/core/Button';

function IndividualApplicationform() {

    const {applicationId} = useParams()
    const [ applicant, setApplicant ] = useState([])
    let [arr,setArr] =useState([])
    const [ appid, setAppid ] = useState("")
    const [ siteid, setSiteid ] = useState("")
    const [ leadid, setLeadid ] = useState("")
    const [ unitName, setUnitName] = useState("")
    const [ carPark, setCarPark] = useState("")
    const [ status, setStatus] = useState("")
    const [ bookingBy, setBookingBy] = useState("")
    const [ isBankLoan, setIsBankLoan] = useState("")

    const [file, setFile] = useState("");

    
    function handleUpload(event) {
      setFile(event.target.files[0]);
      
    }

    const upload = (e) =>{
        e.preventDefault()
        const Token = 'bearer' + " " + Cookies.get('Token')
        const formData = new FormData()
        formData.append('file',file)
        formData.append('custId','123')
        formData.append('folderName','profile')

        axios.post(`${BASE_URL}/api/v1/util/documentupload`,formData ,{headers:{'Authorization':Token}})
        .then(response=>{
            console.log(response)
            if(response.status === 200){
                alert("File Successfully Uploaded")
            }
        })

    }
    
      
    useEffect(()=>{

        const Token = 'bearer' + " " + Cookies.get('Token')

        axios.get(`${BASE_URL}/api/v1/applicationform/getapplicationformbyapplicationid/${applicationId}`,{headers:{Authorization:Token}})
          .then(response =>{

            console.log(response)
            setAppid(response.data.applicationId)
            setUnitName(response.data.unitName)
            setCarPark(response.data.carParkingName)
            setStatus(response.data.status)
            setBookingBy(response.data.bookingBy)
            setLeadid(response.data.leadId)
            setSiteid(response.data.siteId)
            setIsBankLoan(response.data.isBankLoan)
            
            
            
            
          })

          axios.get(`${BASE_URL}/api/v1/applicant/getlistofapplicantsbyapplicationID/${applicationId}`,{headers:{Authorization:Token}})
              .then(response=>{
                
              console.log(response)
              setArr(response.data)
            })
          

          
    },[])
    
  

    return (
        <div className="mt-2">
        <Tab.Container id="left-tabs-example" defaultActiveKey={Cookies.get('ActiveKey')}>
        <Row>
            <Col sm={12}>
            <center>
            <Nav variant="pills" className="justify-content-center flex-row">
                <Nav.Item onClick={()=>{Cookies.set('ActiveKey', 'first')}}>
                <Nav.Link className="tabs" eventKey="first">Details</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={()=>{Cookies.set('ActiveKey', 'second')}}>
                <Nav.Link className="tabs" eventKey="second">Applicants</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={()=>{Cookies.set('ActiveKey', 'third')}}>
                <Nav.Link className="tabs" eventKey="third">Documents</Nav.Link>
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
                                <div className="col-6">
                                    <h3 className="mt-3 pl-2" style={{backgroundColor : "#EE4B46", borderRadius : "33px", color: "white"}}>Application ID - {applicationId} </h3>
                                </div>
                            </div>
                            <br />
                              
                            </div>
                            </div>
                            <br />
                            <div className="row justify-content-center">
                            <div className="col-4">
                                <label>Site ID</label>
                                <input
                                type="text"
                                class="form-control"
                                name="contact"
                                id="outlined-basic"
                                onChange={(e)=>setSiteid(e.target.value)}
                                value={siteid}
                                />
                            </div>
                            <div className="col-4">
                                <label>Status</label>
                                <input
                                type="text"
                                class="form-control"
                                name="status"
                                id="outlined-basic"
                                onChange={(e)=>setStatus(e.target.value)}
                                value={status}
                                />
                            </div>
                            </div>
                            <br />
                            <div className="row justify-content-center">
                            <div className="col-8">
                                <label>Unit Name</label>
                                <input
                                type="text"
                                class="form-control"
                                name="text"
                                id="outlined-basic"
                                onChange={(e)=>setUnitName(e.target.value)}
                                value={unitName}
                                />
                            </div>
                            </div>
                            <br />
                            <div className="row justify-content-center">
                            <div className="col-8">
                                <label>Lead ID</label>
                                <input
                                type="text"
                                class="form-control"
                                name="address"
                                id="outlined-basic"
                                onChange={(e)=>setLeadid(e.target.value)}
                                value={leadid}
                                />
                            </div>
                            </div>
                            <br />
                            <div className="row justify-content-center">
                            <div className="col-4">
                                <label>Booking By</label>
                                <input
                                type="text"
                                class="form-control"
                                name="BookingBy"
                                id="outlined-basic"
                                onChange={(e)=>setBookingBy(e.target.value)}
                                value={bookingBy}
                                />
                            </div>
                            <div className="col-4">
                                <label>Bank Loan</label>
                                <input
                                type="text"
                                class="form-control"
                                name="pincode"
                                id="outlined-basic"
                                onChange={(e)=>setIsBankLoan(e.target.value)}
                                value={isBankLoan===true?"Yes":"No"}
                                />
                            </div>
                            </div>
                            <br />


                           
                    </div>
             
                </Tab.Pane>
                
            </Tab.Content>
            <Tab.Content>
                <Tab.Pane eventKey="second">
                {arr.map((a)=>(
                <div className="tab-card mt-3 py-3 container-fluid">
                    <h4><span>Applicant ID:</span> {a.applicantId}</h4>
                    <br/>
                    <h5><span>Applicant Type:</span> {a.applicantType}</h5>
                    <br/><br/>
                    <span style={{paddingRight:"2rem"}}><span style={{fontWeight:"bold", fontSize:"1rem"}}>Name:</span> {a.name}</span>
                    
                    <span style={{paddingRight:"2rem"}}><span style={{fontWeight:"bold", fontSize:"1rem"}}>Mobile:</span> {a.applicantMobile}</span>
                    
                    <span style={{paddingRight:"2rem"}}><span style={{fontWeight:"bold", fontSize:"1rem"}}>Whatsapp:</span> {a.applicantWhatsapp}</span>
                    <br/><br/>
                    <span style={{paddingRight:"2rem"}}><span style={{fontWeight:"bold", fontSize:"1rem"}}>Father Name:</span> {a.fatherName}</span>

                    <span style={{paddingRight:"2rem"}}><span style={{fontWeight:"bold", fontSize:"1rem"}}>Spouse Name:</span> {a.spouseName}</span>
                    
                    <span style={{paddingRight:"2rem"}}><span style={{fontWeight:"bold", fontSize:"1rem"}}>PAN Number: </span>{a.applicantPAN}</span>
                    
                    <span style={{paddingRight:"2rem"}}><span style={{fontWeight:"bold", fontSize:"1rem"}}>Applicant Aadhar:</span> {a.applicantAadhar}</span>
                    <br/><br/>
                    <span><span style={{fontWeight:"bold", fontSize:"1rem"}}>Applicant Address:</span> {a.applicantAddress.fullAddress}, {a.applicantAddress.landmark}, {a.applicantAddress.city}, {a.applicantAddress.pinCode}, {a.applicantAddress.state}</span>
                    <br/><br/>
                    <span><span style={{fontWeight:"bold", fontSize:"1rem"}}>Correspondent Address:</span> {a.correspondentAddress.fullAddress}, {a.correspondentAddress.landmark}, {a.correspondentAddress.city}, {a.correspondentAddress.pinCode}, {a.correspondentAddress.state}</span>
                    
                    
                </div>
                ))}

                

               
                
                

                </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
                <Tab.Pane eventKey="third">
                
                <div className="row justify-content-center">
                <div className="col-4 text-center">
                <input className="form-control-file" type="file" id="myfile" name="myfile" accept="application/pdf" onChange={handleUpload} style={{backgroundColor : 'white', color : 'black'}}/>
                <br />
                <button className="btn btn-danger" onClick={upload}>Upload Document</button>
                </div>
                </div>
                </Tab.Pane>
            </Tab.Content>
            </Col>

        </Row>   
        </Tab.Container>
    </div>

    )
}

export default IndividualApplicationform
