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

function IndividualDemand(){
    const {demandId} = useParams();

    const [demandAmount, setDemandAmount] = useState("")
    const [demandCustomer, setDemandCustomer] = useState("")
    const [demandDate, setDemandDate] = useState("")
    const [demandType, setDemandType] = useState("")
    const [demandDesc, setDemandDesc] = useState("")
    const [demandDueDate, setDemandDueDate] = useState("")
    const [demandPaid, setDemandPaid] = useState("")

    useEffect(() => {
       
        const Token = 'bearer' + " " + Cookies.get('Token')
       
        axios.get(`${BASE_URL}/api/v1/demand/getdemandbydemandid/${demandId}`,{headers:{Authorization:Token}})
        .then(response=>{
            console.log(response)
            setDemandAmount(response.data.amount)
            setDemandCustomer(response.data.customerId)
            setDemandDate(response.data.demandGenerationDate)
            setDemandType(response.data.demandType)
            setDemandDesc(response.data.description)
            setDemandDueDate(response.data.dueDate)
            setDemandPaid(response.data.isPaid)

          
        })
     
    },[])
                                
    return(
        <>
        <div className="mt-3 row container-fluid justify-content-center px-2">
            <div className="col-12">
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={() => navigate(-1)}><IoMdArrowBack />Back</button>
            </div>
        </div>
        <div className="tabs-container" id="tabs-container" style={{paddingTop: "20px"}}>
        <Tab.Container id="left-tabs-example" defaultActiveKey={Cookies.get('ActiveDemandKey')}>
        <Row>
        <Col sm={12}>
        <center>
        <Nav variant="pills" className="justify-content-center flex-row">
            <Nav.Item onClick={()=>{Cookies.set('ActiveDemandKey', 'first')}}>
            <Nav.Link className="tabs" eventKey="first">Details</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={()=>{Cookies.set('ActiveDemandKey', 'second')}}>
            <Nav.Link className="tabs" eventKey="second">Payments</Nav.Link>
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
                    <div className="tab-card px-4 py-5">
                        <div className="row justify-content-center">
                            <div className="col-lg-4">
                                <label>Demand Id</label>
                                <input
                                type="text"
                                class="form-control"
                                name="demandId"
                                id="demandId"
                                value={demandId}
                                />
                            </div>
                            <div className="col-lg-4">
                                <label>Demand Generation Date</label>
                                <input
                                type="text"
                                class="form-control"
                                name="demandDate"
                                id="demandDate"
                                value={demandDate.substring(8,10)+"-"+demandDate.substring(5,7)+"-"+demandDate.substring(0,4)}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="row justify-content-center">
                            <div className="col-lg-4">
                                <label>Customer Id</label>
                                <input
                                type="text"
                                class="form-control"
                                name="customerId"
                                id="customerId"
                                value={demandCustomer}
                                />
                            </div>
                            <div className="col-lg-4">
                                <label>Amount</label>
                                <input
                                type="text"
                                class="form-control"
                                name="amount"
                                id="amount"
                                value={demandAmount}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="row justify-content-center">
                            <div className="col-lg-4">
                                <label>Demand Type</label>
                                <input
                                type="text"
                                class="form-control"
                                name="demandType"
                                id="demandType"
                                value={demandType}
                                />
                            </div>
                            <div className="col-lg-4">
                                <label>Demand Description</label>
                                <input
                                type="text"
                                class="form-control"
                                name="desc"
                                id="desc"
                                value={demandDesc}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="row justify-content-center">
                            <div className="col-lg-4">
                                <label>Demand Due Date</label>
                                <input
                                type="text"
                                class="form-control"
                                name="demandDueDate"
                                id="demandDueDate"
                                value={demandDueDate.substring(8,10)+"-"+demandDueDate.substring(5,7)+"-"+demandDueDate.substring(0,4)}
                                />
                            </div>
                            <div className="col-lg-4">
                                <label>Paid</label>
                                <input
                                type="text"
                                class="form-control"
                                name="paid"
                                id="paid"
                                value={demandPaid === true ? "Yes" : "No"}
                                />
                            </div>
                        </div>
                    </div>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                </Tab.Pane>
            </Tab.Content>
        </Col>
        </Row>


        </Tab.Container>
        </div>
        </>
    )
}

export default IndividualDemand;