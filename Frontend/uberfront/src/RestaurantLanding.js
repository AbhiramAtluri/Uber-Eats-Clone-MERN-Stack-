import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

import "./Uber.css";
import sideBarList from "./Components/SideBarList"



export class RestaurantLanding extends Component {


//   componentDidMount(props)
//   {
//       console.log(this.props.location.state.message)
//   }


    render() {
        // console.log("Hello landing")
        return (
            <div>
                <div>
                  {/* <h1>{this.props.location.state.message}</h1>  */}
                <div className = "sideBar">
                    <ul className = "sideBarList">
                       { sideBarList.map((value,key) =>
                       
                       {
                           return( <li className = "listdata" key ={key}
                           
                      
                           
                           
                           >     {}
                               <Link to ={{ pathname : value.link, state : {message :"diehard"}}}  >
                           <div id = "icon">{value.icon}</div>
                           <div id = "title">{value.title}</div>
                           </Link>
                           </li>
                       
                           )
                               
                       }
                       )} 



                    </ul>
               
                </div>
                </div>
                
            </div>
        )
    }
}

export default RestaurantLanding
