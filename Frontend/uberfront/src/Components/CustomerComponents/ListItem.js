import React, { Component } from 'react'
import axios from 'axios'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';




export default class ListItem extends Component {

  constructor(props) {
      super(props)
  
      this.state = {
             Order_details :"",
             d_list:[],
             r_id:"",
             r_name:"",
             o_id:"",
             o_status:"ready",
             o_time:"11:45",
             o_date:"08/05/2021",
             popup_display:false,
             totalcost:""

      }
  }
  
    
componentDidMount(props)
{
    console.log("in did mount - child")

let Orderdetails = this.props.testOrder
console.log(Orderdetails)
let itemlist = this.props.testOrder.d_list
console.log(itemlist)
let order = this.props.testOrder.d_list
let bill = 0
for(let a in order)
{
    bill = bill + order[a].d_price * order[a].d_quantity
}

this.setState(
    {
         totalcost:bill
    }
    )
////GETTING R_NAME WITH AN API CALL
axios.post("http://localhost:3030/customer/FetchRestaurantNameFromCustId",
{
r_id:10
}
)
.then(res=>
{
    console.log(res.data)
  
    this.setState(
        {
            r_name:res.data[0].r_name
        }
        )
}
)
console.log(this.props.testOrder.del_id)
axios.post("http://localhost:3030/customer/FetchDelAddressInCustomerOrders",
{
    del_id:this.props.testOrder.del_id
}
)
.then(res=>
    {
   console.log(res)
    }
    )
this.setState(
    {
        Order_details:Orderdetails,
        d_list:itemlist,

    }
    )
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




    render() {
// console.log(this.props.item.d_list)
console.log(this.props.testOrder)

console.log(this.state)
        return (
            <li className="list-group-item">
                <div className = "row" style={{margin:0,padding:0}}>
                    <div className="col-md-4" style={{textAlign:"left"}}>
                   <h5 style={{margin:"0" }}>{this.state.r_name}</h5>
                   <p style={{margin:"0"}} >time:{this.state.o_time} date:{this.state.o_date}  </p>
                   </div>
                   <div className = "col-md-4">
                   <p style={{marginTop:"7px"}}>status: {this.state.o_status}</p>
                   </div>
                   <div className = "col-md-4">
                       <button className="btn btn-primary" onClick={this.handleOnClick}   >View Reciept</button>
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
                   <div className="col-md-12">
                   <div className = "row"> 
                       <h4>Total : {this.state.totalcost}$</h4>
                       </div>
                       {this.props.testOrder.d_list.map((data,key)=>{
                     
                     
                     return   <div className = "row"> 
                       <div className="col-md-4" style={{marginTop:"15px"}}>
                       <h5>{data.d_name}</h5>
                       </div>
                       <div className="col-md-4"style={{textAlign:"center",marginTop:"15px"}}  >
                       <h5> {data.d_price}$</h5>
                       </div>
                       <div className="col-md-4" style={{textAlign:"center",marginTop:"15px"}}>
                       <h5>X {data.d_quantity}</h5>
                       </div>
                       </div>
                       
                      } )}
                     <div className= "col-md-6"style={{marginTop:"15px"}}>
                    <h5>Status :{this.state.o_status}</h5>
                    <div className="col-md-6">Delivery Address:{}</div>
                    <h5>Deliverd to:-</h5>
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
