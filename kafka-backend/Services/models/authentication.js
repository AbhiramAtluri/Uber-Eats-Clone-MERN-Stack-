// const db = require("../database/db")
const path = require('path')
const bcrypt = require('bcryptjs');
const saltRounds = 10;
var cookieParser = require('cookie-parser');
const Customer_Registration = require('../MongoModels/CustomerModel');
const Restaurant_Registration = require('../MongoModels/RestaurantModel');




///Restaurant Signup page registration
exports.restregister = async function (msg,callback) {
      

    let req = {body:{...msg}};
    
    const hash= await bcrypt.hash(req.body.r_password,5)
        let rest_details1 = new Restaurant_Registration(
        {
        
            r_name :req.body.r_name,
            r_password:hash,
            r_state:req.body.r_state,
            r_email:req.body.r_email,
            r_description:null,
            r_number:null,
            r_opentime:null,
            r_closetime:null,
            r_county:null,
            r_zipcode:null,
            r_picture:null,
            del_type:null,
            r_address:null
    
        });


        Restaurant_Registration.findOne({r_email:req.body.r_email},(err,rest)=>
        {

         if(rest)
         {
            //  res.send('Invalid')
             callback(null,{message:"Invalid"})
         } 
         else
          {
              rest_details1.save((err,data)=>
              {
                if(err)
                {
                    console.log(err)
                    
                }else
                {
                   //res.send("Success") 
                   callback(null,{message:"Success"})
                } 
              })
          }



        })






}


// ///Reciving res from above function so that we can response back to front end
// resterauntRegisterInsert = async (data, res) => {

//     const hash= await bcrypt.hash(data.password,5)

//   await db.query('INSERT INTO res_reg(r_name,r_password,r_state,r_email,del_type) VALUES(?,?,?,?,?)', [data.name,hash, data.location, data.email,"s_both"])
//     .then(
//         ret => {
//             console.log("User registered successfulyy")
//             res.send("Success")

//         }).catch(err => { console.log(err) })


// //    }


// }


///Resteraunt login API

