import React, { Component } from 'react'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik"
import { getImageListItemBarUtilityClass } from '@mui/material';
import axios from 'axios'



export default class Checkout extends Component {


   constructor(props) {
       super(props)
   
       this.state = {
            checkoutList:[],
            addaddress:false,
            selectAddress:false,
            c_id:"",
            addresslist:[],
            c_number:"",
            c_email:"",
            c_name:""
       }
   }
   
componentDidMount(props)
{

  const checkoutList = this.props.location.state.checkoutList
  const c_id = this.props.location.state.c_id



  console.log(this.state.c_id)
  console.log(c_id)
  console.log(checkoutList)
  this.setState(
      {
       checkoutList : checkoutList,
       c_id:c_id
      }
      )
 //Fetching delivery address     
axios.post("http://localhost:3030/customer/FetchDelAddress",
{
  c_id:c_id

}
)
.then(res=>{
      


    this.setState(
        {
            addresslist:res.data  
        }
        )


})
///Fetching customer number
axios.post("http://localhost:3030/customer/FetchCustNumber",
{
    c_id:c_id
})
.then(res=>
    {   console.log(res.data[0].c_number)
        this.setState(
            {
                c_number:res.data[0].c_number,
                c_name:res.data[0].c_name,
                c_email:res.data[0].c_email
            }
            )
            
    }
    )



}

handleAddAddress =()=>
{

this.setState(
    {
        addaddress :true,
        selectAddress:false
    }
)
console.log(this.state)
}


pullfreshAddressList=()=>
{

    axios.post("http://localhost:3030/customer/FetchDelAddress",
    {
      c_id:this.state.c_id
    
    }
    ).then(res=>
        {
            this.setState(
                {
                    addresslist:res.data  
                }
                )
        
        }
        )


}


handleOnSelectAddress=()=>
{
   
    this.setState
    ({
        addaddress :false,
        selectAddress:true
    })

}


handleAddressSubmit=(e)=>
{
    // e.preventDefault()
  console.log(e)
  console.log("hi")




  

    axios.post("http://localhost:3030/customer/AddDeliveryAddress",
     {
           
        c_id:this.state.c_id,
        d_add_1:e.d_add_1,
        d_add_2:e.d_add_2,
        d_zipcode:e.d_zipcode

     }
    )
    .then(res=>
        {
           if(res.data.message== "success")
           {
               alert("Address added Succesfully")
           }
           this.pullfreshAddressList()

        }
        )
    .catch(err=>
        {
            console.log(err)
        }
        )


}



    render() {  

    const initialValues = {
        d_name :this.state.c_name,
        d_email:this.state.c_email,
        d_number:this.state.c_number
    }
   const initailValues2={
    d_add_1:"",
    d_add_2:"",
    d_zipcode:""

   }


        return (
            <div>
                <div className ="container-fluid"style={{ margin: 0, padding: 0 }} >
                <div className = "row">
                <div className="col-md-6 " >
                <div className ="container-fluid" style={{ margin: 0, padding: 0 }} >
                      <center><h5>Delivery Checkout</h5></center>
                      <div className="form-floating mb-3">
                    <Formik initialValues ={initialValues}>
                    
                     <Form>
                     
                     {/* <label for = "d_name">Delivered to</label> */}
                     <Field name="d_name" type="input" placeholder="Delivery name" className="form-control" style={{ marginBottom:"20px"}} value={this.state.c_name} /> 
                     <Field name="d_email" type="email" placeholder="Delivery email" className="form-control" style={{ marginBottom:"20px"}} value={this.state.c_email}  />
                     <Field className = "form-control" type = "number" name = "d_number" placeholder = "Enter phone number" style={{ marginBottom:"20px"}} value={this.state.c_number}    >
                    </Field>    
                     
                   
                  <center><button className="btn btn-primary" style={{marginRight:"100px",width:"170px"}}   onClick={this.handleAddAddress} >Add Address</button><button  className="btn btn-primary" onClick={this.handleOnSelectAddress}  >Have a previous address?</button></center>
                     
                     </Form>
                  
                    </Formik>
                    </div>
                    {/* Add Address Form*/}
                    {this.state.addaddress==true?
                    <Formik initialValues ={initailValues2}  onSubmit = {(e)=> {this.handleAddressSubmit(e)}}  >
                     <Form >
                     <Field name="d_add_1" type="input" placeholder="Address line 1" className="form-control" style={{ marginBottom:"20px"}}/> 
                     <Field name="d_add_2" type="input" placeholder="Address line 2" className="form-control"style={{ marginBottom:"20px"}} />
                     <Field name="d_zipcode" type="input" placeholder="d_zipcode" className="form-control" style={{ marginBottom:"20px"}}/> 
                   <center>  <button   type="submit"  className="btn btn-primary">Add Address & place order</button></center> 
                     </Form>   
                    </Formik>
                    :<div>
                    </div>
                    }
                    {this.state.selectAddress==true?
                    <div>
                    <select style = {{width :"100%",height:"50px"}}>
                     {this.state.addresslist!=null?
                     this.state.addresslist.map((address,key)=>
                     {
                         return(<option value={address} style = {{width :"100%",height:"50px"}} >{ " "+address.d_add_1 + ","+ address.d_add_2+","+address.d_zipcode}</option>)
                     }
                     ):<option value="none">No Address Added</option>}   
                    </select> 
                     <center>  <button  className="btn btn-primary" >Place the order</button></center>   
                    </div>    
                    :
                    <div></div>
                    }
                    


                    </div>    
                </div> 



             {/* Add  */}



                <div className = "col-md-6">
                 <div className = "container-fluid" style={{ margin: 0, padding: 0 }} >
                     <h5>Checkout Cart</h5>
                     </div>
                  </div>      
                </div>


                </div>
            </div>
        )
    }
}
