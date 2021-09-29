var express = require('express');
var router = express.Router();
var auth = require('../models/authentication')
var delivery = require('../models/Delivery')


//Router listening

router.post('/custreg',auth.customerRegistration)
router.post('/custlog',auth.customerLogin)
router.post('/CustomerProfileFetch',auth.getCustomerProfileDetails)
router.post('/CustomerProfileUpdate',auth.updateCustomerProfile)

///Adding addresses
router.post('/AddDeliveryAddress',delivery.DeliveryAddressAdd)
//Fetching delivery address
router.post('/FetchDelAddress',delivery.FetchDelAddress)



module.exports = router