const db = require("../database/db")
const path = require('path')



///Resteraunt Signup page registration
exports.restregister = async function(req,res)
{
   
    let rest_details = 
    {
        email : req.body.r_email,
        name :req.body.r_name,
        password :req.body.r_password,
        location: req.body.r_state


    }
    console.log(rest_details)

    db.query("SELECT * from res_reg where email = ?",[rest_details.email])
    .then(resp =>{if(resp[0].length > 0 )
    {
      
        res.send('Email already there')

    }
    else
    {
     resterauntRegisterInsert(rest_details,res)
    }



})




}


///Reciving res from above function so that we can response back to front end
resterauntRegisterInsert = (data,res) =>
{
        db.query('INSERT INTO res_reg(email,r_password,location) VALUES(?,?,?)',[data.email,data.password,data.location])
    .then(
        ret => 
        {console.log(ret + "  User registered successfulyy")
        res.send("rest reg succesful")
    
}).catch(err =>{console.log(err)})

}


///Resteraunt login API

exports.resterauntLogin = async function(req,res)
{

     let email = req.body.email;
     let pass = req.body.r_password;
    console.log(email+ "" +pass)
     db.query('select * from res_reg where res_reg.email = ? and res_reg.r_password = ?',[email,pass])
     .then(resp =>{
         console.log(resp)
         if(resp[0].length >0)
           {
                  
            res.send("Login successfull")


           }else
           {
               res.send("Invalid credentials")
           }   
    })


}




    

exports.resterauntProfile = async function(req,res)
{
   
    const {name,data} = req.files.r_pictures
     
    console.log(data)

    let profileDetails = 
    {
        rid :req.body.rid,
        r_name :req.body.r_name,
        r_location : req.body.r_location,
        // r_pictures : req.body.r_pictures,
        r_contact : req.body.r_contact,
        r_description : req.body.r_description
              
    }
    console.log(profileDetails)
    res.send('hello')
    
    db.query('INSERT INTO r_profile(rid,r_name,r_location,r_description,r_pictures,r_contact) VALUES(?,?,?,?,?,?)',
   [profileDetails.rid,profileDetails.r_name,profileDetails.r_location,profileDetails.r_description,"adasdas",profileDetails.r_contact]).then(
       
        resp =>{
        //    console.log(resp)
           res.send("prof reg succ")

        }
        
        ).catch(err =>{console.log(err)})

}
