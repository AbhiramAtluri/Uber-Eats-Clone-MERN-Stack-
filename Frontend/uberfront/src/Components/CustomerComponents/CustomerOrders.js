import React, { Component } from 'react'
import orderlist from '../RestaurantComponents/orderlist'
import axios from 'axios'
import Bouncer from 'react-data-bouncer'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik"
import ListItem from './ListItem';
import NavbarCust from './CustomerNavBar';
export default class CustomerOrders extends Component {

constructor(props) {
    super(props)

    this.state = {

        c_id:"",
        order_details:[],
        testOrder:[],
        filter:"",
        MasterOrderDetails:[]
         
    }
}


componentDidMount(props)
{

    axios.post("http://localhost:3030/customer/FetchCustomerDetailsById",
    {
    c_id:this.props.location.state.c_id
    
    })
    .then(res=>{
        this.setState(
            {
                order_details:res.data,
                MasterOrderDetails:res.data,
                c_id:this.props.location.state.c_id
            }
            )
            

    })
  
}

OnChangeFilter = (e)=>
{

   console.log(e.target.value)
//  console.log(this.state.order_details[1].o_status)
if(e.target.value!="Order Received" && e.target.value!="All Orders")
{
  let Norder_details = this.state.MasterOrderDetails.filter(order=>{return order.o_status == e.target.value})
console.log(Norder_details)
this.setState(
    {
        order_details:Norder_details
    }
)
}
else if(e.target.value=="Order Received")
{
    let Norder_details = this.state.MasterOrderDetails.filter(order=>{return order.o_status == null})
    console.log(Norder_details)
    this.setState(
        {
            order_details:Norder_details
        }
    )
}
else{
     console.log("asll")
     this.setState(
        {
            order_details:this.state.MasterOrderDetails
        }
    )
}



}



    render() {  
    console.log(this.state)
        return (<div className="container-fluid" style={{ margin: 0, padding: 0 }}>
              <NavbarCust></NavbarCust>
                <div className="container-fluid" style={{ margin: 0, padding: 0 }}>               
                <div className = "row" style={{margin:0,padding:0}}>
                    <div className = "col-md-12">
                    <center>
                    <div className="col-md-8">
                    <ul className="list-group">
                     <li className="list-group-item">
                     <div className = "row">
                     <div className="col-md-8">
                         <h5 style={{marginLeft:"265px"}}>Order History</h5>
                         </div>
                         <div className="col-md-4">
                           <select name= "filter" onChange={e=>{this.OnChangeFilter(e)}} >
                           <option value = "All Orders">All Orders</option>
                            <option value = "Order Received">Order Received</option>   
                            <option value = "On the way">On the way</option>
                            <option value = "Order Delivered">Delivered</option>
                            <option value = "Pick up ready">Pick up Ready</option>
                            <option value = "Picked up">Picked up</option>
                            <option value ="Order Preparing">Order Preparing</option>
                            </select>  
                         </div>
                     </div>
                     </li>   
                        {this.state.order_details.length >0?
                         this.state.order_details.map((order,key)=>
                         {
                            
                            return(<ListItem order = {order} r_name = {order.r_name} ></ListItem>)


                         }
                         )
                         
                        :"" 
                       }  
                     </ul>   
                    </div>
                    </center>
                 </div>
                </div>

                </div>
                </div>
        )
    }
}

