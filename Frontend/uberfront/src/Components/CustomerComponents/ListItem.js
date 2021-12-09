import React, { Component } from 'react'
import axios from 'axios'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import server from '../WebConfig';



export default class ListItem extends Component {

  constructor(props) {
      super(props)
  
      this.state = {

            //  Order_details :"",
            //  d_list:[],
            //  r_id:"",
            //  r_name:"",
            //  o_id:"",
            //  o_status:"ready",
            //  o_time:"11:45",
            //  o_date:"08/05/2021",
             popup_display:false,
            //  totalcost:""
            del_add:""

      }
  }
  
    
componentDidMount(props)
{
    console.log(this.props.order.del_id)
    console.log(this.props.r_name)
    console.log(this.props.order)
    if(this.props.order !=null && this.props.order != undefined)
    {

      this.FetchDelAdd()
    }
}



handleOnClick = ()=>
{

this.setState(
    {
        popup_display:true 
    }
    )


}
handleOnclose=()=>
{
    this.setState(
        {
            popup_display:false
        }
        )
}

FetchDelAdd=()=>
{
  let add =""
  console.log(this.props.order)
 if(this.props.order.del_id!=null)
 {

  axios.post(`${server}/customer/FetchDelAddressInCustomerOrders`,
  {
    del_id:this.props.order.del_id
  }).then(res=>
    {
      console.log(res)
      console.log(res.data)
      //  add = res.data[0].d_add_1
      //  if(res.data[0].d_add_1!=undefined && res.data[0].d_add_1!=undefined && res.data[0].d_zipcode!=undefined)
      if(res.data[0]!=undefined)
       {
       this.setState(
         {
           del_add: res.data[0].d_add_1 +","+res.data[0].d_add_2+","+res.data[0].d_zipcode
         })
        }
        // console.log(res.data[0].d_add_1 +","+res.data[0].d_add_2+","+res.data[0].d_zipcode)
    })
    
  }
  else{
    this.setState({del_add:"This is a Pickup Order"})
  }

}
handleOnCancel = () =>
{
  axios.post(`${server}/customer/CancelOrderCustomer`,{
    o_id:this.props.order._id,
    o_status:"Cancelled"
  }).then(res=>
    {
      console.log(res);
      if(res.data.message == "Success")
      {
        alert("Order Cancelled");
      }else
      {
        alert("Order is already being prepared");
      } 
    })
}


    render() {
// console.log(this.props.item.d_list)
// console.log(this.props.testOrder)

console.log(this.state)
console.log(this.props.order)
console.log(this.props.order.d_list)
        return (
             <li className="list-group-item" style={{marginTop:"15px"}}>
                 <div className = "row" style={{margin:0,padding:0}}>
                     <div className="col-md-4" style={{textAlign:"left"}}>
                    <h5 style={{margin:"0" }}>{this.props.order.r_name}</h5>
                    <p style={{margin:"0"}} >Time:{this.props.order.o_time} Date:{this.props.order.o_date}  </p>
                    </div>
                    <div className = "col-md-4">
                    <p style={{marginTop:"7px"}}>Status: {this.props.order.o_status==null?"Order Picked Up":this.props.order.o_status}</p>
                    </div>
                    <div className = "col-md-2">
                        <button className="btn btn-primary" onClick={this.handleOnClick}   >View Reciept</button>
                     </div>
                     <div className="col-md-2">
                     <button className="btn btn-primary" onClick={this.handleOnCancel}>Cancel</button>
                      </div> 
                 </div>
                {this.state.popup_display == true?
               <Dialog open={this.state.popup_display} onClose={this.handleOnclose} fullWidth={true} >
                <DialogTitle>
                     <center><h4> Reciept</h4></center>
                   </DialogTitle>
                   <DialogContent>
                    <div className = "container-fluid" style={{margin:0,padding:0}} >
                   <div className ="row">
                   <div className="col-md-12" style={{fontFamily:"sans-serif"}}>
                   <div className = "row"> 
                       <h4>Total : 12$</h4>
                       </div>
          
                     
                     
                        <div className = "row"> 
                       <div className="col-md-4" style={{marginTop:"15px"}}>
                       <h5>French Fries</h5>
                       </div>
                       <div className="col-md-4"style={{textAlign:"center",marginTop:"15px"}}  >
                       <h5> 12$</h5>
                       </div>
                       <div className="col-md-4" style={{textAlign:"center",marginTop:"15px"}}>
                       <h5>X 1</h5>
                       </div>
                       </div>
                       
                    
                      <div className="row" style={{borderTop:"groove"}}>
                     <div className= "col-md-6"style={{marginTop:"15px"}}>
                     <div className = "row">
                       <h5>Order Id:{this.props.order.o_id}</h5>
                     </div>
                     
                     <div className = "row">
                    <h5>Status :{this.props.order.o_status==null?<h5>Order Picked up</h5>:this.props.order.o_status}</h5>
                     </div>
                     <div className = "row">
                       <h5>Instructions:{this.props.order.instructions}</h5>
                       </div>
                    </div>
                    <div className="col-md-6">
                    <div className = "row" style={{marginTop:"15px"}}>
                      <h5>Delivery Address:</h5>
                      </div>
                      <div className = "row">
                      <h5>{this.state.del_add}</h5>
                      </div></div>
                    
                     
                     </div>  
                     </div>
                   </div>



                   </div>
                 </DialogContent>
               </Dialog>:"" }

            </li>
       )
    }
}
