var delivery = require('./models/Delivery')

 function handle_request(msg,callback)
{
   
    console.log("hello")
console.log("Inside Kafka Fetch Delivery address in customer order");

// dish.AddDish(msg,callback)
//   auth.customerRegistration(msg,callback)
// delivery.FetchDelAddress(msg,callback)
delivery.FetchDelAddressInCustomerOrders(msg,callback)

console.log("After Callback");
}

exports.handle_request = handle_request;