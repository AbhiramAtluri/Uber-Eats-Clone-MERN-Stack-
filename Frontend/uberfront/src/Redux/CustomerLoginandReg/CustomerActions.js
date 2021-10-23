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
export const c_logoff = ()=>
{
  
  return{
     type:actions.C_LOGOFF,
     
  }

}