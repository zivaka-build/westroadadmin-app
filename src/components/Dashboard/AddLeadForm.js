import { Form, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../config/url";
import "./../../assets/css/form.css";

function AddLeadForm(){
    const [source, setSource ] = useState("");
    return(
        <div className="pt-5">
       
        
        <form id="addlead" name="addlead">
        <div className="row pt-3 justify-content-center">
        <div className="col-8">
        <h4>Add a Lead</h4>
        <br />
            <label>Name</label>
            <input
            type="text"
            class="form-control"
            name="name"
            id="outlined-basic"
           
            />
        </div>
        </div>
        <br />
        <div className="row justify-content-center">
        <div className="col-4">
            <label>Contact No.</label>
            <input
            type="number"
            class="form-control"
            name="contact"
            id="outlined-basic"
           
            />
        </div>
        <div className="col-4">
            <label>Whatsapp No.</label>
            <input
            type="number"
            class="form-control"
            name="whatsapp"
            id="outlined-basic"
           
            />
        </div>
        </div>
        <br />
        <div className="row justify-content-center">
        <div className="col-8">
            <label>Email ID</label>
            <input
            type="email"
            class="form-control"
            name="email"
            id="outlined-basic"
           
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
            name="city"
            id="outlined-basic"
           
            />
        </div>
        <div className="col-4">
            <label>Pincode</label>
            <input
            type="number"
            class="form-control"
            name="pincode"
            id="outlined-basic"
           
            />
        </div>
        </div>
        <br />
        <div className="row justify-content-center">
        <div className="col-4">
            <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Lead Source</Form.Label>
            <Form.Control onChange={(e)=>setSource(e.target.value)} as="select">
            <option>Select a source</option>   
            <option>99Acres</option>
            <option>Newspaper</option>
            <option>Hoarding</option>
            <option>Website</option>
            <option>Facebook</option>
            <option>Referral</option>
            </Form.Control>
            </Form.Group>
        </div>
        <div className="col-4">
            <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Lead Status</Form.Label>
            <Form.Control onChange={(e)=>console.log(e.target.value)} as="select" disabled="disabled">
            <option selected>New Lead</option>
        
            </Form.Control>
            </Form.Group>
        </div>
        
        </div>
        <div className="row justify-content-center">
        { source === "Newspaper" ? 
        <>
        <div className="col-8">
            <Form.Group controlId="exampleForm.ControlSelect3">
            <Form.Label>Newspaper Name</Form.Label>
            <Form.Control as="select">
            <option>Times Of India</option>
            <option>Anandabazar Patrika</option>
            
            </Form.Control>
            </Form.Group>
        </div>
        </> : null
       }
       
        { source === "99Acres" ? 
           <>
           <div className="col-8">
               <Form.Group controlId="exampleForm.ControlSelect4">
               <Form.Label>Type</Form.Label>
               <Form.Control as="select">
               <option>Conventional</option>
               <option>Omni</option>
               
               </Form.Control>
               </Form.Group>
           </div>
           </> : null
        }
       { source === "Referral" ? 
           <>
           <div className="col-8">
           <label>Details</label>
            <input
            type="text"
            class="form-control"
            name="details"
            id="outlined-basic"
           
            />
           </div>
           </> : null
        }
        </div>
        
        <div className="row justify-content-center">
        <div className="col-8">
        <label>Site Name</label>
            <input
            type="text"
            class="form-control"
            name="sitename"
            id="outlined-basic"
           
            />
        </div>
        </div>
        <br />
        <div className="row justify-content-center">
        <div className="col-4">
        <label>Requirement</label>
            <input
            type="text"
            class="form-control"
            name="requirement"
            id="outlined-basic"
           
            />
        </div>
        <div className="col-4">
        <label>Budget</label>
            <input
            type="number"
            class="form-control"
            name="budget"
            id="outlined-basic"
           
            />
        </div>
        </div>
        <br />
        <div className="row justify-content-center">
        <div className=" col-2">
                  <button
                    className="btn btn-secondary btn-user btn-block"
                   
                  >
                    Submit
                  </button>
                </div>
        </div>

        </form>
        
        </div>
       
        
        
    );
}

export default AddLeadForm;