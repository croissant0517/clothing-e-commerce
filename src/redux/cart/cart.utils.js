//cartItems 是目前已經存在於array中的項目
//cartItemToAdd 是目前要新增到array的項目

export const addItemToCartQuantity = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => {
        return (cartItem.id === cartItemToAdd.id);
    })

    if (existingCartItem) {
        return cartItems.map((cartItem) => {
            return (cartItem.id === cartItemToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
        })
    } else {
        return [...cartItems, {...cartItemToAdd, quantity: 1}]    
    }
}

export const removeItemFromCartQuantity = (cartItems, cartItemsToRemove) => {
    if (cartItemsToRemove.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemsToRemove.id)
    } else {
        return cartItems.map((cartItem) => 
            cartItem.id === cartItemsToRemove.id 
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
        ) 
    }
}