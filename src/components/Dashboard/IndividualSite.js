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
import {ReactComponent as Edit} from "./../../assets/icons/Vector.svg"

function IndividualSite() {
    
    const [leads, setLeads] = useState([]);
    const [form,setForm] = useState([]);
    const [car, setCar] = useState([]);

    const addUnit = () => {
        navigate("/dashboard/addunit")
    }

    const AddCarParking = () => {
        navigate("/dashboard/addcarparking")
    }

    useEffect(() => {
        const Token = "bearer" + " " + Cookies.get("Token");
        axios.get(`${BASE_URL}/api/v1/unit/getlistofunit`,{headers:{Authorization:Token}})
          .then(response => {
            
            console.log(response)
            setForm(response.data)
          })

        axios.get(`${BASE_URL}/api/v1/parking/getListOfCarParking`,{headers:{Authorization:Token}})
          .then(response => {
            
            console.log(response)
            setCar(response.data)
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
                    <Nav.Link className="tabs" eventKey="third">Unit Types</Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={()=>{Cookies.set('ActiveKeySite', 'fourth')}}>
                    <Nav.Link className="tabs" eventKey="fourth">Unit</Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={()=>{Cookies.set('ActiveKeySite', 'fourth')}}>
                    <Nav.Link className="tabs" eventKey="fifth">Car Parking</Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={()=>{Cookies.set('ActiveKeySite', 'fourth')}}>
                    <Nav.Link className="tabs" eventKey="sixth">Reports</Nav.Link>
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
                  
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                    
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                    
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
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
                        ></MaterialTable>
                        </div>
                    </center>
                    </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="fifth">
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
                    <Tab.Pane eventKey="sixth">
                    
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