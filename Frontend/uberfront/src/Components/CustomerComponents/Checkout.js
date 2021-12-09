import React, { Component } from 'react'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik"

import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import  { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { clearCart } from '../../Redux/CartReducerfile/Cartactions';
import { placed_order,add_Instructions } from '../../Redux/CustomerLoginandReg/CustomerActions';
import NavbarCust from './CustomerNavBar';
import server from '../WebConfig';
import {PLACE_ORDER} from '../Mutation'



 class Checkout extends Component {


    constructor(props) {
        super(props)

        this.state = {
            checkoutList: [],
            addaddress: false,
            selectAddress: false,
            c_id: "",
            addresslist: [],
            c_number: "",
            c_email: "",
            c_name: "",
            total_price: "",
            selected_delivery_type:"",
            del_type:"",
            r_id:"",
            Selected_Address:"",
            open_dialog:false,
            redirect:false,
            r_name:"",
            openAddInstructions:false,
            instructions:""
            
        }
    }

    static mapStateToProps = state =>
    {
        return {Cust: state.values}
    }
    static mapDispatchtoProps = dispatch =>
    {
        return bindActionCreators({clearCart,placed_order,add_Instructions },dispatch)
    }



    componentDidMount(props) {

        // const checkoutList = this.props.location.state.checkoutList
        const c_id = this.props.location.state.c_id
        console.log(c_id)
        console.log(this.props.location.state.del_type)
        let checkoutList = JSON.parse(sessionStorage.getItem("cartData"))
        
        let   r_id = checkoutList[0].r_id
        this.setState
        (
            {
                r_id:checkoutList[0].r_id
            }
        )


        console.log(this.state.c_id)
        console.log(c_id)
        console.log(checkoutList)
        this.setState(
            {
                checkoutList: checkoutList,
                c_id: c_id,
                del_type: this.props.location.state.del_type,
                r_name:this.props.location.state.r_name
            }
        )
        //Fetching delivery address     
        axios.post(`${server}/customer/FetchDelAddress`,
            {
                c_id: c_id

            }
        )
            .then(res => {

                console.log(res.data[0])
                console.log(res.data._id)
                this.setState(
                    {
                        addresslist: [...(res.data)]
                    }
                )

            //  console.log(this.state.addresslist)
            //  console.log(this.state.addresslist[0])
            //  console.log(this.state.addresslist[0]._id)

            })
        ///Fetching customer number
        axios.post(`${server}/customer/FetchCustNumber`,
            {
                c_id: c_id
            })
            .then(res => {
                console.log(res.data)
                this.setState(
                    {
                        c_number: res.data.c_number,
                        c_name: res.data.c_name,
                        c_email: res.data.c_email
                    }
                )

            }
            ).then(res => { this.calculateTotalPrice() })



    }
////HANDLER TO SHOW THE ADD ADDRESS FIELDS
    handleAddAddress = () => {

        this.setState(
            {
                addaddress: true,
                selectAddress: false
            }
        )
        console.log(this.state)
    }

////fUNCTION TO PULL THE ADDRESS LISTS AFTER ADDING
    pullfreshAddressList = () => {

        axios.post(`${server}/customer/FetchDelAddress`,
            {
                c_id: this.state.c_id

            }
        ).then(res => {
            console.log(res)
            this.setState(
                {
                    addresslist: res.data
                }
            )

        }
        )


    }

///////HANDLER TO SHOW THE Select ADDRESS FIELDS
    handleOnSelectAddress = () => {

        this.setState
            ({
                addaddress: false,
                selectAddress: true
            })

                                  }


  ////Below function hits the order table after address has been selected                                 
   PlaceOrderHandler=async(data)=>

   {
    if(this.state.del_type == "s_both")
    {
       await this.setState(
            {
                del_type:this.state.selected_delivery_type
            }
        )
    }


      console.log(data.s_address)
      console.log("inp")
      let cartData = JSON.parse(sessionStorage.getItem("cartData"))
      console.log(cartData)
      let date = new Date()

      let idate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
   
      var hours = date.getHours()
      var min = date.getMinutes()
      var sec = date.getSeconds()
      var time = hours+":"+min+":"+sec
      console.log(data.s_address)
      axios.post(`${server}/customer/PlaceOrder`,
      {
            
          c_id:this.state.c_id,
          r_id:this.state.r_id,
          d_list:cartData,
          del_type:this.state.del_type,
          del_id:data.s_address,
          o_date:idate,
        o_time: time,
        r_name:this.state.r_name
      }
      )
      .then(res=>
          {
             if(res.data.message == "Successful")
             {
              let values = [{c_id:this.state.c_id,
                r_id:this.state.r_id,
                d_list:cartData,
                del_type:this.state.del_type,
                del_id:data.s_address,
                o_date:idate,
              o_time: time,
              r_name:this.state.r_name}]
                   this.props.placed_order(values)

                this.setState(
                    {
                        open_dialog:true
                    }
                )
                this.props.clearCart()
                sessionStorage.clear() 
             }
          }
          )   
   }

   handleOnclose = ()=>
   {
       this.setState(
           {
               open_dialog:false,
               redirect:true
           }
           )
   }



    calculateTotalPrice = () => 
    {

        let templist = this.state.checkoutList
        console.log(templist)
        let Total_price = 0
        for (let a in templist) {

            Total_price = Total_price + templist[a].d_price
            Total_price = Total_price.toFixed(2)
            Total_price = parseFloat(Total_price)

        }
        this.setState
            (
                {
                    total_price: Total_price
                }
            )

        let cartData = JSON.parse(sessionStorage.getItem("cartData"))
            cartData[0].checkoutprice = Total_price 
            console.log(cartData[0].checkoutprice) 
         
            sessionStorage.setItem("cartData",JSON.stringify(cartData))
            

    }



////Handle add address and pay
    handleAddressSubmit = (e) => {
        // e.preventDefault()
        console.log("Hellow")
        console.log(e)
        console.log("hi")
        let del_id =null
        axios.post(`${server}/customer/AddDeliveryAddress`,
            {

                c_id: this.state.c_id,
                d_add_1: e.d_add_1,
                d_add_2: e.d_add_2,
                d_zipcode: e.d_zipcode

            }
        )
            .then(res => {
                if (res.data.message == "success") {
                    ///Fetching the delivery if after succefull insertion into the table
           
                    del_id = res.data.del_id
            
                    
                 this.PlaceOrderAfterAddressAdd(del_id)
                }
                this.pullfreshAddressList()

            }
            )
            .catch(err => {
                console.log(err)
            }
            )


           

    }

/// Below Function hits the orders table after New Address has been added 

   PlaceOrderAfterAddressAdd = async(del_id)=>
   {
    let cartData = JSON.parse(sessionStorage.getItem("cartData"))
    console.log(cartData)

     
    if(this.state.del_type == "s_both")
    {
       await this.setState(
            {
                del_type:this.state.selected_delivery_type
            }
        )
        this.props.clearCart()
        sessionStorage.clear()
    }
    // else
    // {
    //   await this.setState(
    //       {
    //           del_type:"s_pickup"
    //       }
    //   )
    //   this.props.clearCart()
    //   sessionStorage.clear()


    // }
   let date = new Date()

   let idate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`

   var hours = date.getHours()
   var min = date.getMinutes()
   var sec = date.getSeconds()
   var time = hours+":"+min+":"+sec


    axios.post(`${server}/customer/PlaceOrder`,
    {
          
        c_id:this.state.c_id,
        r_id:this.state.r_id,
        d_list:cartData,
        del_type:this.state.del_type,
        del_id:del_id,
        o_date:idate,
        o_time: time,
        r_name:this.state.r_name
    }
    )
    .then(res=>
        {
           if(res.data.message == "Successful")
           {
            this.setState(
                {
                    open_dialog:true
                }
                
            )

          let values = {    c_id:this.state.c_id,
            r_id:this.state.r_id,
            d_list:cartData,
            del_type:this.state.del_type,
            del_id:del_id,
            o_date:idate,
            o_time: time,
            r_name:this.state.r_name}

            this.props.placed_order(values)
            this.props.clearCart()
            sessionStorage.clear()
           }
        }
        )

   }






    PlaceOrderPickup = async()=>
    {  
        console.log("inp")
        let cartData = JSON.parse(sessionStorage.getItem("cartData"))
        console.log(cartData)
        if(this.state.del_type == "s_both"  && this.state.selected_delivery_type!="")
        {
           await this.setState(
                {
                    del_type:this.state.selected_delivery_type
                }
            )
        }
        else
        {
            await this.setState(
                {
                    del_type:"s_pickup"
                }
            )

        }
        
        let date = new Date()
        let idate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
   
        var hours = date.getHours()
        var min = date.getMinutes()
        var sec = date.getSeconds()
        var time = hours+":"+min+":"+sec
       
      let query = PLACE_ORDER
      
      let variables = {
        cId: this.state.c_id,
        rId: this.state.r_id,
        dList:"test",
        delType:this.state.del_type,
        delId: null,
        oDate: idate,
        oTime: time,
        rName:this.state.r_name,
        oStatus: null
      }

    //   {
              
    //     c_id:this.state.c_id,
    //     r_id:this.state.r_id,
    //     d_list:cartData,
    //     del_type:this.state.del_type,
    //     del_id:null,
    //     o_date:idate,
    //     o_time: time,
    //     r_name:this.state.r_name,
    //     instructions:this.state.instructions
    // }


        axios.post(`${server}/customer/PlaceOrder`, {query,variables})
        .then(res=>
            {
               console.log(res)
               console.log(res.data)
                res = {data:res.data.data.PlacingOrder}
             

               let values = {c_id:this.state.c_id,
                r_id:this.state.r_id,
                d_list:cartData,
                del_type:this.state.del_type,
                del_id:null,
                o_date:idate,
                o_time: time,
                r_name:this.state.r_name}
                this.props.placed_order(values)


                   this.setState(
                       {
                           open_dialog:true
                       }
                   )
                   this.props.clearCart()
                   sessionStorage.clear()
               
            }
            )       

    }

    




    addIteminCart =  async(d_name, d_price, d_id) => {

        let cartData = JSON.parse(sessionStorage.getItem("cartData"))
        let cartvalue = JSON.parse(sessionStorage.getItem("cartValue"))
        cartvalue.value = cartvalue.value + 1
        let chkCart = cartData.filter(item => { return item.d_id == d_id })
        if (chkCart.length > 0) {

            let index = cartData.findIndex((item) => { return item.d_id == d_id })
            cartData[index].d_price = cartData[index].d_price + d_price
            cartData[index].d_quantity = cartData[index].d_quantity + 1
            sessionStorage.setItem("cartValue", JSON.stringify(cartvalue))
            //cartData.push({d_name:d_name,d_price:d_price,d_picture:d_picture})
            sessionStorage.setItem("cartData", JSON.stringify(cartData))

            await this.setState({ checkoutList: cartData })

            this.calculateTotalPrice()
        }


    }

    removeItemfromCart = async (d_name, d_price, d_id) => {
        console.log("hello")
        let cartData = JSON.parse(sessionStorage.getItem("cartData"))
        let index = cartData.findIndex((item) => { return item.d_id == d_id })
        if (index >= 0) {
            let cartvalue = JSON.parse(sessionStorage.getItem("cartValue"))
            cartvalue.value = cartvalue.value - 1
            sessionStorage.setItem("cartValue", JSON.stringify(cartvalue))
            let cartData = JSON.parse(sessionStorage.getItem("cartData"))
            let index = cartData.findIndex((item) => { return item.d_id == d_id })
            cartData[index].d_quantity = cartData[index].d_quantity - 1
            cartData[index].d_price = cartData[index].d_price - d_price
            if (cartData[index].d_quantity <= 0) {
                cartData.splice(index, 1)
                sessionStorage.setItem("cartData", JSON.stringify(cartData))
                await this.setState({ checkoutList: cartData })
                this.calculateTotalPrice()

            }
            else {
                sessionStorage.setItem("cartData", JSON.stringify(cartData))
               await this.setState({ checkoutList: cartData })
                this.calculateTotalPrice()
            }

        }

    }

    handleDeliveryCheck = ()=>
    {
        this.setState(
        {
            selected_delivery_type:"s_delivery"
        })
    }
    handlePickUpCheck = ()=>
    {
         
      this.setState(
        {
            selected_delivery_type:"s_pickup"
        })
    }

    handleAddInstructions = ()=>
    {
        this.setState(
            {
                openAddInstructions:true
            }
        )
    }
    handleOnAddClose = ()=>
    {
        this.setState(
            {
                openAddInstructions:false
            })
    }

    handleAddInstSubmit = (e)=>
       {
          e.preventDefault()  
         console.log(e.target.instructions.value)
         this.setState(
             {
                 instructions:e.target.instructions.value
             }
         )
         let values = {
             instructions:e.target.instructions.value
         }
        this.props.add_Instructions(values)
        this.setState(
            {
                openAddInstructions:false
            })

       }

    render() {
        console.log(this.state)

        const initialValues = {
            d_name: this.state.c_name,
            d_email: this.state.c_email,
            d_number: this.state.c_number
        }
        const initailValues2 = {
            d_add_1: "",
            d_add_2: "",
            d_zipcode: ""

        }
        const ValidationSchemaTwo = Yup.object
        (
           {
            d_add_1:Yup.string("Please enter the address").required("Address line one is required"),
            d_add_2:Yup.string("Please enter the address").required("Address line one is required"),
            d_zipcode:Yup.string("Enter the Zipcode").max(6,"Enter Valid ZipCode").matches(/^[0-9]*$/,"Enter valid Zipcode").min(5,"Enter valid Zipcode").required("Zipcode is required")
        
           }            
        )

        const ValidationSchemaOne = Yup.object(
        {
            d_number:Yup.string().required("Please Enter Contact Number").max(10,"Invalid Phone Number").matches(/^[0-9]*$/,"Enter valid phone number"),
            d_email:Yup.string().email("Please Enter Email in proper format")

        })

        const CartData = {
            d_name: "Hyderabad Dum Biryani",
            d_price: "22$",
            d_quantity: "2"
        }

    if(this.state.redirect == true)
    {
        sessionStorage.setItem("isAuthenticated","true")
        return(<Redirect to ={{pathname:"/CustomerOrder", state:{c_id:this.state.c_id}}}></Redirect>)
    }


        return (
            <div className="container-fluid" style={{ margin: 0, padding: 0 }} >
                <NavbarCust></NavbarCust>
                <div className="container-fluid" style={{ margin: 0, padding: 0 }} >
                    <div className="row" style={{ margin: 0, padding: 0 }} >
                        <div className="col-md-6 " >
                            <div className="container-fluid" style={{ margin: 0, padding: 0 }} >
                                <center><h5>Delivery Checkout</h5></center>
                                <div className="form-floating mb-3">
                                    <Formik initialValues={initialValues}  enableReinitialize validationSchema={ValidationSchemaOne}>

                                        <Form>
                                            <Field name="d_name" type="input" placeholder="Delivery name" className="form-control" style={{ marginBottom: "20px" }}  />

                                            <ErrorMessage name="d_name">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>


                                            <Field name="d_email" type="email" placeholder="Delivery email" className="form-control" style={{ marginBottom: "20px" }}  />

                                            <ErrorMessage name="d_email">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>

                                            <Field className="form-control" type="number" name="d_number" placeholder="Enter phone number" style={{ marginBottom: "20px" }}    >
                                            </Field>
                                            <ErrorMessage name="d_number">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                             
                                            {this.state.del_type=="s_delivery" ||this.state.selected_delivery_type=="s_delivery"?
                                            <center><button className="btn btn-primary" type="button" style={{ marginRight: "100px", width: "170px" }} onClick={this.handleAddAddress} >Add Address</button><button className="btn btn-primary" onClick={this.handleOnSelectAddress}  >Have a previous address?</button></center>
                                            :<center><button className="btn btn-primary" type="button" onClick={this.PlaceOrderPickup}  >Pay and pickup?</button></center>
                                           }
                                        </Form>

                                    </Formik>
                                </div>
                                {/* Add Address Form*/}
                                {this.state.addaddress == true && this.state.del_type!="s_pickup" &&this.state.selected_delivery_type!="s_pickup" ?
                                    <Formik initialValues={initailValues2} onSubmit={(e) => { this.handleAddressSubmit(e) }} enableReinitialize validationSchema={ValidationSchemaTwo} >
                                        <Form >
                                            <Field name="d_add_1" type="input" placeholder="Address line 1" className="form-control" style={{ marginBottom: "20px" }} />
                                            <ErrorMessage name="d_add_1">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                            <Field name="d_add_2" type="input" placeholder="Address line 2" className="form-control" style={{ marginBottom: "20px" }} />
                                            <ErrorMessage name="d_add_2">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                            <Field name="d_zipcode" type="input" placeholder="Enter the zipcode" className="form-control" style={{ marginBottom: "20px" }} />
                                            <ErrorMessage name="d_zipcode">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                            <center>  <button type="submit" className="btn btn-primary">Add Address & place order</button></center>
                                        </Form>
                                    </Formik>
                                    : <div>
                                    </div>
                                }
                                {this.state.selectAddress == true && this.state.del_type!="s_pickup"&&this.state.selected_delivery_type!="s_pickup" ?
                                    <div>
                                        <Formik initialValues={{s_address:""}} onSubmit = {(e)=>{this.PlaceOrderHandler(e)}} enableReinitialize  >
                                            <Form>
                                        <Field style={{ width: "100%", height: "50px" }} as ="select" name="s_address" >
                                            {this.state.addresslist != null ?
                                                this.state.addresslist.map((address, key) => {
                                                    return (<option  value={address._id} style={{ width: "100%", height: "50px" }} >{" " + address.d_add_1 + "," + address.d_add_2 + "," + address.d_zipcode}</option>)
                                                }
                                                ) : <option value="none">No Address Added</option>}
                                        </Field>
                                        <center>  <button className="btn btn-primary" type="submit"  >Place the order</button></center>
                                        
                                        </Form>
                                        </Formik>
                                    </div>
                                    :
                                    <div></div>
                                }



                            </div>
                        </div>



                    



                        <div className="col-md-6">
                            <div className="container-fluid" style={{ margin: 0, padding: 0 }} >
                                <center> <h5>Checkout Cart</h5></center>
                                <div className="col-md-12">
                                    <div className="card ">
                                        <div class="card-body">
                                            <ul className="list-group list-group-flush" style={{ width: "100%" }} >

                                                <li className="list-group-item" style={{ display: "inline-flex" }}>

                                                    <div className="col-md-4" >
                                                        <center> <h5>Item Name</h5></center>
                                                    </div>
                                                    <div className="col-md-3" >
                                                        <center><h5>Price</h5></center>
                                                    </div>
                                                    <div className="col-md-2" >
                                                        <center><h5>Quantity</h5> </center>
                                                    </div>

                                                </li>

                                                {this.state.checkoutList.map((data, key) => {
                                                    return <li className="list-group-item" style={{ display: "inline-flex" }}>

                                                        <div className="col-md-4" >
                                                            <center> <h5>{data.d_name}</h5></center>
                                                        </div>
                                                        <div className="col-md-3" >
                                                            <center><p>{data.d_price}$</p></center>
                                                        </div>
                                                        <div className="col-md-2" >
                                                            <center> <p>{data.d_quantity}</p></center>
                                                        </div>
                                                        <div className="col-md-3"  >


                                                            <Button variant="outlined" size="small" onClick={() => { this.addIteminCart(data.d_name, data.i_price, data.d_id) }} >+</Button>


                                                            <Button variant="outlined" size="small" onClick={() => { this.removeItemfromCart(data.d_name, data.i_price, data.d_id) }}   >-</Button>


                                                        </div>

                                                    </li>
                                                })
                                                }
                                   
                                            </ul>
                                            <div className="col-md-12" style={{ display: "inline-flex", backgroundColor: "lightgrey" }} >
                                                <div className="col-md-4">
                                                    <center><h5>Checkout Price :</h5></center>
                                                </div>
                                                <div className="col-md-3"  >
                                                    <center>  <h5>{this.state.total_price}$</h5> </center>
                                                </div>
                                                <div className="col-md-5">
                                                  <button style={{marginLeft:"92px",height:"35px"}} onClick={this.handleAddInstructions} className="btn btn-primary">Add Instructions</button> 
                                                 </div>   
                                            </div>
                                            {this.state.del_type == "s_both"?
                                            <div className="col-md-12" style={{paddingTop:"15px"}} >
                                               <center>
                                                  
                                              <input type = "radio" id = "delivery" name = "Delivery_type" value = "s_delivery"  onClick={this.handleDeliveryCheck}></input>
                                              <label for="delivery">Delivery</label> 
                                              
                                              <input type = "radio" name = "Delivery_type"  id = "pickup" value = "s_pickup" onClick={this.handlePickUpCheck} ></input>
                                              <label for="pickup">Pickup</label>

                                               </center>
                   
                                            </div>:""
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {this.state.open_dialog == true?
                 <Dialog open={this.state.open_dialog} onClose={this.handleOnclose} fullWidth={true} >
                  <DialogTitle>
                     <center><h4> Order Status</h4></center>
                   </DialogTitle>      
                 <DialogContent>
                    <center> <h5>Order Placed Successfully</h5></center>                              

                 </DialogContent>
                 </Dialog>:""
                   }

                </div>
                {this.state.openAddInstructions == true?<div>
                 <Dialog open={this.state.openAddInstructions}  onClose={this.handleOnAddClose} fullWidth={true}  >
                 <DialogTitle>
                 <center> <h5>Add your instructions</h5></center>
                 </DialogTitle>
                 <DialogContent>
                    <center>
                        <form onSubmit={e=>{this.handleAddInstSubmit(e)}} >
                        <textarea name="instructions" style={{width:"100%"}}></textarea>
                         <button className="btn btn-primary" type="submit" >Add instructions</button> 
                        </form>
                    </center>                              

                 </DialogContent>
                 </Dialog>
                </div>:""

                }
            </div>
        )
    }
}

export default   connect(Checkout.mapStateToProps,Checkout.mapDispatchtoProps)(Checkout)