// const db = require("../database/db")
// const path = require('path');
const { response } = require("express");
const Restaurant_Registration = require('../MongoModels/RestaurantModel');
const Customer_Registration_Model = require("../MongoModels/CustomerModel");
const FavouriteModel = require("../MongoModels/CustomerFavouritesModel")
const DishModel = require('../MongoModels/Dishes')
const OrderModel =require('../MongoModels/OrderModel')
// exports.fetchOrdersForCustomerOrderPage = async function(req,res)
// {
//     db.query("select * from orders where c_id =?",[req.body.c_id])
//     .then(resp=>
//         {
//             //   console.log(resp[0])
//               resp = Object.values(JSON.parse(JSON.stringify(resp)));
//               console.log(resp[0])
//               let x =(resp[0])[0].d_list
//               console.log(x[0])
//             //  let data = JSON.parse((resp[0])[0].d_list)
//             res.json
//             (resp[0])
//         }
//         )
//     .catch(err=>
//         {  console.log(err)
//             res.json({
//                 message:"Noorders"
//             })
//         }
//         )



// }

exports.fetchCustomerDetailsbyId = async function(msg,callback)

{
console.log("In Cust by id")
let req = {body:{...msg}};

let c_id = req.body.c_id
console.log("In fetchCustomerDetailsbyId")
console.log(msg)
Customer_Registration_Model.findOne({c_id:c_id},(err,resp)=>
{
    if(resp)
    {

    console.log(resp)
    OrderModel.find({c_id:c_id}).lean().exec((err,respa)=>
    {
     if(respa)
     {  console.log("Orders here")
         console.log(respa);
      

     for(a in respa)
     {
         respa[a].c_name=resp.c_name;
     }

      //res.json(respa)
      callback(null,respa)
     }  
      
    }
    )
    

    }
})


}








///Fetching rest name from rest id

exports.FetchRestaurantNameFromCustId = async function(msg,callback)

{
    let req = {body:{...msg}}
    let r_id=req.body.r_id
console.log("FetchRestaurantNameFromCustId")
console.log(r_id)

 Restaurant_Registration.find({_id:r_id},(err,resp)=>
 {  
     if(resp)
     {
         console.log(resp)
    //res.json(resp)
    callback(null,resp)
     }

 })



}


exports.UpdateOrderStatus = async function(msg,callback)

{
    

   let req = {body:{...msg}}

    let o_id = req.body.o_id
    let r_id = req.body.r_id
    let o_status = req.body.o_status
    console.log(req.body)


OrderModel.updateOne({_id:o_id},{$set:{o_status:o_status}},(err,resp)=>
{
    if(resp)
    {  console.log(resp)
        // res.json({
        //     message:"success"
        // })
        callback(null,{message:"success"})
    }
})


}

exports.fetchRestaurantDetailsbyId = async function(msg,callback)

{
  let req = {body:{...msg}}  

let r_id = req.body.r_id

Restaurant_Registration.findOne({_id:r_id},(err,resp)=>
{
    if(resp)
    {
      //  res.json(resp)
    OrderModel.find({r_id:resp._id}).lean().exec((err,respa)=>
    {
        if(respa)
     {
         console.log(respa);
      

     for(a in respa)
     {
         respa[a].c_name=resp.c_name;
     }

    //   res.json(respa)
       callback(null,respa)
     } 

    })
        



    }
}
)


}

exports.CancelOrderCustomer =async function(msg,callback)
{
console.log("Inside cancel order model")
console.log(msg)
OrderModel.find({_id:msg.o_id},(err,resp)=>
{
    if(resp[0].o_status == null || resp[0].o_status == undefined || resp.o_status =="Order Received")
    {
        // callback(null,{message:"Success"})
        console.log(resp)
        console.log(resp[0].o_status)
        OrderModel.updateOne({_id:msg.o_id},{$set:{o_status:msg.o_status}},(err,response)=>
        {
            if(response)
            {
                callback(null,{message:"Success"})
            }
        })
        

    }
    else
    {
        callback(null,{message:"Fail"})
    }
})

}

