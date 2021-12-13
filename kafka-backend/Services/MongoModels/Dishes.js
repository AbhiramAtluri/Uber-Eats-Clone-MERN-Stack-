const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Dishes = new Schema(
    {
        r_id:{type:String},
        d_name:{type:String},
        d_price:{type:Number },
        d_category:{type:String},
        d_price:{type:String},
        d_picture:{type:String},
        d_description:{type:String},
        d_type:{type:String},
    },
    {
        versionKey:false
    }
    )


const DishModel = mongoose.model('dishes',Dishes);
module.exports = DishModel;  