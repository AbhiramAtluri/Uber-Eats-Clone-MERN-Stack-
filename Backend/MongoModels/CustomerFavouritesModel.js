const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Favourites = new Schema(
    {
      c_id:{type:String},
      r_id:{type:String}  
    },{
        versionKey:false
    }
    )
    const FavouriteModel = mongoose.model('c_fav',Favourites);
module.exports = FavouriteModel