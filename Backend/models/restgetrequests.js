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
             
            console.log((resp[0])[0])
            res.send(
                {
                    "r_name" :(resp[0])[0].r_name,
                    "r_id" : (resp[0])[0].r_id,
                    "r_picture" : (resp[0])[0].r_picture,
                    "r_description": (resp[0])[0].r_description
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
