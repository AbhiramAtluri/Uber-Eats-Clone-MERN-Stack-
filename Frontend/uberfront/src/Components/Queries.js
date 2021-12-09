

export const REST_LOGIN_QUERY = `query Query($rEmail: String, $rPassword: String) {
    restLogin(r_email: $rEmail, r_password: $rPassword)
  }`

export const  GET_RESTAURANT_PROFILE = `query GetRestaurantProfile($rId: String) {
    getRestaurantProfile(r_id: $rId) {
      r_id
      r_email
      r_password
      r_name
      r_state
      r_description
      r_number
      r_opentime
      r_closetime
      r_county
      r_zipcode
      r_picture
      del_type
      r_address
      message
    }
  }`

export const GET_DISHES =`query Query($rId: String) {
  getDish(r_id: $rId) {
    r_id
    d_name
    d_category
    d_price
    d_picture
    d_description
    d_type
  }
}`



export const CUST_LOGIN = `query CustomerLogin($cEmail: String, $cPassword: String) {
  customerLogin(c_email: $cEmail, c_password: $cPassword) {
    c_name
    c_email
    c_dob
    c_state
    c_city
    c_country
    c_number
    c_profilepic
    c_nickname
    c_password
    c_description
    c_id
    message
  }}`

  export const GET_CUSTOMER_PROFILE = `query GetCustomerProfileDetails($cEmail: String) {
    getCustomerProfileDetails(c_email: $cEmail) {
      c_email
      c_dob
      c_state
      c_number
      c_city
      c_country
      message
      c_id
      c_profilepic
      c_nickname
      c_description
      c_password
      c_county
      c_name
    }
  }`

  export const GET_ALL_NEAREST_RESTAURANTS = `query GetAllnearestRestaurants($cCounty: String) {
    getAllnearestRestaurants(c_county: $cCounty) {
      r_id
      r_email
      r_password
      r_name
      r_state
      r_description
      r_number
      r_opentime
      r_closetime
      r_county
      r_zipcode
      r_picture
      del_type
      r_address
      message
    }
  }`

  export const GET_FAR_AWAY_RESTAURANTS=`query GetFarAwayRestaurants($cCounty: String) {
    getFarAwayRestaurants(c_county: $cCounty) {
      r_id
      r_email
      r_password
      r_name
      r_state
      r_number
      r_description
      r_opentime
      r_closetime
      r_picture
      r_zipcode
      r_county
      del_type
      r_address
      message
    }
  }`

  export const GET_RESTAURANT_ORDERS = `query Query($rId: String) {
    fetchRestaurantDetailsbyId(r_id: $rId) {
      o_id
      c_id
      r_id
      d_list
      del_type
      del_id
      o_status
      o_date
      o_time
      r_name
      c_name
      _id
    }
  }`

  export const FETCH_CUSTOMER_ORDERS =`query FetchCustomerDetailsbyId($cId: String) {
    fetchCustomerDetailsbyId(c_id: $cId) {
      o_id
      c_id
      r_id
      d_list
      del_id
      del_type
      o_status
      o_date
      r_name
      o_time
      c_name
      _id
    }
  }`