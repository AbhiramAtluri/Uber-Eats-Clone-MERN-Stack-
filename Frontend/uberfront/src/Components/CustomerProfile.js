import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup";
import "../Uber.css";




export class CustomerProfile extends Component {
    render() {
        return (
            <div>
                <div>
                <h1></h1>
                
               
             
                <div className = "CustomerProfile">
                  
                <Formik initialValues={initialValues}>
                <Form className = "form-group" contentEditable = "false">
            {/* Upload [pictures] and description are in a seperate row  */}
                <div className="container" >
                <div className = "row ">
                     <div className = "col-md-4">
                    <img src = "https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png"/>
                     <label>Upload your profile pictures</label>
                     <Field className = "form-control" 
                     type = "file" name = "c_picture"
                     placeholder = "Upload pictures"   ></Field>

                     </div>
                     <div className = "col-md-8">
                     <center><label>About</label></center>
                    <Field className = "form-control" name = "c_about" as="textarea" 
                     placeholder = "Enter a small description of yourself"   ></Field>
                    <ErrorMessage name="c_textarea">
                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                    </ErrorMessage>
                    </div>
                     </div>   
                 <div className = "row">
                 <div className = "col-md-6"> 
                 <label>name</label>
                <Field className = "form-control" name = "c_name" placeholder = "Enter username" ></Field>
                <ErrorMessage name="c_name">
                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                </ErrorMessage>    
                <label>Registered email</label>
                <Field className = "form-control" name = "c_email" placeholder = "Enter your email id"></Field>
                <ErrorMessage name="c_email"> 
                {msg => <div style={{ color: 'red' }}>{msg}</div>} 
                 </ErrorMessage>
                 <label>Contact Number</label>
                <Field className = "form-control" type = "number" name = "c_number" placeholder = "Enter your contact number" ></Field>
                <ErrorMessage name="c_number"> 
                 {msg => <div style={{ color: 'red' }}>{msg}</div>} 
                 </ErrorMessage>
                 <label>Restauraunt country</label>
                 <Field className = "form-control" name = "c_country" placeholder = "Enter your county"></Field>
                <ErrorMessage name="c_county"> 
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
            </div>
        )
    }
}

export default CustomerProfile
