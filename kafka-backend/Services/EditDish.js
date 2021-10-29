var dish = require('./models/dishrequest')

 function handle_request(msg,callback)
{
   
    console.log("hello")
console.log("Inside Kafka Edit dish");

dish.editDish(msg,callback)
//   auth.customerRegistration(msg,callback)

console.log("After Callback");
}

exports.handle_request = handle_request;