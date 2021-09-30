//cartItems 是目前已經存在於array中的項目
//cartItemsToAdd 是目前要新增到array的項目

export const addItemToCartQuantity = (cartItems, cartItemsToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => {
        return (cartItem.id === cartItemsToAdd.id);
    })
    console.log(existingCartItem);

    if (existingCartItem) {
        return cartItems.map((cartItem) => {
            return (cartItem.id === cartItemsToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
        })
    } else {
        return [...cartItems, {...cartItemsToAdd, quantity: 1}]    
    }
}