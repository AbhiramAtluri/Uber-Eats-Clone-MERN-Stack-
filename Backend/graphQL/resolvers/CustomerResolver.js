const Restaurant_Registration = require('../../MongoModels/RestaurantModel')
const FavouriteModel = require('../../MongoModels/CustomerFavouritesModel')
const DishModel = require('../../MongoModels/Dishes')
const bcrypt = require('bcryptjs');
const { execute } = require('graphql');
const saltRounds = 10;
const Customer_Registration = require('../../MongoModels/CustomerModel')



const Custresolvers = {
   
    Query:{
     
      async customerLogin(_,{c_email,c_password})
      {
          let result = await Customer_Registration.findOne({c_email:c_email})

          if(result)
          {
            const validPass = await bcrypt.compare(c_password,result.c_password)

            if(validPass)
            {
                  console.log(result)
                return {c_id:result.id,c_email:result.c_email,message:"Login successfull"}

            }
            else
            {
              return {message:"Invalid credentials"}

            }
       


          }
          
      },
      async getCustomerProfileDetails(_,{c_email})
      {
       console.log(c_email)
        let results =   Customer_Registration.findOne({c_email:c_email})
          
        if(results)
        {
            return results
        }
      }
      
    },

    Mutation:{

        async customerRegistration(_,{c_name,c_email,c_password})
        {
          console.log(c_name,c_email,c_password)
          const hash = await bcrypt.hash(c_password,5)
  
          let cust_details1 = new Customer_Registration(
              {
                  c_name: c_name,
                  c_email: c_email,
                  c_password: hash,
                  c_dob:null,
                  c_city:null,
                  c_state:null,
                  c_country:null,
                  c_number:null,
                  c_profilepic:null,
                  c_nickname:null,
                  c_country:null,
                  c_description:null,
          
              });
  
              let result = await Customer_Registration.findOne({c_email:c_email})
  
              console.log(result)
  
              if(result)
              {
     
               return "Invalid"
  
              }
              else
              {
               let result2 =  await cust_details1.save()
               if(result2)
               {
                   return "Success"
               }
              }
        },

        async updateCustomerProfile(_,{c_name, c_email,c_dob, c_state,c_country,c_number,c_profilepic,c_nickname,c_county,c_description,c_id,c_city})      
        {
            console.log(c_id)
            let queryvalues = { c_name:c_name, c_email: c_email,c_dob:c_dob,c_city: c_city,c_state : c_state,c_country: c_country,c_number: c_number,c_profilepic:c_profilepic,c_nickname: c_nickname,c_county:c_county,c_description:c_description,c_id:c_id}
             
            let results =await Customer_Registration.updateOne({_id:c_id},{$set:queryvalues})
            console.log(results)
            if(results)
            {
                return "Success"
            }
        }
    }


}

module.exports = Custresolvers