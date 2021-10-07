import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import RestaurantIcon from '@material-ui/icons/Restaurant';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import "./Uber.css";
import sideBarList from "../SideBarList"
import ImageGallery from 'react-image-gallery';
import dishlist from './Itemslist';
import { StylesContext } from '@material-ui/styles';
import axios from 'axios'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import KitchenIcon from '@mui/icons-material/Kitchen';
import ElectricBikeIcon from '@mui/icons-material/ElectricBike';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CustomizedDialogs from './DialogBox'

import { margin } from '@mui/system';
import { connect } from 'react-redux'
import shopReducer from '../../Redux/Shopping/Shop-reducer';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useHistory } from "react-router-dom";

import Customerinit from '../CustomerComponents/Customerinit';
import NavbarRest from './RestaurantNavBar';




export class RestaurantLanding extends Component {



    constructor(props) {
        super(props)


        this.handleAddToCartClick = this.handleAddToCartClick.bind(this)

        this.state = {
            r_name: "",
            r_id: "",
            dishlist: [],
            r_picture: "",
            r_description: "Please Update your Profile ",
            view_id: "",
            cartnumber: 0,
            c_id: "",
            del_type: "",
            NewOrderDialog: false,
            CreateNewOrder: false,
            r_opentime: "",
            r_closetime: "",
            r_number: "",
            r_address: "",
            r_email: ""
        }
    }




    componentDidMount(props) {
        ///Calling the res_reg table and fetching the details through below request
        console.log("in mount")
        if (this.props.location.state.view_id == "Customer") {


            this.setState(
                {
                    view_id: this.props.location.state.view_id,
                    c_id: this.props.location.state.c_id
                }
            )
            if (JSON.parse(sessionStorage.getItem("cartValue")) != null && JSON.parse(sessionStorage.getItem("cartValue")).value > 0) {


                this.setState(

                    {
                        cartnumber: JSON.parse(sessionStorage.getItem("cartValue")).value

                    }

                )
            }



        }
        axios.get(`http://localhost:3030/Restaurant/details/${this.props.location.state.r_email}`)
            .then(
                res => {
                    //Setting the name of the restaurant after successfully fetching the data
                    let cartData = JSON.parse(sessionStorage.getItem("cartData"))
                    let seshstorage_rid = 0
                    if (cartData != null && cartData != undefined) {
                        console.log(seshstorage_rid)
                        console.log(cartData[0].r_id)
                        seshstorage_rid = cartData[0].r_id
                    } else 
                    {
                      
                        seshstorage_rid = res.data.r_id
                    }

                   console.log(seshstorage_rid) 
                   console.log(res.data.r_id)
                    if (seshstorage_rid == res.data.r_id) {
                        console.log(res.data)
                        this.setState(
                            {
                                r_name: res.data.r_name == 0 || null ? "Please update your profile" : res.data.r_name,
                                r_id: res.data.r_id,
                                r_picture: res.data.r_picture == null ? "data:image/png;base64,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" : res.data.r_picture,
                                r_description: res.data.r_description == 0 || null ? "Please update your profile" : res.data.r_description,
                                del_type: res.data.del_type,
                                r_opentime: res.data.r_opentime,
                                r_closetime: res.data.r_closetime,
                                r_number: res.data.r_number,
                                r_address: res.data.r_address,
                                r_email: res.data.r_email

                            }
                        )
                    }
                    else {
                        this.setState(
                            {
                                NewOrderDialog: true
                            }
                        )
                    }
                })
            ///Fetching Dish data after r_id has been set
            .then(res => {
                axios.post("http://localhost:3030/Restaurant/GetDish",
                    {
                        r_id: this.state.r_id
                    }
                    //Dish data gets collected in below then function
                ).then(
                    res => {

                        this.setState(
                            {
                                dishlist: [...(res.data)]
                            }
                        )
                        // console.log(this.state.dishlist[0])
                    }
                )

            }

            )


    }
    handleRemoveFromCartClick = async (e, d_name, d_price, d_picture, d_id) => {

        e.preventDefault()


        let cartData = JSON.parse(sessionStorage.getItem("cartData"))
        let index = cartData.findIndex((item) => { return item.d_id == d_id })

        if (this.state.cartnumber != 0 && index >= 0) {
            await this.setState(
                {
                    cartnumber: this.state.cartnumber - 1
                }
            )
            let cartvalue = JSON.parse(sessionStorage.getItem("cartValue"))
            cartvalue.value = cartvalue.value - 1
            sessionStorage.setItem("cartValue", JSON.stringify(cartvalue))
            let cartData = JSON.parse(sessionStorage.getItem("cartData"))
            let index = cartData.findIndex((item) => { return item.d_id == d_id })
            if (index >= 0) {
                cartData[index].d_quantity = cartData[index].d_quantity - 1

                cartData[index].d_price = cartData[index].d_price - d_price
                if (cartData[index].d_quantity <= 0) {
                    cartData.splice(index, 1)
                    sessionStorage.setItem("cartData", JSON.stringify(cartData))
                }
                else {
                    sessionStorage.setItem("cartData", JSON.stringify(cartData))
                }


            }

        }


        console.log(this.state.cartnumber)


    }




