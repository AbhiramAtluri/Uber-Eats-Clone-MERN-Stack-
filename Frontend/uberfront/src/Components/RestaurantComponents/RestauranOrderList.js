import React, { Component } from 'react'
import axios from 'axios'
import RestaurantOrderlistItems from './RestaurantOrderlistItems'
import NavbarRest from './RestaurantNavBar'




export default class RestauranOrderList extends Component {

   constructor(props) {
       super(props)
   
       this.state = {
              
      r_id:"",
      FetchedOrderList:[]

       }
   }
   

   componentDidMount(props) 
   {
   let r_id = this.props.location.state.r_id


    axios.post("http://localhost:3030/customer/FetchRestaurantDetailsById",
   
      {
          r_id:r_id 
 
      }
   
   )
   .then(resp=>
    {
     console.log(resp.data)
     this.setState(
         {
           FetchedOrderList:resp.data
         }
         )


    }
    )

     console.log(this.state.r_id)

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
                     <li className="list-group-item">< h5>Order List</h5></li>

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
