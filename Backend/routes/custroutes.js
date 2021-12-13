var express = require('express');
var router = express.Router();
var auth = require('../models/authentication')
var delivery = require('../models/Delivery')
var Order = require('../models/Orderrequest')
var kafka = require('../kafka/client');
const { secret } = require('../config');
const jwt = require('jsonwebtoken');

// const { auth } = require("../utils/passport");
//Router listening
// auth
// router.post('/custreg',auth.customerRegistration)
// const {, auth } = require("../utils/passport");


 router.post('/custlog',auth.customerLogin)

//  (req,res)=>
//  {
//      console.log(req.body)
//      kafka.make_request('cust_log',req.body,function(err,results)
//      {    
//          console.log("in cust log backend");
//          console.log(results);
//          if(err)
//          {
//              console.log("Inside err");
//              res.json({
//                  msg:"Err"
//              })
//          }else
//          {
//              console.log("Sending postman response")
             
//               if(results.message=="Login successfull")
//               {    console.log(results.c_id)
//                   const payload = {message:"Success",_id:results.c_id,c_email:results.c_email,type:"cust"};
//                   const token = jwt.sign(payload,secret,{ expiresIn: 1008000})
//                   res.status(200).json({token: 'JWT '+ token,c_id:results.c_id,c_email:results.c_email,message:"Login successfull"}); 
                
//               }   
              
            
//          }
//      })
//  }





router.post('/custreg',auth.customerRegistration)
//Fetching Customer Profile
router.post('/CustomerProfileFetch',(req,res)=>
{
 console.log("Customer profile fetch")
  kafka.make_request('getCustomerProfileDetails',req.body,function(err,results)
  {
    console.log("in cust profile Details result");
    console.log(results);
    if(err)
    {
        console.log("Inside err");
        res.json({
            msg:"Err"
        })
    }else
    {
        res.json({
            ...results
        });
        
    }
  }
  )  
})


router.post('/CustomerProfileUpdate',(req,res)=>
{
    console.log("Customer profile update")
    console.log(req.body)
   kafka.make_request("updateCustomerProfile",req.body,function(err,results)
   {

    console.log("in update Customer profile");
    console.log(results);
    if(err)
    {
        console.log("Inside err");
        res.json({
            msg:"Err"
        })
    }else
    {
        res.json({
            ...results
        });
        
    }
   })



})

/// get Profile based on Id
router.post('/CustomerProfileBasedOnId',(req,res)=>
{
    console.log("Get Csutomer profile based on Cid")
    console.log(req.body)

   kafka.make_request("getCustomerProfileBasedOnCid",req.body,function(err,results)
   {
       console.log("Get customer profile baed on cid")
       if(err)
    {
        console.log("Inside err");
        res.json({
            msg:"Err"
        })
    }else
    {
        res.json({
            ...results
        });
        
    }

   })



})
///Adding addresses
router.post('/AddDeliveryAddress',(req,res)=>
{
    console.log("Add the Delivery address")
    console.log(req.body)
    kafka.make_request("AddDeliveryAddress",req.body,function(err,results)
    {
        console.log("Add delivery address")
        if(err)
     {
         console.log("Inside err");
         res.json({
             msg:"Err"
         })
     }else
     {
         res.json({
             ...results
         });
         
     }

    })
})
//Fetching delivery address
router.post('/FetchDelAddress',(req,res)=>
{
console.log("Fetch Delivery Address")
console.log(req.body)
kafka.make_request("FetchDelAddress",req.body,function(err,results)
{
    console.log("Fetch Delivery address")
        if(err)
     {
         console.log("Inside err");
         res.json({
             msg:"Err"
         })
     }else
     {
        res.send(
            Object.values(results)
        );
         
     }

})

})

