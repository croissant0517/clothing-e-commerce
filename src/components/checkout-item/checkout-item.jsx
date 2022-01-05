import React from "react";
import { useDispatch } from "react-redux";
import { clearItemFromCart, addItem, removeItem } from "../../redux/cart/cart.action";

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
            <div className = "image-container" >
                <img src = {imageUrl} alt = "item" />
            </div>
            <span className = "name" >{name}</span>
            <span className = "quantity" >
                <div className = "arrow" onClick = {() => dispatch(removeItem(props.item))} ><IoIosRemove/></div>
                <span className = "value" >{quantity}</span>
                <div className = "arrow" onClick = {() => dispatch(addItem(props.item))}><IoIosAdd/></div>
            </span>
            <span className = "price" >NT${price}</span>
            <div className = "remove-button" onClick = {handleClearItemFromCartOnClick} >&#10005;</div>
        </div>
    );
}

export default CheckOutItem;