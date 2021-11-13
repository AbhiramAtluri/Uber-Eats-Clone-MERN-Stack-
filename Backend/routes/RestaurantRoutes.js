var express = require('express');
var router = express.Router();
var auth = require('../models/authentication')
var restget = require('../models/restgetrequests')
var dishrequests = require('../models/dishrequest')
var kafka = require('../kafka/client')
const { checkAuth } = require("../utils/passport");
const { secret } = require('../config');
const jwt = require('jsonwebtoken');
/* RestPost requests listing. */
router.post('/resreg', (req, res) => {
    console.log(req.body)
    kafka.make_request('rest_reg', req.body, function (err, results) {
        console.log("in Rest Reg backend");
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                msg: "Err"
            })
        } else {
            console.log("Sending postman response rest Reg")
            res.json({
                ...results
            });
            res.end();
        }
    })
})

//Restaurant Login
router.post('/reslog', (req, res) => {
    console.log("In Res Log bakcend")

    kafka.make_request('rest_log', req.body, function (err, results) {
        console.log("in Rest log backend");
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                msg: "Err"
            })
        } else {
            console.log("Sending postman response rest log")
            console.log(results)
            // res.json({
            //     ...results
            // });
            if(results.message == 'Login successfull')
            { console.log(results.c_id)
                const payload = {message:"Success",_id:results.r_id,r_email:results.r_email,type:"rest"};
                const token = jwt.sign(payload,secret,{ expiresIn: 1008000})
                res.status(200).json({token: 'JWT '+ token,_id:results.r_id,r_email:results.r_email,message:"Login successfull"}); 

            }
        }
    })



})

///Profile API'S


router.post('/RestProfUpdate',checkAuth, (req, res) => {
    console.log("In rest Profile Update");
    kafka.make_request('updateRestaurantProfile', req.body, function (err, results) {
        console.log(
            "In Res profile backend"
        )
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                msg: "Err"
            })
        } else {
            console.log("Sending postman response rest prof")
            res.json({
                results
            });

        }
    })
})
//Get Restaurant Profile.
router.post('/getRestaurantProfileDetails',checkAuth,(req,res)=>{
    console.log("Get Restaurant Profile")
    kafka.make_request('getRestaurantProfile', req.body, function (err, results) {
        console.log(req.body)
        console.log(
            "get Restaurant Profile"
        )
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                msg: "Err"
            })
        } else {
            console.log("Sending postman response get rest profile")
            res.json({
                ...results
            });

        }
    })




})
router.post('/addish',checkAuth, (req,res)=>
{
    console.log("Add dish")
    kafka.make_request("AddDish",req.body,function(err,results)
    {
        console.log(req.body);
        console.log("In ADD dish");
        if (err) {
            console.log("Inside err");
            res.json({
                msg: "Err"
            })
        } else {
            console.log("Sending postman response get Add Dish")

            res.json({
                results
            });

        }

    })
})
///Editing Dishes
router.post('/EditDish',checkAuth, (req,res)=>
{
    console.log("Edit Dishes")
    kafka.make_request("EditDish",req.body,function(err,results)
    {
        if (err) {
            console.log("Inside err");
            res.json({
                msg: "Err"
            })
        } else {
            console.log("Sending postman response get Edit Dish")

            res.json({
                results
            });

        }

    })
})
auth.getCustomerProfileBasedOnCid
///Getting customer profile based on c_id
router.get('/ProfileBasedOnCid',checkAuth,(req,res)=>
{
    console.log("Get Customer Profile based on Cid")
    kafka.make_request("ProfileBasedOnCid",req.body,function(err,results)
    {
        if (err) {
            console.log("Inside err");
            res.json({
                msg: "Err"
            })
        } else {
            console.log("Sending postman response Profile based on CID")

            res.json({
                results
            });

        }
    })

} )

///Customer landing page Rest get API'S
//router.get('/GetAllRestaurants', restget.getAllRestaurants)
router.get("/GetAllRestaurants",checkAuth,(req,res)=>
{
    // console.log(req.body)
    console.log("Get All Restaurants")
   kafka.make_request("GetAllRestaurants","Restaurant Get Request",function(err,results)
   {
       console.log("Get All Restaurants")
       console.log(results)
       if(err)
       {
           console.log("Inside err");
           res.json({
               msg:"Err"
           })
       }else
       {
           console.log("Sending postman response")
           res.json({
               ...results
           });
           res.end();
       }
   })
})
//Get Restaurant details from Email
//router.get('/details/:r_email', restget.getRestaurantDetails)
router.get('/details/:r_email',checkAuth,(req,res)=>

{
    console.log("Get Restaurant 11details from email");
    kafka.make_request("GetRestaurantDetailsFromEmail",req.params,function(err,results)
    {
    console.log("Get Details from email")
    if(err)
    {
        console.log("Inside err");
        res.json({
            msg:"Err"
        })
    }else
    {
        console.log("Sending postman response")
        res.json({
            ...results
        });
        res.end();
    }



    })
})




router.post('/resprof', auth.resterauntProfile)



router.post('/GetDish',checkAuth,(req,res)=>
{
    console.log("Get Restaurant dishes")
    kafka.make_request("GetDish",req.body,function(err,results)
    {
        if (err) {
            console.log("Inside err");
            res.json({
                msg: "Err"
            })
        } else {
            console.log("Sending postman response get dish")
           
            res.send(
                Object.values(results)
            );

        }
    })
})



//Adding Restaurant to favourites

//router.post('/AddRestToFav', restget.AddRestaurantToFavourites)
router.post('/AddRestToFav',checkAuth, (req,res)=>
{
    console.log("Add Restaurant to Favourites")
    kafka.make_request("AddRestToFav",req.body,function(err,results)
    {
        if (err) {
            console.log("Inside err");
            res.json({
                msg: "Err"
            })
        } else {
            console.log("Sending postman response add Restaurant to Fav")

            res.json({
                results
            });

        }
    })
})
///Get the fav rest details based on id in c_fav pagee
router.post('/GetFavRestDetails',checkAuth,(req,res)=>
{
    kafka.make_request("GetFavRestDetails",req.body,function(err,results)
    {
        console.log("Get Fav Restaurants Details")
        if(err)
    {
        console.log("Inside err");
        res.json({
            msg:"Err"
        })
    }else
    {
        console.log("Sending postman response")
        res.send(
            Object.values(results)
        );
        res.end();
    }


    })

})






router.post('/GetFavRest',checkAuth,(req,res)=>
{
    console.log("Get Fav Restaurants")
    kafka.make_request("GetFavRest",req.body,function(err,results)
    {
        console.log("Get Fav Restaurants")
        if(err)
    {
        console.log("Inside err");
        res.json({
            msg:"Err"
        })
    }else
    {
        console.log("Sending postman response")
        res.send(
            Object.values(results)
        );
        res.end();
    }


    })
})

//router.post('/GetAllNearestRestaurants', restget.getAllnearestRestaurants)

router.post('/GetAllNearestRestaurants',checkAuth, (req,res)=>{
    console.log(req.body);
    kafka.make_request("getAllNearestRestaurants1",req.body,function(err,results)
    {
        console.log("GetAllNearestRestaurants")
        if(err)
    {
        console.log("Inside err");
        res.json({
            msg:"Err"
        })
    }else
    {
        console.log("Sending postman response after GetAllNearestRestaurants")
        console.log(results)
        if(results.message == undefined)
        {
        res.send(
            Object.values(results)
        );
        }else
        {
            res.send(results)
        }
        res.end();
    }


    })

})
//router.post('/GetFarAwayRestaurants', restget.getFarAwayRestaurants)


router.post('/GetFarAwayRestaurants',checkAuth,(req,res)=>
{
    console.log("Get Far Fav Restaurants")
    console.log(req.body)
    kafka.make_request("GetFarAwayRestaurants",req.body,function(err,results)
    {
        console.log("Get Far  Restaurants")
        if(err)
    {
        console.log("Inside err");
        res.json({
            msg:"Err"
        })
    }else
    {
        console.log("Sending postman response Faraway")

        if(results.message!=undefined)
         {
         res.send(
            Object.values(results)
        );
         }
         else
         {
             res.send(results)
         }
        res.end();
    }


    })
})
//Get Restaurant based on dish
// router.post('/GetRestaurantsBasedOnDish', restget.getRestaurantsBasedOnDish)
router.post('/GetRestaurantsBasedOnDish',checkAuth, (req,res)=>
{
    console.log(req.body)
    kafka.make_request("GetRestaurantsBasedOnDish",req.body,function(err,results)
    {
        console.log("Get Restaurants based on dish");
        if(err)
        {
            console.log("Inside err");
            res.json({
                msg:"Err"
            })
        }else
        {
            console.log("Sending postman response after Get Restaurants based on dish")
            res.send(
                Object.values(results)
            );
            res.end();
        }





    })
})

//router.post('/GetRestarantsBasedonDishTypeFilter', restget.getRestaurantsBasedonVegFilter)

router.post('/GetRestarantsBasedonDishTypeFilter',checkAuth, (req,res)=>
{  console.log("Get restaurant based  on dish type filter___-")
    console.log(req.body);
    kafka.make_request("GetRestarantsBasedonDishTypeFilter",req.body,function(err,results)
    {
        console.log("Get restaurant based  on dish type filter");

        if(err)
        {
            console.log("Inside err");
            res.json({
                msg:"Err"
            })
        }else
        {
            console.log("Sending postman response after Get Restaurants based on dish")
            res.send(
                Object.values(results)
            );
            res.end();
        }

    })
})






//Restaurant get requests listing

// router.get('/GetAllDishes', dishrequests.getAllDishes)


// router.post('/GetFarAwayRestaurants', restget.getFarAwayRestaurants)


//Adding Restaurant to favourites

//router.post('/AddRestToFav', restget.AddRestaurantToFavourites)
//GETTING favourite restaurants


//Getting fav restaurants id's
// router.post('/GetFavRestID', restget.GetFavResterauntIds)



module.exports = router;
