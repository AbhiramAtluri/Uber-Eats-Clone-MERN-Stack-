import React, { Component } from 'react'
import axios from 'axios'
import RestaurantOrderlistItems from './RestaurantOrderlistItems'
import NavbarRest from './RestaurantNavBar'
import server from '../WebConfig'
import  { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Set_R_Orders} from '../../Redux/RestaurantloginandReg/RestaurantActions';

class RestauranOrderList extends Component {

   constructor(props) {
       super(props)
   
       this.state = {
              
      r_id:"",
      FetchedOrderList:[],
      MasterOrderList:[]

       }
   }
   static mapStateToProps = state =>
   {
       return {Rest: state.values}
   }
   static mapDispatchtoProps = dispatch =>
   {
       return bindActionCreators({Set_R_Orders},dispatch)
   }

   componentDidMount(props) 
   {
   let r_id = this.props.location.state.r_id


    axios.post(`${server}/customer/FetchRestaurantDetailsById`,
   
      {
          r_id:r_id 
 
      }
   
   )
   .then(resp=>
    {
     console.log(resp.data)
     this.setState(
         {
           FetchedOrderList:resp.data,
           MasterOrderList:resp.data
         }
         )
         let values = {orders:resp.data}
       this.props.Set_R_Orders(values)
    }
    )

     console.log(this.state.r_id)

   }
   OnChangeFilter = (e)=>
   {
       console.log(e.target.value)
       if(e.target.value == "New Order")
       {
       let Norder_details = this.state.MasterOrderList.filter(order=>{return order.o_status == null || order.o_status =="On the way" || order.o_status=="Order Received" })
       console.log(Norder_details)
       this.setState(
           {
               FetchedOrderList:Norder_details
           }
       )
       }

       if(e.target.value == "Order Delivered")
       {
       let Norder_details = this.state.MasterOrderList.filter(order=>{return order.o_status == "Order Delivered"  })
       console.log(Norder_details)
       this.setState(
           {
               FetchedOrderList:Norder_details
           }
       )
        }



       if(e.target.value =="All Orders")
        {
            this.setState(
                {
                    FetchedOrderList:this.state.MasterOrderList
                }
            )

        }



    }



    render()
     {

        console.log(this.state)
        return (
            <div className="container-fluid" style={{ margin: 0, padding: 0 }}> 
                <NavbarRest></NavbarRest>              
                <div className="container-fluid" >
                 
                <div className = "row">
                   
                    <div className = "col-md-12">  
                    <center>
                    <div className="col-md-8" style={{marginTop:"20px"}}>

                    <ul className="list-group">
                     <li className="list-group-item">
                     < h5>Order List</h5>
                     <div className="col-md-4">
                           <select name= "filter" onChange={e=>{this.OnChangeFilter(e)}} >
                           <option value = "All Orders">All Orders</option>
                            <option value = "Order Delivered">Order Delivered</option>
                            <option value = "New Order">New Order</option>
                            <option value ="Cancelled Order">Cancelled order</option>
                            </select>  
                         </div>
                     
                     </li>

                      {this.state.FetchedOrderList.length >0?
                     
                      this.state.FetchedOrderList.map((data,key)=>{
                        return <RestaurantOrderlistItems key={key}  order={data} style={{marginTop:"10px"}} ></RestaurantOrderlistItems>
                       }
                       ):<div style={{marginTop:"10px"}}><h5> No Orders Placed Yet  </h5></div>
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

export default connect(RestauranOrderList.mapStateToProps,RestauranOrderList.mapDispatchtoProps)(RestauranOrderList)