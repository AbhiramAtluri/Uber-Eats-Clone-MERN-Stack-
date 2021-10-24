import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup";
import axios from 'axios'
import "./Uber.css"
import config from "../S3upload"
import S3 from 'react-aws-s3';
import NavbarRest from './RestaurantNavBar';
import server from '../WebConfig';
import  { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {NewAddedDish} from '../../Redux/DishesReduxFile/DishActions';

 class AddDish extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            r_id : "",
            r_name :"",
            d_picture:"https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png"
             
        }
    }


    static mapStateToProps = state =>
    {
        return {Rest: state.values}
    }
    static mapDispatchtoProps = dispatch =>
    {
        return bindActionCreators({NewAddedDish},dispatch)
    }



    componentDidMount(props)
    {
        // console.log(this.props.location.state.r_id)
     this.setState(
         {
              r_id:this.props.location.state.r_id,
              r_name:this.props.location.state.r_name
         }
     )
     
    }
    
    
    handleonSubmit =(e)=>
    {
         console.log(e)
        axios.post(`${server}/Restaurant/addish`,
        { 
            r_id:this.state.r_id,
            d_name:e.d_name,
            d_price:e.d_price,
            d_category:e.d_category,
            d_description:e.d_description,
            d_picture:this.state.d_picture,
            d_type:e.d_type
           
        }).then(res =>
            {alert("Dish added Successfully")
               
            let value = {
                dish:[{r_id:this.state.r_id,
                    d_name:e.d_name,
                    d_price:e.d_price,
                    d_category:e.d_category,
                    d_description:e.d_description,
                    d_picture:this.state.d_picture,
                    d_type:e.d_type}]
            }
            this.props.NewAddedDish(value)

              
             }
            )
        .catch(err=>{console.log(err)})

    }
       /////LISTENER FOR PICTURE UPLOAD
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

    //    upload(e.target.files[0],"testupload")

   }



    render() {
        console.log(this.state.r_id)
        // console.log("in add dishes")
        const initialValues =
        {

            d_name: "",
            d_description : "",
            d_category :"Appetizer",
            d_price :"",
            d_type:"NV"
        }

        const validationSchema = Yup.object(
            {
                d_name: Yup.string().required("Name of the dish is required"),
                d_description : Yup.string().required("Description of the dish is required").max(120,"maximum of 120 words"),
                d_category : Yup.string().required("Dish Category is required"),
                d_type:Yup.string().required("Type of dish is required"),
                 d_price :Yup.number().max(1001,"Maximum price is 1000$").required("Price of dish is required")
                
            }
        )


        return (
            <div className="container-fluid" style={{ margin: 0, padding: 0 }}>
                <NavbarRest></NavbarRest>
                
                <Formik initialValues ={initialValues}   
                onSubmit = {(e)=>{this.handleonSubmit(e)}}
                validationSchema ={validationSchema}
                >
                  
                  <Form className="form-group">
                <div className = "container">
                <div className="row">
                <div className = "col-md-6">
         

                <img src={this.state.d_picture} style={{height :"250px",width : "250px"}} />
                
                <Field className="form-control"
                type="file" name="d_picture"
                placeholder="Upload pictures" onChange ={(e)=>this.handlepicupload(e)} style={{marginTop:"46px"}} ></Field>
                 <label>Dish description</label>
                    <Field className = "form-control" name = "d_description" as="textarea" 
                     placeholder = "Enter a small description of the dish" ></Field>
                    <ErrorMessage name="d_description">
                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                    </ErrorMessage>  
                    
                 </div>
                 <div className = "col-md-6">
                 
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
                <Field className = "form-control" name = "d_price" type = "number" step="0.01" placeholder = "Enter price of the dish" id = "AD"  ></Field>
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
               <label>Dish Type</label>
               <Field className = "form-control" name = "d_type" as="select">
                   <option value = "NV">Non-veg</option>
                   <option value = "Veg">Vegetarian</option>
                   <option value = "Vegan">Vegan</option>
               </Field>
               </div>
              <center> <button type = "submit" className ="btn btn-primary"  >Add Dish</button></center>
                </div>
                  

                </div>

                </div>
                </Form>
               
                </Formik>
               
            </div>
        )
    }
}

export default   connect(AddDish.mapStateToProps,AddDish.mapDispatchtoProps)(AddDish)