// router.post('/FetchDelAddressInCustomerOrders',delivery.FetchDelAddressInCustomerOrders)
router.post('/FetchDelAddressInCustomerOrders', (req,res)=>
{
    console.log("Fetch Delivery Address in customer orders")
console.log(req.body)
kafka.make_request("FetchDelAddressInCustomerOrders",req.body,function(err,results)
{
    console.log("Fetch Delivery Address in customer orders")
        if(err)
     {
         console.log("Inside err");
         res.json({
             msg:"Err"
         })
     }else
     {
        res.send(
            Object.values(results)
        );
         
     }

})

})
//Placing order

router.post('/PlaceOrder', (req,res)=>
{

console.log("Place order");
console.log(req.body)
kafka.make_request("PlaceOrder",req.body,function(err,results)
{
    console.log("Place Order")
        if(err)
     {
         console.log("Inside err");
         res.json({
             msg:"Err"
         })
     }else
     {
         res.json({
             ...results
         });
         
     }

})


})
//Fetching  cust number in final checkout page
//router.post('/FetchCustNumber',delivery.fetchingCustNumber)
router.post('/FetchCustNumber', (req,res)=>
{
    kafka.make_request("FetchCustNumber",req.body,function(err,results)
{
    console.log("FetchCustNumber")
        if(err)
     {
         console.log("Inside err");
         res.json({
             msg:"Err"
         })
     }else
     {
         res.json({
             ...results
         });
         
     }

})

}
)
//Fetching Orders list
router.post('/FetchOrderList', (req,res)=>
{
    kafka.make_request("FetchOrders",req.body,function(err,results)
    {
        console.log("Fetch Orders")
        
        if(err)
        {
            console.log("Inside err");
            res.json({
                msg:"Err"
            })
        }else
        {
            res.json({
                ...results
            });
            
        }



    })
})
router.post('/UpdateOrderStatus', (req,res)=>
{
    kafka.make_request("UpdateOrderStatus",req.body,function(err,results)
    {
        console.log("Update Order Status")
        if(err)
        {
            console.log("Inside err");
            res.json({
                msg:"Err"
            })
        }else
        {
            res.json({
                ...results
            });
            
        }



    })
})




// router.post('/FetchRestaurantDetailsById',Order.fetchRestaurantDetailsbyId)
// Fetching restaurant orders by id
router.post('/FetchRestaurantDetailsById', (req,res)=>
{
   console.log("Fest restarant details by id")
    kafka.make_request("FetchRestaurantDetailsById",req.body,function(err,results)
    {
        if(err)
        {
            console.log("Inside err");
            res.json({
                msg:"Err"
            })
        }else
        {
            res.send(
                Object.values(results)
            );
            
        }
    })




})

router.post('/FetchRestaurantNameFromCustId', (req,res)=>
{
    console.log("Fetch Restaurant name from cust ID")
    kafka.make_request("FetchRestaurantNameFromCustId",req.body,function(err,results)
    {
        console.log(req.body)
        if(err)
        {
            console.log("Inside err");
            res.json({
                msg:"Err"
            })
        }else
        {
            res.json({
                ...results
            });
            
        }





    })
})

//router.post('/FetchCustomerDetailsById',Order.fetchCustomerDetailsbyId)

router.post('/FetchCustomerDetailsById', (req,res)=>
{
 console.log("Fetch Customer details by id");
 kafka.make_request("FetchCustomerDetailsById",req.body,function(err,results)
 {
    console.log(req.body)
    if(err)
    {
        console.log("Inside err");
        res.json({
            msg:"Err"
        })
    }else
    {
        res.send(
            Object.values(results)
        );
        
    }

 })

}
)

router.post('/CancelOrderCustomer', (req,res)=>
{
    console.log("Cancel order customer route");
    console.log(req.body)
    kafka.make_request("CancelOrderCustomer",req.body,function(err,results)
    {
        console.log(req.body)
        if(err)
        {
            console.log("Inside  err");
            res.json({
                msg:"err"
            })
        }else
        {
            res.send(results);
        }
    })
})






//Fetching Orders List for Customer Landing Page
// router.post('/FetchOrdersForCustomer',Order.fetchOrdersForCustomerOrderPage)




// router.post('/FetchRestaurantNameFromCustId',Order.FetchRestaurantNameFromCustId)






module.exports = router