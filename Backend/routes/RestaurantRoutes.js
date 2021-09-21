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
router.post('/RestProfUpdate',auth.updateRestaurantProfile)
//Restaurant get requests listing
router.get('/details/:r_email',restget.getRestaurantDetails)



module.exports = router;
