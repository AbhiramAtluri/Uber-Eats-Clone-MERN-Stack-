var auth =require('./models/authentication');

function handle_request(msg,callback)
{

console.log("Inside get Restaurant Profile");
console.log(msg)

auth.getRestaurantProfile(msg,callback)


//   callback(null,"success")
}

exports.handle_request = handle_request;