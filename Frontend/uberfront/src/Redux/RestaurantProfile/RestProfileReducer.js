import * as actions from './RestProfileActions';

const INTITIAL_PROFILE_DETAILS = 
{


r_name:null,
r_email:null,
r_number:null,
r_county:null,
r_opentime:null,
r_closetime:null,
del_type:null,
r_address:null,



}


const r_profile_reducer = (state = INTITIAL_PROFILE_DETAILS,action)=>
{

switch(action.type)
{

case actions.UPDATERESTPROFILEDETAILS:
    return{
       ...state,
       r_name:action.payload.values.r_name,
       r_email:action.payload.values.r_email,
       r_number:action.payload.values.r_email,
       r_county:action.payload.values.r_county,
       r_opentime:action.payload.values.r_opentime,
       r_closetime:action.payload.values.r_closetime,
       del_type:action.payload.values.del_type,
       r_address:action.payload.values.r_address
    }
    
default:
    return state


}
}

export {r_profile_reducer}