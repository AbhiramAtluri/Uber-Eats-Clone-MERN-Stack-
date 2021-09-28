import * as actionTypes from './Shop-type'


export const addToCart = (Item_id)=>
{
    return{
        type:actionTypes.ADD_TO_CART,
        payload: {
            id:Item_id
        }
    }
}

export const removeFromCart =(Item_id)=>
{
   return {type:actionTypes.REMOVE_FROM_CART,
   payload:
   {
       id:Item_id
   }

}
}


 