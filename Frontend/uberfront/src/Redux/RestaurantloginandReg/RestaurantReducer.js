import * as actions from './RestaurantActionTypes';




const INITIAL_LOGIN_STATE =
{

    r_name:null,
    r_email:null,
    r_id:null,
    orderlist :null
}


const r_login_reducer = (state = INITIAL_LOGIN_STATE,action)=>
{

  switch(action.type)
  {
    case actions.R_LOGIN:
       return {
            ...state,
            r_name:action.payload.values.r_name,
            r_email:action.payload.values.r_email,
            r_id:action.payload.values.r_id
        }
     case actions.R_LOGOFF:
          return { 
              
            r_name:null,
            r_email:null,
            r_id:null
          }
    case actions.R_ORDERS:
      return{
        ...state,
        
        orderlist:action.payload.values.orders


      }
        default:
            return state
               

  }


}
export {r_login_reducer}