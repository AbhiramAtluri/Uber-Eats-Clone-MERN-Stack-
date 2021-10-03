const db = require("../database/db")
const path = require('path');
const { response } = require("express");


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

db.query("SELECT t2.r_name,t1.* FROM uber_eats.orders t1 inner join res_reg t2 on t1.r_id=t2.r_id where t1.r_id=?",[r_id])
.then(resp =>
    {
          res.json(resp[0])
    }
    )
.catch(err=>{res.json(err)})


}

exports.fetchCustomerDetailsbyId = async function(req,res)

{

let c_id = req.body.c_id

db.query("SELECT t2.c_name,t1.* FROM uber_eats.orders t1 inner join cust_reg t2 on t1.c_id=t2.c_id where t1.c_id=?",[c_id])
.then(resp =>
    {
          res.json(resp[0])
    }
    )
.catch(err=>{res.json(err)})


}

exports.FetchRestaurantNameFromCustId = async function(req,res)

{
    let r_id=req.body.r_id

db.query("select r_name from res_reg where r_id=?",[r_id])
.then(resp=>
    {

res.json(
    resp[0]
)

    })
    .catch(err=>{
        console.log(err)
        res.json(err)})




}



