var getRest = require('./models/restgetrequests')


function handle_request(msg,callback)
{
   
    console.log("hello")
console.log("Get Nearest Restaurants")

getRest.getAllnearestRestaurants(msg,callback)

console.log("After Callback");
}

exports.handle_request = handle_request;