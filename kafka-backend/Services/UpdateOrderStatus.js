// var auth =require('./models/authentication');
var Order = require('./models/Orderrequest')

function handle_request(msg,callback)
{

console.log("Inside Rest Profile Update");
console.log(msg)
// auth.updateRestaurantProfile(msg,callback)
//  callback(null,"success")
Order.UpdateOrderStatus(msg,callback)
}

exports.handle_request = handle_request;