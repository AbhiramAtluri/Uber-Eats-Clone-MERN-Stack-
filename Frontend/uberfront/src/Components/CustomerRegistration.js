import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

export class CustomerRegistration extends Component {
    render() {
        return (
            <div>
                 <div>
                     <h1>Customer Registration</h1>
              <center>  
             <div>
                <form className = "form-group">
                 <table>
                     <tbody>
                        <tr>
                            <td>
                         <label>Name</label> 
                         </td>
                         <td>
                             <input type = "text" name = "c_name" placeholder = "Enter Your name" className = "form-control"></input>
                         </td>
            
                        </tr>
                        <tr>
                            <td>
                                <label>Email id</label>
                            </td>
                            <td>
                                <input type = "email" name = "c_email" placeholder = "Enter your email id" className ="form-control"></input>
                            </td>

                        </tr>
                        <tr>
                           <td>
                               <label>Password</label>
                               </td> 
                               <td>    
                               <input type = "password"name = "c_password" placeholder ="Enter your password" className = "form-control"></input>
                           </td>
                              
                        </tr>
                        <tr>
                            <td></td>
                            <center>
                             <td>
                                 <Link to ="/Customer">
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
            </div>
        )
    }
}

export default CustomerRegistration
