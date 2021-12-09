const db = require("../database/db")
const path = require('path')
const { query } = require("../database/db")
const Restaurant_Registration = require('../MongoModels/RestaurantModel');
const Customer_Registration_Model = require("../MongoModels/CustomerModel");
const FavouriteModel = require("../MongoModels/CustomerFavouritesModel")
const DishModel = require('../MongoModels/Dishes')
const OrderModel =require('../MongoModels/OrderModel')
const  DeliveryModel = require('../MongoModels/DeliveryAddressModel')
///Adding delivery addresses

exports.DeliveryAddressAdd =async function (req,res)
{
var newAddress = new DeliveryModel(
    {
        c_id:req.body.c_id,
        d_add_1:req.body.d_add_1,
        d_add_2:req.body.d_add_2,
        d_zipcode:req.body.d_zipcode
      
    },
    {
        versionKey:false
    }
    )
   newAddress.save((err,resp)=>
   {
    res.json({ message: "success",del_id:resp._id});
    console.log(resp)   
   }
   )




}


//Fetching delivery addrresss
exports.FetchDelAddress =async function (req,res)
{

console.log("in del fetch")

  DeliveryModel.find({c_id:req.body.c_id},(err,resp)=>
  {
      if(resp)
      {   console.log(resp)
          res.send(resp)
      }
  })




}


///Fetching number from custdetails

exports.fetchingCustNumber= async function(req,res)
{
     console.log(req.body.c_id)
    Customer_Registration_Model.findOne({c_id:req.body.c_id},(err,resp)=>
    {
        if(resp)
        {
            console.log(resp)
            res.json({
                c_number:resp.c_number,
                c_email:resp.c_email,
                c_name:resp.c_name
            })
        }
    }
    )
}


///Adding order into database table
exports.placingOrder =async function(req,res)
{
 
      console.log("in Place Order")
     let row = JSON.stringify(req.body.d_list)
   
     console.log(req.body)

   console.log(req.body.r_id)
     var newOrder = new OrderModel(
         {
            c_id:req.body.c_id,
            r_id:req.body.r_id,
            d_list:row,
            del_type:req.body.del_type,
            del_id:req.body.del_id,
            o_date:req.body.o_date,
            o_time:req.body.o_time,
            r_name:req.body.r_name,
            o_status:req.body.o_status  
         }
         )
        newOrder.save((err,data)=>
        {
            if(data)
            {
                console.log(data)
                res.json
            (
                {
                    message:"Successful"
                }
            )
            }
        })



}

///Fetching Orders for customer

exports.fetchOrders = async function(req,res)
{

        OrderModel.find({c_id:req.body.c_id},(err,resp)=>
        {
          if(resp)
          {
              res.json(resp)
          }
        }
        )
}

/////Fetching delivery address in customer orders list

exports.FetchDelAddressInCustomerOrders =async function (req,res)
{

let del_id = req.body.del_id
console.log("del id is" + del_id)
console.log("in del fetch")


        DeliveryModel.find({_id:del_id},(err,resp)=>
        {
            if(err)
            {
                console.log(err)
            }
            if(resp)
            {
            res.json(resp)
            }

        })



}