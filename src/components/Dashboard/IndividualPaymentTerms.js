import React, {useState, useEffect} from "react"
import { useParams , navigate} from "@reach/router"
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Form } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";
import {IoMdArrowBack} from 'react-icons/io'
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  }));

function IndividualPaymentTerms(){

    var date = new Date();
    const {termId} = useParams()
    const [pterms, setPterms] = useState([])
    const [siteId, setSiteId] = useState("")
    const [serial, setSerial] = useState(0)
    const [file, setFile] = useState("")
    const [preview, setPreview] = useState("")
    
    const [ bool, setBool] = useState(false)

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const [open1, setOpen1] = React.useState(false);

    const handleClose1 = () => {
        setOpen1(false);
        setFile("")
        setPreview("")
    };

    const changeFile = (e) => {
        setFile(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]))
    }

    const upload = (e) => {
        e.preventDefault()
        const Token = 'bearer' + " " + Cookies.get('Token')
        const formData = new FormData()
        formData.append('file',file)
        formData.append('documentType', 'milestonePicture')
        formData.append('paymentTermsId',termId)
        formData.append('termSerial', serial - 1)
       

        axios.post(`${BASE_URL}/api/v1/util/documentupload`,formData ,{headers:{'Authorization':Token}})
        .then(response=>{
            console.log(response)
            setPreview("")
            alert("Milestone Picture Is successfully uploaded")
             window.location.reload()
            
        })
    }
    
    const handleChange = (event) => {
        const Token = 'bearer' + " " + Cookies.get('Token')
        if(bool === false) {
            setBool(true)
            axios.put(`${BASE_URL}/api/v1/paymentTerms/markPaymentMilestone`,{siteId: siteId, paymentTermsId: termId, serial: event.target.value*1, completionMarkedBy: Cookies.get('FullName'), milestoneCompletionDate: date},{headers:{Authorization:Token}})
            .then(response => {
                console.log(response)
                window.location.reload()
        })

        }
        else if(bool === true){
            setBool(false)
        }
    };


    useEffect(() => { 
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/paymentTerms/getPaymentTermsById/${termId}`,{headers:{Authorization:Token}})
        .then(response => {
            console.log(response)
            setPterms(response.data.paymentTerms.termItems)
            setSiteId(response.data.paymentTerms.siteId)
        
        })
    }, [])

    return(
        <>
       <div className="mt-2 row justify-content-center">
            <div className="col-12">
            <h4>Payment Term - {termId} </h4> 
            <br />
            <table class="table">
                <thead style={{backgroundColor : "#EE4B46", color : "#fff"}}>
                    <tr>
                    <th scope="col">Sl. No.</th>
                    <th scope="col">Description</th>
                    <th scope="col">Percentage</th>
                    <th scope="col">Completion Status</th>
                    <th scope="col">Milestone Completion Date</th>
                    <th scope="col">Completion Marked By</th>
                    <th scope="col">Action</th>
                    <th scope="col">Completion Picture</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {pterms.map((p)=>(
                        <tr>
                        <td>{p.serial}</td>
                        <td>{p.description}</td>
                        <td>{p.percentage}</td>
                        <td>{p.completionStatus === true ? "Yes": "No"}</td>
                        <td>{p.milestoneCompletionDate !== null? p.milestoneCompletionDate.substring(8,10)+"-"+p.milestoneCompletionDate.substring(5,7)+"-"+p.milestoneCompletionDate.substring(0,4) : null}</td>
                        <td>{p.completionMarkedBy}</td>
                        <td><input type="checkbox" id={p.serial} checked={p.completionStatus === true ? true : null} disabled={p.completionStatus === true ? true : null} name={p.serial} value={p.serial} onChange={handleChange} /></td>
                        <td>{p.milestonePictureLink === null ? <><button className="btn btn-secondary btn-user" onClick={()=>{setSerial(p.serial);setOpen(true)}}>Add Picture</button></> : <><button className="btn btn-secondary btn-user" onClick={()=>setOpen1(true)}>View Picture</button></>}</td>
                        
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            </div>
        </div>
        <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                        >
                            <Fade in={open}>
                            <div className={classes.paper}>
                            <h6 className="text-center">Upload Milestone Picture</h6>
                            <br />
                            <div style={{display: 'flex'}}> 
                                <input className="form-control-file" type="file" id="myfile" name="myfile" accept="image/jpeg" onChange={changeFile} style={{backgroundColor : 'white', color : 'black'}}/>
                                <button className="btn btn-secondary btn-user" onClick={upload}>Upload Document</button>
                            </div>
                            <br />
                            { preview !== "" ?
                            <>
                            <img src={preview} width="70%" height="70%" />
                            </>
                            : null
                            }
                            </div>
                            </Fade>
                    </Modal>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open1}
                        onClose={handleClose1}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                        >
                            <Fade in={open1}>
                            <div className={classes.paper}>
                              <img src="" alt="milestone-picture"/>
                            </div>
                            </Fade>
                    </Modal>
        </>
    )
}

export default IndividualPaymentTerms;