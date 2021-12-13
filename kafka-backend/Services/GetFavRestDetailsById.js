var getRest = require('./models/restgetrequests')


function handle_request(msg,callback)
{
   
    console.log("hello")
console.log("In get fav Restaraunts details by id" );

getRest.GetAllTheFavRestaurantsDetails(msg,callback);

console.log("After Callback");
}

exports.handle_request = handle_request;