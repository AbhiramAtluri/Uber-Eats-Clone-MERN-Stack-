var auth =require('./models/authentication');

function handle_request(msg,callback)
{

console.log("Inside Rest Profile Update");
console.log(msg)
auth.updateRestaurantProfile(msg,callback)
//  callback(null,"success")
}

exports.handle_request = handle_request;