import React, { Component } from 'react'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik"
import { getImageListItemBarUtilityClass } from '@mui/material';
import axios from 'axios'
import { Button } from '@material-ui/core';
import { StylesContext } from '@material-ui/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ColorToggleButton from './ExportToggleButton';


export default class Checkout extends Component {


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
            del_type:""
        }
    }

    componentDidMount(props) {

        // const checkoutList = this.props.location.state.checkoutList
        const c_id = this.props.location.state.c_id
        console.log(this.props.location.state.del_type)
        let checkoutList = JSON.parse(sessionStorage.getItem("cartData"))

        console.log(this.state.c_id)
        console.log(c_id)
        console.log(checkoutList)
        this.setState(
            {
                checkoutList: checkoutList,
                c_id: c_id,
                del_type: this.props.location.state.del_type
            }
        )
        //Fetching delivery address     
        axios.post("http://localhost:3030/customer/FetchDelAddress",
            {
                c_id: c_id

            }
        )
            .then(res => {



                this.setState(
                    {
                        addresslist: res.data
                    }
                )


            })
        ///Fetching customer number
        axios.post("http://localhost:3030/customer/FetchCustNumber",
            {
                c_id: c_id
            })
            .then(res => {
                console.log(res.data[0].c_number)
                this.setState(
                    {
                        c_number: res.data[0].c_number,
                        c_name: res.data[0].c_name,
                        c_email: res.data[0].c_email
                    }
                )

            }
            ).then(res => { this.calculateTotalPrice() })



    }

    handleAddAddress = () => {

        this.setState(
            {
                addaddress: true,
                selectAddress: false
            }
        )
        console.log(this.state)
    }


    pullfreshAddressList = () => {

        axios.post("http://localhost:3030/customer/FetchDelAddress",
            {
                c_id: this.state.c_id

            }
        ).then(res => {
            this.setState(
                {
                    addresslist: res.data
                }
            )

        }
        )


    }


    handleOnSelectAddress = () => {

        this.setState
            ({
                addaddress: false,
                selectAddress: true
            })

                                  }

    calculateTotalPrice = () => {

        let templist = this.state.checkoutList
        console.log(templist)
        let Total_price = 0
        for (let a in templist) {

            Total_price = Total_price + templist[a].d_price

        }
        this.setState
            (
                {
                    total_price: Total_price
                }
            )


    }




    handleAddressSubmit = (e) => {
        // e.preventDefault()
        console.log(e)
        console.log("hi")






        axios.post("http://localhost:3030/customer/AddDeliveryAddress",
            {

                c_id: this.state.c_id,
                d_add_1: e.d_add_1,
                d_add_2: e.d_add_2,
                d_zipcode: e.d_zipcode

            }
        )
            .then(res => {
                if (res.data.message == "success") {
                    alert("Address added Succesfully")
                }
                this.pullfreshAddressList()

            }
            )
            .catch(err => {
                console.log(err)
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


    render() {

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
        const CartData = {
            d_name: "Hyderabad Dum Biryani",
            d_price: "22$",
            d_quantity: "2"
        }

        return (
            <div>
                <div className="container-fluid" style={{ margin: 0, padding: 0 }} >
                    <div className="row">
                        <div className="col-md-6 " >
                            <div className="container-fluid" style={{ margin: 0, padding: 0 }} >
                                <center><h5>Delivery Checkout</h5></center>
                                <div className="form-floating mb-3">
                                    <Formik initialValues={initialValues}>

                                        <Form>

                                            {/* <label for = "d_name">Delivered to</label> */}
                                            <Field name="d_name" type="input" placeholder="Delivery name" className="form-control" style={{ marginBottom: "20px" }} value={this.state.c_name} />
                                            <Field name="d_email" type="email" placeholder="Delivery email" className="form-control" style={{ marginBottom: "20px" }} value={this.state.c_email} />
                                            <Field className="form-control" type="number" name="d_number" placeholder="Enter phone number" style={{ marginBottom: "20px" }} value={this.state.c_number}    >
                                            </Field>
                                             
                                            {this.state.del_type=="s_delivery" ||this.state.selected_delivery_type=="s_delivery"?
                                            <center><button className="btn btn-primary" style={{ marginRight: "100px", width: "170px" }} onClick={this.handleAddAddress} >Add Address</button><button className="btn btn-primary" onClick={this.handleOnSelectAddress}  >Have a previous address?</button></center>
                                            :<center><button className="btn btn-primary">Pay and pickup?</button></center>
                                           }
                                        </Form>

                                    </Formik>
                                </div>
                                {/* Add Address Form*/}
                                {this.state.addaddress == true && this.state.del_type!="s_pickup" &&this.state.selected_delivery_type!="s_pickup" ?
                                    <Formik initialValues={initailValues2} onSubmit={(e) => { this.handleAddressSubmit(e) }}  >
                                        <Form >
                                            <Field name="d_add_1" type="input" placeholder="Address line 1" className="form-control" style={{ marginBottom: "20px" }} />
                                            <Field name="d_add_2" type="input" placeholder="Address line 2" className="form-control" style={{ marginBottom: "20px" }} />
                                            <Field name="d_zipcode" type="input" placeholder="d_zipcode" className="form-control" style={{ marginBottom: "20px" }} />
                                            <center>  <button type="submit" className="btn btn-primary">Add Address & place order</button></center>
                                        </Form>
                                    </Formik>
                                    : <div>
                                    </div>
                                }
                                {this.state.selectAddress == true && this.state.del_type!="s_pickup"&&this.state.selected_delivery_type!="s_pickup" ?
                                    <div>
                                        <select style={{ width: "100%", height: "50px" }}>
                                            {this.state.addresslist != null ?
                                                this.state.addresslist.map((address, key) => {
                                                    return (<option value={address} style={{ width: "100%", height: "50px" }} >{" " + address.d_add_1 + "," + address.d_add_2 + "," + address.d_zipcode}</option>)
                                                }
                                                ) : <option value="none">No Address Added</option>}
                                        </select>
                                        <center>  <button className="btn btn-primary" >Place the order</button></center>
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
                                                {/* <li class="list-group-item"></li>
                                        <li class="list-group-item"></li> */}
                                            </ul>
                                            <div className="col-md-12" style={{ display: "inline-flex", backgroundColor: "lightgrey" }} >
                                                <div className="col-md-4">
                                                    <center><h5>Checkout Price :</h5></center>
                                                </div>
                                                <div className="col-md-3"  >
                                                    <center>  <h5>{this.state.total_price}$</h5> </center>
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


                </div>
            </div>
        )
    }
}
