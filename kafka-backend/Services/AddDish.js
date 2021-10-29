var dish = require('./models/dishrequest')

 function handle_request(msg,callback)
{
   
    console.log("hello")
console.log("Inside Kafka Add dish");

dish.AddDish(msg,callback)
//   auth.customerRegistration(msg,callback)

console.log("After Callback");
}

exports.handle_request = handle_request;