import logo from './logo.svg';
import './App.css';
import Home from './Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import React, { Component } from 'react'
import Restaurantinit from './Components/Restaurantinit';
import Customerinit from './Components/Customerinit';
import { RestaurantRegister } from './Components/RestaurantRegister';
import CustomerRegistration from './Components/CustomerRegistration';
import {Helmet} from 'react-helmet'
function App() {
  return (
    <div>
        <Helmet>
                <style>{'body{ background-color :azure}'}</style>
                </Helmet>
      <Router>
      <Navbar></Navbar>
      <Switch>
        <Route exact path = "/">
        
           <Home></Home>
         
        </Route>
        <Route exact path = "/Customer">
       <Customerinit></Customerinit>
        </Route>
        <Route exact path = "/Restaurant">
       <Restaurantinit></Restaurantinit>
        </Route>
          <Route exact path = "/Restaurantregister">
            <RestaurantRegister></RestaurantRegister>
        </Route>
        <Route exact path ="/Customerregister">
          <CustomerRegistration></CustomerRegistration>
        </Route>
        </Switch>

      <div></div>
      </Router>
    {/* <Home></Home> */}
    </div>

  );
  
}

export default App;
