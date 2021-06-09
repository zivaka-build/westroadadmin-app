import React, {useState,useEffect} from "react"
import { Form } from "react-bootstrap";
import { useParams, navigate } from "@reach/router"
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";
import MaterialTable from "material-table";
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import {IoMdArrowBack} from 'react-icons/io'

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

function IndividualApplicationform() {
    var date = new Date()
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);


    const handleClose = () => {
        setOpen(false);
    };

    const {applicationId} = useParams()
    const [ applicant, setApplicant ] = useState([])
    const [file, setFile] = useState("");

    let [arr,setArr] =useState([])
    const [ appid, setAppid ] = useState("")
    const [ siteid, setSiteid ] = useState("")
    const [ leadid, setLeadid ] = useState("")
    const [ unitName, setUnitName] = useState("")
    const [ carPark, setCarPark] = useState("")
    const [ status, setStatus] = useState("")
    const [ bookingBy, setBookingBy] = useState("")
    const [ isBankLoan, setIsBankLoan] = useState("")
    const [parking, setParking] = useState([]);
    const [pterms, setPterms] = useState([]);
    const [termId, setTermId] = useState("")
    const [disp, setDisp] = useState("none")
    const [spinner, setSpinner] = useState("none")

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

    const [neft, setNeft] = useState(false)
    const [cq, setCq] = useState(false) 

    const [td,setTd] = useState("")
    const [ta,setTa] = useState("")
    const [tb,setTb] = useState("")
    const [tc,setTc] = useState("")

    const [can,setCan] = useState("")
    const [cbn, setCbn] = useState("")
    const [cd, setCd] = useState("")
    const [cn, setCn] = useState("")
    const [ib, setIb] = useState("")
    const [tam, setTam] = useState("")

    const [funded, setFunded] = useState()
    const [fb, setFb] = useState("")
    const [fbp, setFbp] = useState("")

    const [pv, setPv] = useState()
    const [baa, setBaa] = useState()
    const [vb, setVb] = useState("")
    const [vd, setVd] = useState("")

    const [bpm, setBpm] = useState(false)
    const [bpms, setBpms] = useState("")
    const [paymentMode, setPaymentMode] = useState("")
    const [notFundedSelf, setNotFundedSelf] = useState()
    const [fundedBy, setFundedBy] = useState("")
    const [fundedPan, setFundedPan] = useState("")
    const [fundedPanValidated, setFundedPanValidated] = useState(false)

    const [tdate, setTdate] = useState("")
    const [account, setAccount] = useState("")
    const [bank, setBank] = useState("")
    const [issuedBy, setIssuedBy] = useState("")
    const [tamount, setTamount] = useState(100000)
    const [chequeNo, setChequeNo] = useState("")
    const [comments, setComments] = useState("")
    const [receivedBy, setReceivedBy] = useState("")
    
    const [draftname, setDraftname] = useState("")
    const [duploadedby, setDuploadedby] = useState("")
    const [duploadedat, setDuploadedat] = useState("")
    const [ds3link, setDs3link] = useState("")
    const [draft, setDraft] = useState(false)

    
    const [afsuploadedby, setAfsuploadedby] = useState("")
    const [afsdname, setAfsdname] = useState("")
    const [afsuploadeddate, setAfsuploadeddate] = useState("")
    const [afss3link, setAfss3link] = useState("")
    const [afs, setAfs] = useState(false)
    const [afsfile, setAfsfile] = useState("")
    var today = new Date();

    const [cauploadedby, setCauploadedby] = useState("")
    const [cadname, setCadname] = useState("")
    const [cauploadeddate, setCauploadeddate] = useState("")
    const [cas3link, setCas3link] = useState("")
    const [ca, setCa] = useState(false)
    const [cafile, setCafile] = useState("")

    const [cpuploadedby, setCpuploadedby] = useState("")
    const [cpname, setCpname] = useState("")
    const [cpuploadeddate, setCpuploadeddate] = useState("")
    const [cps3link, setCps3link] = useState("")
    const [cp, setCp] = useState(false)
    const [cpfile, setCpfile] = useState("")


    const [paluploadedby, setPaluploadedby] = useState("")
    const [palname, setPalname] = useState("")
    const [paluploadeddate, setPaluploadeddate] = useState("")
    const [pals3link, setPals3link] = useState("")
    const [pal, setPal] = useState(false)
    const [pals, setPals] = useState(false)

    const [saduploadedby, setSaduploadedby] = useState("")
    const [sadname, setSadname] = useState("")
    const [saduploadeddate, setSaduploadeddate] = useState("")
    const [sads3link, setSads3link] = useState("")
    const [sad, setSad] = useState(false)

    const [sasuploadedby, setSasuploadedby] = useState("")
    const [sasname, setSasname] = useState("")
    const [sasuploadeddate, setSasuploadeddate] = useState("")
    const [sass3link, setSass3link] = useState("")
    const [sas, setSas] = useState(false)
    const [sasfile, setSasfile] = useState("")

    const [ cs, setCs] = useState(false)
    const [csa, setCsa] = useState("")
    const [csrb, setCsrb] = useState("")
    const [csd, setCsd] = useState("")
    const [csib, setCsib] = useState("")

    const [bpr, setBpr] = useState(false)
    const [brn, setBrn] = useState("")
    const [bcv, setBcv] = useState("")

    const [phoneValidated, setPhoneValidated] = useState(false)
    const [waValidated, setWaValidated] = useState(true)
    const [emailValidated, setEmailValidated] = useState(false)
    const [aadharValidated, setAadharValidated] = useState(false)
    const [panValidated, setPanValidated] = useState(false)

    const [cad, setCad] = useState(false)
    const [cadLink, setCadLink] = useState("")



    const showApplicant = (e) => {
        if(disp === "none"){
            setDisp("block")
        }
        else{
            setDisp("none")
        }
    }

    const changePhone = (e) => {
      var val = e.target.value
      setAm(e.target.value)

      var message = document.getElementById('phnoMessage');
        if(val.length == 10){
            message.classList.remove('d-block');
            message.classList.add('d-none');
            setPhoneValidated(true) 
        }
        else{
            
            message.classList.remove('d-none');
            message.classList.add('d-block');
            setPhoneValidated(false)
        }

    }

    const changeWhatsapp = (e) => {
      var val = e.target.value
      setAw(e.target.value)

      var message = document.getElementById('waMessage');
        if(val.length == 10){
            message.classList.remove('d-block');
            message.classList.add('d-none');
            setWaValidated(true) 
        }
        else{
            
            message.classList.remove('d-none');
            message.classList.add('d-block');
            setWaValidated(false)
        }
    }

    const changeEmail = (e) => {
      var val = e.target.value
      setAe(e.target.value)
      var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

      var message = document.getElementById('emailMessage');
        if(regex.test(val)){
            message.classList.remove('d-block');
            message.classList.add('d-none');
            setEmailValidated(true) 
        }
        else{
            
            message.classList.remove('d-none');
            message.classList.add('d-block');
            setEmailValidated(false)
        }
    }

    const changeAadhar = (e) => {
      var val = e.target.value
      setAa(e.target.value)
      
      var message = document.getElementById('aadharMessage');
        if(val.length == 12){
            message.classList.remove('d-block');
            message.classList.add('d-none');
            setAadharValidated(true) 
        }
        else{
            
            message.classList.remove('d-none');
            message.classList.add('d-block');
            setAadharValidated(false)
        }
    }

    const changePan = (e) => {
      var val = e.target.value
      setAp(e.target.value)
      var regex = /^[A-Z0-9]{10}$/
      var message = document.getElementById('panMessage');
        if(regex.test(val)){
            message.classList.remove('d-block');
            message.classList.add('d-none');
            setPanValidated(true) 
        }
        else{
            
            message.classList.remove('d-none');
            message.classList.add('d-block');
            setPanValidated(false)
        }
    }

    const changeFundedPan = (e) => {
      var val = e.target.value
      setFundedPan(e.target.value)
      var regex = /^[A-Z0-9]{10}$/
      var message = document.getElementById('fundedpanMessage');
        if(regex.test(val)){
            message.classList.remove('d-block');
            message.classList.add('d-none');
            setFundedPanValidated(true) 
        }
        else{
            
            message.classList.remove('d-none');
            message.classList.add('d-block');
            setFundedPanValidated(false)
        }
    }

    const addApplicant = (e) => {
        e.preventDefault()
        const Token = 'bearer' + " " + Cookies.get('Token')
        if(phoneValidated === true && waValidated ===true && emailValidated === true && aadharValidated === true && panValidated === true)
        {
        axios.post(`${BASE_URL}/api/v1/applicant/createNewApplicant`,
        {
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
            window.location.reload()
        })
      }
    }
    
    

    function changeAFS(event) {
      setAfsfile(event.target.files[0])
    }
    
    const uploadAFS = (e) =>{
      e.preventDefault()
      const Token = 'bearer' + " " + Cookies.get('Token')
      const formData = new FormData()
      formData.append('file',afsfile)
      formData.append('documentName',`ApplicationFormScanCopy-${unitName}-${applicationId}`)
      formData.append('uploadedBy',Cookies.get('FullName'))
      formData.append('uploadedDate',today)
      formData.append('documentType','ApplicationFormScanCopy')
      formData.append('applicationId',applicationId)

      axios.post(`${BASE_URL}/api/v1/util/documentupload`,formData ,{headers:{'Authorization':Token}})
      .then(response=>{
          
          if(response.status === 200){
              window.location.reload()
          }
      })

  }
  
  function changeCA(event) {
    setCafile(event.target.files[0])
  }

  const uploadCA = (e) =>{
    e.preventDefault()
    const Token = 'bearer' + " " + Cookies.get('Token')
    const formData = new FormData()
    formData.append('file',cafile)
    formData.append('documentName',`CustomerAadharCard-${unitName}-${applicationId}`)
    formData.append('uploadedBy',Cookies.get('FullName'))
    formData.append('uploadedDate',today)
    formData.append('documentType','customerAadhar')
    formData.append('applicationId',applicationId)

    axios.post(`${BASE_URL}/api/v1/util/documentupload`,formData ,{headers:{'Authorization':Token}})
    .then(response=>{
        console.log(response)
        if(response.status === 200){
            window.location.reload()
        }
    })

}

