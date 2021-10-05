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
import {connect } from 'react-redux'
import shopReducer from '../../Redux/Shopping/Shop-reducer';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {useHistory} from "react-router-dom";

import Customerinit from '../CustomerComponents/Customerinit';
import NavbarRest from './RestaurantNavBar';




export class RestaurantLanding extends Component {



    constructor(props) {
        super(props)


        this.handleAddToCartClick = this.handleAddToCartClick.bind(this)

        this.state = {
            r_name: "",
            r_id: "",
            dishlist :[],
            r_picture :"",
            r_description: "",
            view_id:"",
            cartnumber:0,
            c_id:"",
            del_type:"",
            NewOrderDialog:false,
            CreateNewOrder:false
        }
    }

  


    componentDidMount(props) {
        ///Calling the res_reg table and fetching the details through below request
        console.log("in mount")
        if(this.props.location.state.view_id =="Customer")
      {

     
       this.setState(
           {
               view_id:this.props.location.state.view_id,
               c_id:this.props.location.state.c_id
           }
       )
       if(JSON.parse(sessionStorage.getItem("cartValue"))!=null && JSON.parse(sessionStorage.getItem("cartValue")).value>0  )
       {

    
          this.setState(
              
                   {
                         cartnumber:JSON.parse(sessionStorage.getItem("cartValue")).value
 
                   }
        
          )
       }



        }
        axios.get(`http://localhost:3030/Restaurant/details/${this.props.location.state.r_email}`)
            .then(
                res => {
                    //Setting the name of the restaurant after successfully fetching the data
                    let cartData = JSON.parse(sessionStorage.getItem("cartData"))
                    let seshstorage_rid=0
                    if(cartData!=null && cartData!=undefined)
                    {
                    seshstorage_rid=cartData.r_id 
                    }else
                    {
                        seshstorage_rid = res.data.r_id
                    }

                console.log("hello")
                      

                    if (seshstorage_rid ==res.data.r_id)
                    {
                    this.setState(
                        {
                            r_name: res.data.r_name == 0|| null ?"Please update your profile":res.data.r_name,
                            r_id: res.data.r_id,
                            r_picture : res.data.r_picture == null ?"http://prcagrimex.co.th/en/wp-content/uploads/2014/04/dummy-image-green-e1398449160839.jpg":res.data.r_picture,
                            r_description :res.data.r_description== 0|| null ?"Please update your profile":res.data.r_description,
                            del_type:res.data.del_type
                            
                        }
                    )
                    }
                    else
                    {
                        this.setState(
                            {
                                 NewOrderDialog:true
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
                                dishlist :[...(res.data)]
                            }
                        )
                        // console.log(this.state.dishlist[0])
                    }
                )

            }

            )

   
    }
    handleRemoveFromCartClick = async(e,d_name,d_price,d_picture,d_id)=>
    { 

        e.preventDefault()
    
       
        let cartData = JSON.parse(sessionStorage.getItem("cartData"))
        let index = cartData.findIndex( (item)=>{return item.d_id == d_id})

        if(this.state.cartnumber!=0 && index>=0)
        {
       await this.setState(
            {
                cartnumber:this.state.cartnumber-1
            }
            )
            let cartvalue = JSON.parse(sessionStorage.getItem("cartValue"))
            cartvalue.value = cartvalue.value-1
            sessionStorage.setItem("cartValue",JSON.stringify(cartvalue))
            let cartData = JSON.parse(sessionStorage.getItem("cartData"))
            let index = cartData.findIndex( (item)=>{return item.d_id == d_id}  )
            if(index>=0)
            {
                cartData[index].d_quantity = cartData[index].d_quantity - 1 
                         
                cartData[index].d_price = cartData[index].d_price - d_price 
                if(cartData[index].d_quantity <=0)
                {   
                    cartData.splice(index,1)
                    sessionStorage.setItem("cartData",JSON.stringify(cartData))
                }     
                else
                {
                sessionStorage.setItem("cartData",JSON.stringify(cartData))
                 }
                

            }

        }
        
    
     console.log(this.state.cartnumber)


    }




    handleAddToCartClick = async(e,d_name,d_price,d_picture,d_id)=>
    {
    

        let i_price = d_price
     e.preventDefault()
       console.log("Before enter" + this.state.cartnumber)
       if(this.state.cartnumber == 0)
       {  console.log("in side")
          await this.setState
           (
               {
                   cartnumber:1
               }
           )
       }
 
////IF CART VALUE IS NULL INITIALIZE IT TO ONE ON FIRST CLICK
       let cartvalue = JSON.parse(sessionStorage.getItem("cartValue"))
       if(cartvalue == null)
       {
        sessionStorage.setItem("cartValue",JSON.stringify({
            value:1
        })) 
        
        // this.setState(
        //     {
        //         cartnumber:1
        //     }
        //     )


       }else
       {
           cartvalue.value = cartvalue.value+1
           sessionStorage.setItem("cartValue",JSON.stringify(cartvalue))
         await  this.setState(
            {
                cartnumber:cartvalue.value
            }
            )
       }


    
    console.log(this.state.c_id)
    console.log(e)
    console.log(d_name)
    console.log(d_price)
         


    let cartItems = [{d_name:d_name,d_price:d_price,d_picture:d_picture,d_quantity:1,d_id:d_id,r_id:this.state.r_id,c_id:this.state.c_id,i_price:d_price}]

     let cartData = JSON.parse(sessionStorage.getItem("cartData"))
    //  console.log(cartData)
     if(cartData == null)
     {

      sessionStorage.setItem("cartData",JSON.stringify(cartItems))

     }
     else
     {

     cartData = JSON.parse(sessionStorage.getItem("cartData"))
     
     let chkCart = cartData.filter( item =>{ return item.d_id == d_id })
     
     if(chkCart.length >0)
     {

      let index = cartData.findIndex( (item)=>{return item.d_id ==d_id}  )
      cartData[index].d_price = cartData[index].d_price + d_price 
      cartData[index].d_quantity = cartData[index].d_quantity + 1
    //cartData.push({d_name:d_name,d_price:d_price,d_picture:d_picture})
      sessionStorage.setItem("cartData",JSON.stringify(cartData))
     }
     else
     {
     cartData.push({d_name:d_name,d_price:d_price,d_picture:d_picture,d_quantity:1,d_id:d_id,r_id:this.state.r_id,c_id:this.state.c_id,i_price:i_price})
     sessionStorage.setItem("cartData",JSON.stringify(cartData))
     }

     }
     console.log(this.state.cartnumber)
    }


    handleOnclose = ()=>
    {
        this.setState(
            {
                NewOrderDialog:false
            })
    }
   createnewOrderFromPopUp = () =>
   {
       sessionStorage.clear()
       this.setState({
           createnewOrderFromPopUp:true,
           NewOrderDialog:false
       })
       window.location.reload()
   }

   processPreviousOrder = ()=>
   {
    this.props.history.goBack();
   }


    render() {
        console.log(this.state)
        return (
            <div  className="container-fluid" style={{ margin: 0, padding: 0 }}>
              <NavbarRest></NavbarRest>
                    {/* <h1>{this.props.location.state.message}</h1>  */}
                    <div className="container-fluid" style={{ margin: 0, padding: 0 }}>
                        <div className="row"  style={{ margin: 0, padding: 0 }} >
                            {/* Code for the side bar */}
                            <div className="col-md-1" style={{ padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                               
                               
                        <ProSidebar image="" style={{ height: "1000px",width:"100%" }} collapsed = {true} >
                            <Menu iconShape="circle" style={{marginTop:"250px"}}>

                            {this.state.view_id == "Customer"?<div></div>:<SubMenu icon={<ElectricBikeIcon/>} >
                                <MenuItem icon ={<RestaurantIcon/>}>Profile <Link to={ {pathname:"/RestProfile",state :{r_id:this.state.r_id,r_name: this.state.r_name}}}/></MenuItem>
                                    <MenuItem icon = {<FastfoodIcon/>}>Orders<Link to={ {pathname:"/RestaurantOrders",state :{r_id:this.state.r_id,r_name: this.state.r_name}}}/></MenuItem>
                                    <MenuItem  icon = {<KitchenIcon/>}>Add Dishes<Link to={ {pathname:"/AddDishes",state :{r_id:this.state.r_id,r_name: this.state.r_name}}}/>   </MenuItem>
                                    
                                    <MenuItem >Log Out<Link to= {"/"} /></MenuItem>
                                </SubMenu>}
                                
                                {this.state.view_id == "Customer"?<MenuItem style={{marginRight : "22px"}}><center> <CustomizedDialogs del_type={this.state.del_type} r_name = {this.state.r_name}></CustomizedDialogs><p>{this.state.cartnumber}</p></center  > </MenuItem>:<div></div>}
                            </Menu>
                        </ProSidebar>
                               
                            </div>
                            {/* Code for the restaurant picture carousel */}
                            <div className="col-md-11" style={{ padding: 0 }} >
                                <div className="conatiner-fluid" style={{ margin: 0, padding: 0 }} >
                                    <div className="row border-bottom" style={{ height: '357px', width: '100%'}}>
                                        {/* <center><h1>{this.state.r_name}</h1></center> */}
                                        {/* <center> < ImageGallery items={images} /></center> */}
                                          <center><img src ={this.state.r_picture} style={{width : "102%",height :"357px"}}/></center> 
                                    </div>
                                    {/* <div className = "row"> */}
                                    <div className ="col-md-12" style ={{paddingBottom :"20px"}} >   
                                    {/* <div className ="row" style ={{height: '700px'}}> */}
                                    
                                   <center><h1>{this.state.r_name}</h1></center>
                                   
                                    <div className ="col-md-12" style ={{paddingBottom :"50px"}} >   
                                 
                                   <center><h5>{this.state.r_description}</h5></center>
                                   
                                   </div>
                                    </div>
                                    {/* <center> <h1>Restaurant items</h1></center> */}
                                    {/* </div> */}
                                    {/*Code for the restaurant item boxes  */}
                                    <div className="row flex-row flex-nowrap overflow-auto" style={{ margin: 0, padding: 0 }}>
                                        {this.state.dishlist.map((dish, index) => {
                                            return <div className="col-3 " style={{ marginRight:"100px"}} >
                                                <div className="card card-block mx-2" style={{ width: '20rem' }}>
                                                    <img style={{ width: '100%', height: '200px' }} class="card-img-top" src={dish.d_picture} />
                                                    <div className="card-body">
                                                        <form  >
                                                        <h5 className="card-title" name="name" id="name" value = {dish.d_name} >{dish.d_name}</h5>
              
                                                        <p className="card-text" name="description" id="description">{dish.d_description}</p>
                                                        <h5 className="card-text" name="price" id="price">{dish.d_price}$</h5>
                                                        <h5 className="card-text" name="category" id="category">{dish.d_category}</h5>
                                                      <center>  {this.state.view_id =="Customer"?<div><button type="submit" name = "AddCart" className="btn btn-primary" onClick={(e)=>this.handleAddToCartClick(e,dish.d_name,dish.d_price,dish.d_picture,dish.d_id)} >+</button><button name = "AddCart" className="btn btn-primary" onClick={(e)=>this.handleRemoveFromCartClick(e,dish.d_name,dish.d_price,dish.d_picture,dish.d_id)} >-</button></div>:
                                                            <Link className="btn btn-primary" to={{pathname : "/Editdish",state :{r_id:this.state.r_id,d_id:dish.d_id,d_name:dish.d_name,d_picture :dish.d_picture,d_description:dish.d_description
                                                        ,d_price:dish.d_price,d_category:dish.d_category}}} >Edit dish</Link>
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
                {this.state.NewOrderDialog == true?<div>
                    <Dialog  open={this.state.NewOrderDialog} onClose={this.handleOnclose} fullWidth={true}>
                     <DialogTitle>
                            
                     </DialogTitle>
                     <DialogContent>
                     <center><h5>Do You want to drop the contents of the previous Order and Create a new one?</h5></center>
                     <center>
                         <button className="btn btn-primary" style={{marginRight:"75px"}} onClick={this.createnewOrderFromPopUp} >Create New Order</button>
                         <button className="btn btn-primary"  onClick={this.processPreviousOrder}  >Process Previous Order?</button>
                    </center>
                     
                     </DialogContent>
                    </Dialog>
                </div>:
                <div>
                      
                </div>
                }


                

            </div>
        )
    }
}

export default RestaurantLanding
