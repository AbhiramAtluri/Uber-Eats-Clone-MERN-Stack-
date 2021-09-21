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
                    "r_id" : (resp[0])[0].r_id
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