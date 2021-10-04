import React, { Component } from 'react'
import orderlist from '../RestaurantComponents/orderlist'
import axios from 'axios'
import Bouncer from 'react-data-bouncer'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik"
import ListItem from './ListItem';

export default class CustomerOrders extends Component {

constructor(props) {
    super(props)

    this.state = {

        c_id:"",
        order_details:[],
        testOrder:[]
         
    }
}


componentDidMount(props)
{
console.log("in did mount-parent")
    const c_id= this.props.location.state.c_id
    console.log(c_id)

axios.post("http://localhost:3030/customer/FetchCustomerDetailsById",
{
c_id:c_id

})
.then(res=>{
   
this.setState({
    order_details:res.data
})
console.log(res.data)
this.setState({

    testOrder:res.data[3]
})
}
)
this.setState(
    {
       c_id:c_id
    }
    )   
}
    render() {  
    console.log(this.state)
        return (<div>
                <div className="container-fluid" style={{ margin: 0, padding: 0 }}>               
                <div className = "row">
                    <div className = "col-md-12">
                    <center>
                    <div className="col-md-8">
                    <ul className="list-group">
                        <ListItem testOrder={this.state.testOrder}></ListItem>   
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

