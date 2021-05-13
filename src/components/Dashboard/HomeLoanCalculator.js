import {useState} from "react"
import { Form } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "./../../config/url";
import Cookies from 'js-cookie'; 

function HomeLoanCalculator() {
    const [ pr, setPr ] = useState("")
    const [ rt, setRt ] = useState("")
    const [ yr, setYr ] = useState("")
    const [ bank, setBank ] = useState("")
    const [ emi, setEmi ] = useState("")
    const [ totalInterest, setTotalInterest ] = useState("")
    const [ schedule, setSchedule ] = useState([])
    const [ disp, setDisp ] = useState("none")

    const calculate = (e) => {
        const Token = 'bearer' + " " + Cookies.get('Token')
        e.preventDefault()
        axios
            .post(`${BASE_URL}/api/v1/finance/getEMIschedule`,{principal: pr*1,rate: rt*1,time: yr*1,bankName: bank})
            .then(response => {
                setDisp("block")
                console.log(response)
                setEmi(response.data.emiAmount)
                setTotalInterest(response.data.totalInterest)
                setSchedule(response.data.amortizationSchedule)
               
            })
    }
    return(
        
        <>
        <div className="row container-fluid mt-4 justify-content-center">
            <div className="col-8">
                <h4>Home Loan Calculator</h4>
            </div>
        </div>
        <br />
        <form>
        <div className="row container-fluid justify-content-center">
            <div className="col-4">
                <label>Principal Amount</label>
                <input
                type="number"
                class="form-control"
                name="principal"
                id="principal"
                onChange={(e)=>setPr(e.target.value)}
                />
            </div>
            <div className="col-4">
                <label>Rate</label>
                <input
                type="number"
                class="form-control"
                name="rate"
                id="rate"
                onChange={(e)=>setRt(e.target.value)}
                />
            </div>
        </div>
        <br />
        <div className="row container-fluid justify-content-center">
            <div className="col-4">
            <label>Year</label>
                <input
                type="number"
                class="form-control"
                name="year"
                id="year"
                onChange={(e)=>setYr(e.target.value)}
                />
            </div>
            <div className="col-4">
                <Form.Group controlId="bank">
                <Form.Label>Bank</Form.Label>
                <Form.Control  as="select" onChange={(e)=>setBank(e.target.value)}>
                <option>Select a Bank</option>   
                <option>SBI</option>
                <option>IDBI Bank</option>
                <option>UCO Bank</option>
                <option>Canara Bank</option>
                <option>Yes Bank</option>
                <option>LIC HFL</option>
                </Form.Control>
                </Form.Group>
            </div>
        </div>
        <br />
        <div className="row container-fluid justify-content-center">
            <div className="col-4 text-right">
                <button className="btn btn-secondary btn-user" type="reset" onClick={()=>setDisp("none")} style={{backgroundColor: "white", color: "black"}}>Reset</button>

            </div>
            <div className="col-4">
                <button className="btn btn-secondary btn-user" onClick={calculate}>Calculate</button>
                                        
            </div>
        </div>
        </form>
        <br />
        <div className="row container-fluid justify-content-center" style={{display : disp}}>
        <div className="col-12">
        <h4>EMI Schedule</h4>
        <br />
        <span style={{fontWeight : "bold"}}>Principal Amount : ₹{pr}</span>
        <span style={{fontWeight : "bold", paddingLeft : 20}}>Tenure : {yr} years </span>
        <span style={{fontWeight : "bold", paddingLeft : 20}}> Interest Rate : {rt}% </span>
        <span style={{fontWeight : "bold", paddingLeft : 20}}>Bank Name : {bank} </span> 
        <span style={{fontWeight : "bold", paddingLeft : 20}}>EMI Amount : ₹{emi}</span> 
        <span style={{fontWeight : "bold", paddingLeft : 20}}>Total Interest : ₹{totalInterest}</span>
        <br />
        <br />
        <table class="table">
            <thead style={{backgroundColor : "#EE4B46", color : "#fff"}}>
                <tr>
                <th scope="col">Payment No.</th>
                <th scope="col">Payment</th>
                <th scope="col">Interest Payment Rounded</th>
                <th scope="col">Principal Payment Rounded</th>
                <th scope="col">Principal Balance Rounded</th>
                <th scope="col">Acc. Interest Rounded</th>
                </tr>
            </thead>
            <tbody>
            {schedule.map((t) => (
                <tr>
                <td>{t.paymentNumber}</td>
                <td>{t.payment}</td>
                <td>{t.interestPaymentRounded}</td>
                <td>{t.principalPaymentRounded}</td>
                <td>{t.principalBalanceRounded}</td>
                <td>{t.accInterestRounded}</td>
                </tr>
            ))}
                
            </tbody>
        </table>
        </div>
        </div>
        </>
    )

}

export default HomeLoanCalculator;