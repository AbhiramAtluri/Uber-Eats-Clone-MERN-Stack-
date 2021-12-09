
var restget = require('./models/restgetrequests')

function handle_request(msg,callback)
{
   
    console.log("hello")
console.log("In get faraway Restaraunts");


//delivery.fetchOrders(msg,callback)
// getRest.getAllRestaurants(msg,callback)
// getRest.AddRestaurantToFavourites(msg,callback)
// getRest.GetFavResterauntIds(msg,callback)

restget.getFarAwayRestaurants(msg,callback)
// callback(null,"Success");

console.log("After Callback");
}

exports.handle_request = handle_request;