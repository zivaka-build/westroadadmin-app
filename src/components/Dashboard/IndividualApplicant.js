import React, {useState, useEffect} from "react"
import { useParams , navigate} from "@reach/router"
import { Form } from "react-bootstrap";
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";
import {IoMdArrowBack} from 'react-icons/io'

function IndividualApplicant() {
    const {applicantId} = useParams()
    const [applicationId, setApplicationId] = useState("")
    const [firstName, setFirstName] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [lastName, setLastName] = useState("")
    const [salutation, setSalutation] = useState("")
    const [religion, setReligion] = useState("")
    const [nationality, setNationality] = useState("")
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

    const [disp, setDisp] = useState("none")

    const editApplicant = (e) => {
      const Token = 'bearer' + " " + Cookies.get('Token')
      e.preventDefault()
        axios.put(`${BASE_URL}/api/v1/applicant/updateapplicantbyapplicantid`,
        {   
            applicantId: applicantId,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            salutation: salutation,
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
            applicantEmail: ae,
            religion: religion,
            nationality: nationality
        },
        {headers:{'Authorization':Token}})
        .then(response => {
            console.log(response)
            setDisp("block")
        })
    
    }

    useEffect(() => {

        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/applicant/getapplicantbyapplicantid/${applicantId}`,{headers:{Authorization:Token}})
        .then(response => {
            console.log(response)
            setSalutation(response.data.salutation)
            setFirstName(response.data.firstName)
            setMiddleName(response.data.middleName)
            setLastName(response.data.lastName)
            setSn(response.data.spouseName)
            setFn(response.data.fatherName)
            setAm(response.data.applicantMobile)
            setAw(response.data.applicantWhatsapp)
            setAe(response.data.applicantEmail)
            setOc(response.data.occupation)
            setAp(response.data.applicantPAN)
            setAa(response.data.applicantAadhar)
            setAt(response.data.applicantType)
            setFa1(response.data.applicantAddress.fullAddress)
            setLm1(response.data.applicantAddress.landmark)
            setCt1(response.data.applicantAddress.city)
            setPc1(response.data.applicantAddress.pinCode)
            setSt1(response.data.applicantAddress.state)
            setFa2(response.data.correspondentAddress.fullAddress)
            setLm2(response.data.correspondentAddress.landmark)
            setCt2(response.data.correspondentAddress.city)
            setPc2(response.data.correspondentAddress.pinCode)
            setSt2(response.data.correspondentAddress.state)
            setApplicationId(response.data.applicationId)
            setReligion(response.data.religion)
            setNationality(response.data.nationality)
        })
    },[])

    return(

        <>
        <div className="mt-3 px-0 row container-fluid justify-content-center">
            <div className="col-12">
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={()=>navigate(-1)}><IoMdArrowBack />Back</button>
            </div>
        </div>
        <div className="applicants">
                    <form>
                    <br />
                    <div className="row justify-content-center">
                        <div className="col-4">
                            <label>Applicant ID</label>
                            <input
                            type="text"
                            class="form-control"
                            value={applicantId}
                            />
                        </div>
                        <div className="col-4">
                            <label>Applicant Type</label>
                            <input
                            type="text"
                            class="form-control"
                            value={at}
                            />
                        </div>
                        
                    </div>
                    <br />
                    <div className="row justify-content-center">
                    <div className="col-3">
                      <Form.Group controlId="salutation">
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
                      <div className="col-3">
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
                      <div className="col-3">
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
                      <div className="col-3">
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
                      <div className="row justify-content-center">
                          
                          <div className="col-6">
                            <label>Spouse Name</label>
                            <input
                            type="text"
                            class="form-control"
                            name="sname"
                            id="sname"
                            value={sn}
                            onChange={(e)=>setSn(e.target.value)}
                            />
                          </div>
                          <div className="col-6">
                            <label>Father's Name</label>
                            <input
                            type="text"
                            class="form-control"
                            name="fname"
                            id="fname"
                            value={fn}
                            onChange={(e)=>setFn(e.target.value)}
                            />
                          </div>
                      </div>
                      <br />
                      <div className="row justify-content-center">
                          <div className="col-6">
                            <label>Religion</label>
                            <input
                            type="text"
                            class="form-control"
                            name="religion"
                            id="religion"
                            onChange={(e)=>setReligion(e.target.value)}
                            />
                          </div>
                          <div className="col-6">
                            <label>Nationality</label>
                            <input
                            type="text"
                            class="form-control"
                            name="nationality"
                            id="nationality"
                            onChange={(e)=>setNationality(e.target.value)}
                            />
                          </div>
                      </div>
                      <br />
                      <div className="row justify-content-center">
                          <div className="col-4">
                            <label>Mobile</label>
                            <input
                            type="number"
                            class="form-control"
                            name="mobile"
                            id="mobile"
                            value={am}
                            onChange={(e)=>setAm(e.target.value)}
                            />
                          </div>
                          <div className="col-4">
                            <label>Whatsapp</label>
                            <input
                            type="number"
                            class="form-control"
                            name="whatsapp"
                            id="whatsapp"
                            value={aw}
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
                            value={ae}
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
                            value={oc}
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
                            value={ap}
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
                            value={aa}
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
                            value={fa1}
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
                            value={lm1}
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
                            value={ct1}
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
                            value={pc1}
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
                            value={st1}
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
                            value={fa2}
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
                            value={lm2}
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
                            value={ct2}
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
                            value={pc2}
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
                            value={st2}
                            onChange={(e)=>setSt2(e.target.value)}
                            />
                          </div>
                      </div>
                      <br />
                      <div className="text-center" style={{display : disp}}><em>All details saved succesfully!</em></div>
                      <div className="mt-2">
                        <div className="col-12 text-center">
                        <button className="btn btn-danger" onClick={editApplicant}>Save</button>
                        </div>
                      </div>
                    </form>                                            
                </div>
        </>
    )

}

export default IndividualApplicant;