import React from "react";
import { connect } from "react-redux";
import { clearItemFromCart } from "../../redux/cart/cart.action";

import "./checkout-item.scss";

const CheckOutItem = (props) => {
    const { name, price, imageUrl, quantity } = props.item;
    return (
        <div className = "checkout-item" >
            <div className = "image-container" >
                <img src = {imageUrl} alt = "item" />
            </div>
            <span className = "name" >{name}</span>
            <span className = "quantity" >{quantity}</span>
            <span className = "price" >NT${price}</span>
            <div className = "remove-button" onClick = {() => {props.handleClearItemFromCart(props.item)}} >&#10005;</div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return ({
      handleClearItemFromCart: (item) => dispatch(clearItemFromCart(item)) 
    });
}

export default connect(null, mapDispatchToProps)(CheckOutItem);