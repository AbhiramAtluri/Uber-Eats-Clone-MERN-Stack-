var auth =require('./models/authentication');

function handle_request(msg,callback)
{

console.log("Inside Cust Log");
console.log(msg)
 auth.customerLogin(msg,callback)
 //callback(null,"success")
}

exports.handle_request = handle_request;