    handleAddToCartClick = async (e, d_name, d_price, d_picture, d_id) => {


        let i_price = d_price
        e.preventDefault()
        console.log("Before enter" + this.state.cartnumber)
        if (this.state.cartnumber == 0) {
            console.log("in side")
            await this.setState
                (
                    {
                        cartnumber: 1
                    }
                )
        }

        ////IF CART VALUE IS NULL INITIALIZE IT TO ONE ON FIRST CLICK
        let cartvalue = JSON.parse(sessionStorage.getItem("cartValue"))
        if (cartvalue == null) {
            sessionStorage.setItem("cartValue", JSON.stringify({
                value: 1
            }))

            // this.setState(
            //     {
            //         cartnumber:1
            //     }
            //     )


        } else {
            cartvalue.value = cartvalue.value + 1
            sessionStorage.setItem("cartValue", JSON.stringify(cartvalue))
            await this.setState(
                {
                    cartnumber: cartvalue.value
                }
            )
        }



        console.log(this.state.c_id)
        console.log(e)
        console.log(d_name)
        console.log(d_price)



        let cartItems = [{ d_name: d_name, d_price: d_price, d_picture: d_picture, d_quantity: 1, d_id: d_id, r_id: this.state.r_id, c_id: this.state.c_id, i_price: d_price }]

        let cartData = JSON.parse(sessionStorage.getItem("cartData"))
        //  console.log(cartData)
        if (cartData == null) {

            sessionStorage.setItem("cartData", JSON.stringify(cartItems))

        }
        else {

            cartData = JSON.parse(sessionStorage.getItem("cartData"))

            let chkCart = cartData.filter(item => { return item.d_id == d_id })

            if (chkCart.length > 0) {

                let index = cartData.findIndex((item) => { return item.d_id == d_id })
                cartData[index].d_price = cartData[index].d_price + d_price
                cartData[index].d_quantity = cartData[index].d_quantity + 1
                //cartData.push({d_name:d_name,d_price:d_price,d_picture:d_picture})
                sessionStorage.setItem("cartData", JSON.stringify(cartData))
            }
            else {
                cartData.push({ d_name: d_name, d_price: d_price, d_picture: d_picture, d_quantity: 1, d_id: d_id, r_id: this.state.r_id, c_id: this.state.c_id, i_price: i_price })
                sessionStorage.setItem("cartData", JSON.stringify(cartData))
            }

        }
        console.log(this.state.cartnumber)
    }


    handleOnclose = () => {
        this.setState(
            {
                NewOrderDialog: false
            })
    }
    createnewOrderFromPopUp = () => {
        sessionStorage.clear()
        sessionStorage.setItem("isAuthenticated","True")
        this.setState({
            createnewOrderFromPopUp: true,
            NewOrderDialog: false
        })
        window.location.reload()
    }

    processPreviousOrder = () => {
        this.props.history.goBack();
    }


