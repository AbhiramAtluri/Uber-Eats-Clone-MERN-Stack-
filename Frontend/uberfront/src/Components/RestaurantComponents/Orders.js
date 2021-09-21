import React, { Component } from 'react'
import orderlist from './orderlist'
import "./Uber.css"
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik"
import Filter from './Filter';



export default class Orders extends Component {

    constructor(props) {
        super(props)
        
        this.state = 
        {
            orderslen : orderlist.length,
            option :"Order Received"
        }
        
    }
    

    handleOnSave = (order)=>
       {
        console.log(order,this.state.option)
       }

    handleOnStateChange = (e) =>
    {
      this.setState(
          {
              option:e.target.value
          }
      )
    } 


    render() {

      const initialValues = {}



        return (
            
            <div className = "container" style = {{marginLeft : '24%'}} >
               <h1 style = {{marginLeft :"261px"}}>Order's List</h1>
                <div className = "dishlist">
                 <div className ="row">
                <Filter />  
                 <ul class="list-group"> 
                 <li className = "list-group-item" style ={{display : "inline-flex" ,width : "50rem"}}>
                 <div className = "col-md-2">
                    <h5>Order Id</h5> 
                 </div>
                 <div className = "col-md-1">
                 <h5>Customer Name</h5>  
                </div>
                <div className = "col-md-1" style={{marginLeft : '72px'}}>
                  <h5>Item Price</h5>        
                </div>
                <div className = "col-md-1" style={{marginLeft : '80px'}}>
                 <h5>Order Status</h5>
                </div>
                 </li>
                 {/* <div className ="col-md-10"></div> */}
                    {orderlist.map((order,key) =>
                    {   
                        
                        
                        return   <div>
                             <li className = "list-group-item" style ={{display : "inline-flex" ,width : "50rem"}}>
                               <Formik initialValues = {initialValues} >  
                               <Form style = {{display : "inline-flex"}} > 
                              <div className = "col-md-2">
                               <h5 value = "x" >{order.id}</h5>                              
                              </div>
                              <div className ="col-md-2">
                                <h5>{order.name}</h5>
                              </div>
                              <div className ="col-md-2" style={{marginLeft : '100px'}}>
                               <h5>{order.price}</h5>
                              </div>
                              {order.option == "Pickup"?<div> <select id="sel" name = "sel" onChange = {this.handleOnStateChange} >
                              <option value ="Order Received">Order Received</option>
                                  <option value ="Order Preparing">Order Preparing</option>
                                  <option value ="Pick up ready">Pick up ready</option>
                                  <option value ="Picked up">Picked up</option>
                                  </select>  
                                  </div>:<div>
                                  <select id="sel" name = "sel" onChange = {this.handleOnStateChange} >
                                  <option value ="Order Received">Order Received</option>
                                  <option value ="Order Preparing">Order Preparing</option>
                                  <option value ="On the way">On the way</option>
                                  <option value ="Order Delivered">Order Delivered</option> 
                                  </select>
                                     
                                      
                                      </div>}
                                
                                    <button type = "button" className = "btn btn-primary" style = {{marginLeft : '40px'}} onClick = {()=>this.handleOnSave(order)} >Save</button>
                                
                                    </Form> 
                                    </Formik>
                             </li>
                        </div>
                    }
                    )
                    }
                    </ul>
                </div>
                </div>    
            </div>
        )
    }
}
