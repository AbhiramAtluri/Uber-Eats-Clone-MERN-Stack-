import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup";
import "../RestaurantComponents/Uber.css";
import { Carousel } from 'bootstrap';
import Countrylist from './Countries';
import StateList from './States';
import axios from 'axios';
import config from "../S3upload"
import S3 from 'react-aws-s3';


export class CustomerProfile extends Component {


    constructor(props) {
        super(props)

        this.state = {

            c_email: "",
            c_city: "",
            c_name: "",
            c_nickname: "",
            c_profilepic: "",
            c_state: "",
            c_county: "",
            c_country: "",
            c_description :"",
            c_id:"",
            c_dob:"",
           

        }
    }


    componentDidMount(props) {
        //Fetching Customer profile data
        const c_id = this.props.location.state.c_id
        const c_email = this.props.location.state.c_email
        // console.log("In Profile Page")
        // console.log(this.props.location.state)
        // console.log(c_id)
        // console.log(this.props.location.state.c_email)
        this.setState(
            {
                c_id:c_id,
                c_email:c_email
            }
            )
        axios.post("http://localhost:3030/customer/CustomerProfileFetch",
            {
                c_email: c_email,
                
                //    c_city :this.state.c_city,
                //    c_name :this.state.c_name,
                //    c_nickname:this.state.c_nickname,
                //    c_profilepic :this.state.c_profilepic,
                //    c_state:this.state.c_state,
                //    c_county:this.state.c_county
            }

        ).then(res => {
            // console.log(res)
            // console.log(res.data[0])
            this.setState(
                {
                    c_city: res.data[0].c_city,
                    c_name: res.data[0].c_name,
                    c_nickname: res.data[0].c_nickname,
                    c_profilepic: res.data[0].c_profilepic ===null ? "https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png"
                    :res.data[0].c_profilepic,
                    c_state: res.data[0].c_state,
                    c_county: res.data[0].c_county,
                    c_country: res.data[0].c_country,
                    c_description:res.data[0].c_description,
                    // c_id:res.data[0].c_id,
                    c_dob:res.data[0].c_dob,
                    c_number:res.data[0].c_number
                }
            )


        }
        )




    }
    handleOnPicUpload = (e)=>
    {
        let filename =Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) 
      console.log(e.target.files[0])
      const Reacts3client = new S3(config)
    Reacts3client.uploadFile(e.target.files[0],filename)
    .then(res=>
        {
            this.setState({

                c_profilepic:res.location
            })
        }
        )
    }


    handleOnSubmit = (e)=>
    {
        axios.post("http://localhost:3030/customer/CustomerProfileUpdate",
        {   c_id:this.state.c_id,
            c_email: e.c_email,
            c_city: e.c_city,
            c_name: e.c_name,
            c_nickname: e.c_nickname,
            c_profilepic: this.state.c_profilepic,
            c_state: e.c_state,
            c_county: e.c_county,
            c_country: e.c_country,
            c_description :e.c_description,
            c_dob:e.c_dob,
            c_number:e.c_number
        }
        ).then(res=>
            {

                    console.log(res)
                    alert("Profile Updation Successfull")
                   
            })
    }

    render() {

        const initialValues =
        {

            c_email: this.state.c_email,
            c_city: this.state.c_city == 0 ? "" : this.state.c_city,
            c_name: this.state.c_name == 0 ? "" : this.state.c_name,
            c_nickname: this.state.c_nickname == 0 ? "" : this.state.c_nickname,
            c_profilepic: this.state.c_profilepic == 0 ? "" : this.state.c_profilepic,
            c_state: this.state.c_state == 0 ? "" : this.state.c_state,
            c_county: this.state.c_county == 0 ? "" : this.state.c_county,
            c_country: this.state.c_country == 0 ? "United States" : this.state.c_country,
            c_description:this.state.c_description == 0 ?"": this.state.c_description,
            c_dob:this.state.c_dob == 0 ?"": this.state.c_dob
        }
        
        const validationSchema = Yup.object(
            {
                c_name: Yup.string().max(25,"Maximum of 25 charachters").required("Username is required"),
                c_description : Yup.string().max(255,"maximum of 255 characters"),
                c_email :Yup.string().email("Please enter in email format"),
                c_county:Yup.string().max(30,"Maximum of 30 characters"),
                c_nickname:Yup.string().max(10,"Maximum of 10 letters")

            }
        )



        return (
            <div>
                <div>
                    <h1></h1>



                    <div className="CustomerProfile">

                        <Formik initialValues={initialValues}  enableReinitialize 
                        
                        onSubmit ={e=>{this.handleOnSubmit(e)}}      
                        >
                            <Form className="form-group" contentEditable="false">
                                {/* Upload [pictures] and description are in a seperate row  */}
                                <div className="container" >
                                    <div className="row ">
                                        <div className="col-md-4">
                                            <img src={this.state.c_profilepic}
                                                style={{ height: "300px", width: "354px" }} />
                                            <label>Upload your profile pictures</label>
                                            <Field className="form-control"
                                                type="file" name="c_picture"
                                                placeholder="Upload pictures" onChange ={(e)=>{this.handleOnPicUpload(e)}}  ></Field>

                                        </div> 

                                        <div className="col-md-8">
                                            <center><label>About</label></center>
                                            <Field className="form-control" name="c_description" as="textarea"
                                                placeholder="Enter a small description of yourself"   ></Field>
                                            <ErrorMessage name="c_textarea">
                                                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                            </ErrorMessage>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Username</label>
                                            <Field className="form-control" name="c_name" placeholder="Enter username" ></Field>
                                            <ErrorMessage name="c_name">
                                                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                            </ErrorMessage>

                                            <label>Nickname</label>
                                            <Field className="form-control" name="c_nickname" placeholder="Enter your nickname" ></Field>
                                            <ErrorMessage name="c_nickname">
                                                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                            </ErrorMessage>



                                            <label>Registered email</label>
                                            <Field className="form-control" name="c_email" placeholder="Enter your email id"></Field>
                                            <ErrorMessage name="c_email">
                                                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                            </ErrorMessage>
                                            <label>Contact Number</label>
                                            <Field className="form-control" type="number" name="c_number" placeholder="Enter your contact number" ></Field>
                                            <ErrorMessage name="c_number">
                                                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                            </ErrorMessage>
                                            <label>County name</label>
                                            <Field className="form-control" name="c_county" placeholder="Enter your county"></Field>
                                            <ErrorMessage name="c_county">
                                                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                            </ErrorMessage>

                                            <label>Country name</label>
                                            <Field className="form-control" name="c_country" as="select">
                                                {Countrylist.map((value, key) => {
                                                    return (<option value={value.name}>{value.name}</option>)
                                                })}

                                            </Field>
                                            <ErrorMessage name="c_country">
                                                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                            </ErrorMessage>




                                        </div>
                                        <div className="col-md-6">
                                            <label>City Name</label>
                                            <Field className="form-control" type="name" name="c_city" placeholder="Enter name of city that you live in" ></Field>
                                            <ErrorMessage name="c_city">
                                                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                            </ErrorMessage>

                                            <label>State of residence</label>
                                            <Field className="form-control" name="c_state" placeholder="Enter State" as="select" >
                                                {StateList.map((value, key) => {
                                                    return (<option value={value.abbreviation}>{value.abbreviation}</option>)
                                                })}

                                            </Field>
                                            <ErrorMessage name="c_state">
                                                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                            </ErrorMessage>

                                            <label>Date of Birth</label>
                                            <Field className="form-control" name="c_dob" placeholder="Enter date of birth" type="Date" ></Field>
                                            <ErrorMessage name="r_dob">
                                                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                            </ErrorMessage>

                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary"  >Update</button>
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
