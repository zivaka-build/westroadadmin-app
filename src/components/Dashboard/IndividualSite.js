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

    const addUnit = () => {
        navigate("/dashboard/addunit")
    }

    useEffect(() => {
        const Token = "bearer" + " " + Cookies.get("Token");
        axios.get(
          `${BASE_URL}/api/v1/lead/getAllLeads`,
          { headers: { Authorization: Token } }
        ).then((result) => {
          console.log(result.data);
          const arr = result.data
          const leads = arr.leads.map((lead)=>{
            const {leadID,name,phone,creationdate,leadWeightage,leadStatus} = lead
            const formattedDate = creationdate.substring(11,13)+":"+creationdate.substring(14,16)+", "+creationdate.substring(8,10)+"-"+creationdate.substring(5,7)+"-"+creationdate.substring(0,4)
    
            return {
                leadID,
                name,
                phone,
                creationdate: formattedDate,
                leadWeightage,
                leadStatus
                
              };
        })
        setLeads(leads)});
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
                    <MaterialTable data={leads}

                        title="Leads"
                        columns={
                            [
                                { title: 'Lead Id', field: 'leadID' },
                                { title: 'Name', field: 'name' },
                                { title: 'Phone No', field: 'phone' },
                                { title: 'Created At', field: 'creationdate' },
                                { title: 'Lead Type', field: 'leadWeightage' },
                                { title: 'Lead Status', field: 'leadStatus' },
                                { title: 'Assigned To', field: 'assignedTo' },

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
                                icon: ()=> <Edit />,
                                tooltip: 'Edit Lead',
                                onClick: (event, rowData) => {
                                navigate(`/dashboard/individuallead/${rowData.leadID}`);
                                Cookies.set('ActiveKey','first')}
                            }

                        ]}></MaterialTable>
                        </div>
                    </center>
                    </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="fifth">
                    
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