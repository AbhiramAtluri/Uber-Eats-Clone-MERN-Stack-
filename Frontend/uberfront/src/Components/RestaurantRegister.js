import React, { Component } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

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





    handleResterauntNameChange = (event) => {

        this.setState(
            {
                r_name: event.target.value
            }
        )

    }
    handlePasswordChange = (event) => {
         
       
       
           
            this.setState(
                {
    
                    r_password: event.target.value
                }
            )
          

            
           
        
    }

    handleStateChange = (event) => {
        this.setState(
            {
                r_state: event.target.value
            }
        )
    }

    handleEmailChange = (event) => {

        this.setState(
            {
                r_email: event.target.value
            }
        )

    }
    handleFormSubmit = (event) => {
        // let history = useHistory()
        event.preventDefault()
        ///Regular expression to check if the password is strong
        //DONT FORGET TO ADD VALIDATIONS FOR THE REST OF THE FIELDS ALSO only password field added
        const regex = new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')
        // console.log(regex.test)
        // if(this.state.r_name.length > 40)
        // {

        // }
        

        // if(regex.test(this.state.r_password) == true)
        // {
        //     console.log("inside")
        
        axios.post("http://localhost:3030/register/resreg", {

            r_email: this.state.r_email,
            r_name: this.state.r_name,
            r_password: this.state.r_password,
            r_state: this.state.r_state
           

        }).then(res => { 
            console.log(res)
              if(res.data =="Invalid")
               {
                   this.setState({
                       r_message: "Email already in use"
                   })
               }
               else{
                console.log("Hello");
              
                this.setState(
                    {
                        redirect : true
                    }
                )
                   
               }
            
            }
              
        
        ).catch(err => { 
            console.log(err) 
        })
    }
    // else{
    // this.setState(
    //     {
    //         r_passwordmessage :"Password must contain atleast one special character and a mixture of letters and numbers"
    //     }
    // )
    // }
        // axios.post("http://localhost:3030/register/resreg")

        // alert(this.state.r_email +""+ this.state.r_password+this.state.r_state+this.state.r_name)

    // }



    render() {

          if(this.state.redirect == true)
          {
                return <Redirect to ="/Restaurant"></Redirect>
          }else
        return (


            <div>
                <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5"></div>
                            <h5 className ="card-title text-center mb-4 fw-dark fs-3">Enter your details   </h5>
                           <center> <p>{this.state.r_message}</p></center>
                            <form onSubmit ={this.handleFormSubmit} >
                            <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="r_name" placeholder="Enter resteraunt name" onChange = {this.handleResterauntNameChange} />
                            <label for="r_name">Enter the name of the resteraunt</label>
                            </div>
                            <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="r_email" placeholder="Enter your email id" onChange = {this.handleEmailChange} />
                            <label for="r_email">Enter your email id</label>
                            </div>
                            <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="r_password" placeholder="Enter your password"  onChange = {this.handlePasswordChange} />
                            <label for="r_password">Enter your password</label>
                            <p>{this.state.r_passwordmessage}</p>
                            </div>
                            <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="r_state" placeholder="Enter your location" onChange = {this.handleStateChange} />
                            <label for="r_state">Enter your State</label>
                            </div>
                            <div className="d-grid">
                            <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Register</button>
                            </div>

                            </form>
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

