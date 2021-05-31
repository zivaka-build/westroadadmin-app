import React, {useState, useEffect} from "react"
import { useParams , navigate} from "@reach/router"
import { Form } from "react-bootstrap";
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";
import {IoMdArrowBack} from 'react-icons/io'

function AddTask(){
     const [users, setUsers] = useState([])
     const [taskType, setTaskType] = useState("")
     const [taskTitle, setTaskTitle] = useState("")
     const [taskDescription, setTaskDescription] = useState("")
     const [taskDueDate, setTaskDueDate] = useState("")
     const [userName, setUserName] = useState("")
     const [userFullname, setUserFullname] = useState("")

     const changeUser = (e) => {
        var user = e.target.value
        setUserFullname(user.substring(0, user.indexOf(' ')))
        setUserName(user.substring(user.indexOf(' ') + 1))
     }

     const addTask = (e) => {
        const Token = 'bearer' + " " + Cookies.get('Token')
        e.preventDefault()
        axios
            .post(`${BASE_URL}/api/v1/task/createNewTask`,
            {
                taskStatus : "Open",
                taskType: taskType,
                taskTitle: taskTitle,
                taskDescription: taskDescription,
                dueDate: taskDueDate,
                userFullName: userFullname,
                userName: userName,
                createdBy: Cookies.get('FullName')
            },
            { headers : { 'Authorization' : Token }})
            .then(response => {
                console.log(response)
                navigate('/dashboard/tasklist')
               
            })
     }

     const back = () => {
        navigate('/dashboard/tasklist')
    }

    useEffect(()=>{ 
        const Token = 'bearer' + " " + Cookies.get('Token')

        axios.get(`${BASE_URL}/api/v1/user/getListOfUserNames`,{headers:{Authorization:Token}})
        .then(response => {
            console.log(response)
            setUsers(response.data.userMap)
        })
    } , [])

    return(
        <>
        <br />
        <div className="mt-3 row container-fluid justify-content-center">
            <div className="col-12">
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={back}><IoMdArrowBack />Back</button>
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-8">
                <h4>Create task</h4>
            </div>
        </div>
        <br />
        <form>
        <div className="row justify-content-center">
            <div className="col-4">
                <label>Task Type</label>
                <input
                type="text"
                class="form-control"
                name="taskType"
                id="taskType"
                onChange={(e)=>setTaskType(e.target.value)}
                />
            </div>
            <div className="col-4">
                <label>Task Title</label>
                <input
                type="text"
                class="form-control"
                name="taskTitle"
                id="taskTitle"
                onChange={(e)=>setTaskTitle(e.target.value)}
                />
            </div>
        </div>
        <br />
        <div className="row justify-content-center">
            <div className="col-8">
                <label>Task Description</label>
                <input
                type="text"
                class="form-control"
                name="taskDescription"
                id="taskDescription"
                onChange={(e)=>setTaskDescription(e.target.value)}
                />
            </div>
        </div>
        <br />
        <div className="row justify-content-center">
            <div className="col-4">
                <label>Due Date</label>
                <input
                type="date"
                class="form-control"
                name="taskDueDate"
                id="taskDueDate"
                onChange={(e)=>setTaskDueDate(e.target.value)}
                />
            </div>
            <div className="col-4">
            <Form.Group controlId="userName">
                <Form.Label>Assign User</Form.Label>
                <Form.Control  as="select" onChange={changeUser}>
                <option>Select a user</option> 
                { 
                users.map((u)=>(
                    <option value={u.userFullName+" "+u.userName}>{u.userFullName}</option>
                ))}
                
                </Form.Control>
            </Form.Group>
            </div>
        </div>
        <br />
        <div className="row container-fluid justify-content-center">
        <div className="col-4 text-right">
            <button className="btn btn-secondary btn-user" type="reset"  style={{backgroundColor: "white", color: "black"}}>Reset</button>

        </div>
        <div className="col-4">
            <button className="btn btn-secondary btn-user" onClick={addTask}>Add Task</button>
                                        
        </div>
        </div>
        </form>

        </>
    )
}

export default AddTask;