import { CartActionTypes } from "./cart.action.type";
import { addItemToCartQuantity, removeItemFromCartQuantity } from "./cart.utils";

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden,
            }
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCartQuantity(state.cartItems, action.payload)
            }
        case CartActionTypes.ADD_ITEM_IN_CHECKOUT:
            return {
                ...state,
                cartItems: addItemToCartQuantity(state.cartItems, action.payload)
            }
        case CartActionTypes.USER_SIGN_IN_ADD_ITEM_BACK:
            return {
                ...state,
                cartItems: addItemToCartQuantity(state.cartItems, action.payload)
            }
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCartQuantity(state.cartItems, action.payload)
            }
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((cartItem) => (cartItem.id !== action.payload.id))
            }
        case CartActionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }
        default:
            return state;
    }
}

export default cartReducer;