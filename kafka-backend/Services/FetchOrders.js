var delivery = require('./models/Delivery')

 function handle_request(msg,callback)
{
   
    console.log("hello")
console.log("Inside Kafka Fetch Orders");


delivery.fetchOrders(msg,callback)

console.log("After Callback");
}

exports.handle_request = handle_request;