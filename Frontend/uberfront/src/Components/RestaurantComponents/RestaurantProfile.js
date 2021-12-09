import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik"
import "./Uber.css";
import axios from "axios"
import config from "../S3upload"
import S3 from 'react-aws-s3';
import NavbarRest from './RestaurantNavBar';
import StateList from './Rstates';
import server from '../WebConfig';
import  { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateRestProfile } from '../../Redux/RestaurantProfile/RestProfileActionTypes';

import {GET_RESTAURANT_PROFILE} from '../Queries'

class RestaurantProfile extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             r_name:"",
            allowEdit : false,
            r_email: "",
            r_password: "",
            r_description:"",
            r_number:"",
            r_county:"",
            r_opentime:"",
            r_closetime:"",
            r_state:"",
            del_type:"s_both",
            r_picture:"https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png",
            r_address:""
        }
    }
    
    static mapStateToProps = state =>
    {
        return {Profile: state.values}
    }
    static mapDispatchtoProps = dispatch =>
    {
        return bindActionCreators({updateRestProfile},dispatch)
    }

    componentDidMount(props)
    {
        const r_id = this.props.location.state.r_id
        const r_email = this.props.location.state.r_name
        // console.log(r_id,r_email)
      
        let query = GET_RESTAURANT_PROFILE
                     let variables = {
                         rId:"61af083d930eccfbf217f96b"
                     }



        axios.post(`${server}/Restaurant/getRestaurantProfileDetails`,{query,variables}).then(res =>
            {   
                res = {data:res.data.data.getRestaurantProfile}
                console.log(res.data)
                  this.setState(
                      {
                        
                        r_email: res.data.r_email,
                         r_name:res.data.r_name,
                         r_picture:res.data.r_picture===null?"https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png":res.data.r_picture,
                        r_number:res.data.r_number,
                        r_county:res.data.r_county,
                        r_opentime:res.data.r_opentime,
                        r_closetime:res.data.r_closetime,
                        r_state:res.data.r_state,
                        r_description:res.data.r_description,
                        del_type:res.data.del_type,
                        r_address:res.data.r_address
                      }
                      )
                    
                    //  console.log(this.state)          
            }
            )
        .catch(err=>{console.log(err)})

    
        
        
    }

/////PROCESSING UPLOADED PICTURE TO AWS DATABASE

    handleOnPicUpload = (e)=>
    {
        let filename =Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) 
      console.log(e.target.files[0])
      const Reacts3client = new S3(config)
    Reacts3client.uploadFile(e.target.files[0],filename)
    .then(res=>
        {
            this.setState({

                r_picture:res.location
            })
        }
        )
    }

