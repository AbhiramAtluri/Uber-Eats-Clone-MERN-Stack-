import * as actions from './CustomerProfileActionTypes';

const INTITIAL_PROFILE_DETAILS =
{
  
    c_city:null,
    c_name:null,
    c_nickname:null,
    c_profilepic:null,
    c_state:null,
    c_county:null,
    c_country:null,
    c_description:null,
    c_email:null,
    c_dob:null,    
    c_number:null
}


const c_profile_reducer = (state = INTITIAL_PROFILE_DETAILS,action)=>
{

switch(action.type)
{

case actions.UPDATECUSTOMERPROFILE:
    return{
       ...state,
       c_city:action.payload.values.c_city,
       c_name:action.payload.values.c_name,
       c_nickname:action.payload.values.c_nickname,
       c_profilepic:action.payload.values.c_profilepic,
       c_state:action.payload.values.c_state,
       c_county:action.payload.values.c_county,
       c_country:action.payload.values.c_country,
       c_description:action.payload.values.c_description,
       c_email:action.payload.values.c_email,
       c_dob:action.payload.values.c_dob,    
       c_number:action.payload.values.c_number
     
    }
    
default:
    return state


}
}

export {c_profile_reducer}