const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Customer_Registration = new Schema(
    {
     c_name :{type: String},
     c_email:{type:String},
     c_dob:{type:String},
     c_city:{type:String},
     c_state:{type:String},
     c_country:{type:String},
     c_number:{type:String},
     c_profilepic:{type:String},
     c_nickname:{type:String},
     c_password:{type:String},
     c_country:{type:String},
     c_description:{type:String},
    },
    {
        versionKey: false
    }
    )

const Customer_Registration_Model =mongoose.model('cust_reg',Customer_Registration);
module.exports = Customer_Registration_Model   