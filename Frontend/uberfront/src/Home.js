import { height } from '@mui/system';
import React, { Component } from 'react'
import {Helmet} from 'react-helmet'
import Navbar from './Components/Navbar';
// import backgroundImage from "./UberEats.jpg"
import UberEatspic from './images/UberEatspic.jpg'
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     useRouteMatch,
//     useParams
//   } from "react-router-dom";

//   import ResterauntLogin from './ResterauntLogin';
//   import CustomerLogin from './CustomerLogin';
 class Home extends Component {
    render() {
        return (
            
            
            <div className="container-fluid" style={{margin:"0px",padding:"0px"}} > 
              <Navbar>
              </Navbar>
              <div style={{ height:"1000px",backgroundImage:`url(${UberEatspic})` }} >

              </div>
         
            </div>
          
            
        )
    }
}

export default Home
