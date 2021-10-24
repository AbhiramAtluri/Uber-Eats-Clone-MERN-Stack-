import * as actions from './DishActionTypes';

 export const setCurrentDishList = (data)=>
 {

return(
    {
        type:actions.CURRENTDISHLIST,
        payload:
        {
            values:data
        }
    }
)
 }
 export const NewAddedDish = (data)=>
 {

return(
    {
        type:actions.NEWLYADDEDDISHES,
        payload:
        {
            values:data
        }
    }
)
 }

 export const LatestEditedDish = (data)=>
 {

  return(
      {
        type:actions.LATESTEDITEDDISH,
        payload:
        {
            values:data
        }

      }
  )


 }
