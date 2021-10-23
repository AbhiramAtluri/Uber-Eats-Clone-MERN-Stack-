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
import Navbar from '../Navbar';
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import server from '../WebConfig';
import  { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { c_login } from '../../Redux/CustomerLoginandReg/CustomerActions';


export class Customerinit extends Component {
   
    constructor(props) {
        super(props)
    
        this.state = {
               redirect : false,
               loginvalid:"",
               c_email:"",
               c_id:""
        }
    }
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
    
      static mapStateToProps = state =>
    {
        return {Cust: state.values}
    }
    static mapDispatchtoProps = dispatch =>
    {
        return bindActionCreators({c_login},dispatch)
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
            c_id:""


        }



        return (
            <div className="container-fluid" style={{margin:"0px",padding:"0px"}}>
                <Navbar></Navbar>
                <div className="container"  >
                
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card border-0 shadow rounded-3 my-5">
                                <div className="card-body p-4 p-sm-5">
                                    <h5 className="card-title text-center mb-5 fw-light fs-5">Customer Login</h5>
                                    <center> <p style={{ color: 'red' }}>{this.state.loginvalid}</p></center>
                              <Formik    initialValues={initialValues} validationSchema={validationSchema}  
                              
                              onSubmit={(data) => {
                                console.log(data)
                            
                                axios.post(`${server}/customer/custlog`, {

                                    c_email:data.c_email,
                                    c_password:data.c_password,
                                    


                                }).then((res) =>
                                {
                                    // console.log("hi")
                                    console.log(res)
                                   if(res.data.message === 'Login successfull')
                                   {
                                   
                                    const { cookies } = this.props
                                       console.log()
                                       cookies.set("uber","isAuth",{expires:0})
                                       this.setState(
                                           {   
                                               c_email:res.data.c_email,
                                               c_id:res.data.c_id,
                                               redirect : true,
                                               
                                           }
                                       )
                                       let values = {
                                           c_email:res.data.c_email,
                                           c_id:res.data.c_id
                                       }
                                       this.props.c_login(values)

                                       


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
                    
                               </div>
            </div>
        )
    }else
    {
        return <Redirect to ={{pathname : "/Customerlanding", state :{  c_email:this.state.c_email, c_id :this.state.c_id  }}}   ></Redirect>  
    }

}  
}

export default  withCookies(connect(Customerinit.mapStateToProps,Customerinit.mapDispatchtoProps)(Customerinit))
