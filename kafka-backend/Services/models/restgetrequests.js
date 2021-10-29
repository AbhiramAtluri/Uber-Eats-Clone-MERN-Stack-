// const db = require("../database/db")
const path = require('path')
const url = require('url')
const Restaurant_Registration = require('../MongoModels/RestaurantModel');
const Customer_Registration_Model = require("../MongoModels/CustomerModel");
const FavouriteModel = require("../MongoModels/CustomerFavouritesModel");
const DishModel = require("../MongoModels/Dishes");

exports.getRestaurantDetails = async function(msg,callback)
{
    
    console.log(msg) 


//     let r_email  = req.params['r_email']


//     db.query('SELECT * from res_reg where r_email = ?',[r_email]).then(

//         resp =>
//         {  
//             resp = Object.values(JSON.parse(JSON.stringify(resp)));
//              console.log(resp[0])
//             console.log((resp[0])[0])
//             res.send(
//                 {
//                     "r_name" :(resp[0])[0].r_name,
//                     "r_id" : (resp[0])[0].r_id,
//                     "r_picture" : (resp[0])[0].r_picture,
//                     "r_description": (resp[0])[0].r_description,
//                     "del_type":(resp[0])[0].del_type,
//                     "r_address":(resp[0])[0].r_address,
//                     "r_opentime":(resp[0])[0].r_opentime,
//                     "r_closetime":(resp[0])[0].r_closetime,
//                     "r_email":(resp[0])[0].r_email,
//                     "r_number":(resp[0])[0].r_number
//                 }
//             )
//         }
//     ).catch(err=>{
//         console.log(err)
//     })
    
// //    console.log("hello rst details")
// //     console.log(req.url)
// //     console.log(req.params['r_email'])

}


exports.getAllRestaurants = async function(msg,callback)
{

// db.query("Select * from res_reg ").then(resp=>{

//   res.json(resp[0])

// })
Restaurant_Registration.find({},(err,resp)=>
{
    if(resp)
    {
       // res.json(resp)
        callback(null,resp)
    }
})

}

//GET ALL RESTAURANTS FROM NEAREST LOCATION

exports.getAllnearestRestaurants = async function(msg,callback)
{
  
  let req = {body:{...msg}}

  if(req.body.c_county.length <1)
  {
      res.json("c_profile_update")
  }
  else
  {
   

 Restaurant_Registration.find({r_county:req.body.c_county},(err,rest)=>
 {
     if(rest)
     {
         console.log(rest)
        // res.json(rest)
         callback(null,rest)
     }else
     {
        //  res.json({
        //      message:"NoLoc"
        //  })
         callback(null,{message:"NoLoc"})
     }

 })



}







} 

//GET RESTERAUNTS AWAY FROM LOCATION

exports.getFarAwayRestaurants = async function(req,res)

{
    console.log(req.body.c_county)

    // db.query("select * from res_reg where r_county !=?",[req.body.c_county])
    // .then(
    //  resp=>
    //  {
    //      res.json(resp[0])
    //  }
    // )

    Restaurant_Registration.find({r_county :{$ne:req.body.c_county}},(err,resp)=>
    {     
             if(resp)
             {   console.log(resp)
                 res.json(resp)
             }
    }
    )

}

//GET RESTAURANT BASED ON DISH

exports.getRestaurantsBasedOnDish = async function(req,res)

  {
      console.log(req.body.s_dish)
      let s_dish = /req.body.s_dish/

//   db.query("SELECT  *  FROM res_reg WHERE r_id IN(SELECT r_id from dishes where d_name LIKE N?)",[s_dish] )
//   .then(resp=>
//     {

//       if(resp[0].length>1)
//       {  
//       res.json(resp[0])
//       }
//       else
//       {
//           res.json({
//               message : "NoDish"
//           })
//       }


//     }
//     ).catch(err=>{console.log(err)})

var regex = new RegExp(req.body.s_dish)

console.log(regex)
    DishModel.find({d_name:regex},(err,resp)=>
    {
        console.log(resp)
        if(resp)
        {
            res.json(resp)
        }
    })







}

exports.getRestaurantsBasedonVegFilter = async function(req,res)
{
    console.log(req.body.d_type)

    let d_type = req.body.d_type
    db.query("select  r_id from res_reg where r_id IN(SELECT r_id from dishes where d_type = ?)",[d_type])
    .then(resp=>
        {
            console.log(resp)
            res.json
            (
                    resp[0]
            )
        }
        )
        .catch(err=>{console.log(err)})

     DishModel.find({d_type:req.body.d_type},(err,resp)=>
     {
         console.log(resp)
     })


}


///ADDING RESTAURANT TO FAVOURITES


exports.AddRestaurantToFavourites = async function(msg,callback)
{
    let req = {body:{...msg}}
       
    var newFav = new FavouriteModel(
        {
            c_id:req.body.c_id,
            r_id:req.body.r_id

        }
       
        
        )


        newFav.save((err,data)=>
        {  if(err)
            {
               // res.send(err);
                callback(null,err);
            }else
            {
                console.log(data);
               // res.send(data)
               callback(null,data);
            }
            
        })


       

      

}

//GETTING ALL THE FAVOURITE RESTAURANTS

exports.GetAllTheFavRestaurants = async function(req,res)
{

console.log(req.body.c_id)
FavouriteModel.find({c_id:req.body.c_id},(err,data)=>
{  if(data)
    {
    res.json(data)
    }
    if(err)
    {
        console.log(err)
    }
}
)


}


///GET all REST ID OF CUSTOMER FAVOURITES

exports.GetFavResterauntIds = async function(msg,callback)
{

let req = {body:{...msg}}

console.log("hey")
console.log(req)
  FavouriteModel.find({c_id:req.body.c_id},(err,data)=>
{  if(data)
    {
        //console.log(data)
    //res.json(data)
    console.log(data)
    callback(null,data)
    }
    if(err)
    {
        console.log(err)
    }
}
)


}