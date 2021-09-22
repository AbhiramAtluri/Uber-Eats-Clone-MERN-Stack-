const db = require("../database/db")
const path = require('path')


exports.AddDish = async function(req,res)

{

     let r_id = req.body.r_id;
     let d_name = req.body.d_name;
     let d_price = req.body.d_price;
     let d_category  = req.body.d_category;
     let d_picture = req.body.d_picture
     let d_description = req.body.d_description
     

     db.query("INSERT INTO dishes(r_id,d_name,d_price,d_category,d_picture,d_description) VALUES(?,?,?,?,?,?)",[r_id,d_name,d_price,d_category,d_picture,d_description])
     .then(resp =>
        {
           res.send("Success")         
        }).catch(err =>res.send("Invalid"))

   


}

exports.getDish = async function(req,res)

{
    
   let r_id = req.body.r_id

   db.query("SELECT * FROM dishes where dishes.r_id = ?",[r_id])
   .then(resp =>
    {
        resp = Object.values(JSON.parse(JSON.stringify(resp)));  
        console.log(resp[0])    
               res.json(resp[0])

    }).catch(err =>console.log(err))

}

exports.editDish = async function (req,res) {


   console.log("In edit dish")
   
   db.query("UPDATE dishes SET d_name = ?,d_price = ?,d_category = ?, d_picture =?, d_description = ? where d_id = ?",
   [req.body.d_name,req.body.d_price,req.body.d_category,req.body.d_picture,req.body.d_description, req.body.d_id,])
   .then(resp=>{

      res.send("Success")
   
   })
   .catch(err=>{console.log(err)})

   
}



