import * as actions from './CartActionTypes'

export const addCart = (count) =>
{
    
    return  {
        type:actions.C_ADD,
        payload:{
            values:count
        }
    }
}

export const removeCart = (count)=>
{
   
    return{
          
        type:actions.C_REMOVE,
        payload:{
            values:count
        }

    }
}

export const clearCart = ()=>

{
    return{

        type:actions.CLEAR_CART
      
            
    
    }
}
export const addRname = (data)=>
{
return{
    type:actions.ADD_R_NAME,
        payload:{
            values:data
        }

}

}
export const removeRname = ()=>
{
    return{
        type:actions.REMOVE_R_NAME,
     
    }
}
export const addDelType = (data) =>
{

 return{
     type:actions.ADD_DEL_TYPE,
     payload:{
        values:data
    }
 }


}
export const removeDelType = ()=>
{
    return{
        type:actions.REMOVE_DEL_TYPE,
     
    }
}

