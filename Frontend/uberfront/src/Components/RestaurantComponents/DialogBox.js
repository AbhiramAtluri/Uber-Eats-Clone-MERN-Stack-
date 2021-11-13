import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import OutlinedCard from './Card.js'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { addCart } from '../../Redux/CartReducerfile/Cartactions';
import { removeCart } from '../../Redux/CartReducerfile/Cartactions';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
    const [open, setOpen] = React.useState(false);
    let checkoutListretreived = JSON.parse(sessionStorage.getItem("cartData"))

    console.log(checkoutListretreived)
    const [checkoutList, setcheckoutList] = React.useState(checkoutListretreived);
    const[total_price,setTotalPrice] = React.useState(0)
    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleUpdateCart = (cartData) =>{
        setcheckoutList(cartData)
    }  

    // console.log(props.del_type)

    const CartData = JSON.parse(sessionStorage.getItem("cartData"))
    let c_id = null
    console.log(CartData)
   let amount=0
      
   if(CartData!=null && CartData.length >0 )
   { 
    
    c_id = CartData[0].c_id

  for(let a in CartData)
  {
      console.log(CartData)
      amount =  parseInt(CartData[a].d_price)+ amount
      amount = amount.toFixed(2)
      amount = parseFloat(amount)
      console.log(amount)
  }


  
}
const onAddToCart=(e,d_name,d_price,i_price,d_id)=>
{

   console.log("In add to cart")
   console.log(d_price)
   console.log(i_price)
   console.log(d_id)
   console.log(d_name)
   console.log(e)
   let cartData = JSON.parse(sessionStorage.getItem("cartData"))
   let cartvalue = JSON.parse(sessionStorage.getItem("cartValue"))
   cartvalue.value = cartvalue.value + 1
   dispatch(addCart())
   let chkCart = cartData.filter(item => { return item.d_id == d_id })
   if (chkCart.length > 0) {

       let index = cartData.findIndex((item) => { return item.d_id == d_id })
       cartData[index].d_price = cartData[index].d_price + i_price
       cartData[index].d_quantity = cartData[index].d_quantity + 1
       sessionStorage.setItem("cartValue", JSON.stringify(cartvalue))
       //cartData.push({d_name:d_name,d_price:d_price,d_picture:d_picture})
       sessionStorage.setItem("cartData", JSON.stringify(cartData))

       handleUpdateCart(cartData)

       calculateTotalPrice()
   }



} 
const removeItemfromCart = async (e,d_name,d_price,i_price,d_id) => {
    console.log("hello")
    d_price = parseFloat(i_price)
    console.log(d_price)
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


    let cartData = JSON.parse(sessionStorage.getItem("cartData"))
        if(cartData != null && cartData !=undefined && cartData.length>0) 
        {
         cartData[0].checkoutprice = Total_price 
        // console.log(cartData[0].checkoutprice) 
        }
        sessionStorage.setItem("cartData",JSON.stringify(cartData))
        

}




    return (
        <div>

            <ShoppingCartIcon onClick={handleClickOpen} />

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} style={{ height: "100px" }} >
                    <center>Shopping Cart</center>
                    <div className="col-md-12 " style={{ display: "inline-flex", marginBottom: "25px" }}>
                        <div className="col-md-3">
                            <center><h5>Image</h5></center>
                        </div>
                        <div className="col-md-3">
                            <center><h5>Dish</h5></center>
                        </div>
                        <div className="col-md-2" style={{ marginLeft: "19px" }} >
                            <h5>Price</h5>
                        </div>
                        <div className="col-md-2">
                            <center><h5>Quantity</h5></center>
                        </div>
                        <div className="col-md-1">
                         
                        </div>



                    </div>
                </BootstrapDialogTitle>
                <div className="Cart_class" style={{ width: "500px" }}    >
                    <DialogContent dividers>
                        {CartData == null || CartData.length == 0 ? <center><div>No Items Added</div></center> :
                            <div className="container-fluid">
                                <ul className="list-group" style={{ display: "table", listStyle: "none", width: "100%" }}>

                                    {CartData.map((cartItem, key) => {
                                        return <div className="row">
                                          <div className="col-md-12" style={{ display: "inline-flex", marginBottom: "25px" }}>
                                                <div className="col-md-3">
                                                    <img src={cartItem.d_picture} style={{ width: "70px", height: "80px" }}></img>
                                                </div>
                                                <div className="col-md-3">
                                                    <h5>{cartItem.d_name}</h5>
                                                </div>
                                                <div className="col-md-3" style={{ paddingInline: "20px" }}  >
                                                    <h5>{cartItem.i_price}$</h5>
                                                </div >
                                                <div className="col-md-2">
                                                    <h5>X {cartItem.d_quantity}</h5>
                                                </div>
                                                <div className="col-md-1" style={{ display: "inline-flex" }}>
                                                    <button className="btn btn-primary" onClick={(e)=>onAddToCart(e,cartItem.d_name,cartItem.d_price,cartItem.i_price,cartItem.d_id)} style={{ height: "50%" }} >+</button ><button className="btn btn-primary" style={{ height: "50%" }} onClick={(e)=>{removeItemfromCart(e,cartItem.d_name,cartItem.d_price,cartItem.i_price,cartItem.d_id)}}>-</button>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    )}
                                   <li style={{ display: "inline-flex", marginBottom: "25px" }}>
                                       
                                       <div className="col-md-4" style={{marginLeft:"100px",display: "inline-flex"}} >
                                       <h5 style={{marginLeft:"7px"}} >Total price:</h5>
                                      <h5 style={{marginLeft:"82px"}}> {amount}$</h5>
                                       </div>
                                       </li>
                                </ul>
                            </div>}
                        <DialogActions>

                        {CartData !=null && c_id !=null && CartData.length>0?
                          <Link className="btn btn-primary" to ={{pathname:"/Checkout",state:{checkoutList : CartData,c_id:c_id,del_type:props.del_type,r_name:props.r_name}}}>
                              Checkout
                          </Link>:""}                                     
                                
                        </DialogActions>

                    </DialogContent >
                </div>


            </BootstrapDialog>
        </div>
        /* <DialogContent dividers>
   <Typography gutterBottom>
     Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
     dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
     consectetur ac, vestibulum at eros.
   </Typography>
   <Typography gutterBottom>
     Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
     Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
   </Typography>
   <Typography gutterBottom>
     Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
     magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
     ullamcorper nulla non metus auctor fringilla.
   </Typography>
 </DialogContent>
 <DialogActions>
   <Button autoFocus onClick={handleClose}>
     Save changes
   </Button>
 </DialogActions> */
    );
}
