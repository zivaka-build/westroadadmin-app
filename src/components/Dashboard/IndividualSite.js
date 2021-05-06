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

function IndividualSite() {
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