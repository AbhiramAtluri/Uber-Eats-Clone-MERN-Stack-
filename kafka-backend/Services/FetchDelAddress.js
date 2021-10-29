var delivery = require('./models/Delivery')

 function handle_request(msg,callback)
{
   
    console.log("hello")
console.log("Inside Kafka Add delivery address");

// dish.AddDish(msg,callback)
//   auth.customerRegistration(msg,callback)
delivery.FetchDelAddress(msg,callback)


console.log("After Callback");
}

exports.handle_request = handle_request;