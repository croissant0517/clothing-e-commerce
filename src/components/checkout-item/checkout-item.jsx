import React from "react";
import { useDispatch } from "react-redux";
import { clearItemFromCart, addItemInCheckout, removeItem } from "../../redux/cart/cart.action";

import {IoIosAdd, IoIosRemove} from "react-icons/io"

import "./checkout-item.scss";

const CheckOutItem = (props) => {
    const { name, price, imageUrl, quantity } = props.item;
    const dispatch = useDispatch();

    const handleClearItemFromCartOnClick = () => {
        dispatch(clearItemFromCart(props.item))
    }

    return (
        <div className = "checkout-item" >
            <div className = "checkout-item-content" >
                <img src = {imageUrl} alt = "item" />
            </div>
            <span className = "checkout-item-content" >{name}</span>
            <span className = "checkout-item-content" >
                <div className = "arrow" onClick = {() => dispatch(removeItem(props.item))} ><IoIosRemove/></div>
                <span className = "value" >{quantity}</span>
                <div className = "arrow" onClick = {() => dispatch(addItemInCheckout(props.item))}><IoIosAdd/></div>
            </span>
            <span className = "checkout-item-content" >${price}</span>
            <div className = "checkout-item-remove-button" onClick = {handleClearItemFromCartOnClick} >&#10005;</div>
        </div>
    );
}

export default CheckOutItem;