// var auth =require('./models/authentication');
var Order = require('./models/Orderrequest')

function handle_request(msg,callback)
{

console.log("Inside Cacel order handler");
console.log(msg)
Order.CancelOrderCustomer(msg,callback)
console.log("After callback")
}

exports.handle_request = handle_request;