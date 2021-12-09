import { Link, NavLink } from "react-router-dom";
import { StylesContext } from '@material-ui/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { store } from "../../Redux/Store";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import { addCart } from '../../Redux/CartReducerfile/Cartactions';
import { removeCart } from '../../Redux/CartReducerfile/Cartactions';
import { clearCart } from '../../Redux/CartReducerfile/Cartactions';
import  { connect,addDelType} from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import React from "react";




let cartval =""
let r_name = ""
let del_type = ""
const subscriber=store.subscribe(()=>{
    console.log(store.getState().cart.c_number)

        cartval=store.getState().cart.c_number
        r_name = store.getState().cart.r_name
        del_type = store.getState().cart.del_type

})


function handleOnclick(e)
{console.log(e)
 return (<div>
        
 </div>)
}





const NavbarCustland = (props) =>
{
    const [open, setOpen] = React.useState(false);
    
    let checkoutListretreived = JSON.parse(sessionStorage.getItem("cartData"))
    console.log(checkoutListretreived)
    const [checkoutList, setcheckoutList] = React.useState(checkoutListretreived);
    
    const[total_price,setTotalPrice] = React.useState(0)
    const dispatch = useDispatch()
    console.log(props.c_id)


    const handleClickToOpen = () => {
        setOpen(true);
        calculateTotalPrice()
        // handlepriceCalculation()
      };

      const handleToClose = () => {
        setOpen(false);
      };
      
    const handleUpdateCart = (cartData) =>{
        setcheckoutList(cartData)
    }  


    const  addIteminCart =  async(d_name, d_price, d_id) => {

        let cartData = JSON.parse(sessionStorage.getItem("cartData"))
        let cartvalue = JSON.parse(sessionStorage.getItem("cartValue"))
        cartvalue.value = cartvalue.value + 1
        dispatch(addCart())
        let chkCart = cartData.filter(item => { return item.d_id == d_id })
        if (chkCart.length > 0) {

            let index = cartData.findIndex((item) => { return item.d_id == d_id })
            cartData[index].d_price = cartData[index].d_price + d_price
            cartData[index].d_quantity = cartData[index].d_quantity + 1
            sessionStorage.setItem("cartValue", JSON.stringify(cartvalue))
            //cartData.push({d_name:d_name,d_price:d_price,d_picture:d_picture})
            sessionStorage.setItem("cartData", JSON.stringify(cartData))

            handleUpdateCart(cartData)

            calculateTotalPrice()
        }


    }


   const removeItemfromCart = async (d_name, d_price, d_id) => {
        console.log("hello")
        d_price = parseFloat(d_price)
        let cartData = JSON.parse(sessionStorage.getItem("cartData"))
        console.log(cartData)
        let index = cartData.findIndex((item) => { return item.d_id == d_id })
        if (index >= 0) {
            let cartvalue = JSON.parse(sessionStorage.getItem("cartValue"))
            cartvalue.value = cartvalue.value - 1
            dispatch(removeCart())
            sessionStorage.setItem("cartValue", JSON.stringify(cartvalue))
            let cartData = JSON.parse(sessionStorage.getItem("cartData"))
            let index = cartData.findIndex((item) => { return item.d_id == d_id })
            cartData[index].d_quantity = cartData[index].d_quantity - 1
            cartData[index].d_price = cartData[index].d_price - d_price
            if (cartData[index].d_quantity <= 0) {
                cartData.splice(index, 1)
                sessionStorage.setItem("cartData", JSON.stringify(cartData))
                await handleUpdateCart(cartData)
                calculateTotalPrice()

            }
            else {
                sessionStorage.setItem("cartData", JSON.stringify(cartData))
               await handleUpdateCart(cartData)
                calculateTotalPrice()
            }

        }

    }



  const  calculateTotalPrice = () => 
    {

        let templist = JSON.parse(sessionStorage.getItem("cartData"))
        console.log(templist)
        let Total_price = 0
        for (let a in templist) {

            Total_price = Total_price + templist[a].d_price
            Total_price = Total_price.toFixed(2)
            Total_price = parseFloat(Total_price)

        }
        console.log(total_price)
        setTotalPrice(Total_price)
        console.log(total_price)
        // this.setState
        //     (
        //         {
        //             total_price: Total_price
        //         }
        //     )

        let cartData = JSON.parse(sessionStorage.getItem("cartData"))
            if(cartData != null && cartData !=undefined && cartData.length>0) 
            {
             cartData[0].checkoutprice = Total_price 
            // console.log(cartData[0].checkoutprice) 
            }
            sessionStorage.setItem("cartData",JSON.stringify(cartData))
            

    }






    return(
      
    <nav className = "navbar navbar-inverse" style ={{backgroundColor:'black'}}>
       
    <div className="container-fluid">
    <div className="navbar-header">
    <a className="navbar-brand" id ="navbar-component" style ={{fontSize: '30px',color:"whitesmoke"}}>Uber Eats</a>
    </div>
          
    <div className="nav navbar-nav" style ={{display : 'inline'}} >
         
        <ShoppingCartIcon  onClick = {handleClickToOpen} style={{color:"aliceblue"}}  ></ShoppingCartIcon>
            <p style={{color:"aliceblue",padding:"0px",margin:"0px",marginLeft:"7px",marginBottom:"-11px"}}>{cartval}</p>
        <div className="container"  >
         <div className = "row">
        <Dialog open={open} onClose={handleToClose} fullWidth={true} >
        <div className = "row">
         <DialogTitle>
          <center><h5>Shopping Cart</h5></center>
          <div className = "row">
           <div className="col-md-3">  
           <h5>Dish</h5>  
           </div>
           <div className="col-md-3">  
           <h5>Price</h5>  
           </div>
           <div className="col-md-6">  
          <center> <h5 style={{marginLeft:"90px"}}>Quantity</h5></center>  
           </div>
          </div>
         </DialogTitle>
         </div>
         <div className = "row" >
         <DialogContent >
        {checkoutList == null ||checkoutList.length == 0?<center><h5>No Items added</h5></center>:
        <div>
         {checkoutList.map((value,key)=>{
       return<div className = "row" style={{marginBottom:"5px"}} > 
   
         <div className="col-md-3">  
           <p>{value.d_name}</p>  
        </div>
        <div className="col-md-3">  
           <p>{value.i_price}$</p>  
        </div>
        <div className="col-md-3">  
           <p>X{value.d_quantity}</p>  
        </div>
        <div className="col-md-3">  
            <button className="btn btn-primary" style={{marginRight:"10px"}} onClick={e=>{addIteminCart(value.d_name,value.i_price,value.d_id)}} >+</button>
            <button className="btn btn-primary" onClick={e=>{removeItemfromCart(value.d_name,value.i_price,value.d_id)}} >-</button>
        </div>
        
        </div>
         })
          }
          <div className="row">
             <div className ="col-md-6"> 
             <h5>Total Price :</h5>
             </div> 
             <div className ="col-md-3"> 
             <h5>{total_price}$</h5>
             </div>
             <div className ="col-md-3"> 
             <Link className="btn btn-primary" to ={{pathname:"/Checkout",state:{c_id:props.c_id,del_type:del_type,r_name:r_name}}}>
            Checkout
            </Link>
             </div>
          </div>
          
          
          </div>
          
          
          }  
          </DialogContent>   
         </div>
     </Dialog>
    
        </div>
        </div>

           
    </div>
   
    </div>
           
    </nav>
    )
}

export default NavbarCustland;