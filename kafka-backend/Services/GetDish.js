var dish = require('./models/dishrequest')

 function handle_request(msg,callback)
{
   
  
console.log("Inside Kafka get dish");

dish.getDish(msg,callback)


console.log("After Callback");
}

exports.handle_request = handle_request;