exports.resterauntLogin = async function (msg,callback) {

   let req = {body:{...msg}}
   console.log("In Rest Login model")
   console.log(req.body.r_email)
   Restaurant_Registration.findOne({r_email:req.body.r_email},async(err,rest)=>
   {
       console.log("heyey")
     if(rest)
     {
       console.log(rest)
   const validPass = await bcrypt.compare(req.body.r_password,rest.r_password)
   console.log(rest.r_password)
      if(validPass)
      {
       callback(null,{message:"Login successfull"})
      }else{
        callback(null,{message:"Invalid credentials"})
     } 
     }
     else
     {
         callback(null,{message:"Invalid"})
     } 
   }
   )





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

exports.customerRegistration = async function (msg,callback) 

{
    console.log("In Cust Reg")
console.log(msg)

            
            const hash = await bcrypt.hash(msg.c_password,5)

            let cust_details1 = new Customer_Registration(
            {
                c_name: msg.c_name,
                c_email: msg.c_email,
                c_password: hash,
                c_dob:null,
                c_city:null,
                c_state:null,
                c_country:null,
                c_number:null,
                c_profilepic:null,
                c_nickname:null,
                c_country:null,
                c_description:null,
        
            });

            let sendData = ""
            
        Customer_Registration.findOne({c_email:msg.c_email},(err,cust)=>
            {
             if(cust){
                sendData =  "Invalid"
                callback(null,"Invalid")
             }
             else{
             cust_details1.save((err,data)=>
             {
             console.log("In Cust Save")
             if(err)
             {
                 sendData = err;
                 console.log(err)
                 callback(null,err)
             }else
             {
                sendData =  "Success"; 
                callback(null,"Success")
             }     


             })
            


             } 
               


            }
            );

    console.log("This is" +sendData)


    // return sendData

    }
/////Customer login Authentication
    exports.customerLogin = async function(msg,callback)
    {
        // console.log(req.body)
        console.log("Inside Login Authentication")
      let  req =  {
                        body:{...msg}
            }
        console.log(req)

        let cust_details =
        {
            c_email: req.body.c_email,
            c_password: req.body.c_password
        }
        console.log(req.body.c_email)
          
       Customer_Registration.findOne({c_email:req.body.c_email},async(err,cust)=>
       {
            if(cust)
            {
                const validPass = await bcrypt.compare(req.body.c_password,cust.c_password)
                console.log(cust);
                //console.log(object)
                if(validPass)
                {
                   
                       callback(null,{message:"Login successfull",
                       c_id :cust._id,
                       c_email:cust.c_email
                    }) 
                }
                else
                {
                    // res.json({message:"Invalid credentials"})
                    callback(null,{message:"Invalid credentials"})
                }


            }  
            else
            {
                console.log("No Data")
                callback(null,"No Data")
            }

       }
       )






    }
/////Getting Restaurant profile details
    exports.getRestaurantProfile = async function(msg,callback)
    
    {

    let req = {body:{...msg}}

     let   r_id = req.body.r_id
      
        console.log(req.body.r_id)
        


       Restaurant_Registration.findOne({_id :r_id},async(err,profile)=>
       {
        console.log(profile)
        if(profile)
        {
           
            callback(null,profile)
        }


       })



    }
    
/////////Updating restaurant profile///////
    exports.updateRestaurantProfile = async function (msg,callback) {
        
        let req = {body:{...msg}}
        console.log(req.body)
        console.log(req.body.r_contact)
        let r_number = req.body.r_number
        let r_name = req.body.r_name
        let r_state = req.body.r_state
        let r_email = req.body.r_email
        let r_description = req.body.r_description
        let r_zipcode =req.body.r_zipcode
        let r_opentime = req.body.r_opentime
        let r_closetime = req.body.r_closetime
        let r_county = req.body.r_county
        let r_picture = req.body.r_picture
        let r_id = req.body.r_id
        let del_type =req.body.del_type
        let r_address = req.body.r_address
         console.log(req.body)
        
    //  db.query("UPDATE res_reg SET r_name = ? ,r_state = ?, r_email = ?,r_description = ?,r_number = ?,r_opentime = ?,r_closetime = ?,r_county = ?,r_picture =?,del_type = ?,r_address =? where r_id = ?",[r_name,r_state,r_email,r_description,r_number,r_opentime,r_closetime,r_county,r_picture,del_type,r_address,r_id] )
    //  .then(resp =>{
    //      console.log(resp)
    //      res.send("Success")
    //     }).catch(err =>{
    //         console.log(err) 
    //     })
        
        Restaurant_Registration.updateOne({_id :req.body.r_id},{$set: {r_number : r_number,r_email:r_email,r_description:r_description,
        r_name:r_name,r_state:r_state,r_opentime:r_opentime,r_closetime:r_closetime,r_county:r_county,r_picture:r_picture,del_type:del_type,r_address:r_address,r_zipcode:r_zipcode}},(err,resp)=>
        { 
          if(resp)
          {  
        //    res.send("Success")
           callback(null,"Success")
          }else
          {
              console.log(err)
          }
        } )

     


        
    }


    ////API for Fetching Customer details

    exports.getCustomerProfileDetails = async function(msg,callback)
    {
        let req = {body:{...msg}}
     console.log(req)
     Customer_Registration.findOne({c_email:req.body.c_email},(err,cust)=>
     {
        if(cust)
        {
            // res.json(cust)
            callback(null,cust)
        }
     }
     )        



    }

   exports.getCustomerProfileBasedOnCid = async function(msg,callback)
   
   {
       console.log("In Customer Profile based on CID")
     let req = {body :{...msg}}
     


    Customer_Registration.findOne({_id:req.body.c_id},(err,resp)=>
    {
      if(resp)
      {
        //   res.json(resp);
        callback(null,resp)
      }
    })

   } 




    exports.updateCustomerProfile = async function(msg,callback)
    {
        // console.log(req.body)
        console.log(msg)
          
        let req = {body:{...msg}}

        let queryvalues = { c_name:req.body.c_name, c_email: req.body.c_email,c_dob:req.body.c_dob,c_city: req.body.c_city,c_state : req.body.c_state,c_country: req.body.c_country,c_number: req.body.c_number,c_profilepic: req.body.c_profilepic,c_nickname: req.body.c_nickname,c_county:req.body.c_county,c_description:req.body.c_description,c_id:req.body.c_id}
      
      
        Customer_Registration.updateOne({_id:req.body.c_id},{$set:queryvalues},(err,resp)=>
        {
           if(resp)
           {
            //    res.send("Success")
               callback(null,{ message: "Success"})
           }
           

        }
        )

    }