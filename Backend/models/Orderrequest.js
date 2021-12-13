const db = require("../database/db")
const path = require('path');
const { response } = require("express");
const Restaurant_Registration = require('../MongoModels/RestaurantModel');
const Customer_Registration_Model = require("../MongoModels/CustomerModel");
const FavouriteModel = require("../MongoModels/CustomerFavouritesModel")
const DishModel = require('../MongoModels/Dishes')
const OrderModel =require('../MongoModels/OrderModel')

exports.fetchRestaurantDetailsbyId = async function(req,res)

{

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

      res.json(respa)
    //   callback(null,respa)
     } 

    })
        



    }
}
)


}


exports.fetchCustomerDetailsbyId = async function(req,res)

{

let c_id = req.body.c_id


Customer_Registration_Model.findOne({c_id:c_id},(err,resp)=>
{
    if(resp)
    {
    //  callback(null,resp)  
    //  OrderModel.find({})
    console.log(resp)
    OrderModel.find({c_id:resp._id}).lean().exec((err,respa)=>
    {
     if(respa)
     {
         console.log(respa);
        // respa[0].c_name = resp.c_name;

     for(a in respa)
     {
         respa[a].c_name=resp.c_name;
     }
     console.log(respa)
      res.json(respa)
     }  
      
    }
    )
    

    }
})


}




///Fetching rest name from rest id

exports.FetchRestaurantNameFromCustId = async function(req,res)

{
    let r_id=req.body.r_id
console.log("FetchRestaurantNameFromCustId")
console.log(r_id)

 Restaurant_Registration.find({_id:r_id},(err,resp)=>
 {  
     if(resp)
     {
         console.log(resp)
    res.json(resp)
     }

 })



}


exports.UpdateOrderStatus = async function(req,res)

{
    console.log(req.body)
    let o_id = req.body.o_id
    let r_id = req.body.r_id
    let o_status = req.body.o_status


OrderModel.updateOne({_id:o_id},{$set:{o_status:o_status}},(err,resp)=>
{
    if(resp)
    {  console.log(resp)
        res.json({
            message:"success"
        })
    }
})


}



