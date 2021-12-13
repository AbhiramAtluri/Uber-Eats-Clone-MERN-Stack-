import * as actions from './CustomerProfileActionTypes';

export const updateCustProfile =(data)=>
{
return(
{
type:actions.UPDATECUSTOMERPROFILE,
payload:
{
    values:data
}
}
)

}