import React from 'react'
import MaterialTable from "material-table";
import { Button, FormControl, FormControlLabel, InputLabel, ListItemIcon, makeStyles, MenuItem, OutlinedInput, Radio, RadioGroup, TextField } from '@material-ui/core';

const ShowLead = () => {
    const data = [{
        Leadid: 1, name: "qwerty", phoneNo: 986543200, createdAt: " 2 / 3 / 2021", leadType: "assd", leadStatus: "zxccc", assignedTo: "Ridhi"
    }]

    return (
        <div>
            <center>
                <div className="pt-5 col-lg-11" style={{ paddingTop: "10px" }}>
                    <br />
                    <br />
                    <MaterialTable data={data}

                        title="Leads"
                        columns={
                            [
                                { title: 'Lead Id', field: 'Leadid' },
                                { title: 'Name', field: 'name' },
                                { title: 'Phone No', field: 'phoneNo' },
                                { title: 'Created At', field: 'createdAt' },
                                { title: 'Lead Type', field: 'leadType' },
                                { title: 'Lead Status', field: 'leadStatus' },
                                { title: 'Assigned To', field: 'assignedTo' },

                            ]
                        }
                        options={{
                            search: true,
                            actionsColumnIndex: -1,
                        }}
                        options={{

                            headerStyle: {
                                backgroundColor: '#BABABA',
                                color: '#000000'
                            }
                        }}
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit Lead',
                                //   onClick: (event, rowData) => {
                                //     history.push(`/addcoupon/${rowData.couponCode}`);
                            }

                        ]}></MaterialTable>
                </div>
            </center>
        </div>
    )
}

export default ShowLead







