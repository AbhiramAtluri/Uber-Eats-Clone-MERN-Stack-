import * as actions from './CustomerActionTypes'

export const c_login = (data)=>
{
    return(
        { type: actions.C_LOGIN,
          payload:
          {
              values:data
          }             

         }
        )
}


export const c_fav_list = (data)=>
{

return(
  {
    type:actions.C_FAV_LIST,
    payload:
    {
      values:data
    }
  }
)




}
export const c_order_list = (data)=>
{

return(
  {
    type:actions.C_ORDER_LIST,
    payload:
    {
      values:data
    }
  }
)

}

export const placed_order = (data)=>
{

return(
  {
    type:actions.ORDERS_PLACED_IN_CURRENT_SESSION,
    payload:
    {
      values:data
    }
  }
)

}

export const add_Instructions = (data)=>
{

return(
  {
    type:actions.ADD_INSTRUCTIONS,
    payload:
    {
      values:data
    }
  }
)

}





export const c_logoff = ()=>
{
  
  return{
     type:actions.C_LOGOFF,
     
  }

}