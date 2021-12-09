const db = require("../database/db")
const path = require('path')
const url = require('url')
const Restaurant_Registration = require('../MongoModels/RestaurantModel');
const Customer_Registration_Model = require("../MongoModels/CustomerModel");
const FavouriteModel = require("../MongoModels/CustomerFavouritesModel");
const DishModel = require("../MongoModels/Dishes");

exports.getRestaurantDetails = async function(req,res)
{
   
    let r_email  = req.params['r_email']


    db.query('SELECT * from res_reg where r_email = ?',[r_email]).then(

        resp =>
        {  
            resp = Object.values(JSON.parse(JSON.stringify(resp)));
             console.log(resp[0])
            console.log((resp[0])[0])
            res.send(
                {
                    "r_name" :(resp[0])[0].r_name,
                    "r_id" : (resp[0])[0].r_id,
                    "r_picture" : (resp[0])[0].r_picture,
                    "r_description": (resp[0])[0].r_description,
                    "del_type":(resp[0])[0].del_type,
                    "r_address":(resp[0])[0].r_address,
                    "r_opentime":(resp[0])[0].r_opentime,
                    "r_closetime":(resp[0])[0].r_closetime,
                    "r_email":(resp[0])[0].r_email,
                    "r_number":(resp[0])[0].r_number
                }
            )
        }
    ).catch(err=>{
        console.log(err)
    })
    


}


exports.getAllRestaurants = async function(req,res)
{

Restaurant_Registration.find({},(err,resp)=>
{
    if(resp)
    {
        res.json(resp)
    }
})

}

//GET ALL RESTAURANTS FROM NEAREST LOCATION

exports.getAllnearestRestaurants = async function(req,res)
{
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
         res.json(rest)
     }else
     {
         res.json({
             message:"NoLoc"
         })
     }

 })

}

} 

//GET RESTERAUNTS AWAY FROM LOCATION

exports.getFarAwayRestaurants = async function(req,res)

{
    console.log(req.body.c_county)
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
    console.log("In Here")
    let d_type = req.body.d_type
    

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

         }
         else
         {
             console.log("Error")
         }
        // Restaurant_Registration.find({})
        

     })


}


///ADDING RESTAURANT TO FAVOURITES


exports.AddRestaurantToFavourites = async function(req,res)
{
  
    var newFav = new FavouriteModel(
        {
            c_id:req.body.c_id,
            r_id:req.body.r_id

        }
       
        
        )

        newFav.save((err,data)=>
        {  if(err)
            {
                res.send(err)
            }else
            {
                console.log(data)
                res.send(data)
            }
            
        })
}

//GETTING ALL THE FAVOURITE RESTAURANTS

exports.GetAllTheFavRestaurants = async function(req,res)
{

console.log(req.body.c_id)


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

        Restaurant_Registration.find({_id:{$in:restlist}}).exec((err,data)=>
        {
        
            res.send(data)
        })


    }
})





}


///GET all REST ID OF CUSTOMER FAVOURITES

exports.GetFavResterauntIds = async function(req,res)
{

console.log("hey")
  FavouriteModel.find({c_id:req.body.c_id},(err,data)=>
{  if(data)
    {
        //console.log(data)
    res.json(data)
    }
    if(err)
    {
        console.log(err)
    }
}
)


}