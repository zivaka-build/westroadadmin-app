import React, {useState,useEffect} from "react"
import { navigate} from "@reach/router"

function Cashback() {
    return(
        <>
        <div className="row mt-2 justify-content-center">
            <div className="col-12">
                <h4>Cashback</h4>
            </div>
        </div>
        <br />
        <div className="row tab-card py-5 justify-content-center">
            <div className="col-4 text-right">
                <button className="btn btn-secondary btn-user" onClick={()=>navigate("/dashboard/addcreditvoucher")}>Create Cashback Coupon</button>
            </div>
            &nbsp;&nbsp;
            <div className="col-4">
                <button className="btn btn-secondary btn-user" style={{backgroundColor: "white", color: "black"}} >Encash Cashback Coupon</button>
            </div>
        </div>
        </>
    )
}

export default Cashback;