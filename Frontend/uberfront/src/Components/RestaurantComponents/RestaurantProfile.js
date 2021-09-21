import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik"
import "./Uber.css";
import axios from "axios"
import config from "../S3upload"
import S3 from 'react-aws-s3';

export default class RestaurantProfile extends Component {

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
            r_picture:"https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png"
        }
    }
    

    componentDidMount(props)
    {
        const r_id = this.props.location.state.r_id
        const r_email = this.props.location.state.r_name
        // console.log(r_id,r_email)

        axios.post("http://localhost:3030/Restaurant/getRestaurantProfileDetails",
        { 
            r_id:r_id
           
        }).then(res =>
            {
                console.log(res.data[0])
                  this.setState(
                      {
                        
                        r_email: res.data[0].r_email,
                         r_name:res.data[0].r_name,
                         r_picture:res.data[0].r_picture===null?"https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png":res.data[0].r_picture,
                        r_number:res.data[0].r_number,
                        r_county:res.data[0].r_county,
                        r_opentime:res.data[0].r_opentime,
                        r_closetime:res.data[0].r_closetime,
                        r_state:res.data[0].r_state,
                        r_description:res.data[0].r_description
                        
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
        axios.post("http://localhost:3030/Restaurant/RestProfUpdate",
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
            r_description :e.r_description
        }
        ).then(res=>
            {
                if(res == "Success")
                {
                    alert("Profile Update success")
                }
            })
    }


    render() {
        // console.log(this.state)
        // console.log(this.state.r_name)
        // const x = [{a:this.state.r_name}]
        // console.log(x)
        // console.log(x[0].a)
        const initialValues =
        {
            r_name: this.state.r_name=== 0?"":this.state.r_name,
            r_email: this.state.r_email === 0?"":this.state.r_email,
            //  r_picture:this.state.r_picture == 0 ?"https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png":this.state.r_picture,
            r_number:this.state.r_number == 0 ?"":this.state.r_number,
            r_county:this.state.r_county == 0 ?"":this.state.r_county,
            r_opentime:this.state.r_opentime == 0 ?"":this.state.r_opentime,
            r_closetime:this.state.r_closetime == 0 ?"":this.state.r_closetime,
            r_state:this.state.r_state == 0 ?"":this.state.r_state,
            r_description:this.state.r_description == 0 ?"":this.state.r_description
        }
        const validationSchema = Yup.object(
            {
                r_name: Yup.string(),
                r_description : Yup.string().max(255,"maximum of 255 characters"),
                r_email :Yup.string().email("Please enter in email format"),
                r_state:Yup.string().max(2,"Maximum of two characters")
            }
        )


        
        return (
            <div>
                <h1></h1>
                
               
             
                <div className = "RestarauntProfile">
                  
                <Formik initialValues={initialValues} enableReinitialize  
                
                onSubmit = {(e)=>
                    {this.handleOnSubmit(e)}}
                
                >
                <Form className = "form-group" contentEditable = "false">
            {/* Upload [pictures] and description are in a seperate row  */}
                <div className="container" >
                <div className = "row ">
                     <div className = "col-md-4">
                    <img style ={{height :"300px",width : "350px"}} src ={this.state.r_picture} />
                     <label>Upload Restauraunt pictures</label>
                     <Field className = "form-control" 
                     type = "file" name = "r_picture"
                     placeholder = "Upload pictures" onChange ={(e)=>{this.handleOnPicUpload(e)}}   ></Field>

                     </div>
                     <div className = "col-md-8">
                     <center><label>Restauraunt description</label></center>
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
                <Field className = "form-control" name = "r_name" placeholder = "Enter Restaurant Name" ></Field>
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
                <ErrorMessage name="r_closetime"> 
                 {msg => <div style={{ color: 'red' }}>{msg}</div>} 
                 </ErrorMessage>
                 <label>Restauraunt state</label>
                 <Field className = "form-control"  name = "r_state" placeholder = "Enter State" ></Field>
                <ErrorMessage name="r_state"> 
                 {msg => <div style={{ color: 'red' }}>{msg}</div>} 
                 </ErrorMessage>
                 </div>
                 </div>
                 <button type = "submit" className ="btn btn-primary" >Update</button>
                </div>
                
                </Form>        
                </Formik>             
                
                </div>  
                </div>
              
                
             


          
      
        )
    }
}