///HANDLEONSUBMIT EVENT TO CALL PROFILE UPDATE API

    handleOnSubmit = (e)=>
    {  
        console.log("In ")
        alert("Profile Update success")
        console.log(e)
        console.log(e.del_type+"Delivery type")
        axios.post(`${server}/Restaurant/RestProfUpdate`,
        {   
            r_id:this.props.location.state.r_id,
            r_name :e.r_name,
            r_email: e.r_email,
            r_number:e.r_number,
            r_county:e.r_county,
            r_opentime:e.r_opentime,
            r_closetime:e.r_closetime,
            r_state:e.r_state,
            r_picture:this.state.r_picture,
            r_description :e.r_description,
            del_type:e.del_type,
            r_address:e.r_address
        }
        ).then(res=>
            {

                    alert("Profile Update success")
                    let values = {
                        r_name :e.r_name,
                        r_email: e.r_email,
                        r_number:e.r_number,
                        r_county:e.r_county,
                        r_opentime:e.r_opentime,
                        r_closetime:e.r_closetime,
                        del_type:e.del_type,
                        r_address:e.r_address

                    }
                   this.props.updateRestProfile(values)
            })
    }


    render() {
         console.log(this.state)
        const initialValues =
        {
            r_name: this.state.r_name=== 0?"":this.state.r_name,
            r_email: this.state.r_email === 0?"":this.state.r_email,
            // r_picture:this.state.r_picture == 0 ?"https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png":this.state.r_picture,
            r_number:this.state.r_number == 0 ?"":this.state.r_number,
            r_county:this.state.r_county == 0 ?"":this.state.r_county,
            r_opentime:this.state.r_opentime == 0 ?"":this.state.r_opentime,
            r_closetime:this.state.r_closetime == 0 ?"":this.state.r_closetime,
            r_state:this.state.r_state == 0 ?"":this.state.r_state,
            r_description:this.state.r_description == 0 ?"":this.state.r_description,
            del_type:this.state.del_type == 0 ?"":this.state.del_type,
            r_address:this.state.r_address == null?"":this.state.r_address
        }
        const validationSchema = Yup.object(
            {
                // r_name: Yup.string("Enter the name"),
                // r_description : Yup.string("Enter the description").max(255,"maximum of 255 characters"),
                // r_email :Yup.string("Enter the Email ID").email("Please enter in email format"),
                // r_state:Yup.string("Enter the state").max(2,"Maximum of two characters"),
                // r_county:Yup.string("Enter the county").max(30,"Limit the county name to 30 characters"),
                // r_address:Yup.string("Enter the address").max(100,"Please limit the address to 100 characters"),
                // r_number:Yup.string("Enter the contact number").max(10,"Enter Valid Number").matches(/^[0-9]*$/,"Enter Valid Number").min(10,"Enter Valid Number").required("Please enter your contact number")
            }
        )


        
        return (
            <div className="container-fluid" style={{ margin: 0, padding: 0 }}>
                <NavbarRest></NavbarRest>
                <h1></h1>
                
               
             
                <div className = "RestarauntProfile">
                  
                <Formik initialValues={initialValues} enableReinitialize  
                
                onSubmit = {(e)=>
                    {this.handleOnSubmit(e)}}
                validationSchema={validationSchema}
                >
                <Form className = "form-group" contentEditable = "false">
            
                <div className="container" >
                <div className = "row ">
                     <div className = "col-md-4">
                    <img style ={{height :"300px",width : "350px"}} src ={this.state.r_picture} />
                     <label>Upload Restaurant pictures</label>
                     <Field className = "form-control" 
                     type = "file" name = "r_picture"
                     placeholder = "Upload pictures" onChange ={(e)=>{this.handleOnPicUpload(e)}}></Field>

                     </div>
                     <div className = "col-md-8">
                     <center><label>Restaurant description</label></center>
                    <Field className = "form-control" name = "r_description" as="textarea" 
                     placeholder = "Enter a small description"   ></Field>
                    <ErrorMessage name="r_textarea">
                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                    </ErrorMessage>
                    </div>
                     </div>   
                 <div className = "row">
                 <div className = "col-md-6"> 
                 <label>Restaurant name</label>
                <Field className = "form-control" name = "r_name" placeholder = "Enter Restaurant Name" ></Field>
                <ErrorMessage name="r_name">
                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                </ErrorMessage>    
                <label>Registered email</label>
                <Field className = "form-control" name = "r_email" placeholder = "Enter email"></Field>
                <ErrorMessage name="r_email"> 
                {msg => <div style={{ color: 'red' }}>{msg}</div>} 
                 </ErrorMessage>
                 <label>Restaurant contact number</label>
                <Field className = "form-control" type = "text" name = "r_number" placeholder = "Enter phone number" ></Field>
                <ErrorMessage name="r_number"> 
                 {msg => <div style={{ color: 'red' }}>{msg}</div>} 
                 </ErrorMessage>
                 <label>Restaurant county</label>
                 <Field className = "form-control" name = "r_county" placeholder = "Enter county"></Field>
                <ErrorMessage name="r_county"> 
                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                 </ErrorMessage>
                 </div>

                 <div className = "col-md-6"> 
                 <label>Restaurant opening time</label>
                 <Field className = "form-control" type = "time" name = "r_opentime" placeholder = "Enter opening time" ></Field>
                <ErrorMessage name="r_opentime"> 
                 {msg => <div style={{ color: 'red' }}>{msg}</div>} 
                 </ErrorMessage>
                 <label>Restaurant closing time</label>
                 <Field className = "form-control" type = "time" name = "r_closetime" placeholder = "Enter closing time" ></Field>
                <ErrorMessage name="r_closetime"> 
                 {msg => <div style={{ color: 'red' }}>{msg}</div>} 
                 </ErrorMessage>
                 <label>Restaurant state</label>
                 <Field as="select" className="form-control" name="r_state" placeholder="Select you state" >
                            {StateList.map((value, key) => {
                                                    return (<option value={value.abbreviation}>{value.abbreviation}</option>)
                            })}</Field>

                <ErrorMessage name="r_state"> 
                 {msg => <div style={{ color: 'red' }}>{msg}</div>} 
                 </ErrorMessage>
                 <label>Delivery Type</label>
                 <Field className = "form-control"  name = "del_type" as ="select">
                 <option value="s_delivery">Delivery</option>
                 <option value="s_pickup">Pickup</option>
                 <option value="s_both">Both</option>
                 </Field>
                <ErrorMessage name="r_state"> 
                 {msg => <div style={{ color: 'red' }}>{msg}</div>} 
                 </ErrorMessage>

                 <label>Restaurant Address</label>
                <Field className = "form-control" name = "r_address" placeholder = "Enter Restaurant address" ></Field>
                <ErrorMessage name="r_address">
                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                </ErrorMessage>



                 </div>
                 </div>
                 <button type = "submit" className ="btn btn-primary"  style={{marginLeft:"800px",marginTop:"20px"}} >Update</button>
                </div>
                
                </Form>        
                </Formik>             
                
                </div>  
                </div>
              
                
             


          
      
        )
    }
}

export default connect(RestaurantProfile.mapStateToProps,RestaurantProfile.mapDispatchtoProps)(RestaurantProfile)
