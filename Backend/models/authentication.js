const db = require("../database/db")
const path = require('path')
const bcrypt = require('bcryptjs');
const saltRounds = 10;
var cookieParser = require('cookie-parser');


///Restaurant Signup page registration
exports.restregister = async function (req, res) {
   
    let rest_details =
    {
        email: req.body.r_email,
        name: req.body.r_name,
        password: req.body.r_password,
        location: req.body.r_state


    }
    // console.log(rest_details)
    // res.send("Invalid Email")


   
    db.query("SELECT * from res_reg where r_email = ?", [rest_details.email])
        .then(resp => {
            if (resp[0].length > 0) {

                res.send('Invalid')

            }
            else {
                resterauntRegisterInsert(rest_details, res)

            }



        })




}


///Reciving res from above function so that we can response back to front end
resterauntRegisterInsert = async (data, res) => {

    const hash= await bcrypt.hash(data.password,5)

  await db.query('INSERT INTO res_reg(r_name,r_password,r_state,r_email,del_type) VALUES(?,?,?,?,?)', [data.name,hash, data.location, data.email,"s_both"])
    .then(
        ret => {
            console.log("User registered successfulyy")
            res.send("Success")

        }).catch(err => { console.log(err) })


//    }


}


///Resteraunt login API

exports.resterauntLogin = async function (req, res) {
    let r_log_details =
    {
        email: req.body.r_email,
        pass: req.body.r_password
    }

    console.log(req.body + "reqbody")
    console.log("in")
    console.log(r_log_details)
    console.log(r_log_details.email + "" + r_log_details.pass)
   let resp= await  db.query('select r_password from res_reg where r_email = ?', [r_log_details.email])

   resp = Object.values(JSON.parse(JSON.stringify(resp)));
   const validPass = await bcrypt.compare(r_log_details.pass,(resp[0])[0].r_password)
   console.log(validPass)
  


   if(validPass)
       {

    //    res.cookie('cookie',r_log_details.email)
          res.cookie('cookie','admin',{maxAge: 900000, httpOnly: false, path : '/'})
          req.session.user = user
         res.send("Login successfull")


     } else {
         res.send("Invalid credentials")
     }

}



////API for fetching Restaurant Profile


exports.resterauntProfile = async function (req, res) {

   

    console.log(data)

    let profileDetails =
    {
        rid: req.body.rid,
        r_name: req.body.r_name,
        r_location: req.body.r_location,
        r_pictures : req.body.r_pictures,
        r_contact: req.body.r_contact,
        r_description: req.body.r_description,
        d_type:req.body.d_type,
        r_address:req.body.r_address
    }
    console.log(profileDetails)
    res.send('hello')

    db.query('INSERT INTO r_profile(rid,r_name,r_location,r_description,r_pictures,r_contact,d_type,r_address) VALUES(?,?,?,?,?,?,?,?)',
        [profileDetails.rid, profileDetails.r_name, profileDetails.r_location, profileDetails.r_description,profileDetails.r_pictures, profileDetails.r_contact,profileDetails.d_type,profileDetails.r_address]).then(

            resp => {
                //    console.log(resp)
                res.send("prof reg succ")

            }

        ).catch(err => { console.log(err) })

}
/////API for Customer registration

exports.customerRegistration = async function (req, res) 

{

    let cust_details =
    {
        c_name: req.body.c_name,
        c_email: req.body.c_email,
        c_password: req.body.c_password
    }
    console.log(cust_details)
    let resp = await db.query("SELECT c_password from cust_reg where c_email = ?", [cust_details.c_email])
        
            if (resp[0].length > 0) {
              ///Invalid is sent if email is already in use
                res.send('Invalid')

            }
            else
            {
               const hash = await bcrypt.hash(cust_details.c_password,5)


               await db.query('INSERT INTO cust_reg(c_name,c_email,c_password) VALUES(?,?,?)', [cust_details.c_name, cust_details.c_email, hash])
                .then((resp) => {
                       console.log(resp)
                       res.send("success")
                })


            }
    }
