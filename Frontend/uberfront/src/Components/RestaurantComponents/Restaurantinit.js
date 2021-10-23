import React, { Component } from 'react'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    Redirect
} from "react-router-dom";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik"
import Navbar from '../Navbar';
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import server from '../WebConfig';
import  { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from '../../Redux/RestaurantloginandReg/RestaurantActions';


export class Restaurantinit extends Component {

    constructor(props) {
        super(props)

        this.state = {

            redirect : false,
            loginvalid :"",
            r_email : ""

        }
    }
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };


      static mapStateToProps = state =>
      {
          return {Rest: state.values}
      }
      static mapDispatchtoProps = dispatch =>
      {
          return bindActionCreators({login},dispatch)
      }



    render() {

       if(this.state.redirect === false)
       {

        const initialValues =
        {

            r_email: "",
            r_password: "",


        }

        const validationSchema = Yup.object(
            {

                r_email: Yup.string().email("Email is in incorrect format").required("Email is required"),
                r_password: Yup.string().required("Please enter the password")

            }
        )


        return (
            <div className="container-fluid" style={{margin:"0px",padding:"0px"}} >
                <Navbar></Navbar>
                <div className="container" data-testid="Rest_init">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card border-0 shadow rounded-3 my-5">
                                <div className="card-body p-4 p-sm-5">
                                    <h5 className="card-title text-center mb-5 fw-light fs-5">Restaurant Login</h5>
                                   <center> <p style={{ color: 'red' }}>{this.state.loginvalid}</p></center>
                                    <Formik initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        enableReinitialize
                                        onSubmit={(datasend) => {
                                            console.log(datasend)
                                           
                                            axios.post(`${server}/Restaurant/reslog`, {

                                                r_email:datasend.r_email,
                                                r_password:datasend.r_password,
                                                


                                            }).then((res) =>
                                            {
                                                // console.log("hi")
                                                console.log(res)
                                               if(res.data.message === 'Login successfull')
                                               { console.log("sdad")
                                                   const { cookies } = this.props
                                                //    sessionStorage.setItem("isAuthenticated","true")
                                                   cookies.set("uber","isAuth",{expires:0})
                                                 
                                                   this.setState(
                                                       {
                                                           redirect : true,
                                                           r_email:datasend.r_email
                                                       }
                                                   )
                                               }
                                               else
                                               {
                                                   console.log("Invalid")
                                                      
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
                                                <Field name="r_email" type="input" placeholder="Enter email" className="form-control" />
                                                <label for="r_email">Enter your email id</label>
                                                <ErrorMessage name="r_email">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                                {/* <ErrorMessage>
                                            {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                            </ErrorMessage> */}
                                            </div>
                                            <div className="form-floating mb-3">
                                                <Field name="r_password" type="password" placeholder="Enter password" className="form-control" />
                                                {/* <input type="password" className="form-control" id="r_password" placeholder="Password"/> */}
                                                <label for="r_password">Enter your password</label>
                                                <ErrorMessage name="r_password">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                            </div>
                                            <div className="d-grid">
                                                <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Log
                                                    in</button>
                                            </div>
                                            <center><p>Don't have an account?<Link to="/Restaurantregister" className="link-info">Register here</Link></p></center>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }else
    {
        return <Redirect to ={{ pathname :"/RestaurantLanding",
                state: {message : "Hello1111" ,
                           r_email : this.state.r_email}
    
    }} ></Redirect>  
    }
}
}


export default  withCookies( connect(Restaurantinit.mapStateToProps,Restaurantinit.mapDispatchtoProps)(Restaurantinit))
