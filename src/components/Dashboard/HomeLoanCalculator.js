import {useState,useEffect} from "react"
import { Form } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "./../../config/url";
import Cookies from 'js-cookie'; 
import { withMobileDialog } from "@material-ui/core";

function HomeLoanCalculator() {
    const [ pr, setPr ] = useState("")
    const[ rt, setRt ] = useState("")
    const [ yr, setYr ] = useState("")
    const [ bank, setBank ] = useState("")
    const [ emi, setEmi ] = useState("")
    const [ totalInterest, setTotalInterest ] = useState("")
    const [ schedule, setSchedule ] = useState([])
    const [ disp, setDisp ] = useState("none")

    const [banks, setBanks] = useState([])
    const [gi, setGi] = useState("")
    const [wi, setWi] = useState("")
    const [si, setSi] = useState("")



    const calculate = (e) => {
        
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

    const changeBank = (e) => {
        var bankcode = e.target.value
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/loan/getLoanBankByBankCode/${bankcode}`,{ headers : { 'Authorization' : Token }})
        .then(response => {
            console.log(response)
            setGi(response.data.rateOfInterest)
            setWi(response.data.rateOfInterestWomen)
            setSi(response.data.rateOfInterestSenior)
        })
    }

    useEffect(() => { 
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/loan/getListOfLoanBank`,{ headers : { 'Authorization' : Token }})
        .then(response => {
            console.log(response)
            setBanks(response.data.loan)
        })
    }, [])

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
            <label>Year</label>
                <input
                type="number"
                class="form-control"
                name="year"
                id="year"
                onChange={(e)=>setYr(e.target.value)}
                />
            </div>
        </div>
        <br />
        <div className="row container-fluid justify-content-center">
            <div className="col-4">
                <Form.Group controlId="bank">
                <Form.Label>Bank</Form.Label>
                <Form.Control  as="select" onChange={changeBank}>
                <option>Select a Bank</option> 
                {
                    banks.map((b)=> (
                        <option value={b.bankCode}>{b.bankName}</option>
                    ))
                }  
                </Form.Control>
                </Form.Group>
            </div>
            
            
        </div>
        <br />
        <div className="row justify-content-center">
            
                  <div className="col-5">
                    <label class="text-align left">Loan Type : </label>
                  
                  
                    <label class="form-check-label px-4">
                      General
                      <input
                        type="radio"
                        className="form-check-input"
                        id="general"
                        name="loantype"
                        onClick={()=>setRt(gi)}
                      />
                    </label>

                    <label class="form-check-label px-4">
                      Women
                      <input
                        type="radio"
                        className="form-check-input"
                        id="women"
                        name="loantype"
                        onClick={()=>setRt(wi)}
                      />
                    </label>
                    <label class="form-check-label px-4">
                      Sr. Citizen
                      <input
                        type="radio"
                        className="form-check-input"
                        id="srcitizen"
                        name="loantype"
                        onClick={()=>setRt(si)}
                      />
                    </label>
                    </div>
        </div>
        <br />
        <div className="row justify-content-center" >
            <div className="col-4" style={{ display: rt === ""? "none" : "block"}}>
                <label>Rate</label>
                <input
                type="number"
                class="form-control"
                name="rate"
                id="rate"
                value={rt}
                />
            </div>
        </div>
        <br />
        <div className="row container-fluid justify-content-center">
            <div className="col-4 text-right">
                <button className="btn btn-secondary btn-user" type="reset" onClick={()=>{setDisp("none");setRt("")}} style={{backgroundColor: "white", color: "black"}}>Reset</button>

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