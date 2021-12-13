const Restaurant_Registration = require('../../MongoModels/RestaurantModel')
const FavouriteModel = require('../../MongoModels/CustomerFavouritesModel')
const DishModel = require('../../MongoModels/Dishes')
const bcrypt = require('bcryptjs');
const { execute } = require('graphql');
const saltRounds = 10;
const Customer_Registration = require('../../MongoModels/CustomerModel')
const OrderModel = require('../../MongoModels/OrderModel')
const DeliveryModel = require('../../MongoModels/DeliveryAddressModel')


const DeliveryResolver ={
   
    Query:{
      
        async FetchDelAddress(_,{c_id})
        {
            console.log("in del fetch")

          let results = await DeliveryModel.find({c_id:c_id})

          if(results)
          {
              return (results)
          }
    

        },


        async FetchDelAddressInCustomerOrders(_,{del_id})
        {
         console.log(del_id)
          
       let result = await  DeliveryModel.find({_id:del_id})
          
         return result



        }
   




    },
    Mutation:{
     
        async DeliveryAddressAdd(_,{c_id,d_add_1,d_add_2,d_zipcode})
        {
                 
        let address = new DeliveryModel(
            {
                c_id:c_id,
                d_add_1:d_add_1,
                d_add_2:d_add_2,
                d_zipcode:d_zipcode
            })

          let result =await address.save()
          return {del_id:result._id}
        },

        async placingOrder(_,{c_id,r_id,d_list,del_type,del_id,o_date,o_time,r_name,o_status})
        {
            
            let row = JSON.stringify(d_list)
            var newOrder = new OrderModel(
                {
                   c_id:c_id,
                   r_id:r_id,
                   d_list:row,
                   del_type:del_type,
                   del_id:del_id,
                   o_date:o_date,
                   o_time:o_time,
                   r_name:r_name,
                   o_status:o_status  
                }
                )

                let result =await newOrder.save()

                return "Successful"
        }


    }


}



module.exports = DeliveryResolver  