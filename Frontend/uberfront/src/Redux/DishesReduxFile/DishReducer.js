import * as actions from './DishActionTypes';

const INITIAL_DISH_STATE=
{


dishlist :null,
LatestAddedDish:null,
LatestEditedDish:null,


}

const dish_reducer = (state = INITIAL_DISH_STATE,action)=>
{

switch(action.type)
{


case actions.CURRENTDISHLIST:
    return{
        ...state,
        dishlist:action.payload.values.dishlist
    }
case actions.NEWLYADDEDDISHES:
    return{
        ...state,
        LatestAddedDish:action.payload.values.dish
    }
case actions.LATESTEDITEDDISH:
    return{
        ...state,
        LatestEditedDish:action.payload.values.dish
    }    

default:
    return state




}


}

export {dish_reducer}