function changeCP(event) {
  setCpfile(event.target.files[0])
}

const uploadCP = (e) =>{
  e.preventDefault()
  const Token = 'bearer' + " " + Cookies.get('Token')
  const formData = new FormData()
  formData.append('file',cpfile)
  formData.append('documentName',`CustomerPANCard-${unitName}-${applicationId}`)
  formData.append('uploadedBy',Cookies.get('FullName'))
  formData.append('uploadedDate',today)
  formData.append('documentType','customerPAN')
  formData.append('applicationId',applicationId)

  axios.post(`${BASE_URL}/api/v1/util/documentupload`,formData ,{headers:{'Authorization':Token}})
  .then(response=>{
      console.log(response)
      if(response.status === 200){
          window.location.reload()
      }
  })

}
const approveButton =()=>{
  const Token = 'bearer' + " " + Cookies.get('Token')
  axios.post(`${BASE_URL}/api/v1/applicationform/sendprovisionalletter`,{applicationId:applicationId},{headers:{'Authorization':Token}})
  .then(response=>{
    if(response.status === 200){
      window.location.reload()
  }
    
  })
}

// CARD 7

function changeSAS(event) {
  setSasfile(event.target.files[0])
}

const uploadSAS = (e) =>{
  e.preventDefault()
  const Token = 'bearer' + " " + Cookies.get('Token')
  const formData = new FormData()
  formData.append('file',sasfile)
  formData.append('documentName',`CustomerAadharCard-${unitName}-${applicationId}`)
  formData.append('uploadedBy',Cookies.get('FullName'))
  formData.append('uploadedDate',today)
  formData.append('documentType','salesAgreementScan')
  formData.append('applicationId',applicationId)

  axios.post(`${BASE_URL}/api/v1/util/documentupload`,formData ,{headers:{'Authorization':Token}})
  .then(response=>{
      console.log(response)
      if(response.status === 200){
          window.location.reload()
      }
  })

}



    const upload = (e) =>{
        e.preventDefault()
        const Token = 'bearer' + " " + Cookies.get('Token')
        const formData = new FormData()
        formData.append('file',file)
        formData.append('custId','123')
        formData.append('folderName','profile')

        axios.post(`${BASE_URL}/api/v1/util/documentupload`,formData ,{headers:{'Authorization':Token}})
        .then(response=>{
            console.log(response)
            if(response.status === 200){
                alert("File Successfully Uploaded")
            }
        })

    }

    const validate = (e) => {
      setSpinner("block")
      const Token = 'bearer' + " " + Cookies.get('Token')
      axios.put(`${BASE_URL}/api/v1/applicationform/validatepayment`, {applicationId: applicationId, paymentValidatedBy: Cookies.get("FullName"), paymentValidatedDate: date }, {headers:{'Authorization':Token}})
        .then(response=>{
            console.log(response)
            window.location.reload()
        })
        
    }

    const generateApfd = (e) =>{
      const Token = 'bearer' + " " + Cookies.get('Token')
      axios.post(`${BASE_URL}/api/v1/util/bookingFormPdf`, {applicationId: applicationId}, {headers:{'Authorization':Token}})
        .then(response=>{
            console.log(response)
            window.location.reload()
            
        })
    }

    const submit = (e) => {
      e.preventDefault()
      const Token = 'bearer' + " " + Cookies.get('Token')
      if( notFundedSelf === false) {
        if(paymentMode === "Cheque" || paymentMode === "DD") {  
          axios.put(`${BASE_URL}/api/v1/applicationform/addpaymentdetailstoappform`, 
          { 
            applicationId : applicationId,
            notFundedSelf: notFundedSelf,
            bookingPaymentMode: paymentMode,
            issuedBy: issuedBy,
            chequeNo: chequeNo,
            chequeAccountNo: account,
            chequeBankName: bank,
            chequeDate: tdate,
            transactionAmount: tamount
          },
          {headers:{'Authorization':Token}})
          .then(response=>{
              console.log(response)
              window.location.reload()
              
          })
        }

        else if(paymentMode === "Cash") {
          axios.put(`${BASE_URL}/api/v1/applicationform/addpaymentdetailstoappform`, 
          { 
            applicationId : applicationId,
            notFundedSelf: notFundedSelf,
            bookingPaymentMode: paymentMode,
            issuedBy: issuedBy,
            receivedBy: receivedBy,
            receivedDate: tdate,
            transactionAmount: tamount
          },
          {headers:{'Authorization':Token}})
          .then(response=>{
              console.log(response)
              window.location.reload()
              
          })
        }

        else {
          axios.put(`${BASE_URL}/api/v1/applicationform/addpaymentdetailstoappform`, 
          { 
            applicationId : applicationId,
            notFundedSelf: notFundedSelf,
            bookingPaymentMode: paymentMode,
            issuedBy: issuedBy,
            transactionComments: comments,
            transactionAccount: account,
            transactionBank: bank,
            transDate: tdate,
            transactionAmount: tamount
          },
          {headers:{'Authorization':Token}})
          .then(response=>{
              console.log(response)
              window.location.reload()
          })
        }
      }

      else if(notFundedSelf === true && fundedPanValidated === true) {
        if(paymentMode === "Cheque" || paymentMode === "DD") {  
          axios.put(`${BASE_URL}/api/v1/applicationform/addpaymentdetailstoappform`, 
          { 
            applicationId : applicationId,
            notFundedSelf: notFundedSelf,
            bookingPaymentMode: paymentMode,
            issuedBy: issuedBy,
            chequeNo: chequeNo,
            chequeAccountNo: account,
            chequeBankName: bank,
            chequeDate: tdate,
            fundedBy: fundedBy,
            fundedByPAN: fundedPan,
            transactionAmount: tamount
          },
          {headers:{'Authorization':Token}})
          .then(response=>{
              console.log(response)
              window.location.reload()
          })
        }

        else if(paymentMode === "Cash") {
          axios.put(`${BASE_URL}/api/v1/applicationform/addpaymentdetailstoappform`, 
          { 
            applicationId : applicationId,
            notFundedSelf: notFundedSelf,
            bookingPaymentMode: paymentMode,
            issuedBy: issuedBy,
            receivedBy: receivedBy,
            receivedDate: tdate,
            fundedBy: fundedBy,
            fundedByPAN: fundedPan,
            transactionAmount: tamount
          },
          {headers:{'Authorization':Token}})
          .then(response=>{
              console.log(response)
              window.location.reload()
              
          })
        }


        else {
          axios.put(`${BASE_URL}/api/v1/applicationform/addpaymentdetailstoappform`, 
          { 
            applicationId : applicationId,
            notFundedSelf: notFundedSelf,
            bookingPaymentMode: paymentMode,
            issuedBy: issuedBy,
            transactionComments: comments,
            transactionAccount: account,
            transactionBank: bank,
            transDate: tdate,
            fundedBy: fundedBy,
            fundedByPAN: fundedPan,
            transactionAmount: tamount
          },
          {headers:{'Authorization':Token}})
          .then(response=>{
              console.log(response)
              window.location.reload()
          })
        }

      }
      
    }

    const generateChequeReceipt = (e) => {
      e.preventDefault()
      const Token = 'bearer' + " " + Cookies.get('Token')
      axios.post(`${BASE_URL}/api/v1/util/chequeReceipt`, 
          { 
            applicationId : applicationId,
          },
          {headers:{'Authorization':Token}})
          .then(response=>{
              console.log(response)
          })
    }

    
    const approve = (e) => {
      const Token = 'bearer' + " " + Cookies.get('Token')
      axios.put(`${BASE_URL}/api/v1/applicationform/bookingamountapproval`, 
          { 
            applicationId : applicationId,
            isApproved: true
          },
          {headers:{'Authorization':Token}})
          .then(response=>{
              console.log(response)
              window.location.reload()
          })
        
    }

    const reject = (e) => {
      const Token = 'bearer' + " " + Cookies.get('Token')
      axios.put(`${BASE_URL}/api/v1/applicationform/bookingamountapproval`, 
          { 
            applicationId : applicationId,
            isApproved: false
          },
          {headers:{'Authorization':Token}})
          .then(response=>{
              console.log(response)
              window.location.reload()
          })
    }

    
    
    useEffect(()=>{

        const Token = 'bearer' + " " + Cookies.get('Token')

        axios.get(`${BASE_URL}/api/v1/applicationform/getapplicationformbyapplicationid/${applicationId}`,{headers:{Authorization:Token}})
          .then(response =>{

            console.log(response)
            setAppid(response.data.applicationId)
            setUnitName(response.data.unitName)
            setCarPark(response.data.carParkingName)
            setStatus(response.data.status)
            setBookingBy(response.data.bookingBy)
            setLeadid(response.data.leadId)
            setSiteid(response.data.siteId)
            setIsBankLoan(response.data.isBankLoan)
            setBpr(response.data.bookingPaymentReciept)
            var pt = response.data.paymentTerms

            if(response.data.bookingPaymentReceipt === true ){
              setBrn(response.data.bookingPaymentRecieptNumber)
              setBcv(response.data.bookingPaymentRecieptLink)
            }

            if(response.data.applicationFormDraft === false){
              setDraft(false)
            }
            else if(response.data.applicationFormDraft===true){
              setDraft(true)
              for(var i=0;i<response.data.documents.length;i++){
                if(response.data.documents[i].documentType === "Application Form - Draft"){
                  setDraftname(response.data.documents[i].documentName)
                  setDuploadedby(response.data.documents[i].uploadedBy)
                  setDuploadedat(response.data.documents[i].uploadedDate)
                  setDs3link(response.data.documents[i].s3Link)
                }
              }
            }

              if(response.data.applicationFormScan === false){
                setAfs(false)
              }
              else if(response.data.applicationFormScan===true){
                setAfs(true)
                for(var i=0;i<response.data.documents.length;i++){
                  if(response.data.documents[i].documentType === "ApplicationFormScanCopy"){
                    setAfsdname(response.data.documents[i].documentName)
                    setAfsuploadedby(response.data.documents[i].uploadedBy)
                    setAfsuploadeddate(response.data.documents[i].uploadedDate)
                    setAfss3link(response.data.documents[i].s3Link)
                  }
                }
            }
          
          if(response.data.customerAadhar === false){
            setCa(false)
          }
          else if(response.data.customerAadhar===true){
            setCa(true)
            for(var i=0;i<response.data.documents.length;i++){
              if(response.data.documents[i].documentType === "customerAadhar"){
                setCadname(response.data.documents[i].documentName)
                setCauploadedby(response.data.documents[i].uploadedBy)
                setCauploadeddate(response.data.documents[i].uploadedDate)
                setCas3link(response.data.documents[i].s3Link)
                console.log(cadname,cauploadedby)
              }
            }
          }

            if(response.data.customerPAN === false){
              setCp(false)
            }
            else if(response.data.customerPAN===true){
              setCp(true)
              for(var i=0;i<response.data.documents.length;i++){
                if(response.data.documents[i].documentType === "customerPAN"){
                  setCpname(response.data.documents[i].documentName)
                  setCpuploadedby(response.data.documents[i].uploadedBy)
                  setCpuploadeddate(response.data.documents[i].uploadedDate)
                  setCps3link(response.data.documents[i].s3Link)
                }
              }
          }

          if(response.data.provisionalAllotmentLetter  === false && response.data.provisionalAllotmentLetterSent === false){
            setPal(false)
            setPals(false)
          }
          else if(response.data.provisionalAllotmentLetter ===true && response.data.provisionalAllotmentLetterSent === false){
            setPal(true)
            setPals(false)
            for(var i=0;i<response.data.documents.length;i++){
              if(response.data.documents[i].documentType === "ProvisionalAllotmentLetter"){
                setPalname(response.data.documents[i].documentName)
                setPaluploadedby(response.data.documents[i].uploadedBy)
                setPaluploadeddate(response.data.documents[i].uploadedDate)
                setPals3link(response.data.documents[i].s3Link)
              }
            }
          }

            else if(response.data.provisionalAllotmentLetter ===true && response.data.provisionalAllotmentLetterSent === true){
              setPal(true)
              setPals(true)
              for(var i=0;i<response.data.documents.length;i++){
                if(response.data.documents[i].documentType === "ProvisionalAllotmentLetter"){
                  setPalname(response.data.documents[i].documentName)
                  setPaluploadedby(response.data.documents[i].uploadedBy)
                  setPaluploadeddate(response.data.documents[i].uploadedDate)
                  setPals3link(response.data.documents[i].s3Link)
                }
              }
        }

        if(response.data.salesAgreementDraft === false){
          setSad(false)
        }
        else if(response.data.salesAgreementDraft===true){
          setSad(true)
          for(var i=0;i<response.data.documents.length;i++){
            if(response.data.documents[i].documentType === "SalesAgreementDraft"){
              setSadname(response.data.documents[i].documentName)
              setSaduploadedby(response.data.documents[i].uploadedBy)
              setSaduploadeddate(response.data.documents[i].uploadedDate)
              setSads3link(response.data.documents[i].s3Link)
            }
          }
      }

      if(response.data.salesAgreementScan === false){
        setSas(false)
      }
      else if(response.data.salesAgreementScan===true){
        setSas(true)
        for(var i=0;i<response.data.documents.length;i++){
          if(response.data.documents[i].documentType === "salesAgreementScan"){
            setSasname(response.data.documents[i].documentName)
            setSasuploadedby(response.data.documents[i].uploadedBy)
            setSasuploadeddate(response.data.documents[i].uploadedDate)
            setSass3link(response.data.documents[i].s3Link)
          }
        }
    }
        


            axios.get(`${BASE_URL}/api/v1/paymentTerms/getPaymentTermsById/${pt}`,{headers:{Authorization:Token}})
                .then(response => {
                    console.log(response)
                    setPterms(response.data.paymentTerms.termItems)
                    })
                    
             
            
            if(response.data.NEFTDetails){
              setNeft(true)
              setTd(response.data.NEFTDetails.transDate)
              setTa(response.data.NEFTDetails.transactionAccount)
              setTb(response.data.NEFTDetails.transactionBank)
              setTc(response.data.NEFTDetails.transactionComments)
              setTam(response.data.NEFTDetails.transactionAmount)
            }            

            if(response.data.chequeDetails) {
              setCq(true)
              setCan(response.data.chequeDetails.chequeAccountNo)
              setCbn(response.data.chequeDetails.chequeBankName)
              setCd(response.data.chequeDetails.chequeDate)
              setCn(response.data.chequeDetails.chequeNo)
              setTam(response.data.chequeDetails.transactionAmount)
              setIb(response.data.chequeDetails.issuedBy)
            }

            if(response.data.CashDetails) {
              setCs(true)
              setCsa(response.data.CashDetails.transactionAmount)
              setCsrb(response.data.CashDetails.receivedBy)
              setCsd(response.data.CashDetails.receivedDate)
              setCsib(response.data.CashDetails.issuedBy)
            }

            if(response.data.notFundedSelf === true) {
              setFunded(true)
              setFb(response.data.fundedBy)
              setFbp(response.data.fundedByPAN)
            }

            else if(response.data.notFundedSelf === false){
              setFunded(false)
              setFb("Self")
            }

            if(response.data.NEFTDetails || response.data.chequeDetails || response.data.CashDetails){
              if(response.data.paymentValidated === true){
                setPv(true)
                setVb(response.data.paymentValidatedBy)
                setVd(response.data.paymentValidatedDate)
              }
              else {
                setPv(false)
              }
            }
            if(response.data.NEFTDetails || response.data.chequeDetails || response.data.CashDetails){
              if(response.data.bookingAmountApproval === true){
                setBaa(true)
                
              }
              else {
                setBaa(false)
              }
            }

            setBpms(response.data.bookingPaymentMode)
            if(response.data.bookingPaymentMode !== "Not Added") {
              setBpm(true)
            }

            if(response.data.chequeAcknowledgementDoc === false) {
              setCad(false)
            }

            else if(response.data.chequeAcknowledgementDoc === true){
              setCad(true)
              setCadLink(response.data.chequeAcknowledgementLink)
            }

           

          })

          

          axios.get(`${BASE_URL}/api/v1/applicant/getlistofapplicantsbyapplicationID/${applicationId}`,{headers:{Authorization:Token}})
              .then(response=>{
                
              console.log(response)
              setArr(response.data)
              var length = response.data.length
              if(length === 0){
                  setAt("First Applicant")
              }
              else if(length > 0){
                  setAt(`Co Applicant ${length}`)
                  
              }
            })
    },[])
    

    return (
        <div className="mt-2">
          <div className="mt-3 row container-fluid justify-content-center px-1" >
            <div className="col-12">
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={()=>navigate("/dashboard/listofapplicationform")}><IoMdArrowBack />Back</button>
            </div>
        </div>
        <Tab.Container id="left-tabs-example" defaultActiveKey={Cookies.get('ActiveKey')}>
        <Row>
            <Col sm={12}>
            <center>
            <Nav variant="pills" className="justify-content-center flex-row">
                <Nav.Item onClick={()=>{Cookies.set('ActiveKey', 'first')}}>
                <Nav.Link className="tabs" eventKey="first">Details</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={()=>{Cookies.set('ActiveKey', 'second')}}>
                <Nav.Link className="tabs" eventKey="second">Applicants</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={()=>{Cookies.set('ActiveKey', 'third')}}>
                <Nav.Link className="tabs" eventKey="third">Booking Payment</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={()=>{Cookies.set('ActiveKey', 'fourth')}}>
                <Nav.Link className="tabs" eventKey="fourth">Payment Terms</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={()=>{Cookies.set('ActiveKey', 'fifth')}}>
                <Nav.Link className="tabs" eventKey="fifth">Documents</Nav.Link>
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
              
                    <div className="tab-card container-fluid">
                      <div className="row pt-3 justify-content-center">

                            <div className="col-8">
                            <div className="row">
                                <div className="col-6">
                                    <h3 className="mt-3 pl-2" style={{backgroundColor : "#EE4B46", borderRadius : "33px", color: "white"}}>Application ID - {applicationId} </h3>
                                </div>
                            </div>
                            <br />
                              
                            </div>
                            </div>
                            <br />
                            <div className="row justify-content-center">
                            <div className="col-4">
                                <label>Site ID</label>
                                <input
                                type="text"
                                class="form-control"
                                name="contact"
                                id="outlined-basic"
                                onChange={(e)=>setSiteid(e.target.value)}
                                value={siteid}
                                />
                            </div>
                            <div className="col-4">
                                <label>Status</label>
                                <input
                                type="text"
                                class="form-control"
                                name="status"
                                id="outlined-basic"
                                onChange={(e)=>setStatus(e.target.value)}
                                value={status}
                                />
                            </div>
                            </div>
                            <br />
                            <div className="row justify-content-center">
                            <div className="col-8">
                                <label>Unit Name</label>
                                <input
                                type="text"
                                class="form-control"
                                name="text"
                                id="outlined-basic"
                                onChange={(e)=>setUnitName(e.target.value)}
                                value={unitName}
                                />
                            </div>
                            </div>
                            <br />
                            <div className="row justify-content-center">
                            <div className="col-8">
                                <label>Lead ID</label>
                                <input
                                type="text"
                                class="form-control"
                                name="address"
                                id="outlined-basic"
                                onChange={(e)=>setLeadid(e.target.value)}
                                value={leadid}
                                />
                            </div>
                            </div>
                            <br />
                            <div className="row justify-content-center">
                            <div className="col-4">
                                <label>Booking By</label>
                                <input
                                type="text"
                                class="form-control"
                                name="BookingBy"
                                id="outlined-basic"
                                onChange={(e)=>setBookingBy(e.target.value)}
                                value={bookingBy}
                                />
                            </div>
                            <div className="col-4">
                                <label>Bank Loan</label>
                                <input
                                type="text"
                                class="form-control"
                                name="pincode"
                                id="outlined-basic"
                                onChange={(e)=>setIsBankLoan(e.target.value)}
                                value={isBankLoan===true?"Yes":"No"}
                                />
                            </div>
                            </div>
                            <br />


                           
                    </div>
             
                </Tab.Pane>
                
            </Tab.Content>
            <Tab.Content>
                <Tab.Pane eventKey="second">
                <div className="mt-2">
                    <div className="col-12 text-center">
                    <button className="btn btn-danger" onClick={showApplicant} disabled={arr.length === 3 ? "disabled" : null}>Add Applicant</button>
                    </div>
                </div>
                <div className="applicants" style={{display: disp}}>
                    <form onSubmit={addApplicant}>
                    <br />
                    <div className="row justify-content-center">
                    <div className="col-3">
                      <Form.Group controlId="salutation">
                        <Form.Label>Salutation</Form.Label>
                        <Form.Control  as="select" onChange={(e)=>setSalutation(e.target.value)} required>
                        <option value="">Select a Salutation</option>   
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
                          required
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
                          required
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
                            required
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
                            required
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
                            required
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
                            required
                            onChange={changePhone}
                            />
                            <small id="phnoMessage" className="text-danger d-none">
                              Must be of 10 characters with numbers only
                            </small>
                          </div>
                          <div className="col-4">
                            <label>Whatsapp</label>
                            <input
                            type="number"
                            class="form-control"
                            name="whatsapp"
                            id="whatsapp"
                            onChange={changeWhatsapp}
                            />
                            <small id="waMessage" className="text-danger d-none">
                              Must be of 10 characters with numbers only
                            </small>
                          </div>
                          <div className="col-4">
                            <label>Email</label>
                            <input
                            type="email"
                            class="form-control"
                            name="email"
                            id="email"
                            required
                            onChange={changeEmail}
                            />
                            <small id="emailMessage" className="text-danger d-none">
                              Please provide a valid email
                            </small>
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
                            required
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
                            required
                            onChange={changePan}
                            />
                            <small id="panMessage" className="text-danger d-none">
                              Must be 10 characters with capitals and numbers only
                            </small>
                          </div>
                          <div className="col-4">
                            <label>Aadhar</label>
                            <input
                            type="number"
                            class="form-control"
                            name="aa"
                            id="aa"
                            required
                            onChange={changeAadhar}
                            />
                            <small id="aadharMessage" className="text-danger d-none">
                              Must be 12 digits
                            </small>
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
                            required
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
                            required
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
                            required
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
                            required
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
                            required
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
                            onChange={(e)=>setSt2(e.target.value)}
                            />
                          </div>
                      </div>
                      <div className="mt-2">
                        <div className="col-12 text-center">
                        <button className="btn btn-danger" type="submit">Add</button>
                        </div>
                      </div>
                    </form>                                            
                </div>
                {arr.map((a)=>(
                
                <div className="tab-card mt-5 py-3 container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-4">
                            <label>Applicant ID</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.applicantId}
                            />
                        </div>
                        <div className="col-4">
                            <label>Applicant Type</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.applicantType}
                            />
                        </div>
                        
                    </div>
                    <br />
                    <div className="row justify-content-center">
                      <div className="col-3">
                            <label>Salutation</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.salutation}
                            />
                        </div>
                      <div className="col-3">
                        <label>First Name</label>
                        <input
                        type="text"
                        class="form-control"
                        value={a.firstName}
                        />
                      </div>
                      <div className="col-3">
                        <label>Middle Name</label>
                        <input
                        type="text"
                        class="form-control"
                        value={a.middleName}
                        />
                      </div>
                      <div className="col-3">
                        <label>Last Name</label>
                        <input
                        type="text"
                        class="form-control"
                        value={a.lastName}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="row justify-content-center">
                          
                          <div className="col-6">
                            <label>Spouse Name</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.spouseName}
                            />
                          </div>
                          <div className="col-6">
                            <label>Father's Name</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.fatherName}
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
                            value={a.religion}
                            />
                          </div>
                          <div className="col-6">
                            <label>Nationality</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.nationality}
                            />
                          </div>
                      </div>
                      <br />
                      <div className="row justify-content-center">
                          <div className="col-4">
                            <label>Mobile</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.applicantMobile}
                            />
                          </div>
                          <div className="col-4">
                            <label>Whatsapp</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.applicantWhatsapp}
                            />
                          </div>
                          <div className="col-4">
                            <label>Email</label>
                            <input
                            class="form-control"
                            type="email"
                            value={a.applicantEmail}
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
                            value={a.occupation}
                            />
                          </div>
                          <div className="col-4">
                            <label>PAN</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.applicantPAN}
                            />
                          </div>
                          <div className="col-4">
                            <label>Aadhar</label>
                            <input
                            type="number"
                            class="form-control"
                            value={a.applicantAadhar}
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
                            value={a.applicantAddress.fullAddress}
                            />
                          </div>
                          <div className="col-6">
                            <label>Landmark</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.applicantAddress.landmark}
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
                            value={a.applicantAddress.city}
                            />
                          </div>
                          <div className="col-4">
                            <label>Pincode</label>
                            <input
                            type="number"
                            class="form-control"
                            value={a.applicantAddress.pinCode}
                            />
                          </div>
                          <div className="col-4">
                            <label>State</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.applicantAddress.state}
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
                            value={a.correspondentAddress.fullAddress}
                            />
                          </div>
                          <div className="col-6">
                            <label>Landmark</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.correspondentAddress.landmark}
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
                            value={a.correspondentAddress.city}
                            />
                          </div>
                          <div className="col-4">
                            <label>Pincode</label>
                            <input
                            type="number"
                            class="form-control"
                            value={a.correspondentAddress.pinCode}
                            />
                          </div>
                          <div className="col-4">
                            <label>State</label>
                            <input
                            type="text"
                            class="form-control"
                            value={a.correspondentAddress.state}
                            />
                          </div>
                      </div>
                      <br /> 
                      <div className="mt-2">
                        <div className="col-12 text-center">
                        <button className="btn btn-danger" onClick={()=>{navigate(`/dashboard/individualapplicant/${a.applicantId}`)}} disabled={ status !== "Booking Initiated" && status !== "Applicant Added" && status !== "Application Form Generated" ? true : false}>Edit Applicant</button>
                        </div>
                      </div>
                </div>
                ))}
                </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
                <Tab.Pane eventKey="third">
                  { 
                  bpm === false ?
                  <>
                  <br />
                  <div className="row justify-content-center">
                    <div className="col-8">
                      <h5>Booking Payment</h5>
                    </div>
                  </div>
                  <br />
                  <div className="row justify-content-center">
                    
                    <div className="col-lg-8 col-sm-12">
                    <label class="text-align left">Payment Mode : </label>
                    <input
                          type="radio"
                          className="form-check-input"
                          id="cheque"
                          name="bpm"
                          onClick={(e)=>setPaymentMode("Cheque")}
                        />
                      <label class="form-check-label pl-5">
                        Cheque
                      </label>
                      
                      <input
                          type="radio"
                          className="form-check-input"
                          id="dd"
                          name="bpm"
                          onClick={(e)=>setPaymentMode("DD")}
                        />
                      <label class="form-check-label pl-5">
                        Demand Draft
                      </label>
                      
                      <input
                          type="radio"
                          className="form-check-input"
                          id="neft"
                          name="bpm"
                          onClick={(e)=>setPaymentMode("NEFT")}
                        />
                      <label class="form-check-label pl-5">
                        NEFT
                      </label>
                      
                      <input
                          type="radio"
                          className="form-check-input"
                          id="rtgs"
                          name="bpm"
                          onClick={(e)=>setPaymentMode("RTGS")}
                        />

                      <label class="form-check-label pl-5">
                        RTGS
                      </label>
                      
                      <input
                          type="radio"
                          className="form-check-input"
                          id="imps"
                          name="bpm"
                          onClick={(e)=>setPaymentMode("IMPS")}
                        />
                      <label class="form-check-label pl-5">
                        IMPS
                      </label>
                      
                      <input
                          type="radio"
                          className="form-check-input"
                          id="cash"
                          name="bpm"
                          onClick={(e)=>setPaymentMode("Cash")}
                        />
                      <label class="form-check-label pl-5">
                        Cash
                      </label>
                      
                      </div>
                  </div>
                  <br />
                  { paymentMode === "Cheque" || paymentMode === "DD" ?
                  <>
                  <br />
                  <form onSubmit={submit}>
                  <div className="row justify-content-center">
                    <div className="col-lg-4 col-sm-12">
                      <label>Cheque No.: </label>
                      <input
                      type="number"
                      class="form-control"
                      required
                      onChange={(e)=>setChequeNo(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <label>Bank Name : </label>
                      <input
                      type="text"
                      class="form-control"
                      required
                      onChange={(e)=>setBank(e.target.value)}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row justify-content-center">
                    <div className="col-lg-4 col-sm-12">
                      <label>Cheque Account No.: </label>
                      <input
                      type="number"
                      class="form-control"
                      required
                      onChange={(e)=>setAccount(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <label>Cheque Date : </label>
                      <input
                      type="date"
                      class="form-control"
                      required
                      onChange={(e)=>setTdate(e.target.value)}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row justify-content-center">
                    <div className="col-lg-4 col-sm-12">
                      <label>Amount: </label>
                      <input
                      type="text"
                      class="form-control"
                      value={tamount}
                      required
                      onChange={(e)=>setTamount(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <label>Issued By: </label>
                      <input
                      type="text"
                      class="form-control"
                      required
                      onChange={(e)=>setIssuedBy(e.target.value)}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row justify-content-center">
                  
                    <div className="col-lg-2 col-sm-12">
                      <label>Funded By: </label>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                    <input
                          type="radio"
                          className="form-check-input"
                          id="cheque"
                          name="fund"
                          required
                          onClick={(e)=>setNotFundedSelf(false)}
                        />
                      <label class="form-check-label pl-5">
                        Self
                        
                      </label>
                      <input
                          type="radio"
                          className="form-check-input"
                          id="dd"
                          name="fund"
                          required
                          onClick={(e)=>setNotFundedSelf(true)}
                        />
                      <label class="form-check-label pl-5">
                        Other
                        
                      </label>
                      </div>
                  </div>
                  <br />
                  { notFundedSelf === true ?
                  <>
                  <div className="row justify-content-center">
                    <div className="col-lg-4 col-sm-12">
                      <label>Funded By : </label>
                      <input
                      type="text"
                      class="form-control"
                      required
                      onChange={(e)=>setFundedBy(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <label>Funded By PAN : </label>
                      <input
                      type="text"
                      class="form-control"
                      required
                      onChange={changeFundedPan}
                      />
                      <small id="fundedpanMessage" className="text-danger d-none">
                        Must be 10 characters with capitals and numbers only
                      </small>
                    </div>
                  </div>
                  
                  
                  </> : null
                  }

                <br />
                  <div className="row justify-content-center">
                  <div className="col-lg-2 col-sm-3">
                  <button
                    className="btn btn-secondary btn-user btn-block"
                    type="submit"
                  >
                    Add Payment
                  </button>
                </div>
                </div>
                  </form>
                  </>
                  : null
                  }
                  { 
                  paymentMode === "NEFT" || paymentMode === "RTGS" || paymentMode === "IMPS" ?
                  <>
                  <br />
                  <form onSubmit={submit}>
                  <div className="row justify-content-center">
                    <div className="col-lg-4 col-sm-12">
                      <label>Transaction Date: </label>
                      <input
                      type="date"
                      class="form-control"
                      required
                      onChange={(e)=>setTdate(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <label>Bank Name : </label>
                      <input
                      type="text"
                      class="form-control"
                      required
                      onChange={(e)=>setBank(e.target.value)}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row justify-content-center">
                    <div className="col-lg-4 col-sm-12">
                      <label>Transaction Account No.: </label>
                      <input
                      type="number"
                      class="form-control"
                      required
                      onChange={(e)=>setAccount(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <label>Comments (NEFT/RTGS/IMPS Ref Number) : </label>
                      <input
                      type="text"
                      class="form-control"
                      required
                      onChange={(e)=>setComments(e.target.value)}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row justify-content-center">
                    <div className="col-lg-4 col-sm-12">
                      <label>Amount: </label>
                      <input
                      type="text"
                      class="form-control"
                      value={tamount}
                      required
                      onChange={(e)=>setTamount(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <label>Issued By: </label>
                      <input
                      type="text"
                      class="form-control"
                      required
                      onChange={(e)=>setIssuedBy(e.target.value)}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row justify-content-center">
                  
                    <div className="col-lg-2 col-sm-12">
                      <label>Funded By: </label>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                    <input
                          type="radio"
                          className="form-check-input"
                          id="cheque"
                          name="fund"
                          required
                          onClick={(e)=>setNotFundedSelf(false)}
                        />
                      <label class="form-check-label pl-5">
                        Self
                        
                      </label>
                      <input
                          type="radio"
                          className="form-check-input"
                          id="dd"
                          name="fund"
                          required
                          onClick={(e)=>setNotFundedSelf(true)}
                        />
                      <label class="form-check-label pl-5">
                        Other
                        
                      </label>
                      </div>
                  </div>
                  <br />
                  { notFundedSelf === true ?
                  <>
                  <div className="row justify-content-center">
                    <div className="col-lg-4 col-sm-12">
                      <label>Funded By : </label>
                      <input
                      type="text"
                      class="form-control"
                      required
                      onChange={(e)=>setFundedBy(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <label>Funded By PAN : </label>
                      <input
                      type="text"
                      class="form-control"
                      required
                      onChange={changeFundedPan}
                      />
                      <small id="fundedpanMessage" className="text-danger d-none">
                              Must be 10 characters with capitals and numbers only
                      </small>
                    </div>
                  </div>
                  
                  </> : null
                  }
                 <br />
                  <div className="row justify-content-center">
                  <div className="col-lg-2 col-sm-3">
                  <button
                    className="btn btn-secondary btn-user btn-block"
                    type="submit"
                  >
                    Add Payment
                  </button>
                </div>
                </div>
                </form>
                  </> : null
               
                  }
                  
                  </> :
                  null
                  
                  }

                  { 
                  paymentMode === "Cash" ?
                <>
                <br />
                  <form onSubmit={submit}>
                  <div className="row justify-content-center">
                    <div className="col-lg-4 col-sm-12">
                      <label>Received Date: </label>
                      <input
                      type="date"
                      class="form-control"
                      required
                      onChange={(e)=>setTdate(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <label>Received By : </label>
                      <input
                      type="text"
                      class="form-control"
                      required
                      onChange={(e)=>setReceivedBy(e.target.value)}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row justify-content-center">
                    <div className="col-lg-4 col-sm-12">
                      <label>Amount: </label>
                      <input
                      type="text"
                      class="form-control"
                      value={tamount}
                      required
                      onChange={(e)=>setTamount(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <label>Issued By: </label>
                      <input
                      type="text"
                      class="form-control"
                      required
                      onChange={(e)=>setIssuedBy(e.target.value)}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row justify-content-center">
                  
                    <div className="col-lg-2 col-sm-12">
                      <label>Funded By: </label>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                    <input
                          type="radio"
                          className="form-check-input"
                          id="cheque"
                          name="fund"
                          required
                          onClick={(e)=>setNotFundedSelf(false)}
                        />
                      <label class="form-check-label pl-5">
                        Self
                        
                      </label>

                      <input
                          type="radio"
                          className="form-check-input"
                          id="dd"
                          name="fund"
                          required
                          onClick={(e)=>setNotFundedSelf(true)}
                        />
                      <label class="form-check-label pl-5">
                        Other
                        
                      </label>
                      </div>
                  </div>
                  <br />
                  { notFundedSelf === true ?
                  <>
                  <div className="row justify-content-center">
                    <div className="col-lg-4 col-sm-12">
                      <label>Funded By : </label>
                      <input
                      type="text"
                      class="form-control"
                      required
                      onChange={(e)=>setFundedBy(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <label>Funded By PAN : </label>
                      <input
                      type="text"
                      class="form-control"
                      required
                      onChange={changeFundedPan}
                      />
                      <small id="fundedpanMessage" className="text-danger d-none">
                         Must be 10 characters with capitals and numbers only
                      </small>
                    </div>
                  </div>
                  
                  </> : null
                  }
                   <br />
                  <div className="row justify-content-center">
                  <div className="col-lg-2 col-sm-3">
                  <button
                    className="btn btn-secondary btn-user btn-block"
                    type="submit"
                  >
                    Add Payment
                  </button>
                </div>
                </div>
                </form>
                </> : null}
                  
                
                { 
                neft === true ? 
                <>
                <br />
                <div className="row justify-content-center">
                  <div className="col-8">
                    <h5>NEFT Details</h5>
                  </div>
                </div>
                <br />
                <div className="row justify-content-center">
                  <div className="col-4">
                  <label>Transaction Date</label>
                  <input
                  type="text"
                  class="form-control"
                  value={td.substring(8,10)+"-"+td.substring(5,7)+"-"+td.substring(0,4)}
                  />
                  </div>
                  <div className="col-4">
                  <label>Transaction Account</label>
                  <input
                  type="number"
                  class="form-control"
                  value={ta}
                  />
                  </div>
                </div>
                <br />
                <div className="row justify-content-center">
                  <div className="col-4">
                  <label>Transaction Bank</label>
                  <input
                  type="text"
                  class="form-control"
                  value={tb}
                  />
                  </div>
                  <div className="col-4">
                  <label>Transaction Comment</label>
                  <input
                  type="text"
                  class="form-control"
                  value={tc}
                  />
                  </div>
                </div>
                <br />
                <div className="row justify-content-center">
                  <div className="col-4">
                  <label>Amount</label>
                  <input
                  type="text"
                  class="form-control"
                  value={tam}
                  />
                  </div>
                  
                </div>
                </>
                : null
                }

            

                { 
                  cq === true ?
                  <>
                  <br />
                <div className="row justify-content-center">
                  <div className="col-8">
                    <h5>Cheque Details</h5>
                  </div>
                </div>
                <br />
                <div className="row justify-content-center">
                  <div className="col-4">
                  <label>Cheque Account No.</label>
                  <input
                  type="number"
                  class="form-control"
                  value={can}
                  />
                  </div>
                  <div className="col-4">
                  <label>Cheque Bank Name</label>
                  <input
                  type="text"
                  class="form-control"
                  value={cbn}
                  />
                  </div>
                </div>
                <br />
                <div className="row justify-content-center">
                  <div className="col-4">
                  <label>Cheque Date</label>
                  <input
                  type="text"
                  class="form-control"
                  value={cd.substring(8,10)+"-"+cd.substring(5,7)+"-"+cd.substring(0,4)}
                  />
                  </div>
                  <div className="col-4">
                  <label>Cheque No.</label>
                  <input
                  type="number"
                  class="form-control"
                  value={cn}
                  />
                  </div>
                </div>
                <br />
                <div className="row justify-content-center">
                  <div className="col-4">
                  <label>Amount</label>
                  <input
                  type="text"
                  class="form-control"
                  value={tam}
                  />
                  </div>
                  <div className="col-4">
                  <label>Issued by</label>
                  <input
                  type="text"
                  class="form-control"
                  value={ib}
                  />
                  </div>
                </div>
                { cad === false ?
                <>
                <br />
                <div className="row justify-content-center">
                  <div className="col-4">
                    <button className="btn btn-secondary btn-user" onClick={generateChequeReceipt}>Generate Cheque Receipt Acknowledgement</button>
                  </div>
                </div>
                </>
                : null}
                  </> 
                  : null
                }

                { 
                cs === true ?
                <>
                <br />
                <div className="row justify-content-center">
                  <div className="col-8">
                    <h5>Cash Details</h5>
                  </div>
                </div>
                <br />
                <div className="row justify-content-center">
                  <div className="col-4">
                  <label>Received Date</label>
                  <input
                  type="text"
                  class="form-control"
                  value={csd.substring(8,10)+"-"+csd.substring(5,7)+"-"+csd.substring(0,4)}
                  />
                  </div>
                  <div className="col-4">
                  <label>Received by</label>
                  <input
                  type="text"
                  class="form-control"
                  value={csrb}
                  />
                  </div>
                </div>
                <br />
                <div className="row justify-content-center">
                  <div className="col-4">
                  <label>Transaction Amount</label>
                  <input
                  type="text"
                  class="form-control"
                  value={csa}
                  />
                  </div>
                  <div className="col-4">
                  <label>Issued by</label>
                  <input
                  type="text"
                  class="form-control"
                  value={csib}
                  />
                  </div>
                </div>
                </>
                : null
                }

               

                {
                  funded === true ?
                  <>
                  <br />
                  <div className="row justify-content-center">
                    <div className="col-8">
                      <h5>Funding</h5>
                    </div>
                  </div>
                  <br />
                  <div className="row justify-content-center">
                  <div className="col-4">
                  <label>Funded By</label>
                  <input
                  type="text"
                  class="form-control"
                  value={fb}
                  />
                  </div>
                  <div className="col-4">
                  <label>Funded By PAN</label>
                  <input
                  type="text"
                  class="form-control"
                  value={fbp}
                  />
                  </div>
                </div>
                  </>
                  : 

                  funded === false ?
                  <>
                  <br />
                  <div className="row justify-content-center">
                    <div className="col-8">
                      <h5>Funding</h5>
                    </div>
                  </div>
                  <br />
                  <div className="row justify-content-center">
                  <div className="col-4">
                  <label>Funded By</label>
                  <input
                  type="text"
                  class="form-control"
                  value={fb}
                  />
                  </div>
                </div>
                  </>
                  : null
                }
                { 
                pv === false && baa === false?
                <>
                <br />
                <div className="row justify-content-center">
                  <div className="col-8">
                    <h5>Payment Validation</h5>
                  </div>
                </div>
                <br />
                <div className="row justify-content-center">
                  <div className="col-4">
                    <button className="btn btn-secondary btn-user" onClick={()=> setOpen(true)}>Validate Payment</button>
                  </div>
                </div>
                </>
                : 
                pv === true ?
                <>
                <br />
                <div className="row justify-content-center">
                  <div className="col-8">
                    <h5>Payment Validation</h5>
                  </div>
                </div>
                <br />
                <div className="row justify-content-center">
                  <div className="col-4">
                  <label>Validated By</label>
                  <input
                  type="text"
                  class="form-control"
                  value={vb}
                  />
                  </div>
                  <div className="col-4">
                  <label>Validate Date</label>
                  <input
                  type="text"
                  class="form-control"
                  value={vd.substring(8,10)+"-"+vd.substring(5,7)+"-"+vd.substring(0,4)}
                  />
                  </div>
                </div>
                </>
                :
                null
                }
                {
                  pv === false && baa === true ?
                  <>
                  <br />
                   <div className="row container-fluid justify-content-center">
                  <div className="col-8">
                    <h5>Approve Booking Amount</h5>
                  </div>
                  </div>
                  <br />
                  <div className="row container-fluid justify-content-center">
                  <div className="col-4 text-right">
                        <button className="btn btn-secondary btn-user" onClick={approve}>Approve Booking Amount</button>
                                                  
                    </div>
                    &nbsp;&nbsp;
                    <div className="col-4">
                        <button className="btn btn-secondary btn-user" style={{backgroundColor: "white", color: "black"}} onClick={reject}>Reject Booking Amount</button>

                    </div>
                </div>
                  </>
                  : null
                }
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
                <br />
                <div className="row">
                    <p>Are you sure you want to validate payment ?</p>
                </div>
                <div className="row container-fluid justify-content-center">
                    <div className="col-4 text-right">
                        <button className="btn btn-secondary btn-user" style={{backgroundColor: "white", color: "black"}} onClick={()=> setOpen(false)}>No</button>

                    </div>
                    &nbsp;&nbsp;
                    <div className="col-4">
                        <button className="btn btn-secondary btn-user" onClick={validate}>Yes</button>
                                                  
                    </div>
                </div>
                <br />
                <div className="row container-fluid justify-content-center" >
                <div className="spinner-border text-dark" role="status" style={{display : spinner}}>
                    <span className="sr-only">Loading...</span>
                </div>
                </div>
            </div>
            </Fade>
            </Modal>
                </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
            <Tab.Pane eventKey="fourth">
               { pterms.length !== 0 ?
               <>
               <div className="mt-2 row justify-content-center">
                <div className="col-lg-10 col-sm-12">
                <h4>Payment Terms</h4>
                <br />
                <table class="table">
                    <thead style={{backgroundColor : "#EE4B46", color : "#fff"}}>
                        <tr>
                        <th scope="col">Sl. No.</th>
                        <th scope="col">Description</th>
                        <th scope="col">Percentage</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {pterms.map((p)=>(
                            <tr>
                            <td>{p.serial}</td>
                            <td>{p.description}</td>
                            <td>{p.percentage}</td>
                            
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
                </div>
                </div>
                </>
                : null
                        }
                
                </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
                <Tab.Pane eventKey="fifth">
                <div className="row justify-content-center mb-3 mx-2">
                <div className="col-12  tab-card pt-5 pb-5 text-center">
                {/* <input className="form-control-file" type="file" id="myfile" name="myfile" accept="application/pdf" onChange={handleUpload} style={{backgroundColor : 'white', color : 'black'}}/>
                <br />
                <button className="btn btn-danger" onClick={upload}>Upload Document</button> */}
                {
                  draft===false?
                  <>
                  <div style={{display: 'flex'}}> 
                    <h4 style={{paddingRight:'10px', marginRight:'5px', fontSize:'22px', paddingTop:'5px', paddingLeft:'10px'}}>Application Form Draft :</h4>
                  <button className="btn btn-secondary btn-user" onClick={generateApfd} disabled={ status !== "Aplicant Added" && bpms !== "Not Added" ? false : true}>Generate Application Form</button>
                  </div>
                  </>:
                  <>
                  <h4 style={{paddingRight:'10px', marginRight:'5px', fontSize:'22px', paddingTop:'5px', paddingLeft:'10px'}}>Application Form Draft </h4><br/>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Document Name: </span>{draftname}</h6>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Uploaded By</span>: {duploadedby}</h6>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Uploaded Date: </span>{duploadedat.split(' ')[0] +' '+duploadedat.split(' ')[1]+' '+duploadedat.split(' ')[2]+', '+duploadedat.split(' ')[3]}</h6>
                    <h6><a href={ds3link} target="_blank">View Document</a></h6>
                  </>
                }
                  
                </div>
               
                </div>
                <div className="row mb-3 mx-2">
                <div className="col-12 tab-card pt-5 pb-5 text-center">
                
                {
                  afs===false?
                  <>
                  <h4 style={{paddingRight:'10px', marginRight:'5px', fontSize:'22px', paddingTop:'5px', paddingLeft:'10px'}}>Application Form Scan Copy</h4>
                    <br/>
                  <div style={{display: 'flex'}}> 
                    
                    <input className="form-control-file" type="file" id="myfile" name="myfile" accept="application/pdf" onChange={changeAFS} style={{backgroundColor : 'white', color : 'black'}}/>
               
                <button className="btn btn-secondary btn-user" onClick={uploadAFS}>Upload Document</button>
                  </div>
                  </>:
                  <>
                  <h4 style={{paddingRight:'10px', marginRight:'5px', fontSize:'22px', paddingTop:'5px', paddingLeft:'10px'}}>Application Form Scan Copy </h4><br/>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Document Name: </span>{afsdname}</h6>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Uploaded By</span>: {afsuploadedby}</h6>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Uploaded Date: </span>{afsuploadeddate.split(' ')[0] +' '+duploadedat.split(' ')[1]+' '+duploadedat.split(' ')[2]+', '+duploadedat.split(' ')[3]}</h6>
                    <h6><a href={afss3link} target="_blank">View Document</a></h6>
                  </>
                }
                  
                </div>
                </div>

                <div className="row mb-3 mx-2">
                <div className="col-12 tab-card pt-5 pb-5 text-center">
                
                {
                  ca===false?
                  <>
                  <h4 style={{paddingRight:'10px', marginRight:'5px', fontSize:'22px', paddingTop:'5px', paddingLeft:'10px'}}>Customer Aadhar Card</h4>
                    <br/>
                  <div style={{display: 'flex'}}> 
                    
                    <input className="form-control-file" type="file" id="myfile" name="myfile" accept="application/pdf" onChange={changeCA} style={{backgroundColor : 'white', color : 'black'}}/>
               
                <button className="btn btn-secondary btn-user" onClick={uploadCA}>Upload Document</button>
                  </div>
                  </>:
                  <>
                  <h4 style={{paddingRight:'10px', marginRight:'5px', fontSize:'22px', paddingTop:'5px', paddingLeft:'10px'}}>Customer Aadhar Card</h4><br/>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Document Name: </span>{cadname}</h6>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Uploaded By</span>: {cauploadedby}</h6>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Uploaded Date: </span>{cauploadeddate.split(' ')[0] +' '+duploadedat.split(' ')[1]+' '+duploadedat.split(' ')[2]+', '+duploadedat.split(' ')[3]}</h6>
                    <h6><a href={cas3link} target="_blank">View Document</a></h6>
                  </>
                }
                  
                </div>
                </div>

                <div className="row mb-3 mx-2">
                <div className="col-12 tab-card pt-5 pb-5 text-center">
                
                {
                  cp===false?
                  <>
                  <h4 style={{paddingRight:'10px', marginRight:'5px', fontSize:'22px', paddingTop:'5px', paddingLeft:'10px'}}>Customer PAN</h4>
                    <br/>
                  <div style={{display: 'flex'}}> 
                    
                    <input className="form-control-file" type="file" id="myfile" name="myfile" accept="application/pdf" onChange={changeCP} style={{backgroundColor : 'white', color : 'black'}}/>
               
                <button className="btn btn-secondary btn-user" onClick={uploadCP}>Upload Document</button>
                  </div>
                  </>:
                  <>
                  <h4 style={{paddingRight:'10px', marginRight:'5px', fontSize:'22px', paddingTop:'5px', paddingLeft:'10px'}}>Customer PAN</h4><br/>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Document Name: </span>{cpname}</h6>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Uploaded By</span>: {cpuploadedby}</h6>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Uploaded Date: </span>{cpuploadeddate.split(' ')[0] +' '+duploadedat.split(' ')[1]+' '+duploadedat.split(' ')[2]+', '+duploadedat.split(' ')[3]}</h6>
                    <h6><a href={cps3link} target="_blank">View Document</a></h6>
                  </>
                }
                  
                </div>
                </div>
                <div className="row mb-3 mx-2">
                <div className="col-12 tab-card pt-5 pb-5 text-center">
                  {
                    bpr === false ?
                    <>
                    <h4 style={{paddingRight:'10px', marginRight:'5px', fontSize:'22px', paddingTop:'5px', paddingLeft:'10px'}}>Credit Voucher for Booking Payment</h4>
                    </> : 
                    <>
                    <h4 style={{paddingRight:'10px', marginRight:'5px', fontSize:'22px', paddingTop:'5px', paddingLeft:'10px'}}>Credit Voucher for Booking Payment</h4>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Receipt Number: </span>{brn}</h6>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Credit Voucher: </span><a href={bcv} target="_blank">Receipt Link</a></h6>
                    </>
                  }
                </div>
                </div>

                <div className="row mb-3 mx-2">
                <div className="col-12 tab-card pt-5 pb-5 text-center">
                
                {
                  pals===false?
                  pal===false?
                  <>
                  <h4 style={{paddingRight:'10px', marginRight:'5px', fontSize:'22px', paddingTop:'5px', paddingLeft:'10px'}}>Provisional Allotment Letter</h4>
                    <br/>
                    <h4>Provisional Allotment Letter not generated as payment not validated</h4>
                  {/* <div style={{display: 'flex'}}> 
                    
                    <input className="form-control-file" type="file" id="myfile" name="myfile" accept="application/pdf" onChange={changeCP} style={{backgroundColor : 'white', color : 'black'}}/>
               
                <button className="btn btn-secondary btn-user" onClick={uploadCP}>Upload Document</button>
                  </div> */}
                  </>:
                  <>
                  
                  <h4 style={{paddingRight:'10px', marginRight:'5px', fontSize:'22px', paddingTop:'5px', paddingLeft:'10px'}}>Provisional Allotment Letter</h4><br/>
                  <h4> Provisional Allotment Letter generated but not approved </h4>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Document Name: </span>{palname}</h6>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Uploaded By</span>: {paluploadedby}</h6>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Uploaded Date: </span>{paluploadeddate.split(' ')[0] +' '+duploadedat.split(' ')[1]+' '+duploadedat.split(' ')[2]+', '+duploadedat.split(' ')[3]}</h6>
                    <h6><a href={pals3link} target="_blank">View Document</a></h6>

                    <button className="btn btn-secondary btn-user" onClick={approveButton}>Approve</button>
                  </>: 
                  <>
                 
                  <h4 style={{paddingRight:'10px', marginRight:'5px', fontSize:'22px', paddingTop:'5px', paddingLeft:'10px'}}>Provisional Allotment Letter</h4><br/>
                  <h4>Provisional Allotment Letter generated and sent to customer</h4>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Document Name: </span>{palname}</h6>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Uploaded By</span>: {paluploadedby}</h6>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Uploaded Date: </span>{paluploadeddate.split(' ')[0] +' '+duploadedat.split(' ')[1]+' '+duploadedat.split(' ')[2]+', '+duploadedat.split(' ')[3]}</h6>
                    <h6><a href={pals3link} target="_blank">View Document</a></h6>
                  </>
                }
                  
                </div>
                </div>

                <div className="row mb-3 mx-2">
                <div className="col-12 tab-card pt-5 pb-5 text-center">
                
                {
                  sas===false?
                  <>
                  <h4 style={{paddingRight:'10px', marginRight:'5px', fontSize:'22px', paddingTop:'5px', paddingLeft:'10px'}}>Sales Agreement Draft</h4>
                    <br/>
                 
                  <h4>Sales Agreement Draft not generated</h4>
                  </>:
                  <>
                  <h4 style={{paddingRight:'10px', marginRight:'5px', fontSize:'22px', paddingTop:'5px', paddingLeft:'10px'}}>Sales Agreement Draft</h4><br/>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Document Name: </span>{sadname}</h6>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Uploaded By</span>: {saduploadedby}</h6>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Uploaded Date: </span>{saduploadeddate.split(' ')[0] +' '+duploadedat.split(' ')[1]+' '+duploadedat.split(' ')[2]+', '+duploadedat.split(' ')[3]}</h6>
                    <h6><a href={sads3link} target="_blank">View Document</a></h6>
                  </>
                }
                  
                </div>
                </div>

                <div className="row mb-3 mx-2">
                <div className="col-12 tab-card pt-5 pb-5 text-center">
                
                {
                  sas===false?
                  <>
                  <h4 style={{paddingRight:'10px', marginRight:'5px', fontSize:'22px', paddingTop:'5px', paddingLeft:'10px'}}>Sales Agreement Scan</h4>
                    <br/>
                  <div style={{display: 'flex'}}> 
                    
                    <input className="form-control-file" type="file" id="myfile" name="myfile" accept="application/pdf" onChange={changeSAS} style={{backgroundColor : 'white', color : 'black'}}/>
               
                <button className="btn btn-secondary btn-user" onClick={uploadSAS}>Upload Document</button>
                  </div>
                  </>:
                  <>
                  <h4 style={{paddingRight:'10px', marginRight:'5px', fontSize:'22px', paddingTop:'5px', paddingLeft:'10px'}}>Sales Agreement Scan</h4><br/>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Document Name: </span>{sasname}</h6>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Uploaded By</span>: {sasuploadedby}</h6>
                    <h6><span style={{fontWeight:'bold', fontSize:'18px'}}>Uploaded Date: </span>{sasuploadeddate.split(' ')[0] +' '+duploadedat.split(' ')[1]+' '+duploadedat.split(' ')[2]+', '+duploadedat.split(' ')[3]}</h6>
                    <h6><a href={sass3link} target="_blank">View Document</a></h6>
                  </>
                }
                  
                </div>
                </div>
                </Tab.Pane>
            </Tab.Content>
            </Col>
        </Row>   
        </Tab.Container>
    </div>

    )
}

export default IndividualApplicationform
