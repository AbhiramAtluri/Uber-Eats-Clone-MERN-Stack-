var express = require('express');
var router = express.Router();
var auth = require('../models/authentication')

//Router listening

router.post('/custreg',auth.customerRegistration)
router.post('/custlog',auth.customerLogin)

module.exports = router