/////Customer login Authentication
    exports.customerLogin = async function(req,res)
    {

        let cust_details =
        {
            c_email: req.body.c_email,
            c_password: req.body.c_password
        }
        console.log("login")
        console.log(cust_details)
     let resp = await db.query('select c_password ,c_id,c_email from cust_reg where cust_reg.c_email = ?', [cust_details.c_email])
    
           
            if (resp[0].length > 0) {
                  
                resp = Object.values(JSON.parse(JSON.stringify(resp)));

                const validpass = await bcrypt.compare(cust_details.c_password,(resp[0])[0].c_password)
                 console.log(resp[0])
                 console.log((resp[0])[0].c_id)
                 let num = (resp[0])[0].c_id
                 let c_email = (resp[0])[0].c_email
                // res.send("Login successfull")
                if(validpass)
                {
                res.json(
                    {
                        message:"Login successfull",
                        c_id :num,
                        c_email:c_email
                    }
                )
            }
            else
            {
                res.json("Invalid credentials")
            }


            } else {
                res.send("Invalid credentials")
            }
    



    }
/////Getting Restaurant profile details
    exports.getRestaurantProfile = async function(req,res)
    
    {
     let   r_id = req.body.r_id
      
        console.log(req.body.r_id)
        
       db.query('SELECT * from res_reg where r_id = ?',[r_id])
       .then(resp=>
        { 
            console.log(resp[0])
              res.json(resp[0])
        }
        ).catch(err=>{console.log(err)})


    }
/////////Updating restaurant profile///////
    exports.updateRestaurantProfile = async function (req,res) {

        console.log(req.body)
        console.log(req.body.r_contact)
        let r_number = req.body.r_number
        let r_name = req.body.r_name
        let r_state = req.body.r_state
        let r_email = req.body.r_email
        let r_description = req.body.r_description

        let r_opentime = req.body.r_opentime
        let r_closetime = req.body.r_closetime
        let r_county = req.body.r_county
        let r_picture = req.body.r_picture
        let r_id = req.body.r_id
        let del_type =req.body.del_type
        let r_address = req.body.r_address
         console.log(req.body)
        
     db.query("UPDATE res_reg SET r_name = ? ,r_state = ?, r_email = ?,r_description = ?,r_number = ?,r_opentime = ?,r_closetime = ?,r_county = ?,r_picture =?,del_type = ?,r_address =? where r_id = ?",[r_name,r_state,r_email,r_description,r_number,r_opentime,r_closetime,r_county,r_picture,del_type,r_address,r_id] )
     .then(resp =>{
         console.log(resp)
         res.send("Success")
        }).catch(err =>{
            console.log(err) 
        })

        
    }


    ////API for Fetching Customer details

    exports.getCustomerProfileDetails = async function(req,res)
    {
      
        

       db.query('SELECT * from cust_reg where c_email = ?',[req.body.c_email] )
       .then(resp =>{
        resp = Object.values(JSON.parse(JSON.stringify(resp)));
           res.json(resp[0])
       })


    }

   exports.getCustomerProfileBasedOnCid = async function(req,res)
   
   {
       console.log("sdasdasd")
     console.log(req.body)

    db.query('SELECT c_id,c_email,c_name,c_dob,c_city,c_state,c_country,c_number,c_profilepic,c_nickname,c_county,c_description from cust_reg where c_id = ?',[req.body.c_id] )
    .then(resp =>{
        console.log("hi")
     resp = Object.values(JSON.parse(JSON.stringify(resp)));
        res.json(resp[0])
    })


   } 




    exports.updateCustomerProfile = async function(req,res)
    {
        console.log(req.body)
        let queryvalues = [req.body.c_name,req.body.c_email,req.body.c_dob,req.body.c_city,req.body.c_state,req.body.c_country,req.body.c_number,req.body.c_profilepic,req.body.c_nickname,req.body.c_county,req.body.c_description,req.body.c_id]
      
        db.query("UPDATE cust_reg SET c_name = ?,c_email = ?,c_dob = ?,c_city = ?,c_state = ?, c_country = ?,c_number = ?,c_profilepic = ?,c_nickname = ?,c_county = ?,c_description = ?  where c_id = ?",queryvalues)
        .then(resp=>
            {
                // console.log(resp)
                res.send("Success")
            }
            ).catch(err=>
                {console.log(err)
                }
                ) 

    }