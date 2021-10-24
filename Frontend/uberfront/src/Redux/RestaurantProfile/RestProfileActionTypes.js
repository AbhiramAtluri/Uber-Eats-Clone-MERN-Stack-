import * as actions from './RestProfileActions';


export const updateRestProfile =(data)=>
{
return(
{
type:actions.UPDATERESTPROFILEDETAILS,
payload:
{
    values:data
}
}
)

}







