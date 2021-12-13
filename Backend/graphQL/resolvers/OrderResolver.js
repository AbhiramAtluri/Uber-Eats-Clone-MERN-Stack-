const Restaurant_Registration = require('../../MongoModels/RestaurantModel')
const FavouriteModel = require('../../MongoModels/CustomerFavouritesModel')
const DishModel = require('../../MongoModels/Dishes')
const bcrypt = require('bcryptjs');
const { execute } = require('graphql');
const saltRounds = 10;
const Customer_Registration = require('../../MongoModels/CustomerModel')
const OrderModel = require('../../MongoModels/OrderModel')


const orderResolver = {
   
    Query:
    {
        async fetchOrders(_,{r_id})
        {
         
           let results = await Restaurant_Registration.findOne({_id:r_id})
           console.log(results)
          let results2 = await OrderModel.find({r_id:results._id}).lean()
           
         console.log(results2)

         for(a in results2)
         {
             results2[a].c_name = results.c_name
         }
         
        return results2
              
        },
        async fetchRestaurantDetailsbyId(_,{r_id})
     {
         console.log("hey")
         console.log(r_id)
      let result = await  Restaurant_Registration.findOne({_id:r_id})
       
      if(result)
      {
         let result2 = await OrderModel.find({r_id:result._id}).lean()
          
         for(a in result2)
         {
            result2[a].c_name=result2.c_name;
         }
         
        return result2

      }


     },
     async fetchCustomerDetailsbyId(_,{c_id})
     {
         console.log(c_id)
        let results = await Customer_Registration.findOne({_id:c_id})
          console.log(results)
        if(results)
        {
        let results2 = await OrderModel.find({c_id:results._id}).lean()
              
            if(results2)
            {
                for(a in results2)
                {
                    results2[a].c_name=results.c_name;
                }

            }
            
            return results2

        }
     },

     async FetchRestaurantNameFromCustId(_,{r_id})
     {
        console.log(r_id)
        let results = await Restaurant_Registration.find({_id:r_id})
        console.log(results)
        if(results)
        {
            return results
        }

     },
     


    },
    
    Mutation:
    {
        async UpdateOrderStatus(_,{o_id,o_status})
        {
         
            let result =await OrderModel.updateOne({_id:o_id},{$set:{o_status:o_status}})
            
            if(result)
            {
             
                return "success"

            }
     
           
        }


    }

}

module.exports = orderResolver