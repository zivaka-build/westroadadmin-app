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
import { ContactMailTwoTone } from "@material-ui/icons"

function IndividualCustomer(){
    const [customerId, setCustomerId] = useState("")
    const [salutation, setSalutation] = useState("")
    const [firstName, setFirstName] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [disp, setDisp] = useState("none")
    const [siteId, setSiteId] = useState("")
    const [unitName, setUnitName] = useState("")
    const [paymentTerm, setPaymentTerm] = useState("")
    const [demands, setDemands] = useState([])

    useEffect(() => {
       
        const Token = 'bearer' + " " + Cookies.get('Token')
       
        axios.post(`${BASE_URL}/api/v1/customer/getCustomerByCustomerId`,{customerId: Cookies.get('CustomerId')},{headers:{Authorization:Token}})
        .then(response=>{
            console.log(response)
            setCustomerId(response.data.customer.customerId)
            setSalutation(response.data.customer.salutation)
            setFirstName(response.data.customer.custFirstName)
            setMiddleName(response.data.customer.custMiddleName)
            setLastName(response.data.customer.custLastName)
            setEmail(response.data.customer.custRegEmail)
            setMobile(response.data.customer.custRegMobile)
            setSiteId(response.data.customer.siteId)
            setUnitName(response.data.customer.unitName)
            setPaymentTerm(response.data.customer.paymentTerms)
            setDemands(response.data.customer.demandList)
        })
     
    },[])

    const editCustomer = (e) => {
        const Token = 'bearer' + " " + Cookies.get('Token')
        e.preventDefault()
        axios.put(`${BASE_URL}/api/v1/customer/updateCustomerByCustomerId`,
        {   
            customerId: Cookies.get('CustomerId'),
            salutation: salutation,
            custFirstName: firstName,
            custMiddleName: middleName,
            custLastName: lastName,
            custRegEmail: email,
            custRegMobile: mobile,

        },
        {headers:{'Authorization':Token}})
        .then(response => {
            console.log(response)
            setDisp("block")
        })

    }

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
            <div className="tab-card py-3 px-3">
            <div className="row justify-content-center">
                <div className="col-lg-4 col-sm-12">
                    <label>Customer Id</label>
                    <input
                    type="text"
                    class="form-control"
                    name="customerId"
                    id="customerId"
                    value={customerId}
                    />
                </div>
            </div>
            <br />
            <div className="row justify-content-center">
                <div className="col-lg-3 col-sm-12">
                    <Form.Group controlId="depositType">
                    <Form.Label>Salutation</Form.Label>
                    <Form.Control  as="select" value={salutation} onChange={(e)=>setSalutation(e.target.value)}>
                    <option>Select a Salutation</option>   
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                    </Form.Control>
                    </Form.Group>
                </div>
                <div className="col-lg-3 col-sm-12">
                    <label>First Name</label>
                    <input
                    type="text"
                    class="form-control"
                    name="firstName"
                    id="firstName"
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                    />
                </div>
                <div className="col-lg-3 col-sm-12">
                    <label>Middle Name</label>
                    <input
                    type="text"
                    class="form-control"
                    name="middleName"
                    id="middleName"
                    value={middleName}
                    onChange={(e)=>setMiddleName(e.target.value)}
                    />
                </div>
                <div className="col-lg-3 col-sm-12">
                    <label>Last Name</label>
                    <input
                    type="text"
                    class="form-control"
                    name="lastName"
                    id="lastName"
                    value={lastName}
                    onChange={(e)=>setLastName(e.target.value)}
                    />
                </div>
            </div>
            <br />
            <div className="row justify-content-center">
                <div className="col-lg-4 col-sm-12">
                    <label>Customer Mobile</label>
                    <input
                    type="number"
                    class="form-control"
                    name="mobile"
                    id="mobile"
                    value={mobile}
                    onChange={(e)=>setMobile(e.target.value)}
                    />
                </div>
                <div className="col-lg-4 col-sm-12">
                    <label>Customer Email</label>
                    <input
                    type="email"
                    class="form-control"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className="col-lg-4 col-sm-12">
                        <label>Payment Term Id</label>
                        <input
                        type="text"
                        class="form-control"
                        name="paymentTerm"
                        id="paymentTerm"
                        value={paymentTerm}
                        />
                    </div>
            </div>
            <br />
            <div className="text-center" style={{display : disp}}><em>All details saved succesfully!</em></div>
            <div className="mt-2">
                <div className="col-12 text-center">
                <button className="btn btn-danger" onClick={editCustomer}>Save</button>
                </div>
            </div>
            </div>

            </Tab.Pane>
            <Tab.Pane eventKey="second">
            <div>
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-sm-12">
                        <label>Site Id</label>
                        <input
                        type="text"
                        class="form-control"
                        name="siteId"
                        id="siteId"
                        value={siteId}
                        />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                        <label>Unit Name</label>
                        <input
                        type="text"
                        class="form-control"
                        name="unitName"
                        id="unitName"
                        value={unitName}
                        />
                    </div>
                </div>
            </div>
            </Tab.Pane>
            <Tab.Pane eventKey="third">
            <div>
            <MaterialTable

            data={demands}
            title="Demands"
            columns={
                [
                    { title: 'Demand Id', field: 'demandId' },
                    { title: 'Demand Generation Date', field: 'demandGenerationDate' },
                    { title: 'Due Date', render : (rowData) => !rowData.dueDate ?  "": rowData.dueDate.substring(8,10)+"-"+rowData.dueDate.substring(5,7)+"-"+rowData.dueDate.substring(0,4), customSort: (a, b) => a.dueDate < b.dueDate ? -1 : 1 },
                    { title: 'Demand Type', field: 'demandType' },
                    { title: 'Description', field: 'description' },
                    { title: 'Amount', field: 'amount' },
                    { title: 'Paid', field: 'isPaid' },
                    
                    
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
                    paddingLeft: '11px'
                
                }
            }}

            ></MaterialTable>
            </div>
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