const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Delivery_Address = new Schema(
    {
        c_id :{type:String},
        d_add_1:{type:String},
        d_add_2:{type:String},
        d_zipcode:{type:String}
    },{
        versionKey:false
    }
    )
const DeliveryModel = mongoose.model('d_address',Delivery_Address);
module.exports = DeliveryModel;    