const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var Restaurant_Registration = new Schema(
    {
        r_name :{type: String},
        r_password:{type: String},
        r_state:{type: String},
        r_email:{type: String},
        r_description:{type: String},
        r_number:{type: String},
        r_opentime:{type: String},
        r_closetime:{type: String},
        r_county:{type: String},
        r_zipcode:{type: String},
        r_picture:{type: String},
        del_type:{type: String},
        r_address:{type: String}
    },
    {
        versionKey:false
    }
)

const Restaurant_Regsitration_Model = mongoose.model('rest_reg',Restaurant_Registration);
module.exports = Restaurant_Regsitration_Model