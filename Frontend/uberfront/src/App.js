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
import Restaurantinit from './Components/RestaurantComponents/Restaurantinit';
import Customerinit from './Components/CustomerComponents/Customerinit';
import { RestaurantRegister } from './Components/RestaurantComponents/RestaurantRegister';
import CustomerRegistration from './Components/CustomerComponents/CustomerRegistration';
import RestaurantLanding from './Components/RestaurantComponents/RestaurantLanding';
import {Helmet} from 'react-helmet'
import RestaurantProfile from './Components/RestaurantComponents/RestaurantProfile';
import CustomerProfile from './Components/CustomerComponents/CustomerProfile';
import EditDish from './Components/RestaurantComponents/EditDish';
import AddDish from './Components/RestaurantComponents/AddDish';
import Orders from './Components/RestaurantComponents/Orders';
import CustomerLandingPage from './Components/CustomerComponents/CustomerLandingPage';
import Favourites from './Components/CustomerComponents/Favourites';
import Checkout from './Components/CustomerComponents/Checkout';
import CustomerOrders from './Components/CustomerComponents/CustomerOrders';
import RestauranOrderList from './Components/RestaurantComponents/RestauranOrderList';
// const BrowserHistory = require('react-router/lib/BrowserHistory').default;
function App() {


  return (
    <div className="container-fluid" style={{margin:"0px",padding:"0px"}}>
      {/* <div className="row" style={{margin:"0px",padding:"0px"}}> */}
      <Helmet>
                <style>{'body{ background-color :azure}'}</style>
      </Helmet>
      <Router >
      {/* <Navbar></Navbar> */}
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
        <Route exact path = "/RestaurantLanding" render = {(props) =><RestaurantLanding  {...props}/> }  >
          {/* <RestaurantLanding></RestaurantLanding> */}
        </Route>
        <Route exact path = "/RestProfile" render = {(props) =><RestaurantProfile  {...props}/> } >
         
      {/* <RestaurantProfile></RestaurantProfile> */}
   
        </Route>
        <Route exact path = "/CustomerProfile" component = {CustomerProfile}>
           
       
        </Route>
        <Route exact path ="/EditDish/" component = {EditDish}>
         {/* <EditDish></EditDish>         */}
        </Route>
        <Route exact path = "/AddDishes" component = {AddDish}>

        </Route>
        <Route exact path = "/Orders" component = {Orders}></Route>
        <Route exact path ="/Customerlanding"  component ={CustomerLandingPage}></Route>
        <Route exact path ="/Favourites"  component ={Favourites}></Route>
        <Route exact path = "/Checkout" component = {Checkout}></Route>
        <Route exact path = "/CustomerOrder" component = {CustomerOrders}  />
        <Route  exact path = "/RestaurantOrders" component={RestauranOrderList}   />
        </Switch>
      </Router>
      </div>
    /* <Home></Home> */
    // </div>

  );
  
}

export default App;
