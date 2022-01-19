import { CartActionTypes } from "./cart.action.type";
import { addItemToCartQuantity, removeItemFromCartQuantity, addItemsToCartQuantity } from "./cart.utils";

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
        case CartActionTypes.ADD_ITEMS:
            return {
                ...state,
                cartItems: addItemsToCartQuantity(state.cartItems, action.payload)
            }
        default:
            return state;
    }
}

export default cartReducer;