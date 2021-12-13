

export const RESTAURANT_REGISTER = `mutation Restregister($rName: String, $rPassword: String, $rEmail: String, $rState: String) {
    restregister(r_name: $rName, r_password: $rPassword, r_email: $rEmail, r_state: $rState)
  }`

export const UPDATE_REST_PROFILE = `mutation UpdateRestaurantProfile($rNumber: String, $rName: String, $rState: String, $rEmail: String, $rDescription: String, $rZipcode: String, $rOpentime: String, $rClosetime: String, $rCounty: String, $rPicture: String, $rId: String, $delType: String, $rAddress: String) {
  updateRestaurantProfile(r_number: $rNumber, r_name: $rName, r_state: $rState, r_email: $rEmail, r_description: $rDescription, r_zipcode: $rZipcode, r_opentime: $rOpentime, r_closetime: $rClosetime, r_county: $rCounty, r_picture: $rPicture, r_id: $rId, del_type: $delType, r_address: $rAddress)
}`


export const ADD_DISH = `mutation AddDish($dPrice: Int, $dName: String, $rId: String, $dCategory: String, $dPicture: String, $dDescription: String, $dType: String) {
  AddDish(d_price: $dPrice, d_name: $dName, r_id: $rId, d_category: $dCategory, d_picture: $dPicture, d_description: $dDescription, d_type: $dType)
}`

export const CUST_REGISTRATION = `mutation Mutation($cName: String, $cEmail: String, $cPassword: String) {
  customerRegistration(c_name: $cName, c_email: $cEmail, c_password: $cPassword)
}`

export const PLACE_ORDER = `mutation PlacingOrder($cId: String, $rId: String, $dList: [String], $delType: String, $delId: String, $oDate: String, $oTime: String, $rName: String, $oStatus: String) {
  placingOrder(c_id: $cId, r_id: $rId, d_list: $dList, del_type: $delType, del_id: $delId, o_date: $oDate, o_time: $oTime, r_name: $rName, o_status: $oStatus)
}`

export const UPDATE_ORDER_STATUS =`mutation UpdateOrderStatus($oId: String, $oStatus: String) {
  UpdateOrderStatus(o_id: $oId, o_status: $oStatus)
}`