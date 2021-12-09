var Order = require('./models/Orderrequest')

function handle_request(msg,callback)
{

console.log("Inside feth cust details by id");
console.log(msg)

//Order.UpdateOrderStatus(msg,callback)
Order.fetchCustomerDetailsbyId(msg,callback)


}

exports.handle_request = handle_request;