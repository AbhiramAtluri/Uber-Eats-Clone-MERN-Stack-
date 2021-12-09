var delivery = require('./models/Delivery')

 function handle_request(msg,callback)
{
   
    console.log("hello")
console.log("Inside Kafka Place Order");

// delivery.FetchDelAddressInCustomerOrders(msg,callback)
// delivery.placingOrder(msg,callback)
delivery.fetchingCustNumber(msg,callback)

console.log("After Callback");
}

exports.handle_request = handle_request;