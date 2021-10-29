var Order = require('./models/Orderrequest')

function handle_request(msg,callback)
{

console.log("Inside Rest Profile Update");
console.log(msg)

//Order.UpdateOrderStatus(msg,callback)
Order.fetchRestaurantDetailsbyId(msg,callback)


}

exports.handle_request = handle_request;