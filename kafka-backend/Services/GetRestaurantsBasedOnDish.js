
var restget = require('./models/restgetrequests')

function handle_request(msg,callback)
{



console.log("Get Restaurants based on dish");

restget.getRestaurantsBasedOnDish(msg,callback)
//restget.getAllnearestRestaurants(msg,callback)

// callback(null,"Success");

console.log("After Callback");
}

exports.handle_request = handle_request;