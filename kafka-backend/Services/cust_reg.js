var auth =require('./models/authentication');

 function handle_request(msg,callback)
{
   
    console.log("hello")
console.log("Inside Kafka Cust Reg");


  auth.customerRegistration(msg,callback)

console.log("After Callback");
}

exports.handle_request = handle_request;
