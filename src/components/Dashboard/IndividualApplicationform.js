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

function IndividualApplicationform() {

    const {applicationId} = useParams()
    const [ applicant, setApplicant ] = useState([])
    const [arr,setArr] =useState([{
        applicantId:''
    },])
    const [ appid, setAppid ] = useState("")
    const [ siteid, setSiteid ] = useState("")
    const [ leadid, setLeadid ] = useState("")
    const [ unitName, setUnitName] = useState("")
    const [ carPark, setCarPark] = useState("")
    const [ status, setStatus] = useState("")
    const [ bookingBy, setBookingBy] = useState("")
    const [ isBankLoan, setIsBankLoan] = useState("")


    useEffect(()=>{

        const Token = 'bearer' + " " + Cookies.get('Token')

        axios.get(`${BASE_URL}/api/v1/applicationform/getapplicationformbyapplicationid/${applicationId}`,{headers:{Authorization:Token}})
          .then(response =>{

            
            setAppid(response.data.applicationId)
            setUnitName(response.data.unitName)
            setCarPark(response.data.carParkingName)
            setStatus(response.data.status)
            setBookingBy(response.data.bookingBy)
            setLeadid(response.data.leadId)
            setSiteid(response.data.siteId)
            setIsBankLoan(response.data.isBankLoan)
            console.log(response.data)
            var applicant = response.data.applicants
            
            
            for(var i=0;i<applicant.length;i++){
                const id = applicant[i]
                const values = [...arr]
              axios.get(`${BASE_URL}/api/v1/applicant/getapplicantbyapplicantid/${id}`,{headers:{Authorization:Token}})
              .then(response=>{
                
                // values[i].applicantId=response.data.applicantId
                // setArr(values)           
                            
            })

            
            }

            
            console.log(arr)
            
          })

          

          
    },[])
    
  

    return (
        <div>
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
                {/* {arr.map((a)=>{
                <div className="tab-card row container-fluid">
                    <h4>{a.applicantId}</h4>
                </div> */}
                <div className="tab-card row container-fluid">
                    {/* <h4>{arr.applicantId}</h4> */}
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
