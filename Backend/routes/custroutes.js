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
//Fetching  cust number in final checkout page
router.post('/FetchCustNumber',delivery.fetchingCustNumber)
//Placing order
router.post('/PlaceOrder',delivery.placingOrder)
//Fetching Orders list
router.post('/FetchOrderList',delivery.fetchOrders)




module.exports = router