import React, { Component } from 'react'
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup";
import axios from 'axios'
import "./Uber.css"
import config from "../S3upload"
import S3 from 'react-aws-s3';
import NavbarRest from './RestaurantNavBar';


export default class EditDish extends Component {

   
   constructor(props) {
       super(props)
   ////Setting the initial state if no picture is uploaded then below pic will be displayed
       this.state = {
           r_id:"",
           d_id:"",
           d_name:"",
           d_picture:"https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png",
           d_description :"",
            d_price:"",
            d_category:""
            
       }
   }
   


    componentDidMount(props)
    {
        let r_id = this.props.location.state.r_id 
        let d_id = this.props.location.state.d_id 
        let d_name = this.props.location.state.d_name
        let d_picture = this.props.location.state.d_picture

///Getting all the required field through props.state and initializing them
         console.log(this.props.location.state)

        this.setState({
            r_id :r_id,
            d_id:d_id,
            d_name:d_name,
            d_picture:d_picture,
            d_description :this.props.location.state.d_description,
            d_price:this.props.location.state.d_price,
            d_category:this.props.location.state.d_category
        
        })

    }

  handleonSubmit = (e)=>
  {
    console.log(e)
    axios.post("http://localhost:3030/Restaurant/EditDish",
    { 
        r_id:this.state.r_id,
        d_name:e.d_name,
        d_price:e.d_price,
        d_category:e.d_category,
        d_description:e.d_description,
        d_picture:this.state.d_picture,
        d_id:this.state.d_id
       
    }).then(res =>
        {alert("Dish Edited Successfully")
          
         }
        )
    .catch(err=>{console.log(err)})

   



  }
handlepicupload = (e)=>
   {

    let filename =Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const Reacts3client = new S3(config)
    Reacts3client.uploadFile(e.target.files[0],filename)
    .then(data =>
        {   console.log(data)
            console.log(data.location)
            this.setState(
                {
                    d_picture: data.location              
                })
        }
        )
    .catch(err=>{console.log(err)})
       console.log("In pic upload")
       console.log(e.target.files[0])


   }



    
    render() {
        
        ///Setting the initial values in Formik

        const initialValues =
        {

            d_name: this.props.location.state.d_name,
            d_description :this.props.location.state.d_description ,
            d_category :this.props.location.state.d_category,
            d_price :this.props.location.state.d_price
        }

        const validationSchema = Yup.object(
            {
                d_name: Yup.string().required("Name of the dish is required"),
                // d_description : Yup.string().required("Description of the dish is required").max(120,"maximum of 120 words"),
                d_category : Yup.string().required("Dish Category is required"),
                d_price :Yup.number().max(1001,"Maximum price is 1000$").required("Price of dish is required").min(0,"Please enter valid price")
            }
        )
       

        return (
            <div className="container-fluid" style={{ margin: 0, padding: 0,fontFamily:"sans-serif" }}  >
              <NavbarRest/> 

             <center> <h5 style={{fontSize:"25px"}}>Edit Dish</h5> </center>
            <Formik initialValues ={initialValues}   
            onSubmit = {(e)=>{this.handleonSubmit(e)}}
            validationSchema ={validationSchema}
            >
              
              <Form className="form-group" style={{marginTop:"30px"}}>
            <div className = "container">
            <div className="row">
            <div className = "col-md-6">
     {/* Initializing the picture */}

            <img src={this.state.d_picture} style={{height :"250px",width : "250px"}} />
            
            <Field className="form-control"
            type="file" name="d_picture"
            placeholder="Upload pictures" onChange ={(e)=>this.handlepicupload(e)} ></Field>
             <label>Dish description</label>
                <Field className = "form-control" name = "d_description" as="textarea" 
                 placeholder = "Enter a small description of the dish" ></Field>
                <ErrorMessage name="d_description">
                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                </ErrorMessage>  
                
             </div>
             <div className = "col-md-6" style={{marginTop:"18px"}} >
             
            <div style ={{marginTop : "108px"}}> 
            <div className = "formc" id = "AD">
            <label>Dish name</label> 
            <Field className = "form-control" name = "d_name" placeholder = "Enter Dishname"   ></Field>
            <ErrorMessage name="d_name">
            {msg => <div style={{ color: 'red' }}>{msg}</div>}
            </ErrorMessage> 
            </div> 
            </div>
                <label>Dish price</label>
                <div className = "formc" id = "AD">  
            <Field className = "form-control" name = "d_price" type = "number" placeholder = "Enter price of the dish" id = "AD"  ></Field>
            <ErrorMessage name="d_price">
            {msg => <div style={{ color: 'red' }}>{msg}</div>}
            </ErrorMessage>
            </div>     
            <label>Dish Category</label>
            <div className = "formc" id = "AD"> 
           <Field className="form-control" name="d_category" as="select"  >
           <option value="Appetizer">Appetizer</option>
           <option value = "Salads">Salads</option>
           <option value = "Main course">Main course</option>
           <option value = "Desserts">Desserts</option>
           <option value = "Beverages">Beverages</option>
           </Field>
           </div>
          <center > <button type = "submit" className ="btn btn-primary"    >Save Edit</button></center>
            </div>
              

            </div>

            </div>
            </Form>
           
            </Formik>
           
        </div>
        )
    }
}
