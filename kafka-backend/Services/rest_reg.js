var auth =require('./models/authentication');

function handle_request(msg,callback)
{
   
    console.log("hello")
console.log("Inside Kafka Rest Reg");
console.log(msg)

auth.restregister(msg,callback)
  // callback(null,"Hello Restaurant Rgister")

console.log("After Callback");
}

exports.handle_request = handle_request;