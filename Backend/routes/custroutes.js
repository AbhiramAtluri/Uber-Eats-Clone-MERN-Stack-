var express = require('express');
var router = express.Router();
var auth = require('../models/authentication')
var delivery = require('../models/Delivery')
var Order = require('../models/Orderrequest')

//Router listening

router.post('/custreg',auth.customerRegistration)
router.post('/custlog',auth.customerLogin)

//Fetching Customer Profile
router.post('/CustomerProfileFetch',auth.getCustomerProfileDetails)




/// get Profile based on Id
router.post('/CustomerProfileBasedOnId',auth.getCustomerProfileBasedOnCid)


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
//Fetching Orders List for Customer Landing Page
// router.post('/FetchOrdersForCustomer',Order.fetchOrdersForCustomerOrderPage)
//Fetching restaurant name by id
 router.post('/FetchRestaurantDetailsById',Order.fetchRestaurantDetailsbyId)

 router.post('/FetchCustomerDetailsById',Order.fetchCustomerDetailsbyId)

router.post('/FetchRestaurantNameFromCustId',Order.FetchRestaurantNameFromCustId)

router.post('/FetchDelAddressInCustomerOrders',delivery.FetchDelAddressInCustomerOrders)

router.post('/UpdateOrderStatus',Order.UpdateOrderStatus)


module.exports = router