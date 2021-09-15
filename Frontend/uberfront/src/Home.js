import React, { Component } from 'react'
import {Helmet} from 'react-helmet'
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
            
         
            <div >  
               <Helmet>
                <style>{'body{ background-color :azure}'}</style>
                </Helmet>
            <div>
             <center>  
            <h1 style ={{marginTop : '17%'}}>Welcome to Uber eats</h1>
            </center>
            </div>
            </div>
        )
    }
}

export default Home
