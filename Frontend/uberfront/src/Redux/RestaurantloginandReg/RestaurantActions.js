import * as actions from './RestaurantActionTypes';

export const login = (data)=>
{
   
 return{ type:actions.R_LOGIN,
  payload:
  {
     values:data
  }
 }

}
export const logoff = ()=>
{
  
  return{
     type:actions.R_LOGOFF,
     
  }

}