import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik"
import "../Uber.css";

export default class RestaurantProfile extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
            allowEdit : false
        }
    }
    

    componentDidMount(props)
    {
        const x = this.props.location.state.message
        console.log(x)
    }
    render() {
        const initialValues =
        {

            r_email: "",
            r_password: "",
            r_picture:"",
            r_number:"",
            r_county:"",
            r_opentime:"",
            r_closeime:"",
            r_state:""
        }
        
        return (
            <div>
                <h1></h1>
                
               
             
                <div className = "RestarauntProfile">
                  
                <Formik initialValues={initialValues}>
                <Form className = "form-group" contentEditable = "false">
            {/* Upload [pictures] and description are in a seperate row  */}
                <div className="container" >
                <div className = "row ">
                     <div className = "col-md-4">
                    <img src = "https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png"/>
                     <label>Upload Restaraunt pictures</label>
                     <Field className = "form-control" 
                     type = "file" name = "r_picture"
                     placeholder = "Upload pictures"   ></Field>

                     </div>
                     <div className = "col-md-8">
                     <center><label>Resteraunt description</label></center>
                    <Field className = "form-control" name = "r_description" as="textarea" 
                     placeholder = "Enter a small description"   ></Field>
                    <ErrorMessage name="r_textarea">
                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                    </ErrorMessage>
                    </div>
                     </div>   
                 <div className = "row">
                 <div className = "col-md-6"> 
                 <label>Restauraunt name</label>
                <Field className = "form-control" name = "r_name" placeholder = "Enter username" ></Field>
                <ErrorMessage name="r_name">
                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                </ErrorMessage>    
                <label>Registered email</label>
                <Field className = "form-control" name = "r_email" placeholder = "Enter email"></Field>
                <ErrorMessage name="r_email"> 
                {msg => <div style={{ color: 'red' }}>{msg}</div>} 
                 </ErrorMessage>
                 <label>Restauraunt contact number</label>
                <Field className = "form-control" type = "number" name = "r_number" placeholder = "Enter phone number" ></Field>
                <ErrorMessage name="r_number"> 
                 {msg => <div style={{ color: 'red' }}>{msg}</div>} 
                 </ErrorMessage>
                 <label>Restauraunt county</label>
                 <Field className = "form-control" name = "r_county" placeholder = "Enter county"></Field>
                <ErrorMessage name="r_county"> 
                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                 </ErrorMessage>
                 </div>

                 <div className = "col-md-6"> 
                 <label>Restauraunt opening time</label>
                 <Field className = "form-control" type = "time" name = "r_opentime" placeholder = "Enter opening time" ></Field>
                <ErrorMessage name="r_opentime"> 
                 {msg => <div style={{ color: 'red' }}>{msg}</div>} 
                 </ErrorMessage>
                 <label>Restauraunt closing time</label>
                 <Field className = "form-control" type = "time" name = "r_closetime" placeholder = "Enter closing time" ></Field>
                <ErrorMessage name="r_opentime"> 
                 {msg => <div style={{ color: 'red' }}>{msg}</div>} 
                 </ErrorMessage>
                 <label>Restauraunt state</label>
                 <Field className = "form-control"  name = "r_state" placeholder = "Enter State" ></Field>
                <ErrorMessage name="r_state"> 
                 {msg => <div style={{ color: 'red' }}>{msg}</div>} 
                 </ErrorMessage>
                 </div>
                 </div>
                 <button type = "submit" className ="btn btn-primary"  >Edit</button>
                </div>
                
                </Form>        
                </Formik>             
                
                </div>  
                </div>
              
                
             


          
      
        )
    }
}
