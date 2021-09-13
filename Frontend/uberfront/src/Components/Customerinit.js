import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

export class Customerinit extends Component {
    render() {
        return (
            <div>
                <h1>Customer Login</h1>
            <div className = "form-group">
            <center>
            <form>
             <table>
                 <tbody>
                     <tr>
                         <td>
                         <label>Email id</label>
                         </td>
                         <td>
                         <input type = "email" className ="form-control"></input>
                         </td>
                     </tr>
                    <tr>
                        <td>
                            <label>Password</label>
                        </td>
                        <td>
                            <input type = "password" className ="form-control"></input>
                        </td>
                    </tr>
                    <tr>
                        <td> 
                            <label></label>
                             </td>
                        <td><center><Link to = "/Customregister">Register?</Link></center></td>
                    </tr>
                 </tbody>
             </table>

            </form>
            </center>
            </div>
        </div>
        )
    }
}

export default Customerinit
