import React,{useState,useEffect} from "react";
import axios from "axios";
import { BASE_URL } from "./../../config/url";
import Cookies from 'js-cookie';
import {GiGears} from 'react-icons/gi'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Form} from "react-bootstrap";
import MaterialTable, { MTableToolbar } from "material-table";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';
import { navigate } from "@reach/router";
import {IoMdArrowBack} from 'react-icons/io'

function ViewHandoverListType(){
    const [handover, setHandover] = useState([])
    
    useEffect(() => {
       
        const Token = 'bearer' + " " + Cookies.get('Token')
        axios.get(`${BASE_URL}/api/v1/handover/getListOfHandOverListTypes`,{headers:{Authorization:Token}})
        .then(response => {
          console.log(response)
          setHandover(response.data.handoverListTypes)
          
        })
    },[])

    return(
        <>
        <div className="mt-2 row container-fluid justify-content-center px-1">
            <div className="col-12">
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={()=>navigate("/dashboard/home")}><IoMdArrowBack />Back</button>
            </div>
        </div> 
        <br />
        <div className="mt-2">
            <div className="col-12 text-center">
            <button className="btn btn-secondary btn-user" onClick={() => navigate("/dashboard/addhandoverlisttype")}>Add Handover List Type</button>
            </div>
        </div>
        <br />
          <MaterialTable
             data={handover}
            title="Handover List Type"
            columns={
                [
                    { title: 'Handover List Type Id', defaultSort: 'desc',field: 'HOListTypeId'},
                    { title: 'Site Id', field: 'siteId' },
                    { title: 'BHK', field: 'bhk' },
                    
                    
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

            
           ></MaterialTable>
        </>
    )
}

export default ViewHandoverListType;