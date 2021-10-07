var express = require('express');
var router = express.Router();
var auth = require('../models/authentication')
var restget = require('../models/restgetrequests')
var dishrequests = require('../models/dishrequest')

/* RestPost requests listing. */
router.post('/resreg', auth.restregister);
router.post('/resprof',auth.resterauntProfile)
router.post('/getRestaurantProfileDetails',auth.getRestaurantProfile)
router.post('/reslog',auth.resterauntLogin)
router.post('/addish',dishrequests.AddDish)
router.post('/GetDish',dishrequests.getDish)
router.post('/EditDish',dishrequests.editDish)
router.post('/RestProfUpdate',auth.updateRestaurantProfile)
router.get('/ProfileBasedOnCid',auth.getCustomerProfileBasedOnCid)
//Restaurant get requests listing
router.get('/details/:r_email',restget.getRestaurantDetails)
router.get('/GetAllDishes',dishrequests.getAllDishes)
router.get('/GetAllRestaurants',restget.getAllRestaurants)
router.post('/GetAllNearestRestaurants',restget.getAllnearestRestaurants)
router.post('/GetFarAwayRestaurants',restget.getFarAwayRestaurants)
router.post('/GetRestaurantsBasedOnDish',restget.getRestaurantsBasedOnDish)
//Adding Restaurant to favourites

router.post('/AddRestToFav',restget.AddRestaurantToFavourites)
//GETTING favourite restaurants

router.post('/GetFavRest',restget.GetAllTheFavRestaurants)
//Getting fav restaurants id's
router.post('/GetFavRestID',restget.GetFavResterauntIds)



module.exports = router;
