// const db = require("../database/db")
const path = require('path')
const url = require('url')
const Restaurant_Registration = require('../MongoModels/RestaurantModel');
const Customer_Registration_Model = require("../MongoModels/CustomerModel");
const FavouriteModel = require("../MongoModels/CustomerFavouritesModel");
const DishModel = require("../MongoModels/Dishes");

exports.getRestaurantDetails = async function(msg,callback)
{
    console.log("Get Restaurant Details by email service")
    console.log(msg) 
    let r_email = msg.r_email;


Restaurant_Registration.findOne({r_email:r_email},(err,resp)=>
{
  if(resp)
  {
   callback(null,resp);
  }  

}
)





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
  console.log("In Nearest Restaurants");
  if(req.body.c_county.length <1)
  {
     // res.json("c_profile_update")
     callback(null,"c_profile_update");
  }
  else
  {
   

 Restaurant_Registration.find({r_county:req.body.c_county},(err,rest)=>
 {
     if(rest.length>0)
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

exports.getFarAwayRestaurants = async function(msg,callback)

{
   let req = {body:{...msg}};

    console.log(req.body.c_county)

 

    Restaurant_Registration.find({r_county :{$ne:req.body.c_county}},(err,resp)=>
    {     
            if(resp.length>0)
            {
             callback(null,resp)
            
            }
            else
            {
                callback({message:"NoLoc"})
            }
    }
    )

}

//GET RESTAURANT BASED ON DISH

exports.getRestaurantsBasedOnDish = async function(msg,callback)

  {


   let req = {body:{...msg}};

      console.log(req.body.s_dish)
      let s_dish = /req.body.s_dish/



var regex = new RegExp(req.body.s_dish)

console.log(regex)
    DishModel.find({d_name:regex},(err,resp)=>
    {
        console.log(resp)
        if(resp)
        {
           
            let r_idList = [];
           if(resp.length>0)
            {     
           
            for(a in resp)
            {
                r_idList.push(resp[a].r_id)
            }
            console.log(r_idList)
           
            Restaurant_Registration.find({_id :{$in:r_idList}},(err,respa)=>
            {
                callback(null,respa);
            })
        }

        }
        else
        {
            //res.json({message:"NoDish"})
            callback(null,{message:"NoDish"});
        }
    })







}

exports.getRestaurantsBasedonVegFilter = async function(msg,callback)
{

   
   let req = {body:{...msg}};

    console.log(req.body.d_type)
    console.log("In Here")
    console.log(msg)
    let d_type = req.body.d_type
    console.log(d_type)

     DishModel.find({d_type:req.body.d_type},(err,resp)=>
     {    console.log("sdad")
         if(resp)
         {
         console.log(resp)

        let r_list = [];
        for(let a in resp) 
        {
            r_list.push(resp[a].r_id)
        }
        
        console.log(r_list)

        Restaurant_Registration.find({_id :{$in:r_list}},(err,respa)=>
        {
            if(respa)
            {
                console.log("rest details")
                console.log(respa)
             callback(null,respa)
            }
        })




        // callback(null,r_list)

         }
         else
         {
             console.log("Error")
         }
        // Restaurant_Registration.find({})
        

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

exports.GetAllTheFavRestaurantsDetails = async function(msg,callback)
{
console.log("In GetAllTheFavRestaurantsDetails ")
let req = {body:{...msg}};

FavouriteModel.find({c_id:req.body.c_id}).lean().exec((err,data)=>
{
    if(data)
    {
        console.log(data)
        let restlist = [];
 
        for(a in data)
      {
          restlist.push(data[a].r_id)
      }

        Restaurant_Registration.find({_id:{$in:restlist}}).exec((err,dataa)=>
        {
        
            // res.send(data)
            callback(null,dataa)
        })


    }
})


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