    render() {
        console.log(this.state)
        return (
            <div className="container-fluid" style={{ margin: 0, padding: 0 }}>
                <NavbarRest></NavbarRest>
                {/* <h1>{this.props.location.state.message}</h1>  */}
                <div className="container-fluid" style={{ margin: 0, padding: 0 }}>
                    <div className="row" style={{ margin: 0, padding: 0 }} >
                        {/* Code for the side bar */}
                        <div className="col-md-1" style={{ padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>


                            <ProSidebar image="" style={{ height: "1000px", width: "100%" }} collapsed={true} >
                                <Menu iconShape="circle" style={{ marginTop: "400px" }}>

                                    {this.state.view_id == "Customer" ? <div></div> : <SubMenu icon={<ElectricBikeIcon />} >
                                        <MenuItem icon={<RestaurantIcon />}>Profile <Link to={{ pathname: "/RestProfile", state: { r_id: this.state.r_id, r_name: this.state.r_name } }} /></MenuItem>
                                        <MenuItem icon={<FastfoodIcon />}>Orders<Link to={{ pathname: "/RestaurantOrders", state: { r_id: this.state.r_id, r_name: this.state.r_name } }} /></MenuItem>
                                        <MenuItem icon={<KitchenIcon />}>Add Dishes<Link to={{ pathname: "/AddDishes", state: { r_id: this.state.r_id, r_name: this.state.r_name } }} />   </MenuItem>

                                        <MenuItem >Log Out<Link to={"/"} /></MenuItem>
                                    </SubMenu>}

                                    {this.state.view_id == "Customer" ? <MenuItem style={{ marginRight: "22px" }}><center> <CustomizedDialogs del_type={this.state.del_type} r_name={this.state.r_name}></CustomizedDialogs><p>{this.state.cartnumber}</p></center  > </MenuItem> : <div></div>}
                                </Menu>
                            </ProSidebar>

                        </div>
                        {/* Code for the restaurant picture carousel */}
                        <div className="col-md-11" style={{ padding: 0 }} >
                            <div className="conatiner-fluid" style={{ margin: 0, padding: 0 }} >
                                <div className="row border-bottom" style={{ height: '357px', width: '100%' }}>
                                    {/* <center><h1>{this.state.r_name}</h1></center> */}
                                    {/* <center> < ImageGallery items={images} /></center> */}
                                    <center><img src={this.state.r_picture} style={{ width: "102%", height: "357px" }} /></center>
                                </div>
                                <div className="row" style={{ margin: 0, padding: 0, height: "200px" }}>
                                    <div className="row" style={{ margin: 0, padding: 0 }}>
                                        <div className="col-md-12"  >
                                            {/* <div className ="row" style ={{height: '700px'}}> */}

                                            <center><h1>{this.state.r_name}</h1></center>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <center><div className="col-md-4">
                                            <center><h5>{this.state.r_description}</h5></center>
                                        </div></center>
                                    </div>
                                    <div className="row">

                                        <div className="col-md-6">  
                                            <h5>Opening Time:{this.state.r_opentime}</h5>
                                        </div>

                                        <div className="col-md-6" style={{ textAlign: "right" }}>
                                            <h5>Phone Number:{this.state.r_number}</h5>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5>Closing  Time:{this.state.r_closetime}</h5>
                                        </div>
                                        <div className="col-md-6" style={{ textAlign: "right" }}>
                                            <h5>Email:{this.state.r_email}</h5>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h5>Located at:{this.state.r_address}</h5>
                                        </div>
                                    </div>


                                 

                                </div>
                              

                                <div className="row flex-row flex-nowrap overflow-auto" style={{ margin: 0, padding: 0 }}>
                                    {this.state.dishlist.map((dish, index) => {
                                        return <div className="col-3 " style={{ marginRight: "100px" }} >
                                            <div className="card card-block mx-2" style={{ width: '20rem' }}>
                                                <img style={{ width: '100%', height: '200px' }} class="card-img-top" src={dish.d_picture} />
                                                <div className="card-body">
                                                    <form  >
                                                        <h5 className="card-title" name="name" id="name" value={dish.d_name} >{dish.d_name}</h5>

                                                        <p className="card-text" name="description" id="description">{dish.d_description}</p>
                                                        <h5 className="card-text" name="price" id="price">{dish.d_price}$</h5>
                                                        <h5 className="card-text" name="category" id="category">{dish.d_category}</h5>
                                                        <center>  {this.state.view_id == "Customer" ? <div><button type="submit" name="AddCart" className="btn btn-primary" onClick={(e) => this.handleAddToCartClick(e, dish.d_name, dish.d_price, dish.d_picture, dish.d_id)} >+</button><button name="AddCart" className="btn btn-primary" onClick={(e) => this.handleRemoveFromCartClick(e, dish.d_name, dish.d_price, dish.d_picture, dish.d_id)} >-</button></div> :
                                                            <Link className="btn btn-primary" to={{
                                                                pathname: "/Editdish", state: {
                                                                    r_id: this.state.r_id, d_id: dish.d_id, d_name: dish.d_name, d_picture: dish.d_picture, d_description: dish.d_description
                                                                    , d_price: dish.d_price, d_category: dish.d_category
                                                                }
                                                            }} >Edit dish</Link>
                                                        }</center>
                                                    </form>
                                                </div>

                                            </div>

                                        </div>
                                    }
                                    )}

                                </div>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.NewOrderDialog == true ? <div>
                    <Dialog open={this.state.NewOrderDialog} onClose={this.handleOnclose} fullWidth={true}>
                        <DialogTitle>

                        </DialogTitle>
                        <DialogContent>
                            <center><h5>Do You want to drop the contents of the previous Order and Create a new one?</h5></center>
                            <center>
                                <button className="btn btn-primary" style={{ marginRight: "75px" }} onClick={this.createnewOrderFromPopUp} >Create New Order</button>
                                <button className="btn btn-primary" onClick={this.processPreviousOrder}  >Process Previous Order?</button>
                            </center>

                        </DialogContent>
                    </Dialog>
                </div> :
                    <div>

                    </div>
                }




            </div>
        )
    }
}

export default RestaurantLanding
