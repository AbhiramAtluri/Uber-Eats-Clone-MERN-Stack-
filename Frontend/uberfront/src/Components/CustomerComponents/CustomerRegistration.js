import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch,
    useParams
} from "react-router-dom";
import axios from 'axios'
// import NavbarCust from './CustomerNavBar'
import Navbar from '../Navbar';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik"
// import bcrypt from 'bcrypt'
//  const bcrypt = require('bcrypt');
//  var bcrypt = require('bcryptjs');
import server from '../WebConfig';


export class CustomerRegistration extends Component {

    constructor(props) {
        super(props)

        this.state = {
            redirect :false,
            emailval:""

        }
    }




    render() {

        const initialValues =
        {
            c_name: "",
            c_email: "",
            c_password: "",
            c_password1: ""

        }


        const validationSchema = Yup.object(
            {
                c_name: Yup.string().required("Username is required"),
                c_email: Yup.string().email("Email is in incorrect format").required("Email is required"),
                c_password: Yup.string().min(8, 'Password must be have atleast 8 characters').required("Password is required").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Password must contain atleast 8 characters ,atleast one capital letter and one special character")

            }
        )
        if(this.state.redirect === false)
        {
        return (

           
            <div>
                <div>
                    <div class="container-fluid" style={{margin:"0px",padding:"0px"}} >
                        <Navbar></Navbar>
                        <div className="row">
                            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                                <div className="card border-0 shadow rounded-3 my-5">
                                    <div className="card-body p-4 p-sm-5"></div>
                                    <h5 className="card-title text-center mb-4 fw-dark fs-3">Enter your details   </h5>
                                   <center style={{color:"red"}}> <p>{this.state.emailval}</p></center>
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={(data) => {
                                                    
                                            console.log(data)
                                                if(data.c_password == data.c_password1)
                                                {
                                                    // var salt = bcrypt.genSaltSync(10);
                                                    // var hash = bcrypt.hashSync(, salt); 
                                                    

                                                    axios.post(`${server}/customer/custreg`,
                                                    {
                                                           c_name :data.c_name,
                                                           c_email :data.c_email,
                                                           c_password :data.c_password
                                                    }
                                                    ).then((res) =>
                                                    {
                                                       if(res.data == "Invalid") 
                                                       {
                                                        
                                                        this.setState(
                                                            {
                                                                emailval : "Email already in use"
                                                            }
                                                        )
                                                        
                                                       }
                                                       else
                                                       {
                                                           alert("Registration Successful")
                                                           this.setState(
                                                               {
                                                                   redirect:true
                                                               }
                                                           )
                                                       }

                                                    }
                                                    )
                                                    
                                                }else
                                                {
                                                    alert("Passwords do not match")
                                                }
                                        }}
                                    >
                                        <Form>

                                            <div className="form-floating mb-3">
                                                {/* <div className = "form-control">    */}
                                                <Field name="c_name" type="input" placeholder="Enter username" className="form-control" />
                                                {/* <input type="text" class="form-control" id="c_name" placeholder="Enter username" /> */}
                                                <label for="c_name">Enter your username</label>
                                                <ErrorMessage name="c_name">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                                {/* </div> */}
                                            </div>


                                            <div className="form-floating mb-3">
                                                <Field name="c_email" type="input" placeholder="Enter email" className="form-control" />
                                                {/* <input type="email" class="form-control" id="c_email" placeholder="Enter your email id" /> */}
                                                <label for="c_email">Enter your email id</label>
                                                <ErrorMessage name="c_email">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                            </div>


                                            <div className="form-floating mb-3">
                                                <Field name="c_password" type="password" placeholder="Enter password" className="form-control" />
                                                {/* <input type="password" class="form-control" id="c_password" placeholder="Enter your password" /> */}
                                                <label for="c_password">Enter your password</label>
                                                <ErrorMessage name="c_password">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                            </div>

                                            <div class="form-floating mb-3">
                                            <Field name="c_password1" type="password" placeholder="Please re-enter your password" className="form-control" />
                                                {/* <input type="password" class="form-control" id="c_password1" placeholder="re-enter your password" /> */}
                                                <label for="c_password1">Re-enter your password</label>
                                            </div> 
                                            <div className="d-grid">
                                                <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Register</button>
                                            </div>

                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
    else
    {
       return <Redirect to ="/Customer"></Redirect>
    }
    }
}

export default CustomerRegistration
