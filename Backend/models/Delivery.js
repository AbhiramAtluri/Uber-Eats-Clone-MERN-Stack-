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

// console.log("in del add")
//     db.query("INSERT INTO d_address(c_id,d_add_1,d_add_2,d_zipcode) VALUES(?,?,?,?)",[req.body.c_id,req.body.d_add_1,req.body.d_add_2,req.body.d_zipcode])
//     .then(resp=>
//         {   
//             db.query("select del_id from d_address where c_id = ? and d_add_1 = ? and d_add_2 = ? and d_zipcode = ?",[req.body.c_id,req.body.d_add_1,req.body.d_add_2,req.body.d_zipcode])
//             .then(respa=>
//                 {console.log((respa[0])[0].del_id)
//                     res.json(
//                         {
//                         message:"success",
//                         del_id:(respa[0])[0].del_id
//                         }
//                       )
//                 }
                
//                 )
//                 .catch(err=>{res.send(err)})
         
//         }
//         ).catch
//         (
//             err=>
//             {
//                 res.json(err)
//             }
//         )

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
    // db.query("SELECT * FROM d_address where c_id =?",[req.body.c_id])
    // .then(resp=>
    //     {
         
    //         res.json(resp[0])
    //     }
    //     ).catch
    //     (
    //         err=>
    //         {
    //             res.json(err)
    //         }
    //     )
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
    // db.query("select c_number,c_email,c_name from cust_reg where c_id=?",[req.body.c_id])
    // .then
    // (resp=>
    //     {
    //       res.json(resp[0])
    //     }


    // )
    // .catch(err=>{
    //     res.json(err)
    // })

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
    // console.log(req.body.d_list)
//   let row = JSON.stringify(req.body.d_list)
// console.log(req.body)
      console.log("in Place Order")
     let row = JSON.stringify(req.body.d_list)
    //  console.log(row)
     console.log(req.body)
    // db.query("INSERT INTO orders(c_id,r_id,d_list,del_type,del_id,o_date,o_time,r_name) VALUES(?,?,?,?,?,?,?,?)",[req.body.c_id,req.body.r_id,row,req.body.del_type,req.body.del_id,req.body.o_date,req.body.o_time,req.body.r_name])
    // .then
    // (resp=>
    //     {
    //         res.json
    //         (
    //             {
    //                 message:"Successful"
    //             }
    //         )
    //     }
    // )
    // .catch(err=>
    //     {
    //         console.log(err)
    //      res.json
    //      (
    //          {
    //             message:"failed"
    //          }
    //      )
    //     }
    //     )
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
    // db.query("select * from orders where c_id =?",[req.body.c_id])
    // .then(resp=>
    //     {
    //         //   console.log(resp[0])
    //           resp = Object.values(JSON.parse(JSON.stringify(resp)));
    //           console.log(resp[0])
    //           let x =(resp[0])[0].d_list
    //           console.log(x[0])
    //         //  let data = JSON.parse((resp[0])[0].d_list)
    //         res.json
    //         (resp[0])
    //     }
    //     )
    // .catch(err=>
    //     {  console.log(err)
    //         res.json({
    //             message:"Noorders"
    //         })
    //     }
    //     )
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
    // db.query("SELECT * FROM d_address where del_id =?",[del_id])
    // .then(resp=>
    //     {
         
    //         res.json(resp[0])
    //     }
    //     ).catch
    //     (
    //         err=>
    //         {
    //             res.json(err)
    //         }
    //     )

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