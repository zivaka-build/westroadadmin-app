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

function IndividualCustomer(){
    
    useEffect(() => {
       
        const Token = 'bearer' + " " + Cookies.get('Token')
        
        axios.get(`${BASE_URL}/api/v1/customer/getCustomerByCustomerId`,{customerId: Cookies.get('CustomerId')},{headers:{Authorization:Token}})
        .then(response=>{
            console.log(response)
        })
     
    },[])

    return(
        <>
        <div className="tabs-container" id="tabs-container" style={{paddingTop: "70px"}}>

<Tab.Container id="left-tabs-example" defaultActiveKey={Cookies.get('ActiveCustKey')}>
    <Row>
        <Col sm={12}>
        <center>
        <Nav variant="pills" className="justify-content-center flex-row">
            <Nav.Item onClick={()=>{Cookies.set('ActiveCustKey', 'first')}}>
            <Nav.Link className="tabs" eventKey="first">Customer Details</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={()=>{Cookies.set('ActiveCustKey', 'second')}}>
            <Nav.Link className="tabs" eventKey="second">Allotments</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={()=>{Cookies.set('ActiveCustKey', 'third')}}>
            <Nav.Link className="tabs" eventKey="third">Demands</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={()=>{Cookies.set('ActiveCustKey', 'fourth')}}>
            <Nav.Link className="tabs" eventKey="fourth">Payments</Nav.Link>
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
        </Tab.Content>
        </Col>
    </Row>
    </Tab.Container>
</div>
        </>
    )
}

export default IndividualCustomer;