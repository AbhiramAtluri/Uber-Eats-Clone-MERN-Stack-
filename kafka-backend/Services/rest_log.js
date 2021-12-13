var auth =require('./models/authentication');

function handle_request(msg,callback)
{

console.log("In Restaurant Login")
console.log(msg)

auth.resterauntLogin(msg,callback)

}

exports.handle_request = handle_request;