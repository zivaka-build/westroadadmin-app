import React, { useEffect, useState } from 'react';
import MaterialTable from "material-table";
import { Button, FormControl, FormControlLabel, InputLabel, ListItemIcon, makeStyles, MenuItem, OutlinedInput, Radio, RadioGroup, TextField } from '@material-ui/core';


const ViewUnit = () => {
    const data = [
        { Unitid: 1, Unittype: "fixed", Floor: "second", Phase: "Phase-1", BHK: 12 },
    ]
    return (
        <div>
            <center>
                <div className="pt-5 col-lg-11" style={{ paddingTop: "10px" }}>
                    <br />
                    <br />

                    <MaterialTable data={data}
                        columns={
                            [
                                { title: 'Unit Id', field: 'Unitid' },
                                { title: 'Unit Type', field: 'Unittype' },
                                { title: 'Floor', field: 'Floor' },
                                { title: 'Phase', field: 'Phase' },
                                { title: 'BHK', field: 'BHK' },


                            ]
                        }
                        options={{
                            search: true,
                            actionsColumnIndex: -1,
                            // searchFieldStyle: {
                            //     // position: absolute,
                            //     width: 375,
                            //     height: 50,
                            //     left: 999,
                            //     top: 168,
                            //     background: '#FEFDFB',
                            //     boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)',
                            //     borderRadius: 16,
                            // }
                        }}
                        options={{
                            showTitle: false,
                            headerStyle: {
                                backgroundColor: '#BABABA',
                                color: '#000000'
                            }
                        }}
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit Category',
                                //   onClick: (event, rowData) => {
                                //     history.push(`/addcoupon/${rowData.couponCode}`);
                            }

                        ]}></MaterialTable>
                </div>
            </center>

        </div>
    )
}

export default ViewUnit
