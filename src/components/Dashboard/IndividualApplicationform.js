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

function IndividualApplicationform() {
    var date = new Date()
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);


    const handleClose = () => {
        setOpen(false);
    };

    const {applicationId} = useParams()
    const [ applicant, setApplicant ] = useState([])
    const [file, setFile] = useState("");

    let [arr,setArr] =useState([])
    const [ appid, setAppid ] = useState("")
    const [ siteid, setSiteid ] = useState("")
    const [ leadid, setLeadid ] = useState("")
    const [ unitName, setUnitName] = useState("")
    const [ carPark, setCarPark] = useState("")
    const [ status, setStatus] = useState("")
    const [ bookingBy, setBookingBy] = useState("")
    const [ isBankLoan, setIsBankLoan] = useState("")
    const [parking, setParking] = useState([]);
    const [pterms, setPterms] = useState([]);
    const [disp, setDisp] = useState("none")

    const [name, setName] = useState("")
    const [fn, setFn] = useState("")
    const [sn, setSn] = useState("")
    const [oc, setOc] = useState("")
    const [at, setAt] = useState("")

    const [fa1, setFa1] = useState("")
    const [lm1, setLm1] = useState("")
    const [ct1, setCt1] = useState("")
    const [pc1, setPc1] = useState("")
    const [st1, setSt1] = useState("")

    const [fa2, setFa2] = useState("")
    const [lm2, setLm2] = useState("")
    const [ct2, setCt2] = useState("")
    const [pc2, setPc2] = useState("")
    const [st2, setSt2] = useState("")

    const [ap, setAp]   = useState("")
    const [aa, setAa]   = useState("")
    const [am, setAm]   = useState("")
    const [aw, setAw]   = useState("")
    const [ae, setAe]   = useState("")

    const [neft, setNeft] = useState(false)
    const [cq, setCq] = useState(false) 

    const [td,setTd] = useState("")
    const [ta,setTa] = useState("")
    const [tb,setTb] = useState("")
    const [tc,setTc] = useState("")

    const [can,setCan] = useState("")
    const [cbn, setCbn] = useState("")
    const [cd, setCd] = useState("")
    const [cn, setCn] = useState("")
    const [ib, setIb] = useState("")

    const [funded, setFunded] = useState()
    const [fb, setFb] = useState("")
    const [fbp, setFbp] = useState("")

    const [pv, setPv] = useState()
    const [vb, setVb] = useState("")
    const [vd, setVd] = useState("")

    const showApplicant = (e) => {
        if(disp === "none"){
            setDisp("block")
        }
        else{
            setDisp("none")
        }
    }

    const addApplicant = (e) => {
        
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.post(`${BASE_URL}/api/v1/applicant/createNewApplicant`,
        {
            name: name,
            applicationId: applicationId,
            fatherName: fn,
            spouseName: sn,
            occupation: oc, 
            applicantType: at,
            applicantAddress : 
            {
                fullAddress: fa1,
                landmark: lm1,
                city: ct1,
                pinCode: pc1,
                state: st1
            },
            correspondentAddress : 
            {
                fullAddress: fa2,
                landmark: lm2,
                city: ct2,
                pinCode: pc2,
                state: st2
            },
            applicantPAN: ap,
            applicantAadhar: aa,
            applicantMobile: am,
            applicantWhatsapp: aw,
            applicantEmail: ae
        },
        {headers:{'Authorization':Token}})
        .then(response => {
            window.location.reload()
        })
    }
    
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

    const validate = (e) => {
      
      axios.put(`${BASE_URL}/api/v1/payment/validatepayment`, {applicationId: applicationId, paymentValidatedBy: Cookies.get("FullName"), paymentValidatedDate: date })
        .then(response=>{
            console.log(response)
            window.location.reload()
          
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
            
            if(response.data.NEFTDetails){
              setNeft(true)
              setTd(response.data.NEFTDetails.transDate)
              setTa(response.data.NEFTDetails.transactionAccount)
              setTb(response.data.NEFTDetails.transactionBank)
              setTc(response.data.NEFTDetails.transactionComments)
            }            

            if(response.data.chequeDetails) {
              setCq(true)
              setCan(response.data.chequeDetails.chequeAccountNo)
              setCbn(response.data.chequeDetails.chequeBankName)
              setCd(response.data.chequeDetails.chequeDate)
              setCn(response.data.chequeDetails.chequeNo)
              setIb(response.data.chequeDetails.issuedBy)
            }

            if(response.data.notFundedSelf === true) {
              setFunded(true)
              setFb(response.data.fundedBy)
              setFbp(response.data.fundedByPAN)
            }

            else if(response.data.notFundedSelf === false){
              setFunded(false)
              setFb("Self")
            }

            if(response.data.NEFTDetails || response.data.chequeDetails){
              if(response.data.paymentValidated === true){
                setPv(true)
                setVb(response.data.paymentValidatedBy)
                setVd(response.data.paymentValidatedDate)
              }
              else {
                setPv(false)
              }
            }


          })

          axios.get(`${BASE_URL}/api/v1/applicant/getlistofapplicantsbyapplicationID/${applicationId}`,{headers:{Authorization:Token}})
              .then(response=>{
                
              console.log(response)
              setArr(response.data)
              var length = response.data.length
              if(length === 0){
                  setAt("First Applicant")
              }
              else if(length > 0){
                  setAt(`Co Applicant ${length}`)
                  
              }
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
                <Nav.Link className="tabs" eventKey="third">Payment Details</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={()=>{Cookies.set('ActiveKey', 'fourth')}}>
                <Nav.Link className="tabs" eventKey="fourth">Documents</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={()=>{Cookies.set('ActiveKey', 'fifth')}}>
                <Nav.Link className="tabs" eventKey="fifth">Booking Payment</Nav.Link>
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
                <div className="mt-2">
                    <div className="col-12 text-center">
                    <button className="btn btn-danger" onClick={showApplicant} disabled={arr.length === 3 ? "disabled" : null}>Add Applicant</button>
                    </div>
                </div>
                <div className="applicants" style={{display: disp}}>
                    <form>
                      <div className="row justify-content-center">
                          <div className="col-4">
                            <label>Name</label>
                            <input
                            type="text"
                            class="form-control"
                            name="name"
                            id="name"
                            onChange={(e)=>setName(e.target.value)}
                            />
                          </div>
                          <div className="col-4">
                            <label>Spouse Name</label>
                            <input
                            type="text"
                            class="form-control"
                            name="sname"
                            id="sname"
                            onChange={(e)=>setSn(e.target.value)}
                            />
                          </div>
                          <div className="col-4">
                            <label>Father's Name</label>
                            <input
                            type="text"
                            class="form-control"
                            name="fname"
                            id="fname"
                            onChange={(e)=>setFn(e.target.value)}
                            />
                          </div>
                      </div>
                      <br />
                      <div className="row justify-content-center">
                          <div className="col-4">
                            <label>Mobile</label>
                            <input
                            type="text"
                            class="form-control"
                            name="mobile"
                            id="mobile"
                            onChange={(e)=>setAm(e.target.value)}
                            />
                          </div>
                          <div className="col-4">
                            <label>Whatsapp</label>
                            <input
                            type="text"
                            class="form-control"
                            name="whatsapp"
                            id="whatsapp"
                            onChange={(e)=>setAw(e.target.value)}
                            />
                          </div>
                          <div className="col-4">
                            <label>Email</label>
                            <input
                            type="email"
                            class="form-control"
                            name="email"
                            id="email"
                            onChange={(e)=>setAe(e.target.value)}
                            />
                          </div>
                      </div>
                      <br />
                      <div className="row justify-content-center">
                          <div className="col-4">
                            <label>Occupation</label>
                            <input
                            type="text"
                            class="form-control"
                            name="oc"
                            id="oc"
                            onChange={(e)=>setOc(e.target.value)}
                            />
                          </div>
                          <div className="col-4">
                            <label>PAN</label>
                            <input
                            type="text"
                            class="form-control"
                            name="pan"
                            id="pan"
                            onChange={(e)=>setAp(e.target.value)}
                            />
                          </div>
                          <div className="col-4">
                            <label>Aadhar</label>
                            <input
                            type="number"
                            class="form-control"
                            name="aa"
                            id="aa"
                            onChange={(e)=>setAa(e.target.value)}
                            />
                          </div>
                      </div>
                      <br />
                      <div className="row justify-content-center">
                          <div className="col-12">
                              <h4>Applicant Address</h4>
                          </div>
                      </div>
                      <br />
                      <div className="row justify-content-center">
                          <div className="col-6">
                            <label>Full Address</label>
                            <input
                            type="text"
                            class="form-control"
                            name="fa1"
                            id="fa1"
                            onChange={(e)=>setFa1(e.target.value)}
                            />
                          </div>
                          <div className="col-6">
                            <label>Landmark</label>
                            <input
                            type="text"
                            class="form-control"
                            name="lm1"
                            id="lm1"
                            onChange={(e)=>setLm1(e.target.value)}
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
                            name="ct1"
                            id="ct1"
                            onChange={(e)=>setCt1(e.target.value)}
                            />
                          </div>
                          <div className="col-4">
                            <label>Pincode</label>
                            <input
                            type="number"
                            class="form-control"
                            name="pc1"
                            id="pc1"
                            onChange={(e)=>setPc1(e.target.value)}
                            />
                          </div>
                          <div className="col-4">
                            <label>State</label>
                            <input
                            type="text"
                            class="form-control"
                            name="st1"
                            id="st1"
                            onChange={(e)=>setSt1(e.target.value)}
                            />
                          </div>
                      </div>
                      <br />
                      <div className="row justify-content-center">
                          <div className="col-12">
                              <h4>Correspondent Address</h4>
                          </div>
                      </div>
                      <br />
                      <div className="row justify-content-center">
                          <div className="col-6">
                            <label>Full Address</label>
                            <input
                            type="text"
                            class="form-control"
                            name="fa2"
                            id="fa2"
                            onChange={(e)=>setFa2(e.target.value)}
                            />
                          </div>
                          <div className="col-6">
                            <label>Landmark</label>
                            <input
                            type="text"
                            class="form-control"
                            name="lm2"
                            id="lm2"
                            onChange={(e)=>setLm2(e.target.value)}
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
                            name="ct2"
                            id="ct2"
                            onChange={(e)=>setCt2(e.target.value)}
                            />
                          </div>
                          <div className="col-4">
                            <label>Pincode</label>
                            <input
                            type="number"
                            class="form-control"
                            name="pc2"
                            id="pc2"
                            onChange={(e)=>setPc2(e.target.value)}
                            />
                          </div>
                          <div className="col-4">
                            <label>State</label>
                            <input
                            type="text"
                            class="form-control"
                            name="st2"
                            id="st2"
                            onChange={(e)=>setSt2(e.target.value)}
                            />
                          </div>
                      </div>
                      <div className="mt-2">
                        <div className="col-12 text-center">
                        <button className="btn btn-danger" onClick={addApplicant}>Add</button>
                        </div>
                      </div>
                    </form>                                            
                </div>
                {arr.map((a)=>(
                
                <div className="tab-card mt-5 py-3 container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-4">
                            <label>Applicant ID</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.applicantId}
                            />
                        </div>
                        <div className="col-4">
                            <label>Applicant Type</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.applicantType}
                            />
                        </div>
                    </div>
                    <br />
                    <div className="row justify-content-center">
                          <div className="col-4">
                            <label>Name</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.name}
                            />
                          </div>
                          <div className="col-4">
                            <label>Spouse Name</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.spouseName}
                            />
                          </div>
                          <div className="col-4">
                            <label>Father's Name</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.fatherName}
                            />
                          </div>
                      </div>
                      <br />
                      <div className="row justify-content-center">
                          <div className="col-4">
                            <label>Mobile</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.applicantMobile}
                            />
                          </div>
                          <div className="col-4">
                            <label>Whatsapp</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.applicantWhatsapp}
                            />
                          </div>
                          <div className="col-4">
                            <label>Email</label>
                            <input
                            class="form-control"
                            type="email"
                            value={a.applicantEmail}
                            />
                          </div>
                      </div>
                      <br />
                      <div className="row justify-content-center">
                          <div className="col-4">
                            <label>Occupation</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.occupation}
                            />
                          </div>
                          <div className="col-4">
                            <label>PAN</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.applicantPAN}
                            />
                          </div>
                          <div className="col-4">
                            <label>Aadhar</label>
                            <input
                            type="number"
                            class="form-control"
                            value={a.applicantAadhar}
                            />
                          </div>
                      </div>
                      <br />
                      <div className="row justify-content-center">
                          <div className="col-12">
                              <h4>Applicant Address</h4>
                          </div>
                      </div>
                      <br />
                      <div className="row justify-content-center">
                          <div className="col-6">
                            <label>Full Address</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.applicantAddress.fullAddress}
                            />
                          </div>
                          <div className="col-6">
                            <label>Landmark</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.applicantAddress.landmark}
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
                            value={a.applicantAddress.city}
                            />
                          </div>
                          <div className="col-4">
                            <label>Pincode</label>
                            <input
                            type="number"
                            class="form-control"
                            value={a.applicantAddress.pinCode}
                            />
                          </div>
                          <div className="col-4">
                            <label>State</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.applicantAddress.state}
                            />
                          </div>
                      </div>
                      <br />
                      <div className="row justify-content-center">
                          <div className="col-12">
                              <h4>Correspondent Address</h4>
                          </div>
                      </div>
                      <br />
                      <div className="row justify-content-center">
                          <div className="col-6">
                            <label>Full Address</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.correspondentAddress.fullAddress}
                            />
                          </div>
                          <div className="col-6">
                            <label>Landmark</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.correspondentAddress.landmark}
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
                            value={a.correspondentAddress.city}
                            />
                          </div>
                          <div className="col-4">
                            <label>Pincode</label>
                            <input
                            type="number"
                            class="form-control"
                            value={a.correspondentAddress.pinCode}
                            />
                          </div>
                          <div className="col-4">
                            <label>State</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.correspondentAddress.state}
                            />
                          </div>
                      </div>
                </div>
                ))}
                {/*{arr.map((a)=>(
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
                */}
                

               
                
                

                </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
                <Tab.Pane eventKey="third">
                
                
                </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
                <Tab.Pane eventKey="fourth">
                
                <div className="row justify-content-center">
                <div className="col-4 text-center">
                <input className="form-control-file" type="file" id="myfile" name="myfile" accept="application/pdf" onChange={handleUpload} style={{backgroundColor : 'white', color : 'black'}}/>
                <br />
                <button className="btn btn-danger" onClick={upload}>Upload Document</button>
                </div>
                </div>
                </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
                <Tab.Pane eventKey="fifth">
                
                { 
                neft === true ? 
                <>
                <br />
                <div className="row justify-content-center">
                  <div className="col-8">
                    <h5>NEFT Details</h5>
                  </div>
                </div>
                <br />
                <div className="row justify-content-center">
                  <div className="col-4">
                  <label>Transaction Date</label>
                  <input
                  type="text"
                  class="form-control"
                  value={td.substring(8,10)+"-"+td.substring(5,7)+"-"+td.substring(0,4)}
                  />
                  </div>
                  <div className="col-4">
                  <label>Transaction Account</label>
                  <input
                  type="number"
                  class="form-control"
                  value={ta}
                  />
                  </div>
                </div>
                <br />
                <div className="row justify-content-center">
                  <div className="col-4">
                  <label>Transaction Bank</label>
                  <input
                  type="text"
                  class="form-control"
                  value={tb}
                  />
                  </div>
                  <div className="col-4">
                  <label>Transaction Comment</label>
                  <input
                  type="text"
                  class="form-control"
                  value={tc}
                  />
                  </div>
                </div>
                </>
                : null
                }

                { 
                  cq === true ?
                  <>
                  <br />
                <div className="row justify-content-center">
                  <div className="col-8">
                    <h5>Cheque Details</h5>
                  </div>
                </div>
                <br />
                <div className="row justify-content-center">
                  <div className="col-4">
                  <label>Cheque Account No.</label>
                  <input
                  type="number"
                  class="form-control"
                  value={can}
                  />
                  </div>
                  <div className="col-4">
                  <label>Cheque Bank Name</label>
                  <input
                  type="text"
                  class="form-control"
                  value={cbn}
                  />
                  </div>
                </div>
                <br />
                <div className="row justify-content-center">
                  <div className="col-4">
                  <label>Cheque Date</label>
                  <input
                  type="text"
                  class="form-control"
                  value={cd.substring(8,10)+"-"+cd.substring(5,7)+"-"+cd.substring(0,4)}
                  />
                  </div>
                  <div className="col-4">
                  <label>Cheque No.</label>
                  <input
                  type="number"
                  class="form-control"
                  value={cn}
                  />
                  </div>
                </div>
                <br />
                <div className="row justify-content-center">
                  <div className="col-4">
                  <label>Issued by</label>
                  <input
                  type="text"
                  class="form-control"
                  value={ib}
                  />
                  </div>
                </div>
                  </> 
                  : null
                }

                {
                  funded === true ?
                  <>
                  <br />
                  <div className="row justify-content-center">
                    <div className="col-8">
                      <h5>Fund</h5>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                  <div className="col-4">
                  <label>Funded By</label>
                  <input
                  type="text"
                  class="form-control"
                  value={fb}
                  />
                  </div>
                  <div className="col-4">
                  <label>Funded By PAN</label>
                  <input
                  type="text"
                  class="form-control"
                  value={fbp}
                  />
                  </div>
                </div>
                  </>
                  : 

                  funded === false ?
                  <>
                  <br />
                  <div className="row justify-content-center">
                    <div className="col-8">
                      <h5>Fund</h5>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                  <div className="col-4">
                  <label>Funded By</label>
                  <input
                  type="text"
                  class="form-control"
                  value={fb}
                  />
                  </div>
                </div>
                  </>
                  : null
                }
                { 
                pv === false ?
                <>
                <br />
                <div className="row justify-content-center">
                  <div className="col-8">
                    <h5>Payment Validation</h5>
                  </div>
                </div>
                <br />
                <div className="row justify-content-center">
                  <div className="col-4">
                    <button className="btn btn-secondary btn-user" onClick={()=> setOpen(true)}>Validate Payment</button>
                  </div>
                </div>
                </>
                : 
                pv === true ?
                <>
                <br />
                <div className="row justify-content-center">
                  <div className="col-8">
                    <h5>Payment Validation</h5>
                  </div>
                </div>
                <br />
                <div className="row justify-content-center">
                  <div className="col-4">
                  <label>Validated By</label>
                  <input
                  type="text"
                  class="form-control"
                  value={vb}
                  />
                  </div>
                  <div className="col-4">
                  <label>Validate Date</label>
                  <input
                  type="text"
                  class="form-control"
                  value={vd.substring(8,10)+"-"+vd.substring(5,7)+"-"+vd.substring(0,4)}
                  />
                  </div>
                </div>
                </>
                :
                null
                }
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
                <div className="row">
                    <p>Are you sure you want to validate payment ?</p>
                </div>
                <div className="row container-fluid justify-content-center">
                    <div className="col-4 text-right">
                        <button className="btn btn-secondary btn-user" style={{backgroundColor: "white", color: "black"}} onClick={()=> setOpen(false)}>No</button>

                    </div>
                    &nbsp;&nbsp;
                    <div className="col-4">
                        <button className="btn btn-secondary btn-user" onClick={validate}>Yes</button>
                                                    
                    </div>
                </div>
            </div>
            </Fade>
            </Modal>
                </Tab.Pane>
            </Tab.Content>
            </Col>

        </Row>   
        </Tab.Container>
    </div>

    )
}

export default IndividualApplicationform
