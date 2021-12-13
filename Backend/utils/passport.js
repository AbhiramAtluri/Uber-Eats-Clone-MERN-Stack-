"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("../config");
const Customer_Registration_Model = require("../MongoModels/CustomerModel")
const Restaurant_Registration_Model = require("../MongoModels/RestaurantModel")
// Setup work and export for the JWT passport strategy
function auth() {
    console.log("In Auth")
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
             const _id = jwt_payload._id;
            console.log(_id+"Inpassport.js")
            console.log(jwt_payload.r_email+"Email")
            console.log(jwt_payload.type+"Type")
         
             
            if(jwt_payload.type  == "cust")
            {
            Customer_Registration_Model.findById(_id, (err, results) => {
                console.log("In Cust Passport")
                if (err) {
                    console.log("In here passport")
                    return callback(err, false);
                }
                if (results) {
                    console.log("In here passport")
                    callback(null, results);
                }
                else {
                    console.log("In here passport")
                    callback(null, false);
                }
            });
        }
        else if(jwt_payload.type  == "rest")
        {

            Restaurant_Registration_Model.findById(_id, (err, results) => {
                console.log("In rest passport")
                if (err) {
                    console.log("In here passport")
                    return callback(err, false);
                }
                if (results) {
                    console.log("In here passport")
                    callback(null, results);
                }
                else {
                    console.log("In here passport")
                    callback(null, false);
                }
            });



        }




        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });


