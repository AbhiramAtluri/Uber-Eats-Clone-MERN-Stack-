var express = require('express');
var router = express.Router();
var auth = require('../models/authentication')
var restget = require('../models/restgetrequests')
var dishrequests = require('../models/dishrequest')
var kafka = require('../kafka/client')

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
            res.json({
                ...results
            });

        }
    })



})

///Profile API'S


router.post('/RestProfUpdate', (req, res) => {
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
router.post('/getRestaurantProfileDetails',(req,res)=>{
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
router.post('/addish', (req,res)=>
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
router.post('/EditDish', (req,res)=>
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
router.get('/ProfileBasedOnCid',(req,res)=>
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
router.get("/GetAllRestaurants",(req,res)=>
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
router.get('/details/:r_email',(req,res)=>

{
    console.log("Get Restaurant details from email");
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



router.post('/GetDish', dishrequests.getDish)



//Adding Restaurant to favourites

//router.post('/AddRestToFav', restget.AddRestaurantToFavourites)
router.post('/AddRestToFav', (req,res)=>
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

//router.post('/GetFavRest', restget.GetAllTheFavRestaurants)
router.post('/GetFavRest',(req,res)=>
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
        res.json({
            ...results
        });
        res.end();
    }


    })
})

//router.post('/GetAllNearestRestaurants', restget.getAllnearestRestaurants)

router.post('/GetAllNearestRestaurants', (req,res)=>{
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
        res.json({
            ...results
        });
        res.end();
    }


    })

})
//router.post('/GetFarAwayRestaurants', restget.getFarAwayRestaurants)


router.post('/GetFarAwayRestaurants',(req,res)=>
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
        res.json({
            ...results
        });
        res.end();
    }


    })
})
//Get Restaurant based on dish
// router.post('/GetRestaurantsBasedOnDish', restget.getRestaurantsBasedOnDish)
router.post('/GetRestaurantsBasedOnDish', (req,res)=>
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
            res.json({
                ...results
            });
            res.end();
        }





    })
})

//router.post('/GetRestarantsBasedonDishTypeFilter', restget.getRestaurantsBasedonVegFilter)

router.post('/GetRestarantsBasedonDishTypeFilter', (req,res)=>
{
    console.log(req.body);
    kafka.make_request("GetRestarantsBasedonDishTypeFilter",(req,res)=>
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
            res.json({
                ...results
            });
            res.end();
        }

    })
})






//Restaurant get requests listing

router.get('/GetAllDishes', dishrequests.getAllDishes)


// router.post('/GetFarAwayRestaurants', restget.getFarAwayRestaurants)


//Adding Restaurant to favourites

//router.post('/AddRestToFav', restget.AddRestaurantToFavourites)
//GETTING favourite restaurants


//Getting fav restaurants id's
router.post('/GetFavRestID', restget.GetFavResterauntIds)



module.exports = router;
