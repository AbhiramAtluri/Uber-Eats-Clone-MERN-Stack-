const db = require("../database/db")
const path = require('path');
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

exports.fetchRestaurantDetailsbyId = async function(req,res)

{

let r_id = req.body.r_id

// db.query("SELECT t2.r_name,t1.* FROM uber_eats.orders t1 inner join res_reg t2 on t1.r_id=t2.r_id where t1.r_id=?",[r_id])
// .then(resp =>
//     {
//           res.json(resp[0])
//     }
//     )
// .catch(err=>{res.json(err)})
Restaurant_Registration.find({_id:r_id},(err,resp)=>
{
    if(resp)
    {
        res.json(resp)
    }
}
)


}



exports.fetchCustomerDetailsbyId = async function(req,res)

{

let c_id = req.body.c_id

db.query("SELECT t2.c_name,t1.* FROM uber_eats.orders t1 inner join cust_reg t2 on t1.c_id=t2.c_id where t1.c_id=?",[c_id])
.then(resp =>
    {
        //   res.json(resp[0])
        resp = Object.values(JSON.parse(JSON.stringify(resp)));
      //   res.json(resp[0])
        for(a in resp[0])
        {
          db.query("SELECT r_name from res_reg where r_id =?",[resp[0][a].r_id])
            .then(response=>
                {
                    response = Object.values(JSON.parse(JSON.stringify(response)));
                    // console.log(response[0])
                    resp[0][a].r_name = response[0][0].r_name
                    console.log("dta")
                    console.log(resp[0][a])
                }
            )
        }

      console.log(x)
    }
    )
.catch(err=>{res.json(err)})


}




///Fetching rest name from rest id

exports.FetchRestaurantNameFromCustId = async function(req,res)

{
    let r_id=req.body.r_id
console.log("FetchRestaurantNameFromCustId")
console.log(r_id)
// db.query("select r_name from res_reg where r_id=?",[r_id])
// .then(resp=>
//     {

// res.json(
//     resp[0]
// )

//     })
//     .catch(err=>{
//         console.log(err)
//         res.json(err)})
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
// db.query("UPDATE orders SET o_status = ? where o_id = ?",[o_status,o_id])
// .then(resp=>
//     {
//       res.json(
//           {
//               message:"success"
//           }
//       )
//  console.log(resp)
//     }
//     )
// .catch(err=>{console.log(err)})


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



