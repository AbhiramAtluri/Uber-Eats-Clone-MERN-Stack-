import { combineReducers } from 'redux'
import shopReducer from "./Shopping/Shop-reducer"
import { r_login_reducer } from './RestaurantloginandReg/RestaurantReducer'
import { c_login_reducer } from './CustomerLoginandReg/CustomerReducer'
import { cart_reducer } from './CartReducerfile/CartReducer'
import { r_profile_reducer } from './RestaurantProfile/RestProfileReducer'
import { dish_reducer } from './DishesReduxFile/DishReducer'
import { c_profile_reducer } from './CustomerProfile/CustomerProfileReducer'



const rootReducer = combineReducers({


    Rest:r_login_reducer,
    Cust:c_login_reducer,
    cart:cart_reducer,
    RestaurantProfile:r_profile_reducer,
    Dishes:dish_reducer,
    CustomerProfile:c_profile_reducer
})

export default rootReducer