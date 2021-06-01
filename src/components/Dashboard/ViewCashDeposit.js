import React,{useState,useEffect} from "react";
import axios from "axios";
import { BASE_URL } from "./../../config/url";
import Cookies from 'js-cookie';
import MaterialTable, { MTableToolbar } from "material-table";
import { navigate } from "@reach/router";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import {IoMdArrowBack} from 'react-icons/io'

function ViewCashDeposit() {

    useEffect(() => {
       
        const Token = 'bearer' + " " + Cookies.get('Token')

        axios.get(`${BASE_URL}/api/v1/finance/getlistofcashdeposit`,{headers:{Authorization:Token}})
        .then(response => {
          console.log(response)
          
        })
    },[])
    return(
        <>
        <br />
        <MaterialTable
            // data={form}
            title="List of Cash Deposits"
            columns={
                [
                    { title: 'Cheque Number', field: 'chequeNo' },
                    { title: 'Cheque Bank Name', field: 'chequeBankName' },
                    { title: 'Cheque Account No.', field: 'chequeAccountNo' },
                    { title: 'Cheque Date', defaultSort : 'desc', render : (rowData) => !rowData.chequeDate ?  "": rowData.chequeDate.substring(8,10)+"-"+rowData.chequeDate.substring(5,7)+"-"+rowData.chequeDate.substring(0,4), customSort: (a, b) => a.chequeDate < b.chequeDate ? -1 : 1 },
                    { title: 'Cheque Amount', field: 'chequeAmount' },
                    { title: 'Issued To', field: 'issuedTo' },
                    { title: 'Issued By', field: 'issuedBy' },
                    
                ]
            }
            options={{
                search: true,
                actionsColumnIndex: -1,
            }}
            components={{
                Toolbar: (props) => (
                  <div className="filters text-center">
                   <MTableToolbar {...props} />
      
                    {/*<FormControl className={classes.formControl} style={{marginTop: "-65px"}}>
                    <InputLabel id="demo-simple-select-helper-label">Payment Type</InputLabel>
                      <Select
                        value={ptype}
                        onChange={(e)=>setPtype(e.target.value)}
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="" disabled>
                        Payment Type
                        </MenuItem>
                        <MenuItem value="Credit" >
                        Credit
                        </MenuItem>
                        <MenuItem value="Debit" >
                        Debit
                        </MenuItem>
                      </Select>
                  
                    </FormControl>

                    <FormControl className={classes.formControl} style={{marginTop: "-65px"}}>
                    <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                      <Select
                        value={status}
                        onChange={(e)=>setStatus(e.target.value)}
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                        
                      >
                        <MenuItem value="all" disabled>
                         Status
                        </MenuItem>
                        <MenuItem value="Received">
                        Received
                        </MenuItem>
                        <MenuItem value="Sent To Bank">
                        Sent To Bank
                        </MenuItem>
                        <MenuItem value="Clearance Done">
                        Clearance Done
                        </MenuItem>
                        <MenuItem value="Cheque Bounced">
                        Cheque Bounced
                        </MenuItem>
                      </Select>
                    </FormControl> 

                    <FormControl className={classes.formControl} style={{marginTop: "-50px",marginRight:"110px"}}>
                    <button className="btn btn-secondary btn-user" onClick={reset} style={{backgroundColor : "white", color : "black"}}>
                    Reset Filter
                    </button>
                    </FormControl>
                    
                    */}
                    
                  </div>
                ),
              }}
            
            options={{

                headerStyle: {
                    backgroundColor: '#EE4B46',
                    color: '#fff',
                    paddingLeft: '11px'
                
                }
            }}

            actions={[
              rowData => ({
                  icon: 'edit',
                  tooltip: 'Send To Bank',
                  onClick: (event, rowData) => {
                    
                  },
                 // disabled: rowData.bankSubmitDate
                }),
                rowData => ({
                  icon: 'edit',
                  tooltip: 'Clearance',
                  onClick: (event, rowData) => {
                   
                  },
                  //disabled: rowData.sentToBank === false
                })



          ]}
            
           ></MaterialTable>
        </>
    )
}

export default ViewCashDeposit;