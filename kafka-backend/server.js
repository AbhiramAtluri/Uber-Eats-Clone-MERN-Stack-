var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
// var Books = require('./services/books.js');
const { mongoDB } = require('./config');
const mongoose = require('mongoose');

var cust_reg =require('./Services/cust_reg');
var cust_log = require('./Services/cust_log');
var rest_reg = require('./Services/rest_reg');
var rest_log = require('./Services/rest_log');
var  updateRestaurantProfile = require('./Services/updateRestaurantProfile');
var getRestaurantProfile = require('./Services/getRestaurantProfile')
var getCustomerProfileDetails = require('./Services/getCustomerProfileDetails')
var updateCustomerProfile = require('./Services/updateCustomerProfile')
var getCustomerProfileBasedOnCid = require('./Services/getCustomerProfileBasedOnCid')
var AddDish = require('./Services/AddDish')
var EditDish = require('./Services/EditDish')
var AddDeliveryAddress = require('./Services/AddDeliveryAddress')
var FetchDelAddress = require('./Services/FetchDelAddress')
var FetchDelAddressInCustomerOrders  = require('./Services/FetchDelAddressInCustomerOrders')
var PlaceOrder = require('./Services/PlaceOrder')
var FetchCustNumber =require("./Services/FetchCustNumber")
var fetchOrders = require("./Services/FetchOrders")
var UpdateOrderStatus = require("./Services/UpdateOrderStatus")
var FetchRestaurantDetailsById = require("./Services/FetchRestaurantDetailsById")
var FetchRestaurantNameFromCustId = require('./Services/FetchRestaurantNameFromCustId')
var GetAllRestaurants = require("./Services/GetAllRestaurants")
var getRestaurantDetails = require("./Services/GetRestaurantDetailsFromEmail")
var AddRestToFav = require("./Services/AddRestToFav")
var GetFavRest = require("./Services/GetFavRest")
var GetAllNearestRestaurants1 = require('./Services/GetNearestRestaurants1')
var GetFarAwayRestaurants = require('./Services/GetFarAwayRestaurants');
var GetRestaurantsBasedOnDish = require('./Services/GetRestaurantsBasedOnDish');
var GetRestaurantsBasedonVegFilter = require('./Services/GetRestarantsBasedonDishTypeFilter')
var FetchCustomerDetailsById = require('./Services/FetchCustomerDetailsById')
var GetDish = require('./Services/GetDish')
var GetFavRestDetails = require('./Services/GetFavRestDetailsById')
var CancelOrderCustomer = require('./Services/CancelOrderCustomer')



function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');




    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize:500
  
  };


  mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
 
});



// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
 //handleTopicRequest("post_book",Books)
 handleTopicRequest("rest_reg",rest_reg);
  handleTopicRequest("cust_log",cust_log);
  handleTopicRequest("cust_reg",cust_reg);
  handleTopicRequest("rest_log",rest_log);
  handleTopicRequest("updateRestaurantProfile",updateRestaurantProfile);
  handleTopicRequest("getRestaurantProfile",getRestaurantProfile);
  handleTopicRequest("getCustomerProfileDetails",getCustomerProfileDetails);
  handleTopicRequest("updateCustomerProfile",updateCustomerProfile);
  handleTopicRequest("getCustomerProfileBasedOnCid",getCustomerProfileBasedOnCid);
  handleTopicRequest("GetDish",GetDish)
  handleTopicRequest("AddDish",AddDish);
  handleTopicRequest("EditDish",EditDish);
  handleTopicRequest("AddDeliveryAddress",AddDeliveryAddress);
   handleTopicRequest("FetchDelAddress",FetchDelAddress);
   handleTopicRequest("FetchDelAddressInCustomerOrders",FetchDelAddressInCustomerOrders);
   handleTopicRequest("PlaceOrder",PlaceOrder);
   handleTopicRequest("FetchCustNumber",FetchCustNumber);
   handleTopicRequest("FetchOrders",fetchOrders);
   handleTopicRequest("UpdateOrderStatus",UpdateOrderStatus);
   handleTopicRequest("FetchRestaurantDetailsById",FetchRestaurantDetailsById);
   handleTopicRequest("FetchRestaurantNameFromCustId",FetchRestaurantNameFromCustId);
   handleTopicRequest("GetAllRestaurants",GetAllRestaurants);
   handleTopicRequest("GetRestaurantDetailsFromEmail",getRestaurantDetails);
   handleTopicRequest("AddRestToFav",AddRestToFav);
   handleTopicRequest("GetFavRest",GetFavRest);
// handleTopicRequest("getAllnearestRestaurants",getAllnearestRestaurants);
   handleTopicRequest("GetFarAwayRestaurants",GetFarAwayRestaurants);
   handleTopicRequest("getAllNearestRestaurants1",GetAllNearestRestaurants1);
   handleTopicRequest("GetRestaurantsBasedOnDish",GetRestaurantsBasedOnDish);
   handleTopicRequest("GetRestarantsBasedonDishTypeFilter",GetRestaurantsBasedonVegFilter);
   handleTopicRequest("FetchCustomerDetailsById",FetchCustomerDetailsById);
   handleTopicRequest("GetFavRestDetails",GetFavRestDetails);
   handleTopicRequest("CancelOrderCustomer",CancelOrderCustomer);