var getRest = require('./models/restgetrequests')


function handle_request(msg,callback)
{
   
    console.log("hello")
console.log("In Add Restaraunts");


//delivery.fetchOrders(msg,callback)
// getRest.getAllRestaurants(msg,callback)
getRest.AddRestaurantToFavourites(msg,callback)

console.log("After Callback");
}

exports.handle_request = handle_request;