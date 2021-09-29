import React, { Component } from 'react'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik"
import { getImageListItemBarUtilityClass } from '@mui/material';




export default class Checkout extends Component {


   constructor(props) {
       super(props)
   
       this.state = {
            checkoutList:[]
       }
   }
   
componentDidMount(props)
{

  const checkoutList = this.props.location.state.checkoutList
  
  console.log(checkoutList)
  this.setState(
      {
       checkoutList : checkoutList
      }
      )

  


}





    render() {  

    const initialValues = {
        d_name :"Abhiram",
        d_email:"xyz@gmail.com",
        d_number:"123123"
    }



        return (
            <div>
                <div className ="container-fluid"style={{ margin: 0, padding: 0 }} >
                <div className = "row">
                <div className="col-md-6 " >
                <div className ="container-fluid" style={{ margin: 0, padding: 0 }} >
                      <center><h5>Delivery Details</h5></center>
                    <Formik initialValues ={initialValues}>
                     <Form>
                     <div className="form-floating mb-3">
                     {/* <label for = "d_name">Delivered to</label> */}
                     <Field name="d_name" type="input" placeholder="Delivery name" className="form-control" /> 
                     <Field name="d_email" type="email" placeholder="Delivery email" className="form-control" />
                     <Field className = "form-control" type = "number" name = "d_number" placeholder = "Enter phone number" >
                    </Field>    
                     </div>


                     </Form>
                    </Formik>




                    </div>    
                </div> 
                <div className = "col-md-6">
                 <div className = "container-fluid" style={{ margin: 0, padding: 0 }} >
                     <h5>Cart Details</h5>
                     </div>
                  </div>      
                </div>


                </div>
            </div>
        )
    }
}
