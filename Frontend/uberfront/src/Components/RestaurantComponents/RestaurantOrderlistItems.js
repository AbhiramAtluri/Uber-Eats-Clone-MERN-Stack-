import React, { Component } from 'react'
import * as Yup from "yup";
import axios from 'axios'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik"
import server from '../WebConfig';


export default class RestaurantOrderlistItems extends Component {


    constructor(props) {
        super(props)

        this.state = {

        }
    }


    handleOnUpdate =(e)=>
    
    {

     axios.post(`${server}/customer/UpdateOrderStatus`,
     {
         o_id:this.props.order.o_id,
         r_id:this.props.order.r_id,
         o_status:e.o_status
     })
     .then(res=>
        {
            if(res.data.message == "success")
            {
                console.log(res)
                alert("Dish Status Updated")
            }
        }
        )
     .catch(err=>{console.log(err)})
    }

    render() {
    const initialValues = {
        o_status:this.props.order.o_status==null?"Order Received":this.props.order.o_status

    }
   console.log(this.props.order.o_status)
    const initialValues2=
    {
        o_status:this.props.order.o_status==null?"Order Received":this.props.order.o_status
    }

        console.log(this.props.order)
        console.log(initialValues2)
        return (
            <div>
                <li className="list-group-item">

                    <div className="col-md-12" style={{margin:"0px",padding:"0px"}}>
                     
                        <div className="row">
                            <div className="col-md-2 ">
                                <h5 style={{marginTop:"20px"}}><Link to={{pathname:"/CustomerProfile",state:{c_id:this.props.order.c_id,view:"Rest"}}}>Order Id:{this.props.order.o_id}</Link></h5>
                            </div>
                            <div className="col-md-1">
                                <h5 style={{marginTop:"20px"}}>Cid:{this.props.order.c_id}</h5>
                            </div>
                            <div className="col-md-4">

                                <table>

                                    {(this.props.order.d_list).map((data, key) => {
                                        return <tr>
                                            <td>
                                                {data.d_name}
                                            </td>
                                            <td>
                                                {data.d_price}$
                                            </td>
                                            <td>
                                                X{data.d_quantity}
                                            </td>


                                        </tr>
                                    }
                                    )}

                                </table>
                            </div>
                            <div className="col-md-2">
                               <p style={{marginTop:"20px"}}> {this.props.order.d_list[0].checkoutprice}$</p>
                            </div>
                        
                        <div className="col-md-3" style={{padding:"0px"}}>
                            {this.props.order.del_type == "s_pickup" ?
                                <div>
                                    <Formik initialValues={initialValues} enableReinitialize onSubmit={e=>{this.handleOnUpdate(e)}}   >
                                     <Form style={{marginTop:"20px",display:"flex"}}>   
                                    <Field as="select" style={{width:"133px"}}  name="o_status"  >
                                        <option value="Order Received">Order Received</option>
                                        <option value="Order Preparing">Order Preparing</option>
                                        <option value="Pick up ready">Pick up ready</option>
                                        <option value="Picked up">Picked up</option>
                                    </Field>
                                    <button style={{marginLeft:"5px"}} type="submit" className="btn btn-primary">Update</button>
                                    </Form>
                                 </Formik>
                                </div> :  <div>
                                    <Formik initialValues={initialValues2} enableReinitialize onSubmit={(e=>{this.handleOnUpdate(e)})}>
                                     <Form style={{marginTop:"20px",display:"flex"}} >   
                                    <Field  style={{width:"133px"}}  as="select" name="o_status"  >
                                    <option value ="Order Received">Order Received</option>
                                  <option value ="Order Preparing">Order Preparing</option>
                                  <option value ="On the way">On the way</option>
                                  <option value ="Order Delivered">Order Delivered</option> 
                                    </Field>
                                    <button style={{marginLeft:"5px"}}  type="submit" className="btn btn-primary">Update</button>
                                    </Form>
                                 </Formik>
                                </div> }

                        </div>
                        </div>
                    </div>
                </li>
            </div>
        )
    }
}
