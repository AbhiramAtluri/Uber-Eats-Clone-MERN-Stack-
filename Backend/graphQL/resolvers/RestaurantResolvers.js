const Restaurant_Registration = require('../../MongoModels/RestaurantModel')
const FavouriteModel = require('../../MongoModels/CustomerFavouritesModel')
const DishModel = require('../../MongoModels/Dishes')
const bcrypt = require('bcryptjs');
const { execute } = require('graphql');
const Customer_Registration_Model = require('../../MongoModels/CustomerModel');
const saltRounds = 10;
const restResolvers = {
  

    Query:{
      async getAllRestaurants()
      {
       try
       {
        let result = await Restaurant_Registration.find({})
        return result
       }catch(err)
       {
         console.log(err)
         return err
       }
      },
      async GetAllTheFavRestaurants(_,{c_id})
      {
        try
        {
          console.log(c_id)
          let result =await FavouriteModel.find({c_id:c_id}).lean()
          // console.log(result)
          if(result)
          {
              // console.log(result)
              let restlist = [];
       
              for(a in result)
            {
                restlist.push(result[a].r_id)
            }
            console.log(restlist)
             let result2= await Restaurant_Registration.find({_id:{$in:restlist}})
             
            //  .exec((err,data)=>
            //   {
              
            //       res.send(data)
            //   })
            console.log(result2)
               return result2
      
          } 


        }
        catch(err)
        {
          console.log(err)
          return err
        }
      },
      async GetFavResterauntIds(_,{c_id})
      {
        let result = await FavouriteModel.find({c_id:c_id})
        
        return result


      },
      async getRestaurantsBasedOnDish(_,{s_dish})
      {
        console.log(s_dish)
        let ss_dish = /s_dish/
        var regex = new RegExp(ss_dish)
        console.log(regex)
        let result =await DishModel.find({d_name:s_dish})
        console.log(result)
        return result


      },
      async getRestaurantsBasedonVegFilter(_,{d_type})
      {
        console.log(d_type)
        let result = await DishModel.find({d_type:d_type})
        let r_list = [];
        for(a in result)
        {
          console.log(result[a].r_id)
          r_list.push(result[a].r_id)
        }

        return r_list


      },
      async getFarAwayRestaurants(_,{c_county})
      {
        console.log(c_county)
       let result =await Restaurant_Registration.find({r_county :{$ne:c_county}})

       if(result)
       {
         return result
       }

      },
      async getAllnearestRestaurants(_,{c_county})
      {
       
        if(c_county.length <1)
        {
            return "c_profile_update"
        }
        else
        {
          let results =await Restaurant_Registration.find({r_county:c_county})
           console.log(results)
          if(results.length>=1)
          {
            console.log(results)
            return results
          }
          else
          {
          return [{message:"NoLoc"}]
          }
        }
      },
      async getRestaurantProfile(_,{r_id})
      {
       console.log(r_id)
       let results = await Restaurant_Registration.findOne({_id :r_id})
        
       if(results)
       {
         return results
       }
  
  
      },
      async restLogin(_,{r_email,r_password})
      {
         console.log(r_email,r_password)
         console.log(typeof r_email)
         console.log(typeof r_password)

       let result =await  Restaurant_Registration.findOne({r_email:r_email})
          console.log(result)
       if(result)
       {
        const validPass = await bcrypt.compare(r_password,result.r_password)
         
        if(validPass)
        {
          console.log("heyy")
          return "Login successfull"


        }
        else
        {
          console.log("hello")
          return "Invalid"
        }

       }


      }



    },
    Mutation:{

    async restregister(_,{r_name,r_state,r_email,r_password})
    {
      try
      {
         console.log(r_name,r_state,r_email,r_password)
        const hash= await bcrypt.hash(r_password,saltRounds)
        let rest_details1 = new Restaurant_Registration(
        {
        
            r_name :r_name,
            r_password:hash,
            r_state:r_state,
            r_email:r_email,
            r_description:null,
            r_number:null,
            r_opentime:null,
            r_closetime:null,
            r_county:null,
            r_zipcode:null,
            r_picture:null,
            del_type:null,
            r_address:null
    
        });


      let result = await  Restaurant_Registration.findOne({r_email:r_email})
          console.log(result)
         if(result)
         {
            //  res.send('Invalid')
            return "Invalid"
         } 
         else
          {
          let result2 =  await rest_details1.save()
           if(result2)
           {
             return "Success"
           }
          }
      }
      catch(err)
      {
        console.log(err);
        return err;

      }

    },
    async AddRestaurantToFavourites(_,{c_id,r_id})
    {
      
      var newFav = new FavouriteModel(
        {
          c_id:c_id,
          r_id:r_id

        }
      )

     let result = await newFav.save()
     return result
      
    },
    async updateRestaurantProfile(_,{r_number,r_name,r_state,r_email,r_description,r_zipcode,r_opentime,r_closetime,r_county,r_picture,r_id,del_type,r_address})
    {

     
      let r1_number = r_number
      let r1_name = r_name
      let r1_state = r_state
      let r1_email = r_email
      let r1_description = r_description
      let r1_zipcode =r_zipcode
      let r1_opentime = r_opentime
      let r1_closetime = r_closetime
      let r1_county = r_county
      let r1_picture = r_picture
      let r1_id = r_id
      let del_type1 =del_type
      let r1_address = r_address
      
      console.log(r1_id)

    let result = await  Restaurant_Registration.updateOne({_id :r1_id},{$set: {r_number : r1_number,r_email:r1_email,r_description:r1_description,
        r_name:r1_name,r_state:r1_state,r_opentime:r1_opentime,r_closetime:r1_closetime,r_county:r1_county,r_picture:r1_picture,del_type:del_type1,r_address:r1_address,r_zipcode:r1_zipcode}})
       console.log(result)
        if(result)
        {
          return "Success"
        }

      

    }


    }

}

module.exports = restResolvers