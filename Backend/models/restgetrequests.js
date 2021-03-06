const db = require("../database/db")
const path = require('path')
const url = require('url')

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
    
//    console.log("hello rst details")
//     console.log(req.url)
//     console.log(req.params['r_email'])

}


exports.getAllRestaurants = async function(req,res)
{

db.query("Select * from res_reg ").then(resp=>{

  res.json(resp[0])

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
   
console.log(req.body.c_county)
    db.query("select * from res_reg where r_county =?",[req.body.c_county])
    .then(
        resp=>{
            if(resp[0].length>=1)
            {
            res.json(resp[0])
            }
            else
            {
                res.json(
                    {
                        message:"NoLoc"
                    })
            }
        }
        )
    .catch(err=>{
        console.log(err)
    })

}
} 

//GET RESTERAUNTS AWAY FROM LOCATION

exports.getFarAwayRestaurants = async function(req,res)

{
    console.log(req.body.c_county)

    db.query("select * from res_reg where r_county !=?",[req.body.c_county])
    .then(
     resp=>
     {
         res.json(resp[0])
     }
    )

}

//GET RESTAURANT BASED ON DISH

exports.getRestaurantsBasedOnDish = async function(req,res)

  {
      console.log(req.body.s_dish)
      let s_dish = '%' + req.body.s_dish+ '%'

  db.query("SELECT  *  FROM res_reg WHERE r_id IN(SELECT r_id from dishes where d_name LIKE N?)",[s_dish] )
  .then(resp=>
    {

      if(resp[0].length>1)
      {  
      res.json(resp[0])
      }
      else
      {
          res.json({
              message : "NoDish"
          })
      }


    }
    ).catch(err=>{console.log(err)})
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
}


///ADDING RESTAURANT TO FAVOURITES


exports.AddRestaurantToFavourites = async function(req,res)
{

    db.query("INSERT INTO c_fav(c_id,r_id) VALUES(?,?)",[req.body.c_id,req.body.r_id])
    .then(resp=>
        {
            res.json(resp)
        })
     .catch
     (
         err=>{
             res.json(err)
         }
     )   


}

//GETTING ALL THE FAVOURITE RESTAURANTS

exports.GetAllTheFavRestaurants = async function(req,res)
{
   db.query("SELECT  t1.r_name, t1.r_state,t1.r_email,t1.r_county,t1.r_opentime,t1.r_closetime,t1.r_id,t1.r_picture FROM res_reg t1 INNER JOIN  c_fav t2 ON t1.r_id=t2.r_id WHERE t2.c_id=? GROUP BY t2.r_id  ",[req.body.c_id])
   .then(resp=>
    {
       res.json(resp[0])

    }
    )
    .catch(err =>
        {
            res.json(err)
        }
        )


}


///GET all REST ID OF CUSTOMER FAVOURITES

exports.GetFavResterauntIds = async function(req,res)
{
// console.log("in fav rest")
//   console.log(req.body.c_id)  
  db.query("SELECT r_id FROM c_fav WHERE c_id =?",[req.body.c_id])
  .then(resp=>{res.json(resp[0])})
  .catch(err=>{res.json(err)})


}