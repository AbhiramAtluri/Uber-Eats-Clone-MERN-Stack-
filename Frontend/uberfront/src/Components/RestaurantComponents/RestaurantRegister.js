import React, { Component } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik"
import StateList from './Rstates';
import Navbar from '../Navbar';
import server from '../WebConfig';
import {RESTAURANT_REGISTER} from '../Mutation'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    Redirect,
    
    withRouter
} from "react-router-dom";



export class RestaurantRegister extends Component {


    constructor(props) {
        super(props)

        this.state = {
            r_name: "",
            r_email: "",
            r_password: "",
            r_state: "",
            r_message :"",
            redirect :false,
            r_passwordmessage:""
        }
    }

        
    handleFormSubmit = (event) => {
      
        const regex = new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')
  
        const query = RESTAURANT_REGISTER

        let variables ={

            rEmail: event.r_email,
            rName: event.r_name,
            rPassword: event.r_password,
            rState: event.r_state
           

        }

         axios.post(`${server}/`,{query,variables}).then(res=>{

             console.log(res)
              if(res.data.message =="Invalid")
               {
                    alert("Regsistration unsuccessfull")
               }
               else{
                console.log("Hello");
               alert("Registration Successfull")
                this.setState(
                    {
                        redirect : true
                    }
                )
                   
               }





            })
   



        
        // axios.post(`${server}/Restaurant/resreg`, {

        //     r_email: event.r_email,
        //     r_name: event.r_name,
        //     r_password: event.r_password,
        //     r_state: event.r_state
           

        // }).then(res => { 
        //     // console.log(object)
        //     console.log(res)
        //       if(res.data =="Invalid")
        //        {
        //             alert("Regsistration unsuccessfull")
        //        }
        //        else{
        //         console.log("Hello");
        //        alert("Registration Successfull")
        //         this.setState(
        //             {
        //                 redirect : true
        //             }
        //         )
                   
        //        }
            
        //     }
              
        
        // ).catch(err => { 
        //     console.log(err) 
        // })
    }

  


    render() {
         

        const initialValues = 
        {
            r_name:"",
            r_email:"",
            r_password:"",
            r_state:"CA"

        }


        
        const validationSchema = Yup.object(
            {

                r_email: Yup.string().email("Please Enter the Email in correct format").required("Email is required"),
                r_password: Yup.string().required("Please enter the password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,"Must have atleast 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
                r_name:Yup.string().max(20,"Please limit your Restaurant Name to 30 characters").required("Please enter your Restaurant Name"),
                


            }
        )

          if(this.state.redirect == true)
          {
                return <Redirect to ="/Restaurant"></Redirect>
          }else
        return (


            <div>
                <div className="container-fluid" style={{margin:"0px",padding:"0px"}}>
                    <Navbar></Navbar>
                <div className="row" style={{margin:"0px"}}>
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5"></div>
                            <h5 className ="card-title text-center mb-4 fw-dark fs-3">Enter your details   </h5>
                           <center> <p>{this.state.r_message}</p></center>
                            <Formik onSubmit ={(data)=>{this.handleFormSubmit(data)}} initialValues={initialValues} validationSchema={validationSchema}>
                            <Form  >
                            <div className="form-floating mb-3">
                            <Field type="text" className="form-control" name="r_name" placeholder="Enter resteraunt name"  />
                            <label for="r_name">Enter the name of the Restaurant</label>
                            <ErrorMessage name="r_name">
                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                            </ErrorMessage>
                            </div>
                            <div className="form-floating mb-3">
                            <Field type="email" className="form-control" name="r_email" placeholder="Enter your email id"  />
                            <label for="r_email">Enter your email id</label>
                            <ErrorMessage name="r_email">
                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                            </ErrorMessage>
                            </div>
                            <div className="form-floating mb-3">
                            <Field type="password" className="form-control" name="r_password" placeholder="Enter your password"/>
                            <label for="r_password">Enter your password</label>
                            <ErrorMessage name="r_password">
                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                            </ErrorMessage>
                            {/* <p>{this.state.r_passwordmessage}</p> */}
                            </div>
                            <div className="form-floating mb-3">
                            <Field as="select" className="form-control" name="r_state" placeholder="Select you state" >
                            {StateList.map((value, key) => {
                                                    return (<option value={value.abbreviation}>{value.abbreviation}</option>)
                                                })}</Field>
                            <label for="r_state">Enter your State</label>
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
                {/* <center>  
             <div>
                <form className = "form-group" onSubmit = {this.handleFormSubmit()}>
                 <table>
                     <tbody>
                        <tr>
                            <td>
                         <label>Resteraunt Name</label> 
                         </td>
                         <td>
                             <input type = "text" onChange ={this.handleUsernameChange}  name = "r_name" placeholder = "Enter resteraunt name" className = "form-control"></input>
                         </td>
            
                        </tr>
                        <tr>
                            <td>
                                <label>Email id</label>
                            </td>
                            <td>
                                <input type = "email" name = "r_email" onChange ={this.handleEmailChange} placeholder = "Enter your email id" className ="form-control"></input>
                            </td>

                        </tr>
                        <tr>
                           <td>
                               <label>Password</label>
                               </td> 
                               <td>    
                               <input type = "password"  onChange = {this.handlePasswordChange}   name = "r_password" placeholder ="Enter your password" className = "form-control"></input>
                           </td>
                              
                        </tr>
                        <tr>
                            <td>
                                <label>State</label>
                            </td>
                            <td>
                            <input type = "text"  onChange = {this.handleStateChange}  name = "r_state" placeholder ="Enter your state" className = "form-control"></input> 
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <center>
                             <td>
                                 <Link to ="/Resteraunt">
                             <button type ="submit" className ="btn btn-primary" >Register</button>
                                  </Link>
                            </td>
                            </center>
                        </tr>

                     </tbody>
                 </table>
                 

                </form>



             </div>
             </center> */}
            </div>
        )
    }
}


export default withRouter(RestaurantRegister)

