var express = require('express');
var router = express.Router();
var auth = require('../models/authentication')

//Router listening

router.post('/custreg',auth.customerRegistration)
router.post('/custlog',auth.customerLogin)
router.post('/CustomerProfileFetch',auth.getCustomerProfileDetails)
router.post('/CustomerProfileUpdate',auth.updateCustomerProfile)

module.exports = router