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
import Resterauntinit from './Components/Resterauntinit';
import Customerinit from './Components/Customerinit';
import { ResterauntRegister } from './Components/ResterauntRegister';
import CustomerRegistration from './Components/CustomerRegistration';
function App() {
  return (
    <div>
      <Router>
      <Navbar></Navbar>
      <Switch>
        <Route exact path = "/">
           <Home></Home>
        </Route>
        <Route exact path = "/Customer">
       <Customerinit></Customerinit>
        </Route>
        <Route exact path = "/Resteraunt">
       <Resterauntinit></Resterauntinit>
        </Route>
          <Route exact path = "/Resterauntregister">
            <ResterauntRegister></ResterauntRegister>
        </Route>
        <Route exact path ="/Customregister">
          <CustomerRegistration></CustomerRegistration>
        </Route>
        </Switch>

      <div></div>
      </Router>
    {/* <Home></Home> */}
    </div>
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  );
  
}

export default App;
