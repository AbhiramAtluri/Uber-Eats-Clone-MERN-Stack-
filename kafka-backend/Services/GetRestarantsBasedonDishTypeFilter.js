
var restget = require('./models/restgetrequests')

function handle_request(msg,callback)
{

//console.log("hello")

console.log("Get all nearest restaurants");

restget.getRestaurantsBasedonVegFilter(msg,callback)
// restget.getFarAwayRestaurants(msg,callback)
// callback(null,"Success");
// restget.getAllnearestRestaurants(msg,callback)
// callback(null,"Success");

console.log("After Callback");
}

exports.handle_request = handle_request;