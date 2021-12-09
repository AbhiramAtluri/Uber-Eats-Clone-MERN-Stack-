var auth =require('./models/authentication');

function handle_request(msg,callback)
{

console.log("Inside get Customer Profile details");
console.log(msg)

//  auth.getRestaurantProfile(msg,callback)
auth.getCustomerProfileDetails(msg,callback)

//   callback(null,"success")
}

exports.handle_request = handle_request;