const Restaurant_Registration = require('../../MongoModels/RestaurantModel')
const FavouriteModel = require('../../MongoModels/CustomerFavouritesModel')
const DishModel = require('../../MongoModels/Dishes')
const bcrypt = require('bcryptjs');
const { execute } = require('graphql');
const saltRounds = 10;
const Customer_Registration = require('../../MongoModels/CustomerModel')
const OrderModel = require('../../MongoModels/OrderModel');



const DishResolver = {

   Query:{

    async getDish(_,{r_id})
    {
        console.log(r_id)
        let results = await DishModel.find({r_id:r_id})

        return results
    }
   },
   Mutation:{    
  async AddDish(_,{r_id,d_name,d_price,d_category,d_picture,d_description,d_type})
   {
      
      console.log(r_id,d_name,d_price,d_category,d_picture,d_description,d_type)

      let newDish = new DishModel(
       {
          r_id : r_id,
          d_name : d_name,
          d_price : d_price,
          d_category  : d_category,
          d_picture : d_picture,
          d_description : d_description,
          d_type : d_type
       }
       )

   let result = await newDish.save()

   if(result)
   {
       return "Success"
   }



   },

   }



}

module.exports = DishResolver  