import * as actionTypes from './Shop-type'


const INITIAL_STATE = 
{
    dishes:[]
}


const shopReducer = (state=INITIAL_STATE,action)=>
{

 switch(actionTypes)
 {
   case actionTypes.ADD_TO_CART:
       return{
        
        



       }
    case actionTypes.REMOVE_FROM_CART:
        return{}

    default:
        return state
 }


}

export default shopReducer