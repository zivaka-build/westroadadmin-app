import React, {useState,useEffect} from "react"

function Voucher() {
    return(
        <>
        <div className="row mt-2 justify-content-center">
            <div className="col-12">
                <h4>Voucher</h4>
            </div>
        </div>
        <br />
        <div className="row tab-card py-5 justify-content-center">
            <div className="col-4 text-right">
                <button className="btn btn-secondary btn-user">Create Credit Voucher</button>
            </div>
            &nbsp;&nbsp;
            <div className="col-4">
                <button className="btn btn-secondary btn-user" style={{backgroundColor: "white", color: "black"}} >Create Debit Voucher</button>
            </div>
        </div>
        </>
    )
}

export default Voucher;