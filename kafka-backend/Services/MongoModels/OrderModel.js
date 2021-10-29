
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Order = new Schema(
    {
        o_id:{type: String},
        c_id:{type: String},
        r_id:{type:String},
        d_list:{type: String},
        del_type:{type: String},
        del_id:{type: String},
        o_status:{type: String},
        o_date:{type: String},
        o_time:{type: String},
        r_name:{type: String}
    },{
        versionKey:false
    }
)
const Order_Model =mongoose.model('Orders',Order);
module.exports = Order_Model;