import React, { Component } from 'react'
import axios from 'axios'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
  


export class ResterauntRegister extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
             r_name : "",
             r_email :"",
             r_password :"",
             r_state : ""
        }
    }
    


  

    handleUsernameChange = (event) =>
    {

          this.setState(
              {
                  r_name : event.target.value
              }
          )

    }
    handlePasswordChange = (event) =>
    {
        this.setState(
            {
                r_password : event.target.value
            }
        )
    }

    handleStateChange =(event) =>
    {
        this.setState(
            {
                r_state : event.target.value
            }
        )
    }

    handleEmailChange = (event) =>
    {

        this.setState(
            {
                r_email :event.target.value
            }
        )

    }
      handleFormSubmit = () =>
    {
        axios.post("http://localhost:3030/register/reslog" , {
        
            email : this.state.r_email,
            name : this.state.r_name,
            password : this.state.r_password,
            location: this.state.r_state
    

        }).then(res =>{console.log(res)}).catch(err =>{console.log(err)})


    }



    render() {
        return (


            <div>
              <center>  
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
             </center>
            </div>
        )
    }
}


export default ResterauntRegister

