import { combineReducers } from 'redux'
import shopReducer from "./Shopping/Shop-reducer"
import { r_login_reducer } from './RestaurantloginandReg/RestaurantReducer'
import { c_login_reducer } from './CustomerLoginandReg/CustomerReducer'
import { cart_reducer } from './CartReducerfile/CartReducer'



const rootReducer = combineReducers({

    shop:shopReducer,
    Rest:r_login_reducer,
    Cust:c_login_reducer,
    cart:cart_reducer
})

export default rootReducer