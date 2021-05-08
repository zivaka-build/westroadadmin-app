import React, {useState,useEffect} from "react"
import { Form } from "react-bootstrap";
import { useParams } from "@reach/router"
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";
import MaterialTable from "material-table";

function IndividualApplicationform() {

    const {applicationId}=useParams()
    const [ form, setForm ] = useState([])
    const [ appid, setAppid ] = useState("")
    const [ unitName, setUnitName] = useState("")
    const [ carPark, setCarPark] = useState("")
    const [ status, setStatus] = useState("")
    const [ bookingBy, setBookingBy] = useState("")
    const [ isBankLoan, setIsBankLoan] = useState("")


    useEffect(()=>{

        const Token = 'bearer' + " " + Cookies.get('Token')

        axios.get(`${BASE_URL}/api/v1/applicationform/getapplicationformbyapplicationid/${applicationId}`,{headers:{Authorization:Token}})
          .then(response =>{
            console.log(response.data)
            setAppid(response.data.applicationId)
            setUnitName(response.data.unitName)
            setCarPark(response.data.carParkingName)
            setStatus(response.data.status)
            setBookingBy(response.data.bookingBy)
          })

    },[])
    

    return (
        <div>
        <div className="row container-fluid px-0">
        <div className="col-12 mt-4">
        <MaterialTable
            data={form}
            title="Application Forms"
            columns={
                [
                    { title: 'Application Id', field: 'applicationId' },
                    { title: 'Unit Name', field: 'unitName' },
                    { title: 'Car Parking Name', field: 'carParkingName' },
                    { title: 'Status', field: 'status' },
                    { title: 'Booking By', field: 'bookingBy' },
                    { title: 'Bank Loan', field: 'isBankLoan' },
                    
                    
                ]
            }
            ></MaterialTable>
            </div>
            </div>
        </div>
    )
}

export default IndividualApplicationform
