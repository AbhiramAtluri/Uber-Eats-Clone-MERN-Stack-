import { combineReducers } from 'redux'
import shopReducer from "./Shopping/Shop-reducer"



const rootReducer = combineReducers({

    shop:shopReducer
})

export default rootReducer