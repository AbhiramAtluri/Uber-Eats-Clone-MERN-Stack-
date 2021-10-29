var auth =require('./models/authentication');

function handle_request(msg,callback)
{

console.log("Inside get customer profile based on C_ID");
console.log(msg)

//  auth.getRestaurantProfile(msg,callback)
auth.getCustomerProfileBasedOnCid(msg,callback)

//   callback(null,"success")
}

exports.handle_request = handle_request;