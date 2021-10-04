import { createSelector } from "reselect";

const selectCart = (state) => (state.cart)

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => {
        return (cart.cartItems)
    }
)

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => {
        return (cart.hidden)
    }
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (cartItems) => {
        return (
            // acc為計數器，將每一次加總的分數做累計，0為acc之初始值
            cartItems.reduce((acc, cartItem) => {
                return (acc + cartItem.quantity);
            },0)
        )
    }
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => {
        return (
            // acc為計數器，將每一次加總的分數做累計，0為acc之初始值
            cartItems.reduce((acc, cartItem) => {
                return (acc + (cartItem.quantity * cartItem.price));
            },0)
        )
    }
)
