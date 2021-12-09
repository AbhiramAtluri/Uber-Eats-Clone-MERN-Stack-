const db = require("../database/db")
const path = require('path')
const DishModel = require('../MongoModels/Dishes')
const OrderModel =require('../MongoModels/OrderModel')




exports.AddDish = async function(req,res)

{

     let r_id = req.body.r_id;
     let d_name = req.body.d_name;
     let d_price = req.body.d_price;
     let d_category  = req.body.d_category;
     let d_picture = req.body.d_picture
     let d_description = req.body.d_description
     let d_type = req.body.d_type
     
console.log("heu")
console.log(req.body)
   let newDish = new DishModel(
      {
         r_id : req.body.r_id,
         d_name : req.body.d_name,
         d_price : req.body.d_price,
         d_category  : req.body.d_category,
         d_picture : d_picture,
         d_description : req.body.d_description,
         d_type : req.body.d_type
      }
      )
     newDish.save((err,data)=>
     { 
        if(err)
        {
       console.log(err)
        }
        else
        {
           res.send("Success")
        }
     }
     )



}

exports.getDish = async function(req,res)

{
    console.log("In Get dsish node backend")
   let r_id = req.body.r_id


    DishModel.find({r_id:req.body.r_id},(err,resp)=>
    {
       if(resp)
       {
          res.json(resp)
       }
    }
    )

}

exports.editDish = async function (req,res) {


   console.log("In edit dish")
   

   console.log(req.body)
    
  DishModel.updateOne({_id:req.body.d_id},{$set:{d_name:req.body.d_name,d_price:req.body.d_price,d_category:req.body.d_category,d_picture:req.body.d_picture,d_description:req.body.d_description}},(err,resp)=>
  {
     if(resp)
     {
        console.log(resp)
        res.send("Success")
     }
  })
   




   
}

//Getting all the dishes


exports.getAllDishes = async function(req,res)
{
 
  db.query("SELECT * from dishes").then
  (
     resp=>
     {
        res.json(resp[0])
     }
     ).catch(err=>{console.log(err)})

 DishModel.find(resp=>{
    res.send(resp)
 })


}

///Getting all dishes with nearest location




