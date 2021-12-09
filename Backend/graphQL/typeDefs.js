const { gql } = require("apollo-server");
const {dayjs} = require("dayjs");
const { GraphQLScalarType } = require("graphql");
const { Kind } =  require("graphql/language");


module.exports = gql`
type Restaurant {
    r_id: String,
    r_email: String,
    r_password: String,
    r_name:String,
    r_state:String,
    r_description:String,
    r_number:String,
    r_opentime:String,
    r_closetime:String,
    r_county:String,
    r_zipcode:String,
    r_picture:String,
    del_type:String,
    r_address:String,
    message:String
  }
  type Favourites{
    c_id:String,
    r_id:String
  }
  type Dishes{
    r_id:String,
    d_name:String,
        d_category:String,
        d_price:String,
        d_picture:String,
        d_description:String,
        d_type:String,
  }
  type Customer{
    c_name :String,
     c_email:String,
     c_dob:String,
     c_city:String,
     c_state:String,
     c_country:String,
     c_number:String,
     c_profilepic:String,
     c_nickname:String,
     c_password:String,
     c_description:String,
     c_id:String,
     message:String,
     c_county:String
  }
  type Delivery
  {
    c_id:String,
    d_add_1:String,
    d_add_2:String,
    d_zipcode:String,
    del_id:String,
    _id:String,
    id:String
  }

  type Order
  {
    o_id:String,
    c_id:String,
    r_id:String,
    d_list:String,
    del_type:String,
    del_id:String,
    o_status:String,
    o_date:String,
    o_time:String,
    r_name:String,
    c_name:String,
    _id:String

  }

  type Query {
    restLogin(r_email:String,r_password:String): String
    getAllRestaurants:[Restaurant]
    GetAllTheFavRestaurants(c_id:String):[Restaurant]
    GetFavResterauntIds(c_id:String):[Favourites]
    getRestaurantsBasedOnDish(s_dish:String):[Dishes]
    getRestaurantsBasedonVegFilter(d_type:String):[String]
    getFarAwayRestaurants(c_county:String):[Restaurant]
    getAllnearestRestaurants(c_county:String):[Restaurant]
    customerLogin(c_email:String,c_password:String):Customer
    getRestaurantProfile(r_id:String):Restaurant
    getCustomerProfileDetails(c_email:String):Customer
    fetchOrders(r_id:String):[Order]
    fetchRestaurantDetailsbyId(r_id:String):[Order]
    fetchCustomerDetailsbyId(c_id:String):[Order]
    FetchRestaurantNameFromCustId(r_id:String):[Restaurant]
    FetchDelAddress(c_id:String):[Delivery]
    FetchDelAddressInCustomerOrders(del_id:String):Delivery
    getDish(r_id:String):[Dishes]
  }
  type Mutation{
    restregister(r_name:String,r_password:String,r_email:String,r_state:String):String
    AddRestaurantToFavourites(c_id:String,r_id:String):Favourites
    customerRegistration(c_name:String,c_email:String,c_password:String):String
    updateRestaurantProfile(r_number:String,r_name:String,r_state:String,r_email:String,r_description:String,r_zipcode:String,r_opentime:String,r_closetime:String,r_county:String,r_picture:String,r_id:String,del_type:String,r_address:String):String
    updateCustomerProfile(c_name:String,c_email:String,c_dob:String, c_state:String,c_country:String,c_number:String,c_profilepic:String,c_nickname:String,c_county:String,c_description:String,c_id:String,c_city:String):String
    UpdateOrderStatus(o_id:String,o_status:String):String
    DeliveryAddressAdd(c_id:String,d_add_1:String,d_add_2:String,d_zipcode:String):Delivery
    placingOrder(c_id:String,r_id:String,d_list:[String],del_type:String,del_id:String,o_date:String,o_time:String,r_name:String,o_status:String):String
    AddDish(r_id:String,d_name:String,d_price:Int,d_category:String,d_picture:String,d_description:String,d_type:String):String
  } 
  `;