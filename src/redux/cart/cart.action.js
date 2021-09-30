import { CartActionTypes } from "./cart.action.type";

export const toggleCartHidden = () => {
    return ({
        type: CartActionTypes.TOGGLE_CART_HIDDEN,
    });
}