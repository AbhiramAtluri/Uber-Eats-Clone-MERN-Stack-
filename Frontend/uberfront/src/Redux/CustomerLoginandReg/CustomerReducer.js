import * as actions from './CustomerActionTypes'


const INITIAL_C_LOGIN_STATE = 
{
   

  c_email:null,
  c_id:null
}



const c_login_reducer = (state = INITIAL_C_LOGIN_STATE,action)=>
{

switch(action.type)
{

case actions.C_LOGIN:
     return{
     
        c_email:action.payload.values.c_email,
        c_id:action.payload.values.c_id
    }
case actions.C_LOGOFF:return{
                   c_email:null,                            
                   c_id:null}
default:
        return state
}
    
}

export {c_login_reducer}