import * as actions from './CustomerActionTypes'


const INITIAL_C_LOGIN_STATE = 
{
   

  c_email:null,
  c_id:null,
  FavoriteList:null,
  CustomerOrderList:null,
  OrderPlacedInThisSession:[],
  instructions:""

}



const c_login_reducer = (state = INITIAL_C_LOGIN_STATE,action)=>
{

switch(action.type)
{

case actions.C_LOGIN:
     return{
        ...state,
        c_email:action.payload.values.c_email,
        c_id:action.payload.values.c_id
    }
case actions.C_LOGOFF:return{
                   c_email:null,                            
                   c_id:null}
case actions.C_FAV_LIST:return{
     ...state,
     FavoriteList:action.payload.values.FavoriteList
}

case actions.C_ORDER_LIST:return{
  ...state,
  CustomerOrderList:action.payload.values.CustomerOrderList
}
case actions.ORDERS_PLACED_IN_CURRENT_SESSION:
  return{
  ...state,
  OrderPlacedInThisSession:[...state.OrderPlacedInThisSession,action.payload.values]
}
case actions.ADD_INSTRUCTIONS:
return{
  ...state,
  instructions:action.payload.values.instructions
}


default:
        return state
}
    
}
export {c_login_reducer}