var getRest = require('./models/restgetrequests')


function handle_request(msg,callback)
{
   
    console.log("hello")
console.log("get restaurant details from email");


//delivery.fetchOrders(msg,callback)
//getRest.getAllRestaurants(msg,callback)
getRest.getRestaurantDetails(msg,callback)

console.log("After Callback");
}

exports.handle_request = handle_request;