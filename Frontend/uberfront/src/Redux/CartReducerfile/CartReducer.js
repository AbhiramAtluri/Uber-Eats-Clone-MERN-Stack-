import * as actions from './CartActionTypes'

const INITIAL_CART_STATE = 
{
   
    c_number:null,
    del_type:null,
    c_id:null,
    r_name:null,
    del_type:null
}



const cart_reducer = (state = INITIAL_CART_STATE,action)=>
{

    switch(action.type)
    {
       
        case actions.C_ADD:
            return{
                ...state,
                 c_number:state.c_number +1
            }
        case actions.C_REMOVE:
            return{
                ...state,
                c_number:state.c_number -1
            }
        case actions.CLEAR_CART:
            return{
                ...state,
                c_number:null,
                del_type:null,
                r_name:null
            }    
        case actions.ADD_R_NAME:
            return{
                ...state,
                r_name:action.payload.values
            }
        case actions.REMOVE_R_NAME:
            {
                return{
                    ...state,
                    r_name:null
                }
            }
        case actions.ADD_DEL_TYPE:
            {
                return{
                    ...state,
                    del_type:action.payload.values
                }
            }
        case actions.REMOVE_DEL_TYPE:
            {
                return{
                    ...state,
                    del_type:null
                }
            }    

        default:
            return state
    }
}

export {cart_reducer}