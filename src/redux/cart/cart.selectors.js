import { createSelector } from "reselect";

const selectCart = (state) => (state.cart)

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => (cart.cartItems)
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (cartItems) => (
        // acc為計數器，將每一次加總的分數做累計，0為acc之初始值
        cartItems.reduce((acc, cartItem) => {
            return (acc + cartItem.quantity);
        },0)
    )
)
