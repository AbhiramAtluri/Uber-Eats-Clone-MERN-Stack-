var auth =require('./models/authentication');

function handle_request(msg,callback)
{

console.log("Inside update Customer Profile");
console.log(msg)

auth.updateCustomerProfile(msg,callback)


//auth.updateRestaurantProfile(msg,callback)
//  callback(null,"success")
}

exports.handle_request = handle_request;