import React, { Component } from 'react'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch,
    useParams
} from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik"

export class Customerinit extends Component {
   
    constructor(props) {
        super(props)
    
        this.state = {
               redirect : false,
               loginvalid:"",
               c_email:""
        }
    }

    





    render() {
          
        if(this.state.redirect === false)
        {
        const validationSchema = Yup.object(
            {

                c_email: Yup.string().email("Email is in incorrect format").required("Email is required"),
                c_password: Yup.string().required("Please enter the password")

            }
        )

        const initialValues =
        {

            c_email: "",
            c_password: "",


        }



        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card border-0 shadow rounded-3 my-5">
                                <div className="card-body p-4 p-sm-5">
                                    <h5 className="card-title text-center mb-5 fw-light fs-5">Customer Login</h5>
                                    <center> <p style={{ color: 'red' }}>{this.state.loginvalid}</p></center>
                              <Formik    initialValues={initialValues} validationSchema={validationSchema}  
                              
                              onSubmit={(data) => {
                                console.log(data)
                            
                                axios.post("http://localhost:3030/customer/custlog", {

                                    c_email:data.c_email,
                                    c_password:data.c_password,
                                    


                                }).then((res) =>
                                {
                                    // console.log("hi")
                                    console.log(res)
                                   if(res.data === 'Login successfull')
                                   {
                                       this.setState(
                                           {   
                                               c_email:data.c_email,
                                               redirect : true
                                           }
                                       )
                                   }
                                   else
                                   {
                                          
                                    this.setState(
                                        {
                                            loginvalid :"Invalid credentials"
                                        }
                                    )
                                   }
                                })
                                
                            }}
                            >
                                    <Form>
                                        <div className="form-floating mb-3">
                                        <Field name="c_email" type="input" placeholder="Enter email" className="form-control" />
                                            {/* <input type="email" className="form-control" id="c_email" placeholder="Enter your Email id" /> */}
                                            <label for="c_email">Enter your email id</label>
                                            <ErrorMessage name="c_email">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                        </div>
                                        <div className="form-floating mb-3">
                                        <Field name="c_password" type="password" placeholder="Enter password" className="form-control" />
                                            {/* <input type="password" className="form-control" id="c_password" placeholder="Password"/> */}
                                            <label for="c_password">Enter your password</label>
                                            <ErrorMessage name="c_password">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                        </div>
                                        <div className="d-grid">
                                            <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Log
                                                in</button>
                                        </div>
                                        <center><p>Don't have an account?<Link to="/Customerregister" className="link-info">Register here</Link></p></center>
                                    </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <center><h1>Customer Login</h1></center>
                                <div className="form-group">
                                    <center>
                                        <form>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <label>Email id</label>
                                                        </td>
                                                        <td>
                                                            <input type="email" placeholder="Enter youe email id" className="form-control"></input>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label>Password</label>
                                                        </td>
                                                        <td>
                                                            <input type="password" placeholder="Enter your password" className="form-control"></input>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label></label>
                                                        </td>
                                                        <td><center><Link to="/Customregister">Register?</Link></center></td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </form>
                                    </center> */}
                               </div>
            </div>
        )
    }else
    {
        return <Redirect to ={{pathname : "/Customerlanding", state :{  c_email:this.state.c_email  }}}   ></Redirect>  
    }

}  
}

export default Customerinit
