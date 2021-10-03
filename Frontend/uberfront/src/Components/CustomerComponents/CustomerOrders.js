import React, { Component } from 'react'
import orderlist from '../RestaurantComponents/orderlist'
import axios from 'axios'

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik"
import ListItem from './ListItem';

export default class CustomerOrders extends Component {

constructor(props) {
    super(props)

    this.state = {

        c_id:"",
        order_details:[],
        testOrder:""
         
    }
}


componentDidMount(props)
{

    const c_id= this.props.location.state.c_id
    console.log(c_id)
    this.setState(
        {
           c_id:c_id
        }
        )

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
}
    render() {  
    console.log(this.state)
        return (<div>
                <div className="container-fluid" style={{ margin: 0, padding: 0 }}>
                 
                <div className = "row">
                    <div className = "col-md-12">
                    <center>
                    <div className="col-md-8">
                    <ul class="list-group">
                        <ListItem testOrder={this.state.testOrder} />
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
