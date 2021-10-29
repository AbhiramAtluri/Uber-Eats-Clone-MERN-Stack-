var getRest = require('./models/restgetrequests')


function handle_request(msg,callback)
{
   
    console.log("hello")
console.log("get all restaurants");


//delivery.fetchOrders(msg,callback)
getRest.getAllRestaurants(msg,callback)

console.log("After Callback");
}

exports.handle_request = handle_request;