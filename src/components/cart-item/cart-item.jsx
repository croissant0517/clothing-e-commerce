import React from "react";

import "./cart-item.scss";

const CartItem = (props) => {
    const { name, price, imageUrl, quantity } = props.item;

    return (
        <div className = "cart-item">
            <img src = {imageUrl} alt = "item" />
            <div className = "item-details">
                <span className = "item-name">{name}</span>
                <span className = "item-price">{quantity} x NT${price}</span>
            </div>
        </div>
    );

    
}

export